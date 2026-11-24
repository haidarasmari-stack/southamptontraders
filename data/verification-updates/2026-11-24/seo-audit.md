# Southampton Traders search discoverability audit

**Date:** 24 November 2026

## Findings

The site already has a strong technical SEO baseline. Raw crawler-style requests returned prerendered HTML and route-specific metadata for the homepage, Southampton listing, loft-conversion service page, Solent Pro Builders profile, and browser-only project-brief page. A fabricated route returned a real HTTP 404 with `noindex`. The project-brief route is also `noindex` and excluded from the sitemap.

The production build generated 205 route documents, of which 188 are indexable. Those 188 pages have unique titles, descriptions, and H1s; all passed the current length checks, include canonicals, and match the 188 sitemap URLs exactly. No metadata duplication, sitemap gap, soft-404, or missing initial HTML issue was found.

## Changes made

Added `Disallow: /api/` to `robots.txt` while retaining public-page crawling and the sitemap declaration. This is a crawler-traffic directive, not a security barrier or a way to prevent indexing; private data must remain protected by application access controls [4].

Updated the How it works description to reflect the real browser-only project brief and demo-only enquiries. The wording does not suggest that brief details are submitted or that builders send quotes.

## Safeguards and remaining opportunity

No ratings, reviews, postal addresses, verification claims, or rankings were added. Some business profile data supplies only a locality or postcode. Google requires a `PostalAddress` for LocalBusiness rich-result eligibility, so address components should not be invented to pursue that feature [2]. The site has no visible genuine review corpus, so review markup would be inappropriate [3].

Google recommends useful, distinct page content, accurate titles and concise descriptions, and crawlable links [1]. The six non-Southampton location pages could benefit from original, locally specific content when it can be supported by reliable local information; adding repeated keyword text was not justified by this audit.

## Validation

`pnpm check` passed. `pnpm test` passed all 23 tests. `pnpm build` succeeded and prerendered 205 route documents. A production-output audit confirmed 188 indexable pages, exact sitemap parity, unique titles/descriptions/H1s, and the intended robots and How it works metadata. Live rechecking is to follow the auto-publication checkpoint.

## References

[1]: https://developers.google.com/search/docs/fundamentals/seo-starter-guide "Google Search Central SEO Starter Guide"
[2]: https://developers.google.com/search/docs/appearance/structured-data/local-business "Google Local Business structured data"
[3]: https://developers.google.com/search/docs/appearance/structured-data/review-snippet "Google Review snippet structured data"
[4]: https://developers.google.com/search/docs/crawling-indexing/robots/intro "Google Introduction to robots.txt"
