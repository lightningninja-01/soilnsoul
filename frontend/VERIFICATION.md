# Editorial V1 verification

## Passed

- Production build: Next.js 16.2.6, TypeScript, and 52 generated pages.
- Changed-file ESLint: zero errors. Two retained warnings: existing Material Symbols stylesheet in the root layout and unused `ONE_DAY_MS` in sitemap.
- Browser screenshots reviewed at 1440px desktop, 390px mobile, and 320px narrow mobile. Grid bounds also checked at 768px.
- Fixed intrinsic grid overflow found in the 320px screenshot; all measured editorial grids now fit the viewport.
- Mobile menu opens, closes, and responds to Escape.
- Carousel arrows, pagination state, and keyboard navigation work.
- FAQ disclosure opens and closes.
- Enquiry prepares the correct WhatsApp recipient and preserves names, dates, guest count, interests, ampersands, and Unicode. No messages were sent.
- Journey enquiry includes the selected journey name and duration.
- Google map loads when scrolled into view.
- Browser runtime error check returned no errors.
- `/`, `/experiences`, `/journeys`, all four `/journeys/[slug]` pages, `/about`, `/contact`, `/blog`, `/services/travel`, `/services/stay`, and `/services/city-tour` return 200 with exactly one title, H1, and canonical.
- Unknown journey returns 404 with one title.

## Scope and limitations

- No backend or database code was changed. The local blog API was unavailable, so live article data could not be verified; the homepage and journal render an honest empty state with navigation intact.
- No video files supplied: cinematic content is labelled as photo stories.
- Newsletter signup creates an email request; it is not a connected mailing-list subscription.
- Contact details, founder content, supplied statistics, and existing testimonial source were retained. See `CONTENT_REVIEW.md` for client confirmations.

## Repeat checks

Run the frontend with `npm run dev`, then `node verify-routes.mjs` for HTTP and metadata checks. `verify-browser.js` is a browser-context interaction check for the homepage; pass its contents to `agent-browser eval` using UTF-8 base64 on Windows. It prepares a demonstration enquiry without following its external link.

The development server is available at http://localhost:3000. Production build: `npm run build`.
