# Southampton Traders MVP — outcome checklist

## Customer discovery and directory
- [x] Build a homepage with a prominent search: “What building work do you need?” and “Where?”
- [x] Let customers browse builders by service and location.
- [x] Provide initial service categories: extensions, renovations, loft conversions, new builds, brickwork, roofing, plastering, groundworks, kitchens and bathrooms.
- [x] Provide the seven launch areas only: Southampton (SO14–SO19), Eastleigh (SO50, SO53), Fareham (PO14–PO17), Winchester (SO21–SO23), Totton (SO40), Hedge End (SO30) and Romsey (SO51).
- [x] Show search results with filters for the exact services and launch areas; do not add availability or verified-profile filters unsupported by the dataset.
- [x] Provide factual profile pages with business name, summary, services, launch area, and conditional phone/company-website links. Do not add photos, customer reviews, ratings, accreditations, verification badges or contact details unsupported by the source.
- [x] Provide a quote-request form asking the type of work, project location, description, timing, optional budget range and customer contact details. Clearly explain what happens after an enquiry is sent. Until real-data collection is approved, the public demo form must warn users not to enter real personal information, must not transmit or persist submitted values, and must explain that no enquiry is sent to a builder.
- [ ] Provide options to report a profile or review; current reports must be demonstrations only and must not be transmitted or persisted.

## Builder registration and management
- [x] Provide a builder registration and email-verification journey. Until real-data collection and account operation are approved, expose only clearly labelled demo flows; do not send verification emails or retain sign-up values.
- [ ] Let builders create or claim a business profile in the eventual real account journey.
- [ ] Support profile fields for business name, services, locations served, description, photos, website, contact details, opening hours and credentials. Do not publish personal contact information without the builder’s consent.
- [x] Label any credentials “business supplied” until verified by an administrator; never imply an unverified credential is verified.
- [x] Provide a dashboard to update a profile and view/respond to quote enquiries. In this release, the builder dashboard must use only conspicuously labelled sample data and ephemeral demo interactions.

## Reviews, trust and moderation
- [ ] Allow customers to submit reviews only after a declared or completed job in the authorized real-data version.
- [ ] Support business replies, review reporting, moderation and an audit trail in the authorized real-data version.
- [x] Never create fake reviews, ratings, accreditations or verification badges; show an honest empty state until eligible real reviews exist.
- [x] Explain review and moderation rules clearly.
- [x] Clearly label sponsored placements as promotional and distinct from standard listings; no paid placement checkout or payment processing is available.

## Admin tools
- [ ] Provide admin tools for managing customers, builder accounts, profiles, services, locations, enquiries, reviews and reports in the authorized real-data version.
- [ ] Allow administrators to approve, reject, suspend or request changes to profiles and reviews in the authorized real-data version.
- [ ] Keep a record of moderation decisions in the authorized real-data version.
- [x] Provide search, filters and clear status labels. Current admin demonstration actions must be in-memory only and visibly marked as demos.

## Search discoverability
- [x] Use clean, crawlable URLs, including `/builders/southampton/`, `/services/extensions/`, `/services/loft-conversions/`, `/locations/eastleigh/` and the `/builder/:slug/` profile route pattern.
- [x] Add unique titles and meta descriptions, canonical URLs, breadcrumbs, social-sharing metadata and an XML sitemap.
- [x] Avoid thin or duplicate pages for every service/location combination. Index useful service/location pages and researched business profiles; keep synthetic admin examples out of public routes and the sitemap.
- [x] Use structured data only for facts visibly shown on the page. Do not mark up unverified ratings, reviews or credentials.
- [x] Link relevant service, location and builder pages together.

## Design, privacy and technical behavior
- [x] Create an original, trustworthy design for homeowners comparing local building firms; do not copy Checkatrade or MyBuilder branding, wording, logos, page layouts or proprietary features.
- [x] Make the site responsive, accessible and fast on mobile, tablet and desktop.
- [x] Provide clear navigation, readable text, accessible forms, and helpful empty/error states.
- [ ] Secure accounts and enquiry data with input validation, anti-spam protection and appropriate access controls before enabling real accounts or enquiries. Do not accept/store real submissions in the present public demo.
- [ ] Follow UK GDPR principles: collect only necessary information, explain how enquiries are shared, provide privacy/cookie information and support data-deletion requests. In the demo phase, explain that nothing entered is sent or retained.
- [ ] Make searches, profile views and quote requests measurable without unnecessary personal data; keep any current demo measurement local-only and do not transmit personal details.
- [ ] Make the site ready to measure searches, profile views and quote requests without collecting unnecessary personal data.

