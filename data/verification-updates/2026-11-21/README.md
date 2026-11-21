# Southampton verification update — 21 November 2026

Two small Lite research batches discovered nine candidate leads and independently checked them against the current directory, official business sources and (where available) Companies House. Five passed the directory's evidence rules and were imported; four were not imported. No extra credits were purchased.

## Added

The first batch notes are in `southampton-target-100/`:

- `002.md` — Affordable Landscaping & Construction. Its official pages explicitly describe residential building in Southampton and home extensions, and publish current contact details. No street address or postcode was verified, so none is supplied.
- `004.md` — Pople Roofing Ltd. Companies House identifies the company as active. Its official Southampton page explicitly supports residential roofing in Southampton. Its registered office is in SO50; the listing is based on documented Southampton service activity, not an assertion that it is based within SO14–SO19.

The second batch notes are in `southampton-target-100-batch2/`:

- `001.md` — Sueno Building And Development. Its official site identifies a Southampton base and explicitly describes residential property extensions there.
- `002.md` — Exbury Homes Ltd. Companies House confirms active status; its official Southampton page supports house extensions and new builds for Southampton residential clients. Its published office address is in Fareham, outside SO14–SO19.
- `004.md` — Southampton Kitchen Renovations, operated by Goodwin Global Solutions Ltd. Companies House confirms active status, and the official site supports domestic kitchen work and contact postcode SO15 2WL. Only kitchen work is claimed; no bathroom service is asserted.

Each eligible record has an evidence note with CSV-ready JSON, source URLs and required field-length checks.

## Not added

- Southampton Roofing Ltd was excluded because Companies House shows the matching company as dissolved.
- Southampton Roofers (identified on its site as FP Roofing) was not added because reviewed sources did not establish residential service activity in SO14–SO19; its stated business location is SO30.
- Classic Home Improvements Ltd - Southampton and First Home Improvements were excluded because their reviewed offerings did not explicitly match an allowed directory service category.

## Targeted follow-up batch

Seven source paths produced ten candidate leads. One new profile passed all eligibility checks and was added: CPB Building Contractors Ltd (`southampton-target-100-batch3/001-cpb-building-contractors-ltd.md`). S E Barrett & Son Building Contractors and George Henry Builders had supporting evidence but already existed in the CSV, so neither was duplicated. The remaining candidates were excluded for insufficient Southampton-local evidence, dissolved or uncertain legal/trading identity, or missing explicit service support. The first attempt produced Beechen Building Contractors Ltd, which was not added because its SO32 office and generic Southampton coverage did not establish activity within SO14–SO19.

The directory now contains 135 profiles overall, including 62 Southampton profiles. The 100-profile Southampton target remains incomplete by 38; rejected, unverified and duplicate candidates do not count. No DNS changes were made. The project auto-publish setting is enabled for canonical checkpoints; no separate manual publication was submitted.
