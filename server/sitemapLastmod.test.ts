import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
// @ts-expect-error plain ESM build script without type declarations
import { contentSourcesForPath, createLastModLookup, GUIDE_PAGES } from "../scripts/sitemap-lastmod.mjs";
import { builders, getServiceAreaPages, locations, services } from "../client/src/data/catalog";
import { metaForPath } from "../client/src/lib/seo";

const root = path.resolve(import.meta.dirname, "..");

const indexablePaths = [
  "/", "/how-it-works/", "/homeowner-guides/", "/builder/reds-builders-limited/",
  ...Object.keys(GUIDE_PAGES).map((guide) => `${guide}/`),
  ...locations.map((location) => `/locations/${location.slug}/`),
  ...services.map((service) => `/services/${service.slug}/`),
  ...getServiceAreaPages().map((page) => page.path),
  ...builders.map((builder) => `/builder/${builder.slug}/`),
].filter((route) => !metaForPath(route).noindex);

describe("sitemap lastmod sources", () => {
  it("knows the content sources of every indexable page, and every source file exists", () => {
    for (const route of indexablePaths) {
      const sources: string[] = contentSourcesForPath(route);
      expect(sources.length, route).toBeGreaterThan(0);
      for (const source of sources) expect(fs.existsSync(path.join(root, source)), source).toBe(true);
    }
  });

  it("has a GUIDE_PAGES entry for every guide route in the app", () => {
    const app = fs.readFileSync(path.join(root, "client/src/App.tsx"), "utf8");
    const guideRoutes = [...app.matchAll(/path="(\/guides\/[^"]+?)\/?"/g)].map((match) => match[1]);
    expect(guideRoutes.length).toBeGreaterThan(0);
    expect(guideRoutes.sort()).toEqual(Object.keys(GUIDE_PAGES).sort());
  });

  it("returns a YYYY-MM-DD date or nothing, never a guess", () => {
    const lookup = createLastModLookup(root);
    const value = lookup("/guides/loft-conversion/");
    expect(value === undefined || /^\d{4}-\d{2}-\d{2}$/.test(value)).toBe(true);
    expect(lookup("/unknown-page/")).toBeUndefined();
    expect(createLastModLookup("/nonexistent-directory")("/")).toBeUndefined();
  });
});
