import { describe, expect, it } from "vitest";
import { metaForPath } from "../client/src/lib/seo";

const guides = ["/guides/planning-permission/", "/guides/party-wall-agreements/"];

describe("planning and party wall guides", () => {
  it.each(guides)("%s is an indexable article with sized metadata", (route) => {
    const meta = metaForPath(route);
    expect(meta.noindex).toBeFalsy();
    expect(meta.ogType).toBe("article");
    expect(meta.path).toBe(route);
    expect(meta.title.length).toBeLessThanOrEqual(60);
    expect(meta.description.length).toBeGreaterThan(70);
    expect(meta.description.length).toBeLessThanOrEqual(160);
  });
});
