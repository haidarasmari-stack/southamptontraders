import { ArrowLeft, Search } from "lucide-react";
import { useEffect } from "react";
import { Breadcrumbs } from "@/components/SiteFrame";
import { usePageMeta } from "@/lib/seo";
import { useLocation } from "wouter";

// Hosting answers this path with HTTP 404 while still serving the app.
const NOT_FOUND_PATH = "/404";

// Render for unknown routes and for items the server confirmed missing (e.g. `/page/:id`).
// The redirect is irreversible: never render while loading, on other errors, or before auth resolves.
export default function NotFound() {
  const [, setLocation] = useLocation();
  usePageMeta({ title: "Page not found | Southampton Traders", description: "That Southampton Traders page could not be found. Browse the local builder directory instead.", path: "/404", noindex: true });

  useEffect(() => {
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex";
    document.head.appendChild(robots);

    // Full-page navigation: a client-side route change sends no request, so no 404 status.
    if (window.location.pathname.replace(/\/$/, "") !== NOT_FOUND_PATH) {
      window.location.replace(NOT_FOUND_PATH);
    }

    return () => robots.remove();
  }, []);

  const handleGoHome = () => {
    setLocation("/");
  };

  return <div className="page wrap narrow-page not-found-page"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Page not found" }]} /><p className="eyebrow">404 · Not found</p><h1>We can’t find that page.</h1><p className="section-intro">The address may have changed, or the page may not exist in the directory.</p><div className="not-found-actions"><button className="button" onClick={handleGoHome}><ArrowLeft size={16} /> Return home</button><a className="text-link" href="/locations/southampton/"><Search size={16} /> Browse Southampton builders</a></div></div>;
}
