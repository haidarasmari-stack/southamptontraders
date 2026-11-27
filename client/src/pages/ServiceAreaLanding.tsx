import { ArrowRight, MapPin } from "lucide-react";
import { Link, useParams } from "wouter";
import BuilderCard from "@/components/BuilderCard";
import { Breadcrumbs } from "@/components/SiteFrame";
import {
  getBuildersForServiceInLocation,
  getLocation,
  getService,
  hasServiceAreaPage,
  locations,
  serviceSearchCopy,
  services,
  serviceTrade,
} from "@/data/catalog";
import { buildBreadcrumbJsonLd, buildCollectionPageJsonLd, serializeJsonLd } from "@/data/jsonld";
import { metaForPath, SITE_ORIGIN, usePageMeta } from "@/lib/seo";
import NotFound from "@/pages/NotFound";

export default function ServiceAreaLanding() {
  const { slug: serviceSlug, area: locationSlug } = useParams<{ slug: string; area: string }>();
  const path = `/services/${serviceSlug}/${locationSlug}/`;
  const meta = metaForPath(path);
  usePageMeta(meta);
  const service = getService(serviceSlug);
  const place = getLocation(locationSlug);
  if (!service || !place || !hasServiceAreaPage(serviceSlug, locationSlug)) return <NotFound />;

  const trade = serviceTrade(service.slug);
  const heading = `${trade} in ${place.name}`;
  const profiles = getBuildersForServiceInLocation(service.slug, place.slug);
  const pageUrl = `${SITE_ORIGIN}${path}`;
  const checks = serviceSearchCopy[service.slug]?.checks ?? [];
  const otherAreas = locations.filter((location) => location.slug !== place.slug && hasServiceAreaPage(service.slug, location.slug));
  const otherServices = services.filter((item) => item.slug !== service.slug && hasServiceAreaPage(item.slug, place.slug));

  const breadcrumbData = buildBreadcrumbJsonLd([
    { name: "Home", url: `${SITE_ORIGIN}/` },
    { name: `${trade} in Southampton & Hampshire`, url: `${SITE_ORIGIN}/services/${service.slug}/` },
    { name: heading, url: pageUrl },
  ]);
  const collectionData = buildCollectionPageJsonLd(SITE_ORIGIN, pageUrl, { name: meta.title, description: meta.description }, profiles);

  return (
    <div className="page wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(collectionData) }} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: trade, href: `/services/${service.slug}/` }, { label: place.name }]} />
      <div className="page-heading">
        <p className="eyebrow">{service.name} · {place.name} ({place.postcodeCoverage})</p>
        <h1>{heading}</h1>
        <p className="section-intro">Southampton Traders currently lists {profiles.length} businesses in {place.name} that include {service.name.toLowerCase()} among their services. Compare their profiles, then call or visit each company's website to discuss your project. Coverage is not exhaustive, and listing is not an endorsement.</p>
      </div>

      <section className="section-block">
        <div className="section-heading"><div><p className="eyebrow">Current directory listings</p><h2>{profiles.length} {trade.toLowerCase()} listed in {place.name}</h2></div><Link className="text-link" href={`/builders/${place.slug}/?service=${service.slug}`}>Filter and sort these results <ArrowRight size={16} aria-hidden="true" /></Link></div>
        <div className="builder-card-list">{profiles.map((builder) => <BuilderCard key={builder.slug} builder={builder} sponsored={builder.sponsoredServiceSlugs.includes(service.slug)} />)}</div>
      </section>

      {checks.length > 0 && <section className="section-block southampton-answer-section" aria-labelledby="service-area-checks">
        <p className="eyebrow">Before you call</p>
        <h2 id="service-area-checks">What to ask {trade.toLowerCase()} in {place.name}</h2>
        <div className="southampton-answer-grid">{checks.map((check) => <article key={check.heading}><h3>{check.heading}</h3><p>{check.body}</p></article>)}</div>
      </section>}

      {otherAreas.length > 0 && <section className="browse-more"><h2>{trade} in nearby areas</h2><div className="inline-link-list">{otherAreas.map((location) => <Link key={location.slug} href={`/services/${service.slug}/${location.slug}/`}><MapPin size={14} aria-hidden="true" />{location.name}<ArrowRight size={14} aria-hidden="true" /></Link>)}</div></section>}
      {otherServices.length > 0 && <section className="browse-more"><h2>Other building services in {place.name}</h2><div className="inline-link-list">{otherServices.map((item) => <Link key={item.slug} href={`/services/${item.slug}/${place.slug}/`}>{serviceTrade(item.slug)}<ArrowRight size={14} aria-hidden="true" /></Link>)}</div></section>}
      <p className="results-disclaimer">Business details are compiled from public company or trade sources. Southampton Traders does not endorse listed businesses; details and availability can change. <Link href={`/locations/${place.slug}/`}>See all builders in {place.name}</Link>.</p>
    </div>
  );
}
