import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { locations, services } from "../client/src/data/catalog";
import { deliverToOwner, type DeliveryEnv } from "./ownerDelivery";

const serviceSlugs = services.map((service) => service.slug) as [string, ...string[]];
const locationSlugs = locations.map((location) => location.slug) as [string, ...string[]];
const serviceNames = new Map(services.map((service) => [service.slug, service.name]));
const locationNames = new Map(locations.map((location) => [location.slug, location.name]));
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 3;
const recentSubmissions = new Map<string, { count: number; resetAt: number }>();

export const builderApplicationInput = z.object({
  businessName: z.string().trim().min(2).max(120),
  contactName: z.string().trim().min(2).max(100),
  contactEmail: z.string().trim().email().max(254).transform((value) => value.toLowerCase()),
  contactPhone: z.string().trim().max(40).optional().transform((value) => value || undefined),
  websiteUrl: z.preprocess(
    (value) => typeof value === "string" && value.trim() === "" ? undefined : value,
    z.string().trim().url().max(300).optional(),
  ),
  description: z.string().trim().min(20).max(1000),
  serviceSlugs: z.array(z.enum(serviceSlugs)).min(1).max(services.length),
  locationSlugs: z.array(z.enum(locationSlugs)).min(1).max(locations.length),
  consent: z.literal(true),
  honeypot: z.string().max(300).optional(),
});

function allowSubmission(ip: string, now = Date.now()): boolean {
  for (const [key, value] of recentSubmissions) {
    if (value.resetAt <= now) recentSubmissions.delete(key);
  }
  const current = recentSubmissions.get(ip);
  if (current && current.resetAt > now) {
    if (current.count >= RATE_LIMIT_MAX_REQUESTS) return false;
    current.count += 1;
  } else {
    recentSubmissions.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
  }
  if (recentSubmissions.size > 5000) {
    const oldestKey = recentSubmissions.keys().next().value;
    if (oldestKey) recentSubmissions.delete(oldestKey);
  }
  return true;
}

export async function submitBuilderApplication(value: unknown, ip: string, env?: DeliveryEnv) {
  const parsed = builderApplicationInput.safeParse(value);
  if (!parsed.success) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "Check the required fields and try again." });
  }
  const input = parsed.data;

  // Quietly discard obvious bot submissions without confirming the honeypot to the caller.
  if (input.honeypot?.trim()) return { success: true } as const;

  if (!allowSubmission(ip || "unknown")) {
    throw new TRPCError({
      code: "TOO_MANY_REQUESTS",
      message: "Too many requests from this connection. Please wait before trying again.",
    });
  }

  const content = [
    "A builder or company has asked to be considered for the Southampton Traders directory.",
    "This request is for manual review only; it must not be treated as verification or automatic approval.",
    "",
    `Business: ${input.businessName}`,
    `Contact name: ${input.contactName}`,
    `Reply email: ${input.contactEmail}`,
    `Phone (provided for review): ${input.contactPhone || "Not provided"}`,
    `Website: ${input.websiteUrl || "Not provided"}`,
    `Services requested: ${input.serviceSlugs.map((slug) => serviceNames.get(slug) ?? slug).join(", ")}`,
    `Areas served: ${input.locationSlugs.map((slug) => locationNames.get(slug) ?? slug).join(", ")}`,
    "",
    "Business description:",
    input.description,
    "",
    "The applicant confirmed they are authorized to submit these details and agree to be contacted about this listing request.",
  ].join("\n");

  const delivered = await deliverToOwner({
    title: `Builder listing request: ${input.businessName}`,
    content,
    replyTo: input.contactEmail,
  }, env);
  if (!delivered) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "The request could not be delivered. Please try again later.",
    });
  }
  return { success: true } as const;
}
