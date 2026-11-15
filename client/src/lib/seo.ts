import { useEffect } from "react";
import { getBuilder, getLocation, getService } from "@/data/catalog";

export const SITE_ORIGIN = "https://southamptontraders.co.uk";
export const SHARE_IMAGE = `${SITE_ORIGIN}/manus-storage/hero-renovation_853be6f1.webp`;

export type PageMeta = { title: string; description: string; path: string; noindex?: boolean };

const informationPages: Record<string, PageMeta> = {
  "/how-it-works": { title: "How Southampton Traders works | Southampton Traders", description: "A simple guide to choosing a building service, browsing Hampshire locations, comparing builder information and understanding quote requests.", path: "/how-it-works" },
  "/reviews": { title: "Review rules | Southampton Traders", description: "Learn how a future Southampton Traders service would handle genuine project reviews, business replies, reports and moderation. No reviews appear in this demo.", path: "/reviews", noindex: true },
  "/privacy": { title: "Privacy information | Southampton Traders", description: "This public prototype does not send or store form entries. Learn what not to enter and what must be in place before real enquiries are enabled.", path: "/privacy", noindex: true },
  "/cookies": { title: "Cookie information | Southampton Traders", description: "This directory demonstration does not use advertising cookies or third-party tracking pixels. Read about essential hosting and future privacy considerations.", path: "/cookies", noindex: true },
  "/contact": { title: "Contact and feedback | Southampton Traders", description: "Preview a feedback form for Southampton Traders. Messages are not delivered or saved; do not include personal or sensitive details.", path: "/contact", noindex: true },
  "/request-quote": { title: "Request a quote · demo | Southampton Traders", description: "Try the Southampton Traders project enquiry form in demonstration mode. No personal details are sent or stored.", path: "/request-quote", noindex: true },
  "/builder-area": { title: "For builders · dashboard demo | Southampton Traders", description: "Explore the Southampton Traders builder onboarding, profile editor and enquiries dashboard demonstration. Nothing is sent or saved.", path: "/builder-area", noindex: true },
  "/admin": { title: "Admin tools · demo | Southampton Traders", description: "A public demonstration of directory administration and moderation concepts. It is not a secure admin system and saves no actions.", path: "/admin", noindex: true },
  "/404": { title: "Page not found | Southampton Traders", description: "That Southampton Traders page could not be found. Browse the demonstration directory instead.", path: "/404", noindex: true },
};

export function metaForPath(pathname: string): PageMeta {
  const path = pathname.split("?")[0].replace(/\/$/, "") || "/";
  if (path === "/") return { title: "Find local builders in Southampton | Southampton Traders", description: "Explore local building services around Southampton and nearby Hampshire. Search by project and place; every example listing is clearly marked.", path: "/" };
  if (informationPages[path]) return informationPages[path];

  const profileMatch = path.match(/^\/builder\/([^/]+)$/);
  if (profileMatch) {
    const builder = getBuilder(profileMatch[1]);
    return { title: `${builder?.name ?? "Example builder"} | Southampton Traders`, description: builder ? `${builder.summary} Fictional demonstration profile only; no reviews, verified credentials or real contact details are shown.` : "This fictional builder profile does not exist in the Southampton Traders demonstration directory.", path, noindex: true };
  }

  const serviceMatch = path.match(/^\/services\/([^/]+)$/);
  if (serviceMatch) {
    const service = getService(serviceMatch[1]);
    return { title: `${service?.name ?? "Building services"} builders | Southampton Traders`, description: service ? `${service.description} Explore clearly labelled fictional demo profiles; the example listings are not verified businesses.` : "Browse building services in the Southampton Traders demonstration directory.", path, noindex: true };
  }

  const locationMatch = path.match(/^\/(?:locations|builders)\/([^/]+)$/);
  if (locationMatch) {
    const place = getLocation(locationMatch[1]);
    const isResults = path.startsWith("/builders/");
    return { title: `${isResults ? "Example builders" : "Builders"} in ${place?.name ?? "Hampshire"} | Southampton Traders`, description: place ? `${place.description} Browse fictional demonstration profiles only; no real businesses, reviews or verified listings are represented.` : "Browse the Southampton Traders demonstration directory for Hampshire locations.", path, noindex: true };
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
