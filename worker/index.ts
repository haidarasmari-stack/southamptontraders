/**
 * Cloudflare Worker for southamptontraders.co.uk.
 *
 * The site itself is prerendered static HTML in dist/public, served by
 * Cloudflare's static assets. This Worker only answers the few /api/ routes
 * that need code; every other request goes straight to the static files.
 */
import { TRPCError } from "@trpc/server";
import { submitBuilderApplication } from "../server/builderApplications";
import type { DeliveryEnv } from "../server/ownerDelivery";

type Env = DeliveryEnv & {
  ASSETS: { fetch(request: Request): Promise<Response> };
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/health") return json({ status: "ok" });

    if (url.pathname === "/api/builder-application") {
      if (request.method !== "POST") return json({ message: "Method not allowed." }, 405);
      const ip = request.headers.get("cf-connecting-ip") || "unknown";
      try {
        const body = await request.json().catch(() => null);
        return json(await submitBuilderApplication(body, ip, env));
      } catch (error) {
        if (error instanceof TRPCError) {
          const status = error.code === "BAD_REQUEST" ? 400 : error.code === "TOO_MANY_REQUESTS" ? 429 : 503;
          return json({ message: error.message }, status);
        }
        console.error("[Builder application] Request delivery failed.", error instanceof Error ? error.message : "Unknown error");
        return json({ message: "The request could not be delivered. Please try again later." }, 503);
      }
    }

    return env.ASSETS.fetch(request);
  },
};
