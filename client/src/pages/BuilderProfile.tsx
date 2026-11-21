import { ArrowLeft, ArrowUpRight, BadgeInfo, Flag, Globe2, MapPin, Phone, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "wouter";
import { Breadcrumbs } from "@/components/SiteFrame";
import { getBuilder, getLocation, phoneHref, serviceName } from "@/data/catalog";
import { buildBreadcrumbJsonLd, buildBuilderProfileJsonLd, serializeJsonLd } from "@/data/jsonld";
import { usePageMeta, SITE_ORIGIN } from "@/lib/seo";
import NotFound from "@/pages/NotFound";

export default function BuilderProfile() {
  const { slug } = useParams<{ slug: string }>();
  const builder = getBuilder(slug);
  const [reportOpen, setReportOpen] = useState(false);
  const [reportDone, setReportDone] = useState(false);
  const profilePath = builder ? `/builder/${builder.slug}/` : "/404/";
  const location = builder ? getLocation(builder.locationSlugs[0]) : undefined;

  usePageMeta({
    title: builder?.SEO_Meta_Title ?? "Builder profile not found | Southampton Traders",
    description: builder?.SEO_Meta_Description ?? "This business profile could not be found in the Southampton Traders directory.",
    path: profilePath,
    noindex: !builder,
  });

  if (!builder) return <NotFound />;

  const telLink = phoneHref(builder.Phone_Number);
  const structuredData = buildBuilderProfileJsonLd(builder, `${SITE_ORIGIN}${profilePath}`);
  const breadcrumbData = buildBreadcrumbJsonLd([
    { name: "Home", url: `${SITE_ORIGIN}/` },
    { name: `Builders in ${builder.Primary_Location}`, url: `${SITE_ORIGIN}/locations/${builder.locationSlugs[0]}/` },
    { name: builder.Business_Name, url: `${SITE_ORIGIN}${profilePath}` },
  ]);

  return <div className="page wrap">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbData) }} />
    <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: `Builders in ${builder.Primary_Location}`, href: `/locations/${builder.locationSlugs[0]}/` }, { label: builder.Business_Name }]} />
    <Link className="back-link" href={`/builders/${builder.locationSlugs[0]}/`}><ArrowLeft size={15} aria-hidden="true" /> Back to {builder.Primary_Location} builders</Link>
    <div className="profile-heading"><div>
      <p className="eyebrow">Builder profile · {builder.Primary_Location}</p>
      <h1>{builder.Business_Name}</h1>
      <p className="profile-summary">{builder.Unique_Profile_Summary}</p>
      <div className="profile-location"><MapPin size={17} aria-hidden="true" /> Listed under {builder.Primary_Location}{location ? ` · ${location.postcodeCoverage} launch area` : ""}</div>
    </div></div>
    <div className="profile-grid">
      <section className="profile-main">
        <section className="content-panel"><p className="eyebrow">Profile summary</p><h2>Business information</h2><p>{builder.Unique_Profile_Summary}</p></section>
        <section className="content-panel"><p className="eyebrow">Service categories</p><h2>Services listed</h2><ul className="service-chip-list profile-service-list">{builder.serviceSlugs.map((item) => <li className="service-chip" key={item}>{serviceName(item)}</li>)}</ul><p className="profile-primary-service"><strong>Primary service:</strong> {builder.Primary_Service}</p></section>
        <section className="content-panel"><p className="eyebrow">Directory information</p><h2>Location and address</h2><dl className="profile-fact-list"><div><dt>Primary location</dt><dd>{builder.Primary_Location}</dd></div><div><dt>Address or postcode in source</dt><dd>{builder.Full_Address_Or_Postcode || "Not listed"}</dd></div></dl></section>
        <section className="content-panel credentials-panel"><ShieldCheck size={20} aria-hidden="true" /><div><h2>About this directory entry</h2><p>Profile details are compiled from public company or trade-source information. Southampton Traders does not endorse the business or display ratings, reviews, accreditations or availability claims. Contact the company to confirm current details.</p></div></section>
      </section>
      <aside className="profile-sidebar">
        <div className="sidebar-card"><p className="eyebrow">Contact the business</p>
          {builder.Phone_Number && <a className="button button-full" href={telLink}><Phone size={17} aria-hidden="true" />Call {builder.Phone_Number}</a>}
          {builder.Website_URL && <a className="button button-outline button-full contact-secondary" href={builder.Website_URL} target="_blank" rel="noreferrer"><Globe2 size={17} aria-hidden="true" />Visit company website <ArrowUpRight size={15} aria-hidden="true" /></a>}
          {!builder.Phone_Number && !builder.Website_URL && <p>No verified phone number or direct company website is available in this directory entry.</p>}
          <p className="contact-confirm-note">Confirm service scope, location and availability directly with the company.</p>
        </div>
        <div className="sidebar-card"><p className="eyebrow">Services</p><ul className="check-list">{builder.serviceSlugs.map((item) => <li key={item}><span className="check-dot" aria-hidden="true" />{serviceName(item)}</li>)}</ul></div>
        <div className="sidebar-card trust-card"><BadgeInfo size={19} aria-hidden="true" /><p><strong>Directory information, not endorsement</strong><span>Public details can change. Confirm them with the business before making a decision.</span></p></div>
        <button className="report-link" type="button" onClick={() => { setReportOpen((open) => !open); setReportDone(false); }}><Flag size={15} aria-hidden="true" /> Report a profile detail</button>
        {reportOpen && <form className="report-box" onSubmit={(event) => { event.preventDefault(); setReportDone(true); }}><label htmlFor="profile-report">Reason for report</label><select id="profile-report" required defaultValue=""><option value="" disabled>Choose a reason</option><option>Incorrect business information</option><option>Incorrect contact link</option><option>Other directory feedback</option></select><p>Demonstration only. Reports are not sent or saved.</p><button className="button button-small" type="submit">Preview report</button>{reportDone && <p className="inline-success" role="status">Preview complete—nothing was sent or stored.</p>}</form>}
      </aside>
    </div>
  </div>;
}
