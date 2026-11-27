# Deploying southamptontraders.co.uk

The site is prerendered to static HTML (`pnpm build` writes `dist/public/`).
The only server code a visitor reaches is the builder listing form
(`POST /api/builder-application`). Login, database, maps and the other Manus
template features are not used by any live page.

## Cloudflare Workers (recommended host)

`wrangler.jsonc` serves `dist/public` as static files and runs `worker/index.ts`
only for `/api/builder-application` and `/api/health`.

Cloudflare build settings (Workers & Pages > Create > Import a repository):

| Setting | Value |
| --- | --- |
| Build command | `pnpm build` |
| Deploy command | `npx wrangler deploy` |
| Root directory | `/` |
| Production branch | `main` |

Node 22 is pinned in `.node-version`; pnpm comes from `packageManager`.

### Form emails

Listing requests are emailed with [Resend](https://resend.com). Add these in the
Worker's Settings > Variables and Secrets:

| Name | Type | Value |
| --- | --- | --- |
| `RESEND_API_KEY` | Secret | API key from Resend |
| `OWNER_EMAIL` | Text | Address that receives requests (comma-separate several) |
| `NOTIFY_FROM` | Text, optional | Sender. Defaults to `onboarding@resend.dev`, which Resend only delivers to the Resend account's own email. Verify the domain in Resend to send from e.g. `listings@southamptontraders.co.uk`. |

Without `RESEND_API_KEY` the form falls back to the Manus notification service,
so it keeps working on Manus and shows a "could not be delivered" error elsewhere.

### Local checks

```
pnpm build
pnpm exec wrangler dev      # http://localhost:8787
```

## Images

Photos under `/manus-storage/` were hosted by Manus, outside this repository.
Files placed in `client/public/manus-storage/` with the same names are served
at the same URLs on any host. `hero-renovation_853be6f1.webp` is included.
These five are still needed before the move:

- `IMG_6247_597a3dba.webp` (home page photo and social share image)
- `IMG_6093_5457ae68.webp`
- `IMG_6156_ff18d1e5.webp`
- `IMG_6867_a5bd0603.webp`
- `IMG_6868_9290dbcf.webp`

## Other hosts

The Express server (`pnpm build && pnpm start`, or the `Dockerfile`) still works
on any Node host such as Render or Railway, using `RESEND_API_KEY` and
`OWNER_EMAIL` the same way.
