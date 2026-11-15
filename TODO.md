# Southampton Traders MVP — outcome checklist

## Customer discovery and directory
- [x] Build a homepage with a prominent search: “What building work do you need?” and “Where?”
- [x] Let customers browse builders by service and location.
- [x] Provide initial service categories: extensions, renovations, loft conversions, new builds, brickwork, roofing, plastering, groundworks, kitchens and bathrooms.
- [x] Provide initial locations: Southampton, Eastleigh, Fareham, Winchester, Totton, Hedge End, Romsey and nearby Hampshire towns.
- [x] Show search results with filters for service, location, availability and verified-profile status.
- [x] Provide builder profile pages with business description, services, service area, photos, contact/enquiry button and customer reviews. All sample builders must be visibly labelled as demo examples; do not invent reviews, ratings, accreditations, verification badges or business contact data.
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
- [x] Clearly label sponsored placements if introduced later; do not introduce sponsored placements in this MVP.

## Admin tools
- [ ] Provide admin tools for managing customers, builder accounts, profiles, services, locations, enquiries, reviews and reports in the authorized real-data version.
- [ ] Allow administrators to approve, reject, suspend or request changes to profiles and reviews in the authorized real-data version.
- [ ] Keep a record of moderation decisions in the authorized real-data version.
- [x] Provide search, filters and clear status labels. Current admin demonstration actions must be in-memory only and visibly marked as demos.

## Search discoverability
- [x] Use clean, crawlable URLs, including `/builders/southampton/`, `/services/extensions/`, `/services/loft-conversions/`, `/locations/eastleigh/` and `/builder/example-company/` patterns.
- [x] Add unique titles and meta descriptions, canonical URLs, breadcrumbs, social-sharing metadata and an XML sitemap.
- [x] Avoid thin or duplicate pages for every service/location combination. Only index pages with genuinely useful, distinct listings or content; keep demo-builder pages out of the sitemap/search index until they contain real, approved listings.
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
- [x] Keep all example builder listings clearly labelled as demos and never present sample listings as real businesses.
- [x] Do not activate paid subscriptions, complex payments, paid AI asset generation or payment features unless requested later.
- [x] The owner initially said not to publish or connect the domain until explicitly approved; the owner has now explicitly approved publishing and connecting `southamptontraders.co.uk`. Do not interpret that approval as consent to collect real customer data, buy credits, activate paid plans, or enable payment processing.
- [ ] Publish the completed public demo and connect only `southamptontraders.co.uk`; preserve unrelated websites and DNS records.
- [x] Test the journey search → builder profile → demo quote request → builder dashboard → admin moderation without transmitting or persisting real customer data.
- [x] Check mobile layouts, accessibility basics, form validation, SEO metadata and sitemap behavior.
- [x] Provide a short handover explaining how to change the brand, services, locations, policies and demo listings.

> Real account operation, review submission, durable moderation and custom search/profile/quote event measurement remain intentionally unimplemented pending separate authorization. Basic platform page-visit analytics is enabled and disclosed in the privacy/cookie pages. The launch item remains open until publication and custom-domain connection are each confirmed.
