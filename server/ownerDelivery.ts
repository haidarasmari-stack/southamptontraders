import { notifyOwner, type NotificationPayload } from "./_core/notification";

/** Environment values that decide where owner notifications go. */
export type DeliveryEnv = {
  RESEND_API_KEY?: string;
  OWNER_EMAIL?: string;
  NOTIFY_FROM?: string;
};

export type OwnerMessage = NotificationPayload & { replyTo?: string };

const DEFAULT_FROM = "Southampton Traders <onboarding@resend.dev>";

/**
 * Emails the site owner through Resend (https://resend.com). Works on any host,
 * including Cloudflare Workers, because it only needs `fetch`.
 * Returns false when Resend rejects or cannot be reached.
 */
export async function emailOwner(message: OwnerMessage, env: DeliveryEnv): Promise<boolean> {
  if (!env.RESEND_API_KEY || !env.OWNER_EMAIL) return false;
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${env.RESEND_API_KEY}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: env.NOTIFY_FROM || DEFAULT_FROM,
        to: env.OWNER_EMAIL.split(",").map((address) => address.trim()).filter(Boolean),
        subject: message.title,
        text: message.content,
        ...(message.replyTo ? { reply_to: message.replyTo } : {}),
      }),
    });
    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn(`[Owner email] Resend rejected the message (${response.status})${detail ? `: ${detail}` : ""}`);
      return false;
    }
    return true;
  } catch (error) {
    console.warn("[Owner email] Could not reach Resend:", error instanceof Error ? error.message : error);
    return false;
  }
}

/**
 * Sends an owner notification by email when Resend is configured, otherwise
 * through the Manus notification service (the original behaviour).
 */
export async function deliverToOwner(message: OwnerMessage, env: DeliveryEnv = readProcessEnv()): Promise<boolean> {
  if (env.RESEND_API_KEY) return emailOwner(message, env);
  return notifyOwner({ title: message.title, content: message.content });
}

function readProcessEnv(): DeliveryEnv {
  const source = typeof process !== "undefined" ? process.env : {};
  return { RESEND_API_KEY: source.RESEND_API_KEY, OWNER_EMAIL: source.OWNER_EMAIL, NOTIFY_FROM: source.NOTIFY_FROM };
}
