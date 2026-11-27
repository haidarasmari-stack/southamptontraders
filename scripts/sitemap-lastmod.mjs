import { execFileSync } from "node:child_process";

const CATALOG = ["client/src/data/builders.json", "client/src/data/listing-placement-overrides.json", "client/src/data/catalog.ts"];
const GUIDE_LAYOUT = "client/src/components/GuideArticleLayout.tsx";
/** Add new guides here; a test fails if an indexable guide has no entry. */
export const GUIDE_PAGES = {
  "/guides/home-extension-planning": "client/src/pages/HomeExtensionGuide.tsx",
  "/guides/loft-conversion": "client/src/pages/LoftConversionGuide.tsx",
  "/guides/checking-a-builder": "client/src/pages/CheckingABuilderGuide.tsx",
  "/guides/planning-permission": "client/src/pages/PlanningPermissionGuide.tsx",
  "/guides/party-wall-agreements": "client/src/pages/PartyWallGuide.tsx",
};

/** Source files whose changes alter the main content of a sitemap path. Shared header/footer files are left out on purpose. */
export function contentSourcesForPath(sitemapPath) {
  const path = sitemapPath.replace(/\/$/, "") || "/";
  if (path === "/") return ["client/src/pages/Home.tsx", ...CATALOG];
  if (path === "/homeowner-guides") return ["client/src/pages/HomeownerGuides.tsx"];
  if (path === "/how-it-works") return ["client/src/pages/ContentPages.tsx", ...CATALOG];
  if (path === "/builder/reds-builders-limited") return ["client/src/pages/BusinessListing.tsx"];
  if (path.startsWith("/builder/")) return ["client/src/pages/BuilderProfile.tsx", ...CATALOG];
  if (/^\/services\/[^/]+\/[^/]+$/.test(path)) return ["client/src/pages/ServiceAreaLanding.tsx", "client/src/data/serviceGuidance.ts", ...CATALOG];
  if (path.startsWith("/services/") || path.startsWith("/locations/")) return ["client/src/pages/BrowseLanding.tsx", "client/src/data/serviceGuidance.ts", ...CATALOG];
  if (GUIDE_PAGES[path]) return [GUIDE_PAGES[path], GUIDE_LAYOUT];
  return [];
}

/**
 * Returns a function giving the YYYY-MM-DD date of the last git commit that touched a path's content sources,
 * or undefined when that cannot be worked out (no git history, or no known sources). An omitted <lastmod> is
 * better than a guessed one.
 */
export function createLastModLookup(root) {
  const cache = new Map();
  return (sitemapPath) => {
    const sources = contentSourcesForPath(sitemapPath);
    if (sources.length === 0) return undefined;
    const key = sources.join("|");
    if (!cache.has(key)) {
      let date;
      try {
        date = execFileSync("git", ["log", "-1", "--format=%cs", "--", ...sources], { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
      } catch {
        date = "";
      }
      cache.set(key, /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : undefined);
    }
    return cache.get(key);
  };
}