## Public launch and owner handover
- [x] At the original demo launch, keep sample builder listings clearly labelled and never present them as real businesses; this outcome is superseded by the user-authorized real-directory integration below.
- [x] Do not activate paid subscriptions, complex payments, paid AI asset generation or payment features unless requested later.
- [x] The owner initially said not to publish or connect the domain until explicitly approved; the owner has now explicitly approved publishing and connecting `southamptontraders.co.uk`. Do not interpret that approval as consent to collect real customer data, buy credits, activate paid plans, or enable payment processing.
- [x] Publish the initial site and connect `southamptontraders.co.uk`; later code updates require their own publish, but no DNS changes or unrelated website changes.
- [x] Test the journey search → builder profile → demo quote request → builder dashboard → admin moderation without transmitting or persisting real customer data.
- [x] Check mobile layouts, accessibility basics, form validation, SEO metadata and sitemap behavior.
- [x] Provide a short handover explaining how to change the brand, services, locations, policies and demo listings.

> Real account operation, review submission, durable moderation and custom search/profile/quote event measurement remain intentionally unimplemented pending separate authorization. Basic platform page-visit analytics is enabled and disclosed in the privacy/cookie pages. The initial public launch and custom-domain connection are confirmed; this directory update is tracked below.

> Historical deployment note: publication at `https://sotraders-tr9hvk4y.manus.space` and the custom-domain connection are now confirmed by the WebDev deployment status for `southamptontraders.co.uk` and `www.southamptontraders.co.uk`. No DNS change is part of the current directory update.

## User-requested REDS BUILDERS LIMITED listing
- [x] Create an original MyBuilder-style directory profile for the first entry in the supplied extract categorized exactly “Builders”: REDS BUILDERS LIMITED (not any “Builders Equipment” entry).
- [x] Use only the supplied facts: name REDS BUILDERS LIMITED; category Builders; address Office 6, Racecourse Corner, Southampton, Hampshire, SO32 3QX; phone 023 9269 3337, formatted as a clickable `tel:+442392693337` link.
- [x] Add title `REDS BUILDERS LIMITED – Builder in Southampton` (46 characters), a 147-character meta description with a call-to-action, and a matching H1.
- [x] Show name, category, source address, phone, unspecified service area and unspecified official website in the contact/quick-facts area.
- [x] Provide a two-paragraph factual overview of 179 words; disclose that the supplied details are not independently verified and do not invent specific services, coverage, typical projects, accreditations, insurance, years trading, reviews or ratings.
- [x] List only the source category “Builders”; state individual services and service coverage are unspecified and do not treat the source address postcode as an area served.
- [x] Add `HomeAndConstructionBusiness` JSON-LD with the supplied name, phone and postal address; omit unsupported official URL, `sameAs`, `areaServed`, ratings, reviews and credentials.
- [x] Use brief section/button animations and respect `prefers-reduced-motion`.
- [x] Publish the user-requested factual page on the existing Southampton Traders website and include it in the sitemap; preserve the source/unverified disclosure and do not alter DNS or any unrelated website.

## User-authorized researched directory integration
- [x] Replace the 4 fictional demo profiles on `https://southamptontraders.co.uk` with the businesses in the compiled dataset, remove the “Demo site. Every builder is an example” banner, and wire up the search filters so users can filter by Service and Location and click directly to call (`tel:`) or visit the builder's website.
- [x] Keep to the nine exact service categories and seven launch areas from the research request. Use the 71 CSV records and retain the actual area counts (Southampton 10, Eastleigh 12, Fareham 17, Winchester 7, Totton 9, Hedge End 5, Romsey 11); disclose that each area remains below the 20–50 research aim and the directory is not exhaustive.
- [x] Do not invent contact details, ratings, reviews, accreditations or other claims. Preserve each factual profile summary and its verification evidence. Omit phone or website links when the corresponding CSV value is blank.
- [x] Use the imported profile metadata and add a `HomeAndConstructionBusiness` JSON-LD record to each real business profile using only facts visible in that profile; do not add ratings, reviews, accreditation or credentials.
- [x] Remove demo/example claims associated with the public directory and remove the misleading global banner. Keep the separate REDS BUILDERS LIMITED user-supplied page, and keep quote, builder-area and admin demo flows clearly labelled and non-persistent; no database or DNS changes.
- [x] Update the public route manifest, sitemap, SEO metadata and prerendered profile pages for the real businesses; remove fictional demo-profile URLs from the public route inventory and sitemap.
- [x] Commit the completed code update to `origin/main` and explicitly publish it because auto-publish is off; keep `southamptontraders.co.uk` and other existing DNS records unchanged.

