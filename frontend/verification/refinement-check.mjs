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
  await call("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    mobile: true,
  });
  await call("Emulation.setTouchEmulationEnabled", { enabled: true });
  await navigate("/");
  assert(
    await evaluate(
      `document.querySelectorAll('title').length===1&&document.querySelectorAll('h1').length===1`,
    ),
    "Metadata duplication",
  );
  assert(
    await evaluate(
      `document.querySelector('video').muted&&document.querySelector('video').loop&&!document.querySelector('video').controls`,
    ),
    "Hero video configuration",
  );
  await evaluate(
    `document.querySelector('video').pause();document.querySelector('.sn-menu-toggle').click()`,
  );
  await wait(150);
  assert(
    await evaluate(
      `document.querySelector('.sn-menu-toggle').getAttribute('aria-expanded')==='true'`,
    ),
    "Menu open",
  );
  await call("Input.dispatchKeyEvent", {
    type: "keyDown",
    key: "Escape",
    code: "Escape",
  });
  await wait(150);
  assert(
    await evaluate(
      `document.querySelector('.sn-menu-toggle').getAttribute('aria-expanded')==='false'`,
    ),
    "Menu Escape",
  );
  await evaluate(`document.querySelector('#experience-tab-2').click()`);
  await wait(200);
  assert(
    await evaluate(
      `document.querySelector('#experience-panel h3').textContent==='Taste of Kashi'`,
    ),
    "Category selector",
  );
  await evaluate(`document.querySelector('#experience-tab-2').focus()`);
  await call("Input.dispatchKeyEvent", {
    type: "keyDown",
    key: "ArrowRight",
    code: "ArrowRight",
  });
  await wait(150);
  assert(
    await evaluate(
      `document.querySelector('#experience-panel h3').textContent==='Hidden Banaras'`,
    ),
    "Category keyboard",
  );
  console.log("PASS mobile navigation and experience discovery");
  await evaluate(
    `document.activeElement.blur();window.scrollTo({top:document.querySelector('.sn-story-browser').offsetTop-90,behavior:'instant'})`,
  );
  await wait(400);
  await call("Input.dispatchMouseEvent", { type: "mouseMoved", x: 0, y: 0 });
  const before = await evaluate(
    `document.querySelector('.sn-story-controls>span').textContent`,
  );
  await wait(5550);
  const after = await evaluate(
    `document.querySelector('.sn-story-controls>span').textContent`,
  );
  assert(before !== after, "Five-second autoplay did not advance");
  await evaluate(`document.querySelector('.sn-autoplay').click()`);
  await wait(200);
  const start = await evaluate(
    `document.querySelector('.sn-story-controls>span').textContent`,
  );
  for (let i = 0; i < 4; i++) {
    await evaluate(
      `document.querySelector('button[aria-label="Next story"]').click()`,
    );
    await wait(800);
  }
  assert(
    (await evaluate(
      `document.querySelector('.sn-story-controls>span').textContent`,
    )) === start,
    "Carousel infinite loop",
  );
  await evaluate(
    `document.querySelector('.sn-story-track').focus({preventScroll:true})`,
  );
  await call("Input.dispatchKeyEvent", {
    type: "keyDown",
    key: "ArrowRight",
    code: "ArrowRight",
  });
  await wait(800);
  assert(
    (await evaluate(
      `document.querySelector('.sn-story-controls>span').textContent`,
    )) !== start,
    "Carousel keyboard",
  );
  const box = await evaluate(
    `(()=>{const r=document.querySelector('.sn-story-track').getBoundingClientRect();return {y:r.top+r.height*.45};})()`,
  );
  const swipe = async (x1, y1, x2, y2) => {
    await call("Input.dispatchTouchEvent", {
      type: "touchStart",
      touchPoints: [{ x: x1, y: y1 }],
    });
    for (let i = 1; i <= 12; i++) {
      await call("Input.dispatchTouchEvent", {
        type: "touchMove",
        touchPoints: [
          { x: x1 + ((x2 - x1) * i) / 12, y: y1 + ((y2 - y1) * i) / 12 },
        ],
      });
      await wait(25);
    }
    await call("Input.dispatchTouchEvent", {
      type: "touchEnd",
      touchPoints: [],
    });
    await wait(900);
  };
  const touchBefore = await evaluate(
    `document.querySelector('.sn-story-controls>span').textContent`,
  );
  await swipe(325, box.y, 75, box.y);
  assert(
    (await evaluate(
      `document.querySelector('.sn-story-controls>span').textContent`,
    )) !== touchBefore,
    "Real touch swipe left",
  );
  await swipe(75, box.y, 325, box.y);
  assert(
    (await evaluate(
      `document.querySelector('.sn-story-controls>span').textContent`,
    )) === touchBefore,
    "Real touch swipe right",
  );
  await screenshot("mobile-carousel");
  const yBefore = await evaluate("scrollY");
  await swipe(195, box.y + 70, 195, box.y - 130);
  assert(
    (await evaluate("scrollY")) > yBefore + 40,
    "Vertical scroll blocked by carousel",
  );
  console.log(
    "PASS five-second autoplay, loop, keyboard, real touch swipes, vertical scrolling",
  );
  await evaluate(
    `window.scrollTo({top:document.querySelector('#contact').offsetTop-80,behavior:'instant'})`,
  );
  await wait(500);
  await screenshot("mobile-contact");
  await evaluate(
    `(()=>{const f=document.querySelector('.sn-form');f.elements.name.value='Demo Traveller';f.elements.contact.value='+91 90000 00000';f.elements.email.value='demo@example.com';f.elements.dates.value='12–14 October';f.elements.guests.value='4';f.elements.message.value='Culture & quiet mornings';f.requestSubmit();})()`,
  );
  await wait(150);
  const enquiry = await evaluate(
    `new URL(document.querySelector('.sn-form-ready a').href).searchParams.get('text')`,
  );
  assert(
    enquiry.includes("demo@example.com") &&
      enquiry.includes("+91 90000 00000") &&
      enquiry.includes("Guests: 4") &&
      enquiry.includes("Culture & quiet mornings"),
    "Enquiry encoding",
  );
  assert(
    await evaluate(
      `!document.querySelector('.sn-concierge') && !/₹|Book Now|Let.s Talk Kashi/i.test(document.querySelector('main').innerText)`,
    ),
    "Unapproved primary content",
  );
  assert(
    await evaluate(
      `document.querySelector('#reviews').textContent.includes('Guest Stories — Demo')`,
    ),
    "Demo review label",
  );
  const wide = await evaluate(
    `[...document.querySelectorAll('.sn-wrap,.sn-rare-grid,.sn-components,.sn-contact-grid,.sn-experience-feature')].filter(e=>e.getBoundingClientRect().right>innerWidth+1).map(e=>e.className)`,
  );
  assert(!wide.length, "Mobile grid overflow: " + wide.join(","));
  console.log(
    "PASS contact details, encoded enquiry, demo labelling and mobile bounds",
  );
  await navigate("/journeys");
  const initial = await evaluate(
    `document.querySelectorAll('.sn-journey-results article').length`,
  );
  await select(".sn-refined-filters label:nth-child(1) select", "6+ Days");
  const long = await evaluate(
    `document.querySelectorAll('.sn-journey-results article').length`,
  );
  assert(long > 0 && long < initial, "Duration options filter");
  await select(".sn-refined-filters label:nth-child(2) select", "10+");
  assert(
    (await evaluate(
      `document.querySelectorAll('.sn-journey-results article').length`,
    )) === long,
    "Supported group options",
  );
  await evaluate(`document.querySelector('.sn-filter-reset').click()`);
  await wait(150);
  await select(".sn-refined-filters label:nth-child(3) select", "Food");
  assert(
    (await evaluate(
      `document.querySelectorAll('.sn-journey-results article').length`,
    )) < initial,
    "Interest filter",
  );
  await screenshot("mobile-journeys");
  await navigate("/journeys/the-soul-of-kashi");
  await select(".sn-journey-selectors select", "4 Days / 3 Nights");
  await select(".sn-journey-selectors label:nth-child(2) select", "5–6 Guests");
  await evaluate(
    `(()=>{const e=document.querySelector('.sn-journey-selectors input');const setter=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set;setter.call(e,'18 October');e.dispatchEvent(new Event('input',{bubbles:true}));})()`,
  );
  await wait(150);
  await evaluate(
    `document.querySelector('.sn-journey-selectors .sn-button').click()`,
  );
  await wait(200);
  assert(
    (await evaluate(
      `document.querySelector('.sn-form [name=guests]').value`,
    )) === "5–6",
    "Selected group not carried into form",
  );
  assert(
    (await evaluate(
      `document.querySelector('.sn-form [name=dates]').value`,
    )) === "18 October",
    "Selected date not carried into form",
  );
  await evaluate(
    `(()=>{const f=document.querySelector('.sn-form');f.elements.name.value='Demo';f.elements.contact.value='9000000000';f.requestSubmit();})()`,
  );
  await wait(150);
  const detail = await evaluate(
    `new URL(document.querySelector('.sn-form-ready a').href).searchParams.get('text')`,
  );
  assert(
    detail.includes("4 Days / 3 Nights") &&
      detail.includes("The Soul of Kashi") &&
      detail.includes("5–6"),
    "Journey context",
  );
  console.log(
    "PASS duration, group and interest filters; journey preference handoff",
  );
  await call("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 1000,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await call("Emulation.setTouchEmulationEnabled", { enabled: false });
  await navigate("/");
  await screenshot("desktop-hero");
  for (const [name, selector] of [
    ["desktop-experiences", "#experiences"],
    ["desktop-carousel", ".sn-story-browser"],
    ["desktop-journeys", "#journeys"],
    ["desktop-reviews", "#reviews"],
    ["desktop-contact", "#contact"],
  ]) {
    await evaluate(
      `window.scrollTo({top:document.querySelector(${JSON.stringify(selector)}).offsetTop-90,behavior:'instant'})`,
    );
    await wait(650);
    await screenshot(name);
  }
  assert(!errors.length, "Runtime errors: " + errors.join(";"));
  console.log("PASS desktop renders and no browser runtime exceptions");
  fs.writeFileSync(
    "verification/results.json",
    JSON.stringify(
      {
        passed: true,
        checks: [
          "mobile menu",
          "experience selector keyboard",
          "5s autoplay",
          "infinite carousel",
          "keyboard",
          "native touch left and right",
          "vertical touch scroll",
          "WhatsApp encoding",
          "demo labels",
          "390px bounds",
          "filters",
          "journey preference handoff",
          "desktop visuals",
        ],
        runtimeErrors: errors,
      },
      null,
      2,
    ),
  );
} finally {
  socket.close();
}
