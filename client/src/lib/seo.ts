import { useEffect } from "react";
import { builders, getBuilder, getBuildersForLocation, getBuildersForService, getLocation, getService } from "@/data/catalog";

export const SITE_ORIGIN = "https://southamptontraders.co.uk";
export const SHARE_IMAGE = `${SITE_ORIGIN}/manus-storage/hero-renovation_853be6f1.webp`;

export type PageMeta = { title: string; description: string; path: string; noindex?: boolean };

const informationPages: Record<string, PageMeta> = {
  "/how-it-works": { title: "How Southampton Traders works | Southampton Traders", description: "A guide to browsing Hampshire builder profiles, saving a browser-local shortlist, preparing a project brief, and understanding demo enquiries.", path: "/how-it-works/" },
  "/reviews": { title: "Review rules | Southampton Traders", description: "Learn how a future Southampton Traders service would handle genuine project reviews, business replies, reports and moderation. No reviews appear in the directory.", path: "/reviews/", noindex: true },
  "/privacy": { title: "Privacy information | Southampton Traders", description: "Directory contact links lead directly to companies; demo form entries are not sent or stored. Learn what not to enter and what must be in place before enquiries are enabled.", path: "/privacy/", noindex: true },
  "/cookies": { title: "Cookie information | Southampton Traders", description: "Read about platform analytics, hosting and privacy considerations. Southampton Traders does not configure advertising pixels or send demo form values to analytics.", path: "/cookies/", noindex: true },
  "/contact": { title: "Contact and feedback | Southampton Traders", description: "Preview a feedback form for Southampton Traders. Messages are not delivered or saved; do not include personal or sensitive details.", path: "/contact/", noindex: true },
  "/request-quote": { title: "Request a quote · demo | Southampton Traders", description: "Try the Southampton Traders project enquiry form in demonstration mode. No personal details are sent or stored.", path: "/request-quote/", noindex: true },
  "/shortlist": { title: "Your builder shortlist | Southampton Traders", description: "Review builder profiles you saved in this browser and compare their listed services and contact details.", path: "/shortlist/", noindex: true },
  "/project-brief": { title: "Prepare a builder project brief | Southampton Traders", description: "Create a copy-ready project outline to discuss with builders. It stays in page memory and is not sent or saved by Southampton Traders.", path: "/project-brief/", noindex: true },
  "/builder-area": { title: "For builders · dashboard demo | Southampton Traders", description: "Explore the Southampton Traders builder onboarding, profile editor and enquiries dashboard demonstration. Nothing is sent or saved.", path: "/builder-area/", noindex: true },
  "/admin": { title: "Admin tools · demo | Southampton Traders", description: "A public demonstration of directory administration and moderation concepts. It is not a secure admin system and saves no actions.", path: "/admin/", noindex: true },
  "/404": { title: "Page not found | Southampton Traders", description: "That Southampton Traders page could not be found. Browse the local builder directory instead.", path: "/404", noindex: true },
};

export function metaForPath(pathname: string): PageMeta {
  const path = pathname.split("?")[0].replace(/\/$/, "") || "/";
  const canonicalPath = path === "/" || path === "/404" ? path : `${path}/`;
  if (path === "/") return { title: "Find local builders in Southampton | Southampton Traders", description: `Browse ${getBuildersForLocation("southampton").length} builder profiles in Southampton. Filter by service, find contact details, and explore six nearby Hampshire areas. Coverage is not exhaustive.`, path: "/" };
  if (informationPages[path]) return { ...informationPages[path], path: canonicalPath };

  const profileMatch = path.match(/^\/builder\/([^/]+)$/);
  if (profileMatch) {
    if (profileMatch[1] === "reds-builders-limited") {
      return {
        title: "REDS BUILDERS LIMITED – Builder in Southampton",
        description: "REDS BUILDERS LIMITED is listed as a builder in Southampton (SO32 3QX). Service area and specific trades are not stated. Call 023 9269 3337 to ask.",
        path: "/builder/reds-builders-limited/",
      };
    }
    const builder = getBuilder(profileMatch[1]);
    return builder
      ? { title: builder.SEO_Meta_Title, description: builder.SEO_Meta_Description, path: canonicalPath }
      : { title: "Builder profile not found | Southampton Traders", description: "This business profile could not be found in the Southampton Traders directory.", path: "/404", noindex: true };
  }

  const serviceMatch = path.match(/^\/services\/([^/]+)$/);
  if (serviceMatch) {
    const service = getService(serviceMatch[1]);
    const count = getBuildersForService(serviceMatch[1]).length;
    return { title: `${service?.name ?? "Building services"} builders | Southampton Traders`, description: service ? `Browse ${count} business profiles listing ${service.name.toLowerCase()} across Hampshire launch areas. Public-source details; coverage is not exhaustive.` : "Browse building services in the Southampton Traders directory.", path: canonicalPath, noindex: !service };
  }

  const locationMatch = path.match(/^\/(?:locations|builders)\/([^/]+)$/);
  if (locationMatch) {
    const place = getLocation(locationMatch[1]);
    const isResults = path.startsWith("/builders/");
    const count = getBuildersForLocation(locationMatch[1]).length;
    const description = place?.slug === "southampton"
      ? `Browse ${count} builder profiles in Southampton (SO14–SO19). Filter by service and contact companies directly. Coverage is not exhaustive.`
      : place ? `Browse ${count} business profiles listed in ${place.name} (${place.postcodeCoverage}). Filter by service and contact companies directly; coverage is not exhaustive.` : "Browse the Southampton Traders directory across Hampshire launch areas.";
    return { title: `Builders in ${place?.name ?? "Hampshire"} | Southampton Traders`, description, path: canonicalPath, noindex: isResults || !place };
  }
  return { title: "Page not found | Southampton Traders", description: informationPages["/404"].description, path: "/404", noindex: true };
}

function setMeta(selector: string, attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) { element = document.createElement("meta"); element.setAttribute(attribute, key); document.head.appendChild(element); }
  element.content = content;
}

export function applyPageMeta({ title, description, path, noindex = false }: PageMeta) {
  document.title = title;
  setMeta('meta[name="description"]', "name", "description", description);
  setMeta('meta[name="robots"]', "name", "robots", noindex ? "noindex,follow" : "index,follow");
  const url = new URL(path, SITE_ORIGIN).toString();
  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
  canonical.href = url;
  setMeta('meta[property="og:type"]', "property", "og:type", "website");
  setMeta('meta[property="og:title"]', "property", "og:title", title);
  setMeta('meta[property="og:description"]', "property", "og:description", description);
  setMeta('meta[property="og:url"]', "property", "og:url", url);
  setMeta('meta[property="og:site_name"]', "property", "og:site_name", "Southampton Traders");
  setMeta('meta[property="og:image"]', "property", "og:image", SHARE_IMAGE);
  setMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
  setMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
  setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
  setMeta('meta[name="twitter:image"]', "name", "twitter:image", SHARE_IMAGE);
}

export function usePageMeta(meta: PageMeta) {
  useEffect(() => { applyPageMeta(meta); }, [meta.title, meta.description, meta.path, meta.noindex]);
}
