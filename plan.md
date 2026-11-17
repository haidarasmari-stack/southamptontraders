# Southampton Traders — implementation plan

## Product and implementation approach

Build a practical, mobile-first builder directory using the already initialized Manus Webdev starter (React 19, TypeScript, Vite, Wouter, Tailwind CSS, Express/tRPC and Drizzle). Use the React client for all public and demo interactions. Keep all example listings explicitly marked as demonstrations, never create review text or ratings, and never send or persist submitted form values. The customer quote, builder profile setup and admin moderation journeys will operate only in browser memory and show a clear demo-only notice; reloads clear those changes. Do not write to the project database or implement public account/email collection before separate authorization. The server/database capabilities were enabled at project initialization; the application must not use them for directory/customer records in this release. Do not activate paid plans or payment processing.

Implement the page routing in `client/src/App.tsx`, with reusable UI under `client/src/components/`, location/service/demo-profile data in `client/src/data/`, and independently understandable page modules under `client/src/pages/`. Use the existing Vite/Express starter to serve the application. Add a small build-time prerender step that emits useful initial HTML, unique title/description/social/canonical metadata and a real not-found response for known public routes and demo detail paths; keep the route manifest in `client/public/manus-routes.json`, the sitemap and robots file aligned with indexable content. Only the homepage and useful, genuinely distinct informational pages are indexable while business listings remain examples; no demo profile or invented review enters structured review data or the sitemap. The confirmed public origin is `https://southamptontraders.co.uk` for canonical/social metadata once the custom domain is connected.

After the implementation and checks are complete, publish the site using the Manus Webdev deployment and connect the exact custom domain `southamptontraders.co.uk`. Preserve existing unrelated Hostinger records; change only the records required for that domain connection. Do not touch `solentvoidsolutions.co.uk`. This publication authorization does not authorize collecting real customer data, purchasing credits, activating paid plans, or enabling payment processing.

## Page map

- `/` — homepage with a prominent “What building work do you need?” and “Where?” search, Southampton-focused introduction, service shortcuts, nearby places, how it works, and an unmistakable demo-only notice.
- `/builders/southampton/` — searchable and filterable demo directory, including service, location, availability and verified-profile filters; explain that there are no verified profiles or ratings in this demonstration.
- `/services/:slug/` and `/locations/:slug/` — useful service/location browsing pages for the initial categories and places, with distinct content and clear demo-listing labels.
- `/builder/:slug/` — demo business details, service area, service list, project photos with source credit and a quote-request CTA; no fabricated reviews, customer ratings, credentials or verification marks.
- `/request-quote/` — accessible multi-field demonstration quote form with project type, location, description, timing, optional budget and customer contact fields; warn not to submit real personal details and state that no data is transmitted or stored.
- `/builder-area/` — demo-only builder setup/dashboard for profile editing and viewing/responding to sample enquiries; no real account, email verification or persisted profile creation.
- `/admin/` — clearly labeled admin demonstration with search/status filters and in-memory profile moderation controls; do not create fake reviews or ratings.
- `/reviews/`, `/privacy/`, `/cookies/`, `/contact/` — review/moderation rules, privacy and cookie information, reporting/help. Explain the current demo-only data boundary.
- `/404` — accessible not-found page with real 404 semantics.

## Data model

Use typed, code-owned sample data only: `Service` and `Location` records with stable slugs; `BuilderProfile` records with a demo status, business description, offered services, served locations, availability, photo references, and optional business-supplied credentials (none will be presented as verified); `EnquiryDraft` values held only in the current browser page state; `ProfileReportDraft` and `ReviewReportDraft` as non-persistent demo interactions; and moderation status/audit preview records held in page state only. Reviews remain empty until real eligible submissions are authorized; no sample star score or review text is created. Do not store free-text entries in localStorage, sessionStorage, cookies, analytics, server logs, tRPC, or MySQL.

## Project structure

- `client/src/App.tsx`: application route map and global providers.
- `client/src/data/catalog.ts`: expandable service/location catalog and conspicuously synthetic demo profiles.
- `client/src/components/`: accessible header/footer, search, filters, demo banners, profile/list cards, breadcrumbs, form controls and moderation UI.
- `client/src/pages/`: homepage, directory, service/location listings, builder profile, quote form, builder demo, admin demo and policy/help views.
- `client/src/index.css`: the site design tokens, typography and responsive layout.
- `client/public/images/`: licensed sample project illustrations used only for demo presentation; no photo will be represented as proof of a real profile's work.
- `client/public/manus-routes.json`, `client/public/robots.txt`, `client/public/sitemap.xml`: route inventory and crawler documents.
- `scripts/prerender.mjs`: build-time generation of crawlable HTML for the finite public route set.
- `plan.md` and `TODO.md`: approved implementation decisions and full acceptance criteria.