## Current directory release verification
- All 71 profiles have route metadata and JSON-LD; sitemap and route manifest contain the researched profiles and retain the separate REDS page.
- Production-build HTTP checks passed, including conditional contact links and genuine not-found responses. DNS records were not changed.

## Continued business research — 19 November 2026
- [x] Research additional builders in the seven existing launch areas; exclude duplicate businesses and candidates without verified local residential activity or a supported one of the nine exact services.
- [x] Add 17 evidence-backed businesses to the preserved ten-column CSV and retain opened-source verification notes in `data/verification-updates/2026-11-19/`.
- [x] Keep blank contact fields blank, use conditional links, preserve the non-exhaustive coverage disclosure and update the homepage's profile count.
- [x] Regenerate the 88-profile static JSON, sitemap and route manifest; confirm area totals are Southampton 15, Eastleigh 12, Fareham 18, Winchester 10, Totton 10, Hedge End 8 and Romsey 15.
- [x] Run project checks, production build/prerender and route/profile checks; commit and push the update as `d5128218d9e1bf3a11e8d84dbbcf40631f5bd1dc`.
- [x] Explicitly publish the expanded directory after owner confirmation; no database or DNS changes.

## Southampton target expansion — 19–20 November 2026
- [x] Add 41 independently verified Southampton businesses to the ten-column CSV; preserve opened-source notes under `data/verification-updates/2026-11-19/` and keep unverified/failed candidates out.
- [x] Regenerate the code-owned builder data, route manifest and sitemap for 129 total profiles; update the homepage count through the existing data-driven rendering.
- [x] Keep the exact nine service categories, only show contact links for populated source fields, and preserve the non-exhaustive coverage notice.
- [ ] Complete the user's target of 100 verified Southampton profiles. The current source has 56 Southampton profiles, so 44 more remain; the last research workflow stopped with `creditNotEnough`, and unfinished candidates do not count as verified.
- [x] Run typecheck, all 10 tests, production build/prerender and route checks; confirm all 129 profiles have manifest and sitemap entries, prerendered pages and `HomeAndConstructionBusiness` JSON-LD.
- [x] Fetch and integrate current `origin/main`, then save the validated update to canonical `main` as `358aa50ee92d71e15c3547935bba7acbfc286c2c`; publication remains disabled pending an explicit owner request. No database or DNS changes.

## Southampton research continuation — 21 November 2026
- [x] Continue two small candidate-discovery/verification batches within the existing Lite-only research approach; do not purchase credits or treat incomplete/rejected leads as eligible.
- [x] Add five eligible records: Affordable Landscaping & Construction, Pople Roofing Ltd, Sueno Building And Development, Exbury Homes Ltd, and Southampton Kitchen Renovations. Preserve the individual official-source notes under `data/verification-updates/2026-11-21/`.
- [x] Exclude Southampton Roofing Ltd because Companies House shows it dissolved; do not include Southampton Roofers because residential service activity in SO14–SO19 was not adequately established; exclude Classic Home Improvements Ltd - Southampton and First Home Improvements because no allowed service category was evidenced.
- [x] Regenerate the source-derived builder data, route manifest and sitemap. The directory now has 134 total profiles and 61 Southampton profiles; 39 more verified Southampton businesses are needed to reach 100.
- [x] Run TypeScript check, all 10 tests, production build/prerender, and verify that all 134 profiles have route-manifest and sitemap entries, prerendered pages, and `HomeAndConstructionBusiness` JSON-LD.
- [ ] Fetch current `origin/main`, integrate if needed, and checkpoint the validated files to canonical `main`. Do not publish without an explicit owner request and do not change DNS.

