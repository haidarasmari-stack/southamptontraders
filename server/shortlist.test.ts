import { describe, expect, it } from "vitest";
import { builders } from "../client/src/data/catalog";
import { normalizeShortlist, toggleShortlistSlug } from "../client/src/contexts/ShortlistContext";
import { metaForPath } from "../client/src/lib/seo";

describe("browser-local builder shortlist", () => {
  const knownSlug = builders[0]!.slug;

  it("keeps personalized shortlist pages out of search indexes", () => {
    expect(metaForPath("/shortlist/")).toMatchObject({ path: "/shortlist/", noindex: true });
  });

  it("keeps only known unique builder slugs from stored values", () => {
    expect(normalizeShortlist([knownSlug, "not-a-builder", knownSlug, 12, null])).toEqual([knownSlug]);
    expect(normalizeShortlist("not-an-array")).toEqual([]);
  });

  it("adds and removes a known builder without allowing unknown records", () => {
    expect(toggleShortlistSlug([], knownSlug)).toEqual([knownSlug]);
    expect(toggleShortlistSlug([knownSlug], knownSlug)).toEqual([]);
    expect(toggleShortlistSlug([], "not-a-builder")).toEqual([]);
  });
});
