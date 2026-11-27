# Southampton Traders — implementation plan

## Product and implementation approach

Continue the existing Manus WebDev project (React 19, TypeScript, Vite, Wouter, Tailwind CSS, Express/tRPC and Drizzle). Populate the public directory from the maintained CSV of 129 unique researched businesses: the original 71 records, 17 additions from the earlier research and 41 additional verified Southampton businesses. Keep exactly the nine requested service categories and seven launch areas; do not imply the current results are exhaustive. Use the CSV's factual profile summaries, addresses/postcodes, services and contact details without inventing facts. Where a verified phone or direct website is blank, omit that contact link. The supporting source ledger is retained with the imported CSV.

Directory records are static, code-owned public data; do not use the already-enabled database for them. Implement service/location search filters, searchable cards and individual profile pages with direct `tel:` and company-site links only where present. Generate `HomeAndConstructionBusiness` JSON-LD from the imported row for each real profile, without adding ratings, reviews, accreditations, credentials, availability or unsupported contact facts. If an imported SEO title uses a shortened name that does not match `Business_Name`, generate a truthful title from the full record name and category/location while staying within the 60-character limit where possible; keep the full business name visible on-page and in structured data.

Keep the customer quote form, builder registration/dashboard and admin moderation journeys as explicitly labelled, browser-only demonstrations. They must not transmit or persist form values. Keep these demo flows separate from the real directory, do not use the database for directory/customer records, and do not activate paid plans or payment processing. Preserve the separate user-requested REDS BUILDERS LIMITED page and its source/unverified disclosure.

Use the existing build-time prerender step to provide crawlable HTML, route-specific title/description/social/canonical metadata, JSON-LD and genuine 404 handling. Generate profile routes from the dataset and synchronize `client/public/manus-routes.json` and `client/public/sitemap.xml`. Index the real, useful profile, service, location, homepage and how-it-works pages; exclude demo-only pages and faceted `/builders/:location/` results from the sitemap. The configured public origin is `https://southamptontraders.co.uk`.

The live site and custom domain already exist. For this iteration, update and checkpoint the code-owned directory data after validation; publish only after the owner explicitly requests publication. Do not change DNS or modify unrelated websites.

## Dataset inventory and limits

The maintained source CSV has the exact ten requested columns and 129 unique records: Southampton 56, Eastleigh 12, Fareham 18, Winchester 10, Totton 10, Hedge End 8 and Romsey 15. The user has set a current target of 100 verified Southampton profiles; 44 remain to be researched. The other six launch areas remain below the original 20–50-per-area research aim. Present the directory as a non-exhaustive current set. The records use all nine specified services. Five records have no verified phone and three have no verified direct website; keep those values blank and hide their contact links. Evidence notes are stored in `data/verification-updates/2026-11-19/`. Do not fabricate ratings, reviews, accreditation, credentials, availability or other claims.

## Page map

- `/` — homepage with service and launch-area search, real listing totals, transparent non-exhaustive coverage copy and no fictional directory listings.
- `/builders/:location/` — searchable results for one of exactly seven launch areas, with service and location filters; no invented availability/verification filters. Keep faceted results `noindex` to avoid duplicates.
- `/services/:slug/` and `/locations/:slug/` — distinct, indexable listings drawn from the supplied real dataset and linked to matching profiles and related categories/areas.
- `/builder/:slug/` — a real profile page for each CSV business, preserving the unique factual summary and supported service/location data; conditionally show verified phone/website links; include matching JSON-LD; do not add sample photos, ratings, reviews, credentials, accreditations or unsupported claims.
- `/builder/reds-builders-limited/` — retain the previously requested separate user-supplied listing, clearly marked unverified and distinct from the researched CSV directory.
- `/request-quote/` — accessible quote-form demonstration; warn users not to enter real data and make clear nothing is sent or saved.
- `/builder-area/` and `/admin/` — conspicuously labelled demonstration flows with only synthetic demo data and temporary browser state; never edit real public directory records.
- `/reviews/`, `/privacy/`, `/cookies/`, `/contact/` — preserve review/privacy/help content and clearly explain current demo-only submission boundaries.
- `/404` — accessible not-found page with a genuine HTTP 404 response.

## Data model

Keep stable `Service` and `Location` catalogs for the exact nine categories and seven areas. Import `BuilderProfile` records from a checked-in JSON representation of the supplied CSV, adding a deterministic URL slug and service/location slugs without changing the source facts. Preserve the raw CSV and per-business verification-source ledger in the repository. Build schema.org `HomeAndConstructionBusiness` plus `WebPage` JSON-LD only from fields visible on the corresponding profile. Quote drafts, profile/report demos and moderation/audit previews remain in page memory only; never store free-text entries in localStorage, sessionStorage, cookies, analytics, server logs, tRPC or MySQL.

