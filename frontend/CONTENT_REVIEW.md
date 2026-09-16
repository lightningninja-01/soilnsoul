# Soil n Soul refinement — content review

## Preserved

Existing journey names, all 16 journey routes and their data, founder story, service routes, blog/API architecture, brand orange (#e65000), charcoal, and existing media remain in place. No Scientistic Era files were accessed or changed.

## Media

- Hero uses the existing `public/kashi-hero.mp4` (10 seconds, 1280 × 720) with the existing riverfront poster, autoplay/muted/loop/playsInline, and a pause option. Reduced-motion visitors see the poster. No media was downloaded or generated.
- Cinematic Storytelling preserves the four existing photo stories, with a five-second looping carousel. There were no separate story-video sources in the current carousel.
- Missing `about-1.png` and `about-2.png` journey references now use the existing riverfront image. Dedicated BHU, Ramnagar Fort, food, and weaving photography would make these presentations more specific.
- Journal upload paths resolve against the existing API host. Failed images use an intentional existing Kashi fallback.

## Client confirmation

- Founder chronology remains unresolved: the previous homepage referred to Kavita Shastri starting groups in 2018 and formal founding in 2020; the About page identifies Anchal Pandey as founder. The conflict remains flagged in `data/journeys.ts`. No new chronology was invented.
- Current illustrative reviews are visibly labelled **Guest Stories — Demo** and **Demo review**, with an explicit statement that they are not verified Google reviews. Replace them only with approved genuine guest accounts.
- Rare Access partner availability and claims such as five-generation recipes still need client confirmation.
- Journey timelines remain concepts, with no advertised prices, inventory, or fake availability.

## Enquiry and filtering

- Duration and Group Size filters use the actual options already attached to each journey. All current journeys support all configured group bands, so changing Group Size alone can legitimately leave the result count unchanged.
- Interest filtering uses existing journey descriptions, categories, and highlights.
- Journey selectors carry duration, group size and preferred date into Design My Journey. WhatsApp and email fields are separate. The traveller reviews the prepared enquiry and explicitly opens WhatsApp; nothing is automatically sent.
- The existing newsletter flow is an email subscription request, not a connected mailing-list service.
- Local blog API data was unavailable during verification. Existing empty-state behaviour is retained; no replacement articles were fabricated.

## Run

From `Soilnsoul-Travels-main/frontend`, run `npm run dev` and open http://localhost:3000. Production: `npm run build`, then `npm start`.
