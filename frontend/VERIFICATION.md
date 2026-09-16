# UI/UX refinement verification — 16 September 2026

## Build and code checks

- Next.js 16.2.6 production build passed, including TypeScript and 64 generated pages.
- ESLint passed for all changed interactive components and the media helper.
- Existing homepage, experience, journey, About, Contact, Journal, and representative service routes returned 200 with one title, H1 and canonical. Unknown journey returned 404.

## Browser verification

Used agent-browser for navigation and screenshots, and its Chrome debugging connection for native touch tests. Evidence is in `verification/`.

- Visually reviewed 1440px desktop and 390px mobile: hero/video, logo/nav, experience selector, carousel, Rare Access, journey cards, filters, reviews, founder, journal, contact/map and footer.
- Experience tabs support clicking and keyboard arrows.
- Carousel advances after five seconds; all four slides loop; next/previous and keyboard work.
- Native CDP touch gestures confirmed left swipe, right swipe, and vertical page scrolling over the carousel.
- Pause/resume and reduced-motion settings work. With reduced motion, the hero pauses and carousel autoplay stops; manual carousel controls remain available.
- Layout bounds pass at 320px, 390px and 768px. Loaded homepage images have no broken sources.
- Mobile navigation opens and closes with Escape.
- Duration and Interest filters reduce results appropriately; Group Size honours the supported option bands.
- Selected duration, group range and preferred date carry from a journey detail selector into the enquiry and encoded WhatsApp link.
- Separate WhatsApp and email fields, Unicode dates, guest counts, and ampersands survive encoding. No external message was sent.
- Demo review labels are visible, with no Google verification claim.
- No floating concierge CTA, visible homepage pricing, or unrelated destination in the hero.
- No browser runtime exceptions detected. Map loads beside contact information.

## Limits

Live blog data could not be verified because the local backend was unavailable. The API and database were not changed. Existing media and content gaps are recorded in `CONTENT_REVIEW.md`.

## Repeat

With the dev server running, use `node verify-routes.mjs` for route/metadata checks. Open the site in agent-browser, get its debugging URL using `agent-browser get cdp-url`, and pass it to `node verification/refinement-check.mjs <cdp-url>` or `node verification/accessibility-check.mjs <cdp-url>`. These prepare enquiries without following external submission links.
