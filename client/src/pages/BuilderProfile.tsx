import { ArrowLeft, ArrowUpRight, BadgeInfo, CalendarDays, Flag, MapPin, MessageCircle, Shield, Star } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "wouter";
import { Breadcrumbs } from "@/components/SiteFrame";
import { getBuilder, locationName, serviceName } from "@/data/catalog";
import { usePageMeta } from "@/lib/seo";
import NotFound from "@/pages/NotFound";

export default function BuilderProfile() {
  const { slug } = useParams<{ slug: string }>();
  const builder = getBuilder(slug);
  const [reportOpen, setReportOpen] = useState(false);
  const [reportDone, setReportDone] = useState(false);

  usePageMeta({
    title: `${builder?.name ?? "Example builder"} | Southampton Traders`,
    description: builder ? `${builder.summary} Fictional demonstration profile only; no customer reviews, verified credentials or real contact details are shown.` : "Example builder profile.",
    path: `/builder/${slug ?? "example-company"}/`,
    noindex: true,
  });

  if (!builder) return <NotFound />;

  return (
    <div className="page wrap">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Builders", href: "/builders/southampton/" }, { label: builder.name }]} />
      <Link className="back-link" href="/builders/southampton/"><ArrowLeft size={15} aria-hidden="true" /> Back to example profiles</Link>
      <div className="profile-heading"><div><span className="demo-pill demo-pill-inline">Demo profile · fictional business</span><h1>{builder.name}</h1><p className="profile-summary">{builder.summary}</p><div className="profile-location"><MapPin size={17} aria-hidden="true" /> Example service areas: {builder.locationSlugs.map(locationName).join(", ")}</div></div><Link className="button" href={`/request-quote/?builder=${builder.slug}`}><MessageCircle size={17} aria-hidden="true" /> Request a quote</Link></div>
      <div className="profile-grid">
        <section className="profile-main">
          <div className="profile-photo-grid">
            {builder.photos.map((photo, index) => <figure key={photo.src}><img src={photo.src} alt={photo.alt} loading={index === 0 ? "eager" : "lazy"} /><figcaption>Illustrative stock photo · {photo.credit} · not this example business’s work</figcaption></figure>)}
          </div>
          <section className="content-panel"><p className="eyebrow">About this example</p><h2>Profile details</h2><p>{builder.about}</p><p>This is a fictional directory example, not an endorsement or recommendation. Do not rely on its sample availability or details for a real project.</p></section>
          <section className="content-panel"><div className="section-heading compact-heading"><div><p className="eyebrow">Customer feedback</p><h2>Reviews</h2></div><span className="empty-rating"><Star size={16} aria-hidden="true" /> No reviews</span></div><p>No customer reviews or star ratings are shown. In the real service, reviews would be accepted only after a declared or completed job and would be subject to moderation.</p><Link className="text-link" href="/reviews/">Read the review rules <ArrowUpRight size={15} aria-hidden="true" /></Link></section>
          <section className="content-panel credentials-panel"><Shield size={20} aria-hidden="true" /><div><h2>Credentials</h2><p>No credentials are listed for this example. Any future credential supplied by a business would be labelled “business supplied” until an administrator verifies it.</p></div></section>
        </section>
        <aside className="profile-sidebar">
          <div className="sidebar-card"><p className="eyebrow">Example services</p><ul className="check-list">{builder.serviceSlugs.map((item) => <li key={item}><span className="check-dot" aria-hidden="true" />{serviceName(item)}</li>)}</ul></div>
          <div className="sidebar-card"><p className="eyebrow">Availability</p><div className="availability-big"><CalendarDays size={18} aria-hidden="true" />{builder.availability === "taking-work" ? "Taking work · demo only" : builder.availability === "limited" ? "Limited · demo only" : "Not set"}</div><p>Sample availability is fictional and should not be used to make a real booking decision.</p></div>
          <div className="sidebar-card trust-card"><BadgeInfo size={19} aria-hidden="true" /><p><strong>Not a verified profile</strong><span>This is an example profile for the site demonstration only.</span></p></div>
          <div className="sidebar-card"><p className="eyebrow">Contact</p><p>No real contact details are published on example profiles. The quote form is a non-persistent demonstration.</p><Link className="button button-full" href={`/request-quote/?builder=${builder.slug}`}>Try the quote demo <ArrowUpRight size={16} aria-hidden="true" /></Link></div>
          <button className="report-link" type="button" onClick={() => { setReportOpen((open) => !open); setReportDone(false); }}><Flag size={15} aria-hidden="true" /> Report this profile</button>
          {reportOpen && <form className="report-box" onSubmit={(event) => { event.preventDefault(); setReportDone(true); }}><label htmlFor="profile-report">Reason for report</label><select id="profile-report" required defaultValue=""><option value="" disabled>Choose a reason</option><option>Incorrect example information</option><option>Other demo feedback</option></select><p>Demo only. Reports are not sent or saved.</p><button className="button button-small" type="submit">Preview report</button>{reportDone && <p className="inline-success" role="status">Preview complete—nothing was sent or stored.</p>}</form>}
        </aside>
      </div>
    </div>
  );
}
