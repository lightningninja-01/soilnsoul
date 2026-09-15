# V1 content and asset review

## Client confirmation needed

- Founder chronology: the previous homepage said “In 2018, Kavita Shastri began leading small, intimate groups ... in 2020, Soil n Soul was formally born.” The About page names Anchal Pandey as founder. The conflict is preserved in `data/journeys.ts` comments. No replacement chronology is published. Existing Anchal Pandey story is retained.
- Rare Access descriptions come from the supplied brief. Confirm partner availability and claims such as five-generation recipes before launch.
- Journey timelines are proposed editorial concepts, not confirmed departures or inventory. Dates are chosen by the traveller; no example October dates are advertised as actual availability.
- Testimonials are reused from `lib/seo-page-data.ts`, not generated. Confirm client approval and provenance before publication.

## Photography and film

- Existing local assets are reused. No replacement stock or generated imagery was downloaded.
- Supply dedicated food, silk-weaving, and hidden-lane photography. Current food and craft concepts use general Kashi photography; they are not represented as photos of a specific kitchen or studio.
- No video files were supplied. `components/CinematicCarousel.tsx` supports optional video and caption-track URLs. Until supplied it presents clearly labelled photo stories, without a fake play button.
- Hero uses `public/images/hero/hero-3.jpg`. Founder uses the existing `founder.jpg`; a higher-resolution approved portrait would improve the desktop presentation.

## Functional notes

- Enquiry form prepares a correctly encoded WhatsApp message, then offers an explicit Continue on WhatsApp link. Nothing is automatically sent.
- No newsletter API existed. Signup opens an explicit email subscription request to hello@soilnsoul.in; it does not falsely report a completed subscription. Connect an approved mailing provider when available.
- Existing blog API, admin, service detail routes, and backend are retained. Blog data requires NEXT_PUBLIC_API_URL (default http://localhost:5000/api). The homepage offers a journal link when the API is unavailable.
- Legacy SEO pages and transactional articles are retained. The premium homepage prioritises cultural editorial titles.

## Run

From `Soilnsoul-Travels-main/frontend`: `npm ci`, then `npm run dev` (http://localhost:3000). Production: `npm run build`, then `npm start`.