## Design direction

Three possible styles (tail-tail probabilities):
- **Coastal trades editorial — 0.08:** contemporary British coastal publishing with warm paper, deep green/ink, restrained brick-red accents and confident serif display headings.
- **Workshop utility catalogue — 0.06:** modular technical labels, pale concrete neutrals and crisp diagram-like service navigation.
- **Quiet heritage home journal — 0.04:** soft stone surfaces, traditional typography and understated residential photography.

Choose **Coastal trades editorial**.

- **Design Movement:** Contemporary British coastal editorial, with the practicality of a local trade directory and the restraint of a homeowner magazine.
- **Core Principles:** Make trust status explicit; help compare before contacting; prioritize quick mobile search; keep demo/real status unmistakable.
- **Color Philosophy:** Warm paper reduces the coldness of generic lead marketplaces; deep Solent green signals steadiness and gives controls strong contrast; muted clay references brick and workmanship without looking like an alert.
- **Layout Paradigm:** An asymmetrical split hero with search on the left and one strong renovation photo on the right, followed by an editorial horizontal service rail and vertically readable result cards; avoid a dense symmetric dashboard grid on the customer side.
- **Signature Elements:** Slim roofline/ST monogram; small copper service-number markers; paper-like cream panels separated by ink-green rules.
- **Interaction Philosophy:** Search and filters remain visible and reversible; forms use clear labels, concise helper text and explicit demo/privacy feedback; no silent success states.
- **Animation:** Restrained 140–220 ms transitions for menus, filter chips and status changes; no continuous motion; respect `prefers-reduced-motion` and keep content usable without animation.
- **Typography System:** Georgia for large editorial headings; native system sans stack for controls, navigation and body text. Strong type scale and generous line-height; no external font requests.
- **Brand Essence:** A clear local starting point for Southampton homeowners comparing builders without the noise; **grounded, helpful, candid**.
- **Brand Voice:** Plain, neighborly and specific. Examples: “Find the right people to build it right.” “Start with the work. Compare the local firms.”
- **Wordmark & Logo:** A compact, original roofline/letterform mark drawn as a simple inline vector, paired with the Southampton Traders wordmark; do not copy another directory's visual identity.
- **Signature Brand Color:** Solent green `#1F554B`.

## Constraints and material choices

- Keep the MVP unpublished during development, then publish and connect `southamptontraders.co.uk` after the owner’s latest explicit instruction. Do not overwrite any unrelated Hostinger website or DNS record.
- Do not collect or store real customer/builder details; current public forms are demonstrations only and must plainly disclose this before a user types.
- Use no fake reviews, ratings, accreditations, or verification badges. Do not call the sample companies real businesses. Do not publish personal contact information.
- No subscription, payment, billing, live email sending, or paid AI asset generation. Reuse project images from Pexels search assets under its free-use licence, keep photo credits, and label them as illustrative rather than client work.
- Use accessible contrast, keyboard navigation, responsive layouts, form validation, safe input handling, explicit empty/error states, and non-persistent privacy-respecting demo analytics hooks only.


## Add-on: user-supplied builder directory profile

For the current follow-up request, create one original profile page for **REDS BUILDERS LIMITED**, the first entry in the supplied extract explicitly categorized as “Builders” (excluding “Builders Equipment” entries). Use only the supplied facts: business name, category “Builders”, Office 6, Racecourse Corner, Southampton, Hampshire, SO32 3QX, and 023 9269 3337. Do not infer specific services, service area, company website, accreditations, insurance, years trading, project history, ratings, reviews, or endorsement. State unprovided fields plainly. The snippet is too limited to support an independent verification claim; mark its details as user-supplied and unverified. Omit `sameAs`, `areaServed` and business website URL in schema where no values were supplied; do not manufacture them. The user explicitly requested publication, so publish the page on the existing Southampton Traders site and include its truthful profile URL in the sitemap. Add brief entrance/hover transitions respecting `prefers-reduced-motion`. Do not alter DNS or overwrite any unrelated website.
