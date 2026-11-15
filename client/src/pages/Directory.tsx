import { ArrowLeft, ArrowRight, Filter, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useLocation as useRouterLocation, useParams } from "wouter";
import BuilderCard from "@/components/BuilderCard";
import SearchPanel from "@/components/SearchPanel";
import { Breadcrumbs } from "@/components/SiteFrame";
import { demoBuilders, getLocation, getService, locationName, locations, services } from "@/data/catalog";
import { usePageMeta } from "@/lib/seo";
import NotFound from "@/pages/NotFound";

function getInitialService() {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get("service") ?? "";
}

export default function Directory() {
  const params = useParams<{ location?: string }>();
  const locationSlug = params.location || "southampton";
  const place = getLocation(locationSlug);
  const [, setPath] = useRouterLocation();
  const [query, setQuery] = useState("");
  const [service, setService] = useState(getInitialService());
  const [availability, setAvailability] = useState("");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  usePageMeta({
    title: `Example builders in ${place?.name ?? "Southampton"} | Southampton Traders`,
    description: `Browse fictional builder profiles in ${place?.name ?? "Southampton"}. Filter by service, location and sample availability; this demo contains no real businesses or verified listings.`,
    path: `/builders/${locationSlug}/`,
    noindex: true,
  });

  const filtered = useMemo(() => demoBuilders.filter((builder) => {
    if (!builder.locationSlugs.includes(locationSlug) && locationSlug !== "nearby-hampshire") return false;
    if (service && !builder.serviceSlugs.includes(service)) return false;
    if (availability && builder.availability !== availability) return false;
    if (verifiedOnly && !builder.isVerified) return false;
    if (query.trim()) {
      const text = query.trim().toLowerCase();
      const searchable = [builder.name, builder.summary, ...builder.serviceSlugs, ...builder.locationSlugs].join(" ").toLowerCase();
      if (!searchable.includes(text)) return false;
    }
    return true;
  }), [locationSlug, service, availability, verifiedOnly, query]);

  if (!place) return <NotFound />;

  const clearFilters = () => {
    setQuery("");
    setService("");
    setAvailability("");
    setVerifiedOnly(false);
    setPath(`/builders/${locationSlug}/`);
  };

  return (
    <div className="page wrap">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Builders", href: "/builders/southampton/" }, { label: place.name }]} />
      <div className="page-heading directory-heading">
        <div><p className="eyebrow">Southampton & Hampshire · Demo directory</p><h1>Builders in {place.name}</h1><p className="section-intro">These fictional profiles show how local listings can be compared. No real business, credential or customer review is represented.</p></div>
        <Link className="text-link" href="/how-it-works/">How listings work <ArrowRight size={16} aria-hidden="true" /></Link>
      </div>
      <div className="directory-search-wrap"><SearchPanel compact /></div>
      <div className="directory-layout">
        <aside className={`filter-panel${filtersOpen ? " filters-open" : ""}`} aria-label="Builder filters">
          <div className="filter-heading"><h2><SlidersHorizontal size={18} aria-hidden="true" /> Filters</h2><button type="button" className="icon-button filter-close" onClick={() => setFiltersOpen(false)} aria-label="Close filters"><X size={18} /></button></div>
          <label className="field-label" htmlFor="filter-service">Service</label>
          <select id="filter-service" value={service} onChange={(event) => setService(event.target.value)}><option value="">All services</option>{services.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select>
          <label className="field-label" htmlFor="filter-place">Location</label>
          <select id="filter-place" value={locationSlug} onChange={(event) => setPath(`/builders/${event.target.value}/`)}>{locations.filter((item) => item.slug !== "nearby-hampshire").map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select>
          <label className="field-label" htmlFor="filter-availability">Availability</label>
          <select id="filter-availability" value={availability} onChange={(event) => setAvailability(event.target.value)}><option value="">Any availability</option><option value="taking-work">Taking work (demo)</option><option value="limited">Limited (demo)</option><option value="not-set">Not set</option></select>
          <label className="check-row"><input type="checkbox" checked={verifiedOnly} onChange={(event) => setVerifiedOnly(event.target.checked)} /><span>Verified-profile status</span></label>
          <p className="filter-note">No example profile has been verified. This filter is shown to demonstrate the control only.</p>
          <button className="button button-outline filter-clear" type="button" onClick={clearFilters}>Clear filters</button>
        </aside>
        {filtersOpen && <button className="filter-backdrop" type="button" onClick={() => setFiltersOpen(false)} aria-label="Close filter panel" />}
        <section className="results-column" aria-live="polite">
          <div className="results-toolbar"><p><strong>{filtered.length}</strong> example {filtered.length === 1 ? "profile" : "profiles"}</p><button className="filter-toggle" type="button" onClick={() => setFiltersOpen(true)}><Filter size={17} aria-hidden="true" /> Filters</button><label className="sort-label" htmlFor="sort-results">Sort by</label><select id="sort-results" defaultValue="relevance"><option value="relevance">Relevance</option><option value="name">Business name</option></select></div>
          {filtered.length > 0 ? <div className="builder-card-list">{filtered.map((builder) => <BuilderCard key={builder.slug} builder={builder} />)}</div> : <div className="empty-state"><span className="empty-icon"><Filter size={21} aria-hidden="true" /></span><h2>No example profiles match those filters</h2><p>Try removing a filter or choose a different Hampshire location. Verified profiles are not available in this demo.</p><button type="button" className="button" onClick={clearFilters}>Show all examples <ArrowLeft size={16} aria-hidden="true" /></button></div>}
          <p className="results-disclaimer">Example availability is fictional. Photos are illustrative stock images and are not proof of a listed business’s work.</p>
        </section>
      </div>
      <section className="browse-more"><h2>Browse another location</h2><div className="inline-link-list">{locations.filter((item) => item.slug !== locationSlug && item.slug !== "nearby-hampshire").map((item) => <Link key={item.slug} href={`/builders/${item.slug}/`}>{item.name}<ArrowRight size={14} aria-hidden="true" /></Link>)}</div></section>
      <div className="sr-only">Current location: {locationName(locationSlug)}. {getService(service)?.name ?? "All services"}.</div>
    </div>
  );
}
