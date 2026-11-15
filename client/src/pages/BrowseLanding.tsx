import { ArrowRight, MapPin, Wrench } from "lucide-react";
import { Link, useParams } from "wouter";
import BuilderCard from "@/components/BuilderCard";
import { Breadcrumbs } from "@/components/SiteFrame";
import { demoBuilders, getLocation, getService, locations, serviceName, services } from "@/data/catalog";
import { usePageMeta } from "@/lib/seo";
import NotFound from "@/pages/NotFound";

export default function BrowseLanding({ kind }: { kind: "service" | "location" }) {
  const { slug } = useParams<{ slug: string }>();
  const item = kind === "service" ? getService(slug) : getLocation(slug);
  const name = item?.name ?? "Local building work";
  const path = kind === "service" ? `/services/${slug}/` : `/locations/${slug}/`;
  usePageMeta({
    title: `${name} builders | Southampton Traders`,
    description: item ? `${item.description} Browse clearly labelled fictional demonstration profiles and see how Southampton Traders helps with project discovery.` : "Building services and locations on Southampton Traders.",
    path,
    noindex: true,
  });
  if (!item) return <NotFound />;

  const relatedBuilders = demoBuilders.filter((builder) => kind === "service" ? builder.serviceSlugs.includes(slug) : builder.locationSlugs.includes(slug));
  const crossLinks = kind === "service" ? locations.filter((location) => relatedBuilders.some((builder) => builder.locationSlugs.includes(location.slug))) : services.filter((service) => relatedBuilders.some((builder) => builder.serviceSlugs.includes(service.slug)));
  return (
    <div className="page wrap">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: kind === "service" ? "Services" : "Locations", href: kind === "service" ? "/services/extensions/" : "/locations/southampton/" }, { label: name }]} />
      <div className="page-heading"><p className="eyebrow">{kind === "service" ? "Building services" : "Southampton & Hampshire"} · Demo directory</p><h1>{kind === "service" ? `${name} builders` : `Builders in ${name}`}</h1><p className="section-intro">{item.description} This directory is a demonstration: every business profile is fictional, and no listing has been verified.</p></div>
      <div className="browse-intro-panel"><span className="browse-icon">{kind === "service" ? <Wrench size={21} aria-hidden="true" /> : <MapPin size={21} aria-hidden="true" />}</span><div><h2>Start with the project, compare with care.</h2><p>When real listings are approved, this page will help people compare relevant local businesses. For now, the example profiles demonstrate navigation only—no reviews, ratings or credentials are claimed.</p></div></div>
      <section className="section-block"><div className="section-heading"><div><p className="eyebrow">Directory examples</p><h2>{relatedBuilders.length} example {relatedBuilders.length === 1 ? "profile" : "profiles"}</h2></div><Link className="text-link" href={kind === "service" ? `/builders/southampton/?service=${slug}` : `/builders/${slug}/`}>Open results <ArrowRight size={16} aria-hidden="true" /></Link></div>
        {relatedBuilders.length ? <div className="builder-card-list">{relatedBuilders.map((builder) => <BuilderCard key={builder.slug} builder={builder} />)}</div> : <div className="empty-state"><h3>No example profiles in this category yet</h3><p>The directory can expand as genuine businesses are reviewed and approved.</p><Link className="button" href="/builder-area/">See the builder demo</Link></div>}
      </section>
      <section className="browse-more"><h2>Explore related {kind === "service" ? "places" : "services"}</h2><div className="inline-link-list">{crossLinks.map((related) => <Link key={related.slug} href={kind === "service" ? `/locations/${related.slug}/` : `/services/${related.slug}/`}>{kind === "service" ? related.name : serviceName(related.slug)}<ArrowRight size={14} aria-hidden="true" /></Link>)}</div></section>
      <p className="results-disclaimer">These profiles are fictional examples only. Stock photography is illustrative and is not connected to any real business.</p>
    </div>
  );
}
