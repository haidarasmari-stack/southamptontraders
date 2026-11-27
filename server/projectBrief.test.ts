import { describe, expect, it } from "vitest";
import { buildProjectBrief } from "../client/src/lib/projectBrief";
import { metaForPath } from "../client/src/lib/seo";

describe("browser-only project brief", () => {
  it("keeps the personalized tool out of search indexes", () => {
    expect(metaForPath("/project-brief/")).toMatchObject({ path: "/project-brief/", noindex: true });
  });

  it("formats project details and explains that no enquiry was sent", () => {
    const brief = buildProjectBrief({
      service: "Kitchen & bathroom",
      area: "Southampton",
      scope: "Replace the kitchen units.\nKeep the current layout.",
      materials: "Low-maintenance worktops",
      timing: "Within 1–3 months",
    });

    expect(brief).toContain("Service: Kitchen & bathroom");
    expect(brief).toContain("Area: Southampton");
    expect(brief).toContain("Replace the kitchen units.\nKeep the current layout.");
    expect(brief).toContain("Materials or preferences:\nLow-maintenance worktops");
    expect(brief).toContain("Timing: Within 1–3 months");
    expect(brief).toContain("has not submitted or sent an enquiry");
  });

  it("handles empty optional details without producing undefined text", () => {
    const brief = buildProjectBrief({ service: "", area: "", scope: "", materials: "", timing: "" });
    expect(brief).toContain("Service: Not specified");
    expect(brief).toContain("Area: Not specified");
    expect(brief).toContain("Materials or preferences:\nNot specified");
    expect(brief).not.toContain("undefined");
  });
});
