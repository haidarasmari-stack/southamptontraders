import { ArrowUpRight, MapPin } from "lucide-react";
import { Link } from "wouter";
import { DemoBuilder, locationName, serviceName } from "@/data/catalog";

export default function BuilderCard({ builder }: { builder: DemoBuilder }) {
  const photo = builder.photos[0];
  const availability = builder.availability === "taking-work"
    ? "Taking work · demo only"
    : builder.availability === "limited"
      ? "Limited · demo only"
      : "Availability not set";

  return <article className="builder-card">
    <Link href={`/builder/${builder.slug}/`} className="builder-card-image" aria-label={`View ${builder.name} demo profile`}>
      {photo ? <img src={photo.src} alt={photo.alt} loading="lazy" /> : <span className="image-placeholder" aria-hidden="true" />}
      <span className="demo-pill">Demo profile</span>
    </Link>
    <div className="builder-card-content">
      <div className="card-topline"><span className="eyebrow-small">Example business</span><span className="status-unverified">Not verified</span></div>
      <h3><Link href={`/builder/${builder.slug}/`}>{builder.name}</Link></h3>
      <p>{builder.summary}</p>
      <div className="service-chip-list" aria-label="Example services">{builder.serviceSlugs.slice(0, 3).map((slug) => <span className="service-chip" key={slug}>{serviceName(slug)}</span>)}</div>
      <div className="builder-card-meta"><span><MapPin size={14} aria-hidden="true" />{builder.locationSlugs.slice(0, 2).map(locationName).join(" · ")}</span><span>{availability}</span><span>No reviews</span></div>
      <Link className="builder-card-action" href={`/builder/${builder.slug}/`}>View demo profile <ArrowUpRight size={15} aria-hidden="true" /></Link>
    </div>
  </article>;
}