## Solent Pro Builders directory placement — 24 November 2026
- [x] Make Solent Pro Builders appear in each of the seven launch areas (Southampton, Eastleigh, Fareham, Winchester, Totton, Hedge End and Romsey) when visitors browse Kitchens & bathrooms or Loft conversions; place it before other matching profiles.
- [x] Identify this owner-selected priority placement transparently in matching results; retain the existing profile, contact details and single profile route without creating duplicates.
- [x] Record source/provenance for the added category and area placement; the user explicitly confirmed loft conversions after the official website was found not to mention that service.

## Search-wide Solent priority clarification — 24 November 2026
- [x] When anyone searches for kitchen, bathroom or loft work, put Solent Pro Builders before other matching companies—not only on a city page after choosing a service filter, but also on the matching service browse pages and free-text directory searches.
- [x] Show the “Sponsored” label wherever this search placement applies; keep the profile factual and singular.

## Sponsored search placements — 24 November 2026
- [x] Label Solent Pro Builders as “Sponsored” and rank it first for matching kitchen/bathroom and loft service browsing and free-text searches across all seven launch areas.
- [x] Keep sponsored placements configurable per business and service so additional sponsors can be added without code changes to ranking logic.
- [x] Explain that sponsored placements are promotional, not endorsements or verification; do not represent paid placement as purchasable and do not collect payments until a separate payment flow is built and authorized.

## Competitor-inspired homeowner shortlist — 24 November 2026
- [x] Let visitors save/unsave builder profiles from search cards and profiles, and show the saved count and a shortlist link in navigation.
- [x] Provide a `/shortlist/` page with saved profile cards, direct supported company contact links, a clear-all control and an empty state.
- [x] Store only known public builder slugs in local browser storage; explain that saved profiles stay in this browser and that no account, visitor contact data, quote submission, review, verification or payment is added.
- [x] Mark `/shortlist/` noindex and include the route in the route manifest without adding personalized content to the sitemap.
- [x] Preserve the existing responsive editorial style; typecheck, test and production-build the route and shortlist logic.

## Browser-only project brief — 24 November 2026
- [x] Provide a `/project-brief/` page that lets a visitor select a listed service and launch area, describe the work, optionally add material preferences and timing, then produce a copy-ready project brief.
- [x] Keep inputs in page memory only; do not ask for names, phone/email, exact addresses or other personal details; do not submit or persist entries. Copy and print must be user-initiated.
- [x] Disclose these limits beside the form and in privacy information; do not represent the brief as a quote request or say it is sent to builders.
- [x] Add useful links from the homepage, site navigation, How it works and shortlist; make the route `noindex`, prerender it and keep it out of the sitemap.

## SEO crawl and snippet cleanup — 24 November 2026
- [x] Keep public directory pages crawlable and preserve the sitemap declaration while adding `Disallow: /api/` for non-content API endpoints.
- [x] Update the How it works meta description to reflect the actual browser-only project brief feature without calling it a live quote or enquiry service.
- [x] Preserve the existing unique route metadata, noindex/private route behavior, sitemap parity and genuine 404 responses; do not add unsupported reviews, ratings, addresses or ranking claims.
- [x] Add useful homeowner content for the requested builder-selection, home-project and quote-comparison search questions; link to it from the homepage and make its public route available in the crawler route list, sitemap and prerendered HTML. Avoid keyword stuffing, unverified cost figures, and claims that directory listings are verified recommendations.

## Owner-supplied project photos — 25 November 2026
- [ ] Replace the homepage's stock-style illustrative hero with the owner-supplied roof-work photo and use an appropriate real project image for social previews.
- [ ] Add the supplied roof tile, roof-framing/rafter, and interior-progress photos to relevant Roofing, Loft conversions and Renovations pages; use all five photos across the homepage and matching service sections.
- [ ] Add descriptive alt text and a visible note that photos were supplied by the site owner and are not attributed to a particular listed business; do not claim an unverified location, contractor or completed project.
- [ ] Remove the old stock-style hero from page and social metadata; do not publish the unrelated Hostinger File Manager screenshots.
