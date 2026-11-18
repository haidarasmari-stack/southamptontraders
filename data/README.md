# Southampton Traders directory source data

`southampton-traders-builders.csv` is the unchanged source file supplied for the directory integration and retains the requested ten-column schema. `southampton-traders-builders-verification-sources.md` preserves the record-by-record verification evidence and source URLs. The website must not infer facts that are absent from those files.

Run `python3 scripts/import_builders.py` from the repository root after an authorized CSV update. It validates the exact service and location vocabulary, unique names/slugs, HTTPS company-site links, SEO description lengths and profile-summary lengths, then regenerates `client/src/data/builders.json`, `client/public/manus-routes.json` and `client/public/sitemap.xml`.

The source CSV contains abbreviated SEO title candidates that do not start with the full `Business_Name` for 65 of its 71 records. The importer leaves the raw CSV untouched and derives a truthful website title from the full business name, primary service and location, falling back to a shorter accurate title to respect the 60-character limit. The full `Business_Name`, source summary, service/location facts, contact values and SEO description are preserved. Three records have no verified phone and three have no verified direct website; the UI omits those respective links.

Current coverage is Southampton 10, Eastleigh 12, Fareham 17, Winchester 7, Totton 9, Hedge End 5 and Romsey 11. Each count is below the 20–50 per-area research aim, so public copy must describe the directory as a current, non-exhaustive set.
