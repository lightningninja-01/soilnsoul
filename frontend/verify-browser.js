(async () => {
  const assert = (condition, message) => {
    if (!condition) throw new Error(message);
  };
  assert(
    document.querySelectorAll("title").length === 1,
    "Expected exactly one title",
  );
  assert(
    document.querySelectorAll("h1").length === 1,
    "Expected exactly one h1",
  );
  assert(
    document.documentElement.scrollWidth <= innerWidth,
    "Document overflow",
  );
  for (const element of document.querySelectorAll(".sn-wrap,.sn-components,.sn-components>a,.sn-rare-grid,.sn-form,.sn-values")) { assert(element.getBoundingClientRect().right <= innerWidth + 1, "Editorial grid overflow: " + element.className); }
  const button = document.querySelector(".sn-menu-toggle");
  if (innerWidth < 850) {
    button.click();
    await new Promise((r) => setTimeout(r, 100));
    assert(
      button.getAttribute("aria-expanded") === "true",
      "Menu failed to open",
    );
    document.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
    );
    await new Promise((r) => setTimeout(r, 100));
    assert(
      button.getAttribute("aria-expanded") === "false",
      "Escape failed to close menu",
    );
  }
  const next = document.querySelector('button[aria-label="Next story"]');
  next.click();
  await new Promise((r) => setTimeout(r, 100));
  assert(
    document
      .querySelector(".sn-dots button:nth-child(2)")
      .getAttribute("aria-pressed") === "true",
    "Carousel next failed",
  );
  document
    .querySelector(".sn-film-stage")
    .dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true }),
    );
  await new Promise((r) => setTimeout(r, 100));
  assert(
    document.querySelector(".sn-dots button").getAttribute("aria-pressed") ===
      "true",
    "Carousel keyboard failed",
  );
  const faq = document.querySelector(".sn-faq summary");
  faq.click();
  assert(faq.parentElement.open, "FAQ failed to open");
  faq.click();
  const form = document.querySelector(".sn-form");
  form.elements.name.value = "Demo Traveller";
  form.elements.contact.value = "demo@example.com";
  form.elements.dates.value = "12–14 October";
  form.elements.guests.value = "4";
  form.elements.message.value = "A quiet journey & local traditions";
  form.querySelector('[value="Sacred Kashi"]').checked = true;
  form.requestSubmit();
  await new Promise((r) => setTimeout(r, 100));
  const link = document.querySelector(".sn-form-ready a");
  assert(link, "Enquiry link missing");
  const url = new URL(link.href),
    message = url.searchParams.get("text");
  assert(
    url.hostname === "wa.me" && url.pathname === "/919580417547",
    "Wrong WhatsApp recipient",
  );
  for (const text of [
    "Demo Traveller",
    "demo@example.com",
    "12–14 October",
    "Guests: 4",
    "Sacred Kashi",
    "A quiet journey & local traditions",
  ])
    assert(message.includes(text), "Missing enquiry field " + text);
  assert(
    !/₹|starting at|book now/i.test(document.querySelector("main").innerText),
    "Transactional homepage copy",
  );
  return {
    viewport: innerWidth,
    title: document.title,
    headingCount: document.querySelectorAll("h1").length,
    overflow: false,
    menu: "passed",
    carousel: "passed",
    faq: "passed",
    enquiry: "passed; link inspected without sending",
    message,
  };
})();

