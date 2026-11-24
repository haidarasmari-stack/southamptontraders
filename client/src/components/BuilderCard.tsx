import { ArrowUpRight, Globe2, MapPin, Phone } from "lucide-react";
import { Link } from "wouter";
import { locationName, phoneHref, serviceName, type BuilderProfile } from "@/data/catalog";

export default function BuilderCard({ builder, sponsored = false }: { builder: BuilderProfile; sponsored?: boolean }) {
  const profilePath = `/builder/${builder.slug}/`;
  const telLink = phoneHref(builder.Phone_Number);

  return <article className="builder-card">
    <div className="builder-card-content">
      <div className="card-topline"><span className="eyebrow-small">{locationName(builder.locationSlugs[0] ?? "")}</span><span className="status-unverified">Directory listing</span>{sponsored && <span className="sponsored-placement">Sponsored</span>}</div>
      <h3><Link href={profilePath}>{builder.Business_Name}</Link></h3>
      <p>{builder.Unique_Profile_Summary}</p>
      <div className="service-chip-list" aria-label={`Services listed for ${builder.Business_Name}`}>
        {builder.serviceSlugs.map((slug) => <span className="service-chip" key={slug}>{serviceName(slug)}</span>)}
      </div>
      <div className="builder-card-meta">
        <span><MapPin size={14} aria-hidden="true" />{builder.Full_Address_Or_Postcode || locationName(builder.locationSlugs[0] ?? "")}</span>
        <span>Primary service: {serviceName(builder.primaryServiceSlug)}</span>
      </div>
      <div className="builder-card-actions">
        <Link className="builder-card-action" href={profilePath}>View profile <ArrowUpRight size={15} aria-hidden="true" /></Link>
        {builder.Phone_Number && <a className="builder-card-action" href={telLink}><Phone size={15} aria-hidden="true" />Call {builder.Phone_Number}</a>}
        {builder.Website_URL && <a className="builder-card-action" href={builder.Website_URL} target="_blank" rel="noreferrer"><Globe2 size={15} aria-hidden="true" />Company website <ArrowUpRight size={14} aria-hidden="true" /></a>}
      </div>
    </div>
  </article>;
}