## Project structure

- `client/src/App.tsx`: application route map, including the separate REDS page.
- `client/src/data/catalog.ts`: exact service/location catalogs and typed business mappings.
- `client/src/data/builders.json`: generated static data imported from the supplied CSV.
- `client/src/data/jsonld.ts`: JSON-LD mapping for each factual business profile.
- `client/src/data/adminDemoProfiles.ts`: synthetic records used only within the clearly labelled admin demo.
- `client/src/components/`: accessible header/footer, directory search, cards and shared navigation.
- `client/src/pages/`: homepage, directory, service/location listings, real profile pages and separate demo/policy views.
- `client/src/lib/seo.ts`: page metadata and canonical/social metadata.
- `client/src/index.css`: site design tokens, typography and responsive layouts.
- `data/southampton-traders-builders.csv` and `data/southampton-traders-builders-verification-sources.md`: imported source data and its evidence ledger.
- `scripts/prerender.mjs`: static generation of crawlable HTML and profile routes.
- `client/public/manus-routes.json`, `client/public/robots.txt`, `client/public/sitemap.xml`: route inventory and crawler documents.
- `plan.md` and `TODO.md`: approved decisions and acceptance outcomes.

## Design direction

Three possible styles (tail-tail probabilities):
- **Coastal trades editorial — 0.08:** contemporary British coastal publishing with warm paper, deep green/ink, restrained brick-red accents and confident serif display headings.
- **Workshop utility catalogue — 0.06:** modular technical labels, pale concrete neutrals and crisp diagram-like service navigation.
- **Quiet heritage home journal — 0.04:** soft stone surfaces, traditional typography and understated residential photography.

Choose **Coastal trades editorial**.

- **Design Movement:** Contemporary British coastal editorial, with the practicality of a local trade directory and the restraint of a homeowner magazine.
- **Core Principles:** Make the distinction between directory facts and demo tools clear; help homeowners compare before contacting; prioritize quick mobile search; make limits and missing data explicit.
- **Color Philosophy:** Warm paper reduces the coldness of generic lead marketplaces; deep Solent green signals steadiness and gives controls strong contrast; muted clay references brick and workmanship without looking like an alert.
- **Layout Paradigm:** An asymmetrical split hero with service/location search on the left and a clearly illustrative renovation photo on the right, followed by editorial service navigation and vertically readable business cards.
- **Signature Elements:** Slim roofline/ST monogram; small copper service-number markers; paper-like cream panels separated by ink-green rules.
- **Interaction Philosophy:** Search and filters remain visible and reversible; direct contact links are conditional on source data; forms use explicit demo/privacy feedback and no silent success states.
- **Animation:** Restrained 140–220 ms transitions for menus, filter chips and status changes; no continuous motion; respect `prefers-reduced-motion` and keep content usable without animation.
- **Typography System:** Georgia for large editorial headings; native system sans stack for controls, navigation and body text. Strong type scale and generous line-height; no external font requests.
- **Brand Essence:** A clear local starting point for Southampton homeowners comparing builders without the noise; **grounded, helpful, candid**.
- **Brand Voice:** Plain, neighborly and specific. Examples: “Find the right people to build it right.” “Start with the work. Compare the local firms.”
- **Wordmark & Logo:** A compact, original roofline/letterform mark drawn as a simple inline vector, paired with the Southampton Traders wordmark; do not copy another directory's visual identity.
- **Signature Brand Color:** Solent green `#1F554B`.

## Constraints and material choices

- Use only the user-supplied researched facts for public directory entries. Do not invent or imply ratings, reviews, accreditations, verification badges, credentials, business availability, contact details or endorsements. Do not show a contact link for a blank CSV field.
- Do not collect or store real customer details. Quote, builder registration, report and admin flows remain demonstrations and must plainly disclose that values are not transmitted or retained.
- Do not write to the managed database or build live accounts, enquiries, email sending, subscriptions, payments or paid AI assets in this release.
- Keep public business details separate from synthetic admin/demo records; do not make demo controls operate on real business profiles.
- Preserve the separate REDS BUILDERS LIMITED page, its supplied facts and unverified-source disclosure.
- Do not change DNS, overwrite an unrelated website, or make unrelated account changes.
- Reuse project imagery only where clearly identified as illustrative and not as evidence of a listed builder’s work. Keep accessible contrast, keyboard navigation, responsive layouts, input validation and non-persistent demo behavior.

## Existing user-requested REDS BUILDERS LIMITED listing

