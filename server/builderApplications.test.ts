import { afterEach, describe, expect, it, vi } from "vitest";
import { submitBuilderApplication } from "./builderApplications";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

const baseInput = {
  businessName: "Example Building Ltd",
  contactName: "Alex Example",
  contactEmail: "Alex@Example.test",
  contactPhone: "023 8000 0000",
  websiteUrl: "https://example.test",
  description: "We carry out residential building and renovation work across the area.",
  serviceSlugs: ["extensions", "loft-conversions"],
  locationSlugs: ["southampton", "eastleigh"],
  consent: true,
  honeypot: "",
};

describe("builder listing requests", () => {
  it("sends business details to the project owner and returns only after acceptance", async () => {
    vi.stubEnv("MANUS_API_URL", "https://api.example.test");
    vi.stubEnv("MANUS_API_KEY", "server-test-key");
    const send = vi.fn().mockResolvedValue(new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", send);

    await expect(submitBuilderApplication(baseInput, "198.51.100.21")).resolves.toEqual({ success: true });
    expect(send).toHaveBeenCalledOnce();
    const [url, init] = send.mock.calls[0];
    expect(url).toContain("WebDevService/SendNotification");
    expect(JSON.parse(init.body)).toMatchObject({
      title: "Builder listing request: Example Building Ltd",
      content: expect.stringContaining("Reply email: alex@example.test"),
    });
    expect(JSON.parse(init.body).content).toContain("Areas served: Southampton, Eastleigh");
    expect(JSON.parse(init.body).content).toContain("manual review only");
  });

  it("rejects unsupported services and missing consent before sending", async () => {
    const send = vi.fn();
    vi.stubGlobal("fetch", send);

    await expect(submitBuilderApplication({ ...baseInput, serviceSlugs: ["not-a-service"] }, "198.51.100.22"))
      .rejects.toMatchObject({ code: "BAD_REQUEST" });
    await expect(submitBuilderApplication({ ...baseInput, consent: false }, "198.51.100.23"))
      .rejects.toMatchObject({ code: "BAD_REQUEST" });
    expect(send).not.toHaveBeenCalled();
  });

  it("silently discards honeypot submissions", async () => {
    const send = vi.fn();
    vi.stubGlobal("fetch", send);
    await expect(submitBuilderApplication({ ...baseInput, honeypot: "https://bot.example" }, "198.51.100.24"))
      .resolves.toEqual({ success: true });
    expect(send).not.toHaveBeenCalled();
  });

  it("limits repeated submissions from one connection", async () => {
    vi.stubEnv("MANUS_API_URL", "https://api.example.test");
    vi.stubEnv("MANUS_API_KEY", "server-test-key");
    const send = vi.fn().mockResolvedValue(new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", send);

    for (let count = 0; count < 3; count += 1) {
      await submitBuilderApplication(baseInput, "198.51.100.25");
    }
    await expect(submitBuilderApplication(baseInput, "198.51.100.25")).rejects.toMatchObject({ code: "TOO_MANY_REQUESTS" });
    expect(send).toHaveBeenCalledTimes(3);
  });

  it("does not report delivery when the owner-notification service rejects the request", async () => {
    vi.stubEnv("MANUS_API_URL", "https://api.example.test");
    vi.stubEnv("MANUS_API_KEY", "server-test-key");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("Unavailable", { status: 503 })));

    await expect(submitBuilderApplication(baseInput, "198.51.100.26")).rejects.toMatchObject({
      code: "INTERNAL_SERVER_ERROR",
      message: "The request could not be delivered. Please try again later.",
    });
  });
});
