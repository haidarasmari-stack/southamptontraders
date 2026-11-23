# Hampshire directory expansion — 23 November 2026

Added **34 source-verified residential builders and construction tradespeople** to the maintained CSV across Eastleigh, Fareham, Winchester, Totton, Hedge End and Romsey. The CSV still has the exact required ten columns. Individual evidence notes are in `profiles/`, one per imported business. The source comparison resolving the Winchester identity and the Romsey assignment is recorded in [`source-conflict-resolution.md`](source-conflict-resolution.md).

## Area counts

- **Eastleigh:** 8 added; 20 total.
- **Fareham:** 2 added; 20 total.
- **Winchester:** 9 added; 19 total.
- **Totton:** 4 added; 14 total.
- **Hedge End:** 6 added; 14 total.
- **Romsey:** 5 added; 20 total.
- **Southampton:** unchanged at 62.

The research target was 20–50 verified businesses per area where evidence permits. Totton, Hedge End and Winchester remain below 20; the targeted sweeps did not produce enough additional candidates meeting all inclusion rules. No area was padded.

## Added listings

- Purchase Construction (Eastleigh)
- The Roofer Company (Eastleigh)
- BCF Plastering (Eastleigh)
- Dorrington Groundworks (Eastleigh)
- Construction Property Maintenance Services Limited (CPMS) (Fareham)
- Kahl Construction Ltd (Fareham)
- TW Builders (Winchester)
- Richard Saunders Building Ltd (Eastleigh)
- TMA Building Services Limited (Eastleigh)
- AJN Building Services (Eastleigh)
- Medway Building Services (Eastleigh)
- LEX Projects Limited (Winchester)
- Simply Building (Winchester)
- SO22 (Winchester)
- MJT Building and Decorating Ltd (Winchester)
- MS Projects Limited (Winchester)
- Penco Builders Ltd (Totton)
- CCCarpentry & Building LTD (Totton)
- Armada Contracting Group Limited (Totton)
- Hampshire Living Group (Hedge End)
- Shape Create & Build Ltd (Winchester)
- M.A.K Carpentry & Building (Hedge End)
- RLH Roofing (Hedge End)
- SW Brickwork (Romsey)
- Stoner Home Improvements (Romsey)
- Third Generation Construction (Romsey)
- DA Groundworks & Construction Ltd (Romsey)
- Paul’s Property Services Ltd (Totton)
- JRBS Southern Ltd (Hedge End)
- Blydan Projects (Hedge End)
- Walkley Lofts (Hedge End)
- Olivia Jenson Construction (Romsey)
- Matthew Younger - Winchester Builder (Winchester)
- Winchester Builders (Gordon Backhouse) (Winchester)

## Verification and exclusions

Listings were included only where the reviewed official business pages and/or Federation of Master Builders evidence supported active residential work, a relevant launch-area connection, and the stated services. Phone numbers and postal details not established in the sources remain blank. URLs are direct HTTPS company sites. Ratings, reviews and unverified credentials were not used as ranking claims. Categories use only the site's nine approved service labels. Titles are no longer than 60 characters, descriptions are 140–155 characters, and summaries are 120–150 words under the importer’s word-count rule.

- Winchester Builders (Gordon Backhouse) is listed separately from Winchester Builders & Decorators Ltd: the official sites show distinct business/contact identities, phone numbers and business email addresses. See the conflict-resolution note.
- Olivia Jenson Construction is assigned once to Romsey based on its official Romsey service page, not duplicated in Totton.
- Eastleigh Industrial Roofing was excluded because the reviewed offering was commercial-only. Craddock was excluded because the local evidence depended on a third-party directory rather than an accepted first-party or official source. HBL Builders & Contractors Ltd was excluded because its HTTPS certificate could not be validated in the checked endpoints. Duplicate aliases and businesses already in the CSV were not re-added.

## Integration

The maintained source is `data/southampton-traders-builders.csv`. The import step regenerates `client/src/data/builders.json`, `client/public/manus-routes.json` and `client/public/sitemap.xml`. The target total after import is 169 profiles.