Preserve the original separate listing page for **REDS BUILDERS LIMITED**, the first entry in the supplied extract explicitly categorized as “Builders” (excluding “Builders Equipment” entries). Its only supported facts are the business name, category “Builders”, Office 6, Racecourse Corner, Southampton, Hampshire, SO32 3QX, and 023 9269 3337. Do not infer services, service area, company website, accreditations, insurance, years trading, project history, ratings, reviews or endorsement. Keep the user-supplied/unverified disclosure; omit unsupported `sameAs`, `areaServed` and website URL in its schema. Its existing public profile URL remains in the sitemap. Do not alter DNS or unrelated websites.
Continue the existing Manus WebDev project (React 19, TypeScript, Vite, Wouter, Tailwind CSS, Express/tRPC and Drizzle). Populate the public directory from the maintained CSV of 131 unique researched businesses: the original 71 records, 17 additions from the earlier research and 43 additional verified Southampton businesses. Keep exactly the nine requested service categories and seven launch areas; do not imply the current results are exhaustive. Use the CSV's factual profile summaries, addresses/postcodes, services and contact details without inventing facts. Where a verified phone or direct website is blank, omit that contact link. The supporting source ledger is retained with the imported CSV.
The maintained source CSV has the exact ten requested columns and 131 unique records: Southampton 58, Eastleigh 12, Fareham 18, Winchester 10, Totton 10, Hedge End 8 and Romsey 15. The user has set a current target of 100 verified Southampton profiles; 42 remain to be researched. The other six launch areas remain below the original 20–50-per-area research aim. Present the directory as a non-exhaustive current set. The records use all nine specified services. Five records have no verified phone and three have no verified direct website; keep those values blank and hide their contact links. Evidence notes are stored in `data/verification-updates/2026-11-19/` and `data/verification-updates/2026-11-21/`. Do not fabricate ratings, reviews, accreditation, credentials, availability or other claims.
Continue the existing Manus WebDev project (React 19, TypeScript, Vite, Wouter, Tailwind CSS, Express/tRPC and Drizzle). Populate the public directory from the maintained CSV of 134 unique researched businesses: the original 71 records, 17 additions from the earlier research and 46 additional verified Southampton businesses. Keep exactly the nine requested service categories and seven launch areas; do not imply the current results are exhaustive. Use the CSV's factual profile summaries, addresses/postcodes, services and contact details without inventing facts. Where a verified phone or direct website is blank, omit that contact link. The supporting source ledger is retained with the imported CSV.
The maintained source CSV has the exact ten requested columns and 134 unique records: Southampton 61, Eastleigh 12, Fareham 18, Winchester 10, Totton 10, Hedge End 8 and Romsey 15. The user has set a current target of 100 verified Southampton profiles; 39 remain to be researched. The other six launch areas remain below the original 20–50-per-area research aim. Present the directory as a non-exhaustive current set. The records use all nine specified services. Five records have no verified phone and three have no verified direct website; keep those values blank and hide their contact links. Evidence notes are stored in `data/verification-updates/2026-11-19/` and `data/verification-updates/2026-11-21/`. Do not fabricate ratings, reviews, accreditation, credentials, availability or other claims.


# SEO content and strategy addendum — 22 November 2026

The earlier dataset counts and release instructions in this file are historical. The current source catalog has 135 total profiles and 62 assigned to Southampton across seven launch areas and nine service categories. Use the live source data when generating visible copy and metadata; keep the directory non-exhaustive and non-endorsing.

The deliverables for this iteration are a cited local SEO and ethical backlink strategy, a qualitative keyword-gap report based on a dated six-site organic result sample, a reusable Manus skill, and on-site answer-style content/metadata improvements. No exact rank, search volume, traffic or placement is claimed: no Search Console query export or reliable geo-controlled rank data was supplied. The audit's browser, raw-request and agent probes were inconsistent; use a post-checkpoint browser and Search Console URL Inspection to confirm crawler-facing production content before concluding the live domain is uniformly accessible.

Reuse the existing React/Vite project. `Home.tsx` will use short visible answers grounded in the catalog and directory scope; `BrowseLanding.tsx` will provide page-specific service/location answers derived from current catalog records. `seo.ts` remains the single route metadata source for homepage, services and locations. Preserve per-route canonical/robots behavior, prerendered body content, accurate JSON-LD and truthful summaries. Do not create service-by-location doorway pages, fake reviews, unsupported cost estimates or FAQPage markup for a retired Google rich-result feature. Keep the current permissive robots policy; the required search/AI crawler tokens are not blocked by `User-agent: * / Allow: /`. Any firewall allowance must be verified separately. `llms.txt` remains optional documentation, not a promised Google ranking signal.

For backlink growth, focus on relevant earned editorial/community relationships and genuinely useful locally grounded resources. Do not buy ranking links, exchange links at scale, spam directories, or promise placements. This iteration does not create external accounts or make outreach on behalf of the owner. No DNS changes or data collection are in scope. The existing page style, non-persistent demo labels and privacy limits must be preserved.
