import { ArrowRight, MapPin, Wrench } from "lucide-react";
import { Link, useParams } from "wouter";
import BuilderCard from "@/components/BuilderCard";
import { Breadcrumbs } from "@/components/SiteFrame";
import { getBuildersForLocation, getBuildersForService, getLocation, getService, locations, serviceName, services } from "@/data/catalog";
import { usePageMeta } from "@/lib/seo";
import NotFound from "@/pages/NotFound";

export default function BrowseLanding({ kind }: { kind: "service" | "location" }) {
  const { slug } = useParams<{ slug: string }>();
  const item = kind === "service" ? getService(slug) : getLocation(slug);
  const name = item?.name ?? "Local building work";
  const path = kind === "service" ? `/services/${slug}/` : `/locations/${slug}/`;
  const relatedBuilders = kind === "service" ? getBuildersForService(slug) : getBuildersForLocation(slug);
  usePageMeta({
    title: kind === "service" ? `${name} builders | Southampton Traders` : `Builders in ${name} | Southampton Traders`,
    description: item ? `Browse ${relatedBuilders.length} business profiles ${kind === "service" ? `listing ${name.toLowerCase()} across seven launch areas` : `listed in ${name}`}. Details come from public sources; directory coverage is not exhaustive.` : "Building services and locations on Southampton Traders.",
    path,
    noindex: !item,
  });
  if (!item) return <NotFound />;

  const crossLinks = kind === "service" ? locations.filter((location) => relatedBuilders.some((builder) => builder.locationSlugs.includes(location.slug))) : services.filter((service) => relatedBuilders.some((builder) => builder.serviceSlugs.includes(service.slug)));
  return (
    <div className="page wrap">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: kind === "service" ? "Services" : "Locations", href: kind === "service" ? "/services/extensions/" : "/locations/southampton/" }, { label: name }]} />
      <div className="page-heading"><p className="eyebrow">{kind === "service" ? "Building service" : "Hampshire launch area"} · Southampton Traders</p><h1>{kind === "service" ? `${name} builders` : `Builders in ${name}`}</h1><p className="section-intro">{item.description} There are {relatedBuilders.length} matching business profiles currently listed. Coverage is not exhaustive; confirm current details directly with each company.</p></div>
      <div className="browse-intro-panel"><span className="browse-icon">{kind === "service" ? <Wrench size={21} aria-hidden="true" /> : <MapPin size={21} aria-hidden="true" />}</span><div><h2>Start with the project, compare with care.</h2><p>Profiles are based on public company or trade-source information. Contact details appear only where supplied and verified; no ratings, reviews or accreditations are added.</p></div></div>
      <section className="section-block"><div className="section-heading"><div><p className="eyebrow">Current directory listings</p><h2>{relatedBuilders.length} {relatedBuilders.length === 1 ? "business profile" : "business profiles"}</h2></div><Link className="text-link" href={kind === "service" ? `/builders/${relatedBuilders[0]?.locationSlugs[0] ?? "southampton"}/?service=${slug}` : `/builders/${slug}/`}>Open filtered results <ArrowRight size={16} aria-hidden="true" /></Link></div>
        {relatedBuilders.length ? <div className="builder-card-list">{relatedBuilders.map((builder) => <BuilderCard key={builder.slug} builder={builder} />)}</div> : <div className="empty-state"><h3>No current profiles match this category</h3><p>The current directory is not exhaustive. Try a related service or launch area.</p><Link className="button" href="/builder-area/">Open builder-area demo</Link></div>}
      </section>
      <section className="browse-more"><h2>Explore related {kind === "service" ? "places" : "services"}</h2><div className="inline-link-list">{crossLinks.map((related) => <Link key={related.slug} href={kind === "service" ? `/locations/${related.slug}/` : `/services/${related.slug}/`}>{kind === "service" ? related.name : serviceName(related.slug)}<ArrowRight size={14} aria-hidden="true" /></Link>)}</div></section>
      <p className="results-disclaimer">Business details are compiled from public company or trade sources. Southampton Traders does not endorse listed businesses; details and availability can change.</p>
    </div>
  );
}
