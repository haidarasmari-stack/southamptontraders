import { ArrowLeft, ArrowRight, Filter, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation as useRouterLocation, useParams } from "wouter";
import BuilderCard from "@/components/BuilderCard";
import SearchPanel from "@/components/SearchPanel";
import { Breadcrumbs } from "@/components/SiteFrame";
import { builders, getBuildersForLocation, getLocation, getService, locationName, locations, services } from "@/data/catalog";
import { usePageMeta } from "@/lib/seo";
import NotFound from "@/pages/NotFound";

export default function Directory() {
  const params = useParams<{ location?: string }>();
  const locationSlug = params.location || "southampton";
  const place = getLocation(locationSlug);
  const [currentPath, setPath] = useRouterLocation();
  const [query, setQuery] = useState("");
  const [service, setService] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const locationBuilders = useMemo(() => getBuildersForLocation(locationSlug), [locationSlug]);

  useEffect(() => {
    const requestedService = new URLSearchParams(currentPath.split("?")[1] ?? "").get("service") ?? "";
    setService(services.some((item) => item.slug === requestedService) ? requestedService : "");
  }, [currentPath]);

  usePageMeta({
    title: `Builders in ${place?.name ?? "Southampton"} | Southampton Traders`,
    description: place
      ? `Browse ${locationBuilders.length} business profiles listed in ${place.name} (${place.postcodeCoverage}). Filter by service and contact companies directly; coverage is not exhaustive.`
      : "Browse builder profiles across the Southampton Traders launch areas.",
    path: `/builders/${locationSlug}/`,
    noindex: true,
  });

  const filtered = useMemo(() => {
    const text = query.trim().toLocaleLowerCase("en-GB");
    const results = locationBuilders.filter((builder) => {
      if (service && !builder.serviceSlugs.includes(service)) return false;
      if (text) {
        const searchable = [
          builder.Business_Name,
          builder.Unique_Profile_Summary,
          builder.Full_Address_Or_Postcode,
          ...builder.serviceSlugs,
          ...builder.locationSlugs,
        ].join(" ").toLocaleLowerCase("en-GB");
        if (!searchable.includes(text)) return false;
      }
      return true;
    });
    return [...results].sort((left, right) => {
      const leftPriority = service && left.priorityServiceSlugs.includes(service) ? 0 : 1;
      const rightPriority = service && right.priorityServiceSlugs.includes(service) ? 0 : 1;
      if (leftPriority !== rightPriority) return leftPriority - rightPriority;
      return sortBy === "name"
        ? left.Business_Name.localeCompare(right.Business_Name, "en-GB", { sensitivity: "base" })
        : 0;
    });
  }, [locationBuilders, query, service, sortBy]);

  if (!place) return <NotFound />;

  const clearFilters = () => {
    setQuery("");
    setService("");
    setPath(`/builders/${locationSlug}/`);
  };

  const changeLocation = (nextLocation: string) => {
    const params = new URLSearchParams();
    if (service) params.set("service", service);
    const queryString = params.toString();
    setPath(`/builders/${nextLocation}/${queryString ? `?${queryString}` : ""}`);
  };

  return <div className="page wrap">
    <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Builders", href: "/builders/southampton/" }, { label: place.name }]} />
    <div className="page-heading directory-heading">
      <div><p className="eyebrow">Southampton & Hampshire · Builder directory</p><h1>Builders in {place.name}</h1><p className="section-intro">{locationBuilders.length} businesses are currently listed for this launch area ({place.postcodeCoverage}). This is a researched, non-exhaustive directory; confirm current details directly with each company.</p></div>
      <Link className="text-link" href="/how-it-works/">How listings work <ArrowRight size={16} aria-hidden="true" /></Link>
    </div>
    <div className="directory-search-wrap"><SearchPanel compact initialPlace={locationSlug} initialService={service} /></div>
    <div className="directory-layout">
      <aside className={`filter-panel${filtersOpen ? " filters-open" : ""}`} aria-label="Builder filters">
        <div className="filter-heading"><h2><SlidersHorizontal size={18} aria-hidden="true" /> Filters</h2><button type="button" className="icon-button filter-close" onClick={() => setFiltersOpen(false)} aria-label="Close filters"><X size={18} /></button></div>
        <label className="field-label" htmlFor="filter-search">Search profiles</label>
        <input id="filter-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Business, service or postcode" />
        <label className="field-label" htmlFor="filter-service">Service</label>
        <select id="filter-service" value={service} onChange={(event) => setService(event.target.value)}><option value="">All services</option>{services.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select>
        <label className="field-label" htmlFor="filter-place">Location</label>
        <select id="filter-place" value={locationSlug} onChange={(event) => changeLocation(event.target.value)}>{locations.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select>
        <button className="button button-outline filter-clear" type="button" onClick={clearFilters}>Clear filters</button>
      </aside>
      {filtersOpen && <button className="filter-backdrop" type="button" onClick={() => setFiltersOpen(false)} aria-label="Close filter panel" />}
      <section className="results-column" aria-live="polite">
        <div className="results-toolbar"><p><strong>{filtered.length}</strong> {filtered.length === 1 ? "business" : "businesses"} listed in {place.name}</p><button className="filter-toggle" type="button" onClick={() => setFiltersOpen(true)} aria-expanded={filtersOpen}><Filter size={17} aria-hidden="true" /> Filters</button><label className="sort-label" htmlFor="sort-results">Sort by</label><select id="sort-results" value={sortBy} onChange={(event) => setSortBy(event.target.value)}><option value="relevance">Default</option><option value="name">Business name</option></select></div>
        {filtered.length > 0 ? <div className="builder-card-list">{filtered.map((builder) => <BuilderCard key={builder.slug} builder={builder} featured={Boolean(service && builder.priorityServiceSlugs.includes(service))} />)}</div> : <div className="empty-state"><span className="empty-icon"><Filter size={21} aria-hidden="true" /></span><h2>No businesses match those filters</h2><p>Try a different service, search term or launch area.</p><button type="button" className="button" onClick={clearFilters}>Show all businesses <ArrowLeft size={16} aria-hidden="true" /></button></div>}
        <p className="results-disclaimer">Business details are compiled from public company or trade sources. Southampton Traders does not endorse listed firms or publish ratings/reviews. Details and availability can change; confirm them directly.</p>
      </section>
    </div>
    <section className="browse-more"><h2>Browse another launch area</h2><div className="inline-link-list">{locations.filter((item) => item.slug !== locationSlug).map((item) => <Link key={item.slug} href={`/builders/${item.slug}/`}>{item.name} <span className="area-link-count">({getBuildersForLocation(item.slug).length})</span><ArrowRight size={14} aria-hidden="true" /></Link>)}</div></section>
    <div className="sr-only">Current location: {locationName(locationSlug)}. {getService(service)?.name ?? "All services"}. {builders.length} businesses are currently in the directory.</div>
  </div>;
}
