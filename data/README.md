# Southampton Traders directory source data

`southampton-traders-builders.csv` is the maintained source file for the directory and retains the requested ten-column schema. `southampton-traders-builders-verification-sources.md` preserves the original record-by-record verification evidence. The 17 additional profiles researched on 19 November 2026 have their opened-source evidence preserved in `verification-updates/2026-11-19/`. The website must not infer facts absent from these files.

Run `python3 scripts/import_builders.py` from the repository root after an authorized CSV update. It validates the exact service and location vocabulary, unique names/slugs, HTTPS company-site links, SEO description lengths and profile-summary lengths, then regenerates `client/src/data/builders.json`, `client/public/manus-routes.json` and `client/public/sitemap.xml`.

The importer leaves the raw CSV values unchanged and derives truthful website titles from the full business names and profile facts. Contact links appear only when the corresponding CSV field is populated. Do not invent ratings, reviews, accreditations, credentials, availability or contact details.

Current coverage is Southampton 15, Eastleigh 12, Fareham 18, Winchester 10, Totton 10, Hedge End 8 and Romsey 15, for 88 records total. Each area remains below the 20–50 per-area research aim, so public copy must describe the directory as a current, non-exhaustive set. Four current records have no verified phone; three have no verified company website.
