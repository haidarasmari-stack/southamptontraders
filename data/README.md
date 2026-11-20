# Southampton Traders directory source data

`data/southampton-traders-builders.csv` is the maintained source for the directory and retains the requested ten-column schema. It contains the original 71 records, 17 additions from the 19 November research, and 41 verified Southampton additions from the current expansion. Opened-source notes for the additions are preserved in `verification-updates/2026-11-19/`. The website must not infer facts absent from these files.

Run `python3 scripts/import_builders.py` from the repository root after an authorized CSV update. It validates the exact service and location vocabulary, unique names/slugs, HTTPS company-site links, SEO-description lengths and profile-summary lengths, then regenerates `client/src/data/builders.json`, `client/public/manus-routes.json` and `client/public/sitemap.xml`.

The importer leaves raw CSV values unchanged and derives truthful website titles from the full business names and profile facts. Contact links appear only when the corresponding CSV field is populated. Do not invent ratings, reviews, accreditations, credentials, availability or contact details.

Current source coverage is 129 records: Southampton 56, Eastleigh 12, Fareham 18, Winchester 10, Totton 10, Hedge End 8 and Romsey 15. Southampton remains non-exhaustive and is 44 verified profiles short of the user's current target of 100. The other six areas remain below the original 20–50-per-area research aim. Five records currently have no verified phone and three have no verified direct company website; leave those values blank.
