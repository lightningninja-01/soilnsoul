import fs from "node:fs";
const socket = new WebSocket(process.argv[2]);
await new Promise((resolve, reject) => {
  socket.onopen = resolve;
  socket.onerror = reject;
});
let sequence = 0,
  session;
const pending = new Map();
const errors = [];
socket.onmessage = ({ data }) => {
  const message = JSON.parse(data);
  if (message.id) {
    const promise = pending.get(message.id);
    pending.delete(message.id);
    message.error
      ? promise.reject(new Error(message.error.message))
      : promise.resolve(message.result);
  } else if (message.method === "Runtime.exceptionThrown")
    errors.push(message.params.exceptionDetails.text);
};
const call = (method, params = {}, scope = session) =>
  new Promise((resolve, reject) => {
    const id = ++sequence;
    pending.set(id, { resolve, reject });
    socket.send(
      JSON.stringify({
        id,
        method,
        params,
        ...(scope ? { sessionId: scope } : {}),
      }),
    );
  });
const targets = await call("Target.getTargets", {}, null);
const target = targets.targetInfos.find(
  (t) => t.type === "page" && t.url.startsWith("http://localhost:3000"),
);
session = (
  await call(
    "Target.attachToTarget",
    { targetId: target.targetId, flatten: true },
    null,
  )
).sessionId;
await call("Runtime.enable");
await call("Page.enable");
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const evaluate = async (expression) => {
  const result = await call("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
    userGesture: true,
  });
  if (result.exceptionDetails)
    throw Error(JSON.stringify(result.exceptionDetails));
  return result.result.value;
};
const assert = (value, message) => {
  if (!value) throw Error(message);
};
const screenshot = async (name) => {
  const { data } = await call("Page.captureScreenshot", {
    format: "jpeg",
    quality: 80,
  });
  fs.writeFileSync(`verification/${name}.jpg`, Buffer.from(data, "base64"));
};
const navigate = async (route) => {
  await call("Page.navigate", { url: "http://localhost:3000" + route });
  for (let i = 0; i < 100; i++) {
    await wait(200);
    if (
      await evaluate(
        `location.pathname===${JSON.stringify(route)} && document.readyState==='complete' && !!document.querySelector('.sn-site')`,
      )
    )
      break;
  }
  await wait(500);
};
const select = async (selector, value) => {
  await evaluate(
    `(()=>{const e=document.querySelector(${JSON.stringify(selector)});e.value=${JSON.stringify(value)};e.dispatchEvent(new Event('change',{bubbles:true}));})()`,
  );
  await wait(150);
};
try {
  await call("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "reduce" }],
  });
  await navigate("/");
  await evaluate(
    `window.scrollTo({top:document.querySelector('.sn-story-browser').offsetTop-90,behavior:'instant'})`,
  );
  await wait(300);
  assert(
    await evaluate(`document.querySelector('video').paused`),
    "Hero should pause for reduced motion",
  );
  assert(
    await evaluate(`document.querySelector('.sn-autoplay').disabled`),
    "Carousel autoplay should be disabled for reduced motion",
  );
  const before = await evaluate(
    `document.querySelector('.sn-story-controls>span').textContent`,
  );
  await wait(5500);
  assert(
    (await evaluate(
      `document.querySelector('.sn-story-controls>span').textContent`,
    )) === before,
    "Carousel moved despite reduced motion",
  );
  await evaluate(
    `document.querySelector('button[aria-label="Next story"]').click()`,
  );
  await wait(200);
  assert(
    (await evaluate(
      `document.querySelector('.sn-story-controls>span').textContent`,
    )) !== before,
    "Reduced motion manual controls",
  );
  console.log(
    "PASS reduced-motion video, disabled autoplay, and manual carousel controls",
  );
  for (const width of [320, 768]) {
    await call("Emulation.setDeviceMetricsOverride", {
      width,
      height: 900,
      deviceScaleFactor: 1,
      mobile: width < 700,
    });
    await wait(300);
    const wide = await evaluate(
      `[...document.querySelectorAll('.sn-wrap,.sn-rare-grid,.sn-components,.sn-contact-grid,.sn-experience-feature,.sn-refined-filters')].filter(e=>e.getBoundingClientRect().right>innerWidth+1).map(e=>e.className)`,
    );
    assert(!wide.length, `${width}px overflow: ${wide}`);
    console.log(`PASS ${width}px bounds`);
  }
  await call("Emulation.setEmulatedMedia", { features: [] });
  await call("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    mobile: true,
  });
  await navigate("/");
  for (
    let y = 0;
    y < (await evaluate("document.documentElement.scrollHeight"));
    y += 700
  ) {
    await evaluate(`window.scrollTo({top:${y},behavior:'instant'})`);
    await wait(100);
  }
  await wait(700);
  const broken = await evaluate(
    `[...document.querySelectorAll('img')].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src)`,
  );
  assert(!broken.length, "Broken rendered images: " + broken);
  console.log("PASS loaded homepage image assets");
  for (const [name, selector] of [
    ["mobile-experiences", "#experiences"],
    ["mobile-rare", ".sn-rare"],
    ["mobile-reviews", "#reviews"],
    ["mobile-journal", "#blog"],
    ["mobile-footer", ".sn-footer"],
  ]) {
    await evaluate(
      `window.scrollTo({top:document.querySelector(${JSON.stringify(selector)}).offsetTop-90,behavior:'instant'})`,
    );
    await wait(350);
    await screenshot(name);
  }
  console.log("PASS supporting mobile sections captured");
} finally {
  socket.close();
}
