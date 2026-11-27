import { ArrowRight, MapPin, Wrench } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "wouter";
import BuilderCard from "@/components/BuilderCard";
import { Breadcrumbs } from "@/components/SiteFrame";
import OwnerProjectGallery from "@/components/OwnerProjectGallery";
import { getBuildersForLocation, getBuildersForService, getLocation, getService, locations, serviceName, services } from "@/data/catalog";
import { buildBreadcrumbJsonLd, buildSouthamptonLandingJsonLd, serializeJsonLd } from "@/data/jsonld";
import { ownerProjectPhotos } from "@/data/projectPhotos";
import { metaForPath, SITE_ORIGIN, usePageMeta } from "@/lib/seo";
import NotFound from "@/pages/NotFound";

const INITIAL_SERVICE_PROFILES = 12;
const SERVICE_PROFILE_BATCH = 12;

const servicePhotos = {
  "loft-conversions": [ownerProjectPhotos.roofFrame, ownerProjectPhotos.rafterDetail],
  roofing: [ownerProjectPhotos.roofTiles],
  renovations: [ownerProjectPhotos.roomInProgress, ownerProjectPhotos.interiorFinish],
};

export default function BrowseLanding({ kind }: { kind: "service" | "location" }) {
  const { slug } = useParams<{ slug: string }>();
  const [visibleServiceProfiles, setVisibleServiceProfiles] = useState(INITIAL_SERVICE_PROFILES);
  const item = kind === "service" ? getService(slug) : getLocation(slug);
  const name = item?.name ?? "Local building work";
  const path = kind === "service" ? `/services/${slug}/` : `/locations/${slug}/`;
  const relatedBuilders = kind === "service" ? getBuildersForService(slug) : getBuildersForLocation(slug);
  const pageLabel = kind === "service" ? `Builders offering ${name.toLowerCase()}` : `Builders in ${name}`;
  usePageMeta(metaForPath(path));
  useEffect(() => { setVisibleServiceProfiles(INITIAL_SERVICE_PROFILES); }, [kind, slug]);
  if (!item) return <NotFound />;

  const visibleBuilders = kind === "service" ? relatedBuilders.slice(0, visibleServiceProfiles) : relatedBuilders;
  const crossLinks = kind === "service" ? locations.filter((location) => relatedBuilders.some((builder) => builder.locationSlugs.includes(location.slug))) : services.filter((service) => relatedBuilders.some((builder) => builder.serviceSlugs.includes(service.slug)));
  const southamptonServices = kind === "location" && slug === "southampton"
    ? services.filter((service) => relatedBuilders.some((builder) => builder.serviceSlugs.includes(service.slug)))
    : [];
  const breadcrumbData = buildBreadcrumbJsonLd([
    { name: "Home", url: `${SITE_ORIGIN}/` },
    { name: pageLabel, url: `${SITE_ORIGIN}${path}` },
  ]);
  const southamptonStructuredData = kind === "location" && slug === "southampton"
    ? buildSouthamptonLandingJsonLd(SITE_ORIGIN, `${SITE_ORIGIN}${path}`, relatedBuilders)
    : undefined;
  const relevantPhotos = kind === "service" ? servicePhotos[slug as keyof typeof servicePhotos] ?? [] : [];
  return (
    <div className="page wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbData) }} />
      {southamptonStructuredData && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(southamptonStructuredData) }} />}
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: pageLabel }]} />
      <div className="page-heading"><p className="eyebrow">{kind === "service" ? "Building service" : "Hampshire launch area"} · Southampton Traders</p><h1>{kind === "service" ? `Builders offering ${name.toLowerCase()} in Hampshire` : `Builders in ${name}`}</h1><p className="section-intro">{item.description} There are {relatedBuilders.length} matching business profiles currently listed. Coverage is not exhaustive; confirm current details directly with each company.</p></div>
      <div className="browse-intro-panel"><span className="browse-icon">{kind === "service" ? <Wrench size={21} aria-hidden="true" /> : <MapPin size={21} aria-hidden="true" />}</span><div><h2>Start with the project, compare with care.</h2><p>Profiles are based on public company or trade-source information. Contact details appear only where supplied and verified; no ratings, reviews or accreditations are added.</p></div></div>
      {relevantPhotos.length > 0 && <OwnerProjectGallery title={`${name} work in progress`} photos={relevantPhotos} />}
      {kind === "location" && slug === "southampton" && <section className="section-block southampton-answer-section" aria-labelledby="southampton-answers-title">
        <p className="eyebrow">Southampton directory guide</p><h2 id="southampton-answers-title">Find builders in Southampton</h2>
        <p>Southampton Traders currently lists {relatedBuilders.length} business profiles assigned to the Southampton launch area, covering postcodes SO14–SO19. Browse Southampton builders and building contractors by the work listed on each profile, including home extensions, loft conversions, renovations, new builds, brickwork, roofing, plastering, groundworks, and kitchen or bathroom projects. Confirm the exact service and location directly with each company. This directory is not exhaustive and does not endorse listed businesses.</p>
        <div className="southampton-answer-grid">
          <article><h3>What building services can I browse?</h3><p>The current Southampton profiles list these categories:</p><ul>{southamptonServices.map((service) => <li key={service.slug}><Link href={`/services/${service.slug}/`}>{service.name} businesses in Southampton</Link></li>)}</ul><p>Check each profile to confirm that its listed services suit your project.</p></article>
          <article><h3>Does the directory list every Southampton builder?</h3><p>No. These are the current profiles assigned to this launch area, not a complete register of all Southampton builders or trades. Details and business availability can change.</p></article>
          <article><h3>Does Southampton Traders recommend or vet builders?</h3><p>No. Profiles are informational and are based on public company or trade-source information. Confirm a company’s services, credentials, availability and project suitability directly before proceeding.</p></article>
        </div>
      </section>}
      {kind === "service" && <section className="section-block southampton-answer-section" aria-labelledby="service-guide-title">
        <p className="eyebrow">A practical shortlist</p><h2 id="service-guide-title">Comparing builders for {name.toLowerCase()}</h2>
        <p>Use these profiles to find builders listing {name.toLowerCase()} in Southampton and nearby Hampshire launch areas. Listings are based on public-source information. A category is a starting point, not a guarantee that a company takes on every project of this type or currently works in your postcode.</p>
        <div className="southampton-answer-grid">
          <article><h3>Check the project fit</h3><p>Open each profile and confirm the listed service matches the work you need. Ask about similar project scope, who will carry out the work, and current availability.</p></article>
          <article><h3>Compare the written scope</h3><p>When requesting estimates, share the same brief and ask each company to set out what is included, excluded, and dependent on a site visit or further information.</p></article>
          <article><h3>Confirm details directly</h3><p>Discuss references, insurance, relevant approvals and payment terms with the company. Southampton Traders does not independently endorse or recommend listed businesses.</p></article>
        </div>
      </section>}
      <section className="section-block"><div className="section-heading"><div><p className="eyebrow">Current directory listings</p><h2>{relatedBuilders.length} {relatedBuilders.length === 1 ? "business profile" : "business profiles"}</h2></div><Link className="text-link" href={kind === "service" ? `/builders/${relatedBuilders[0]?.locationSlugs[0] ?? "southampton"}/?service=${slug}` : `/builders/${slug}/`}>Open filtered results <ArrowRight size={16} aria-hidden="true" /></Link></div>
        {relatedBuilders.length ? <>
          {kind === "service" && <p className="results-disclaimer">Showing {visibleBuilders.length} of {relatedBuilders.length} profiles in this service listing. Reveal more to browse the full set.</p>}
          <div className="builder-card-list">{visibleBuilders.map((builder) => <BuilderCard key={builder.slug} builder={builder} sponsored={kind === "service" && builder.sponsoredServiceSlugs.includes(slug ?? "")} />)}</div>
          {kind === "service" && visibleBuilders.length < relatedBuilders.length && <div className="content-page-cta"><button className="button button-outline" type="button" onClick={() => setVisibleServiceProfiles((count) => Math.min(count + SERVICE_PROFILE_BATCH, relatedBuilders.length))}>Show next {Math.min(SERVICE_PROFILE_BATCH, relatedBuilders.length - visibleBuilders.length)} profiles</button></div>}
        </> : <div className="empty-state"><h3>No current profiles match this category</h3><p>The current directory is not exhaustive. Try a related service or launch area.</p><Link className="button" href="/builder-area/">Request to be considered for the directory</Link></div>}
      </section>
      <section className="browse-more"><h2>Explore related {kind === "service" ? "places" : "services"}</h2><div className="inline-link-list">{crossLinks.map((related) => <Link key={related.slug} href={kind === "service" ? `/locations/${related.slug}/` : `/services/${related.slug}/`}>{kind === "service" ? related.name : serviceName(related.slug)}<ArrowRight size={14} aria-hidden="true" /></Link>)}</div></section>
      <p className="results-disclaimer">Business details are compiled from public company or trade sources. Southampton Traders does not endorse listed businesses; details and availability can change.</p>
    </div>
  );
}
