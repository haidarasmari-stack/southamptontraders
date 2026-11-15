# External source notes

## Domain and publishing

- Manus custom domains: https://manus.im/docs/website-builder/custom-domains — Manus' published guide says to specify the custom domain, then configure the DNS records it provides at the registrar; it describes A/CNAME records and automatic SSL/TLS provisioning.
- Manus publishing: https://manus.im/docs/website-builder/publishing — describes completing and checking the application, publishing it, then deployment and custom-domain setup. It lists autoscale hosting as $0 while idle and notes a monthly account credit budget; hosting may consume credits when used.
- Hostinger API overview: https://docs.hostinger.com/api-reference/overview — official REST API is HTTPS at developers.hostinger.com, bearer authentication, JSON request/response, and read-only exploration should be preferred where possible.
- Hostinger hosting endpoint index: https://docs.hostinger.com/api-reference/endpoints/hosting.md — points to the exact website operation documentation.
- Hostinger DNS endpoint index: https://docs.hostinger.com/api-reference/endpoints/dns.md — points to the exact DNS-zone operation documentation. No DNS changes have been made.

## Photo sources and licence notes

- Pexels photo library search: https://www.pexels.com/search/home%20renovation/ — the image results include renovation and home-building stock imagery used only to illustrate fictional demo profiles; they are not evidence of a listing's completed work.
- Pexels licence: https://www.pexels.com/license/ — Pexels states that its photos/videos are free to use and attribution is optional; its restrictions include not implying endorsement, not using imagery as a trade name/trademark, and not redistributing unaltered copies as stock.
- Unsplash licence: https://unsplash.com/license — official licence page for the kitchen image sourced through image search.
- Candidate Pexels photo page inspected: https://www.pexels.com/photo/modern-flat-interior-with-doorway-during-renovation-process-5691533/ — credits Ksenia Chernaya and marks the image free under the Pexels licence. The selected local search images are separately labelled as illustrative demo imagery in the site.

## User-provided scope

The implementation scope came from `/home/ubuntu/upload/pasted_content.txt`. The domain was initially parked at Hostinger (`https://southamptontraders.co.uk`), and the owner later explicitly approved publishing and connecting that exact domain. That approval does not extend to collecting real customer data, paid features, purchases or unrelated DNS changes.


## Current API and hosting details checked 15 November 2026

Hostinger's API overview states that requests use HTTPS at `https://developers.hostinger.com`, paths begin `/api/<product>/<version>/...`, and requests use bearer-token authentication and JSON. The published rate limit is 90 requests per minute; the documentation recommends read-only exploration. Source: https://docs.hostinger.com/api-reference/overview

The Hostinger DNS GET endpoint is `GET /api/dns/v1/zones/{domain}`; `domain` is a required path parameter and the request has no body. It returns an array of records with `name`, `records`, `ttl` and `type`; each nested record has `content` and may have `is_disabled`. Sources: https://docs.hostinger.com/api-reference/endpoints/dns/zone/get-dns-records.md and https://developers.hostinger.com/openapi/openapi.json.

The Hostinger DNS PUT endpoint is `PUT /api/dns/v1/zones/{domain}`. Its JSON body requires `zone`, an array whose entries require `name`, `records` and `type`; each nested record requires `content`; `ttl` is an optional integer. Valid record types include A, AAAA, CNAME, ALIAS, MX, TXT, NS, SOA, SRV and CAA. `overwrite` is an optional boolean whose OpenAPI default is `true`, so it must be stated explicitly. The schema says `overwrite: true` replaces resource records matching the supplied name and type; `false` updates TTL and appends new records. Therefore any later write must target only the required DNS name/type group(s), not supply an incomplete whole zone. The validator is `POST /api/dns/v1/zones/{domain}/validate`, with the same request body and 200-success/422-validation-error responses. Sources: https://docs.hostinger.com/api-reference/endpoints/dns/zone/update-dns-records.md, https://docs.hostinger.com/api-reference/endpoints/dns/zone/validate-dns-records.md and https://developers.hostinger.com/openapi/openapi.json.

The correct account website inspection endpoint is `GET /api/hosting/v1/websites`, with optional `page`, `per_page` (default 25, maximum 100) and `domain` (case-insensitive substring filter) query parameters. A successful response has `data` (website records) and `meta` (`current_page`, `per_page`, `total`). No Hostinger account mutation has been made. Source: https://docs.hostinger.com/api-reference/endpoints/hosting/websites/list-websites.md and https://developers.hostinger.com/openapi/openapi.json.

Manus' custom-domain guide says that after publishing, Manus provides the A or CNAME records to configure at the registrar and automatically provisions SSL/TLS after connection. Source: https://manus.im/docs/website-builder/custom-domains. The publishing guide says to finish and test before publication; default Autoscale charges active request duration and costs $0 while idle, while Reserved hosting can cost about $36/month at full utilization. It states that the monthly $10 account credit budget is shared between hosting and database cloud usage. We are not selecting Reserved hosting. Source: https://manus.im/docs/website-builder/publishing.

Browser verification of the DNS GET endpoint: https://docs.hostinger.com/api-reference/endpoints/dns/zone/get-dns-records — displayed GET `/api/dns/v1/zones/{domain}`, bearer authentication, and the response fields above.

## Final launch evidence and limitations, 15 November 2026

- A read-only `GET https://developers.hostinger.com/api/hosting/v1/websites?domain=southamptontraders.co.uk&per_page=100` returned HTTP 401. Because of the shell's `set -e`, no subsequent DNS zone read was sent. No Hostinger write or DNS validation was performed, and no records were changed. A navigation to `https://hpanel.hostinger.com/` in My Browser timed out before account access; no sign-in or UI operation completed.
- Chrome test with fictional values completed the route `/builders/eastleigh/?service=extensions` (two demo results), the Shoreline demo profile (explicitly “Not a verified profile”), the not-sent quote confirmation, the in-page builder profile preview (contact hidden, credential label “business supplied, not verified”), and the admin approval/audit preview. The form/page actions are client-side demo state. One platform POST to reserved `/__manus__/logs` appeared during the full browser interaction; its body was not inspected. A focused quote-submit check made no non-GET request. The source review found no application form submission or storage calls in the relevant pages.
- `pnpm check` passed, six tests passed, and `pnpm build` passed with 39 prerendered route documents. Existing warnings remain: starter `/api/platform/config.js` script is not bundled and the main JavaScript chunk is about 506 KB.
- The source-level/accessibility review found a skip link, labeled controls, status/live regions, keyboard focus styling, breadcrumbs, mobile navigation and responsive layouts; this was not a full assistive-technology audit.
- A read-only implementation agent confirmed the demo directory/profile/quote/builder/admin/SEO behaviors and noted that live account operations, review-reporting interactions, durable real moderation and privacy-preserving analytics remain outside the currently authorized demo release.
