import { ArrowUpRight, BadgeInfo, MapPin, Phone } from "lucide-react";
import { Breadcrumbs } from "@/components/SiteFrame";
import { usePageMeta } from "@/lib/seo";

const listingMeta = {
  title: "REDS BUILDERS LIMITED – Builder in Southampton",
  description: "REDS BUILDERS LIMITED is listed as a builder in Southampton (SO32 3QX). Service area and specific trades are not stated. Call 023 9269 3337 to ask.",
  path: "/builder/reds-builders-limited/",
};

const businessSchema = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "REDS BUILDERS LIMITED",
  telephone: "+442392693337",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Office 6, Racecourse Corner",
    addressLocality: "Southampton",
    addressRegion: "Hampshire",
    postalCode: "SO32 3QX",
    addressCountry: "GB",
  },
};

export default function BusinessListing() {
  usePageMeta(listingMeta);

  return (
    <main className="page wrap factual-listing">
      <script type="application/ld+json">{JSON.stringify(businessSchema)}</script>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "REDS BUILDERS LIMITED" }]} />

      <header className="listing-hero listing-enter">
        <p className="eyebrow"><span className="eyebrow-rule" />Builder directory listing · Southampton</p>
        <span className="listing-source-label"><BadgeInfo size={15} aria-hidden="true" />Details from supplied directory text · not independently verified</span>
        <h1>REDS BUILDERS LIMITED – Builder in Southampton</h1>
        <p className="listing-lede">Listed under the category “Builders” in the supplied directory extract. Specific building services and areas served were not provided.</p>
        <a className="button listing-cta" href="tel:+442392693337"><Phone size={17} aria-hidden="true" />Call 023 9269 3337</a>
      </header>

      <section className="listing-facts listing-enter" aria-labelledby="listing-facts-title">
        <div className="listing-section-heading">
          <p className="eyebrow">Contact &amp; quick facts</p>
          <h2 id="listing-facts-title">Details in the supplied listing</h2>
        </div>
        <dl className="listing-facts-grid">
          <div><dt>Business name</dt><dd>REDS BUILDERS LIMITED</dd></div>
          <div><dt>Category</dt><dd>Builders</dd></div>
          <div><dt>Address shown in source</dt><dd>Office 6, Racecourse Corner, Southampton, Hampshire, SO32 3QX</dd></div>
          <div><dt>Phone</dt><dd><a href="tel:+442392693337">023 9269 3337</a></dd></div>
          <div><dt>Areas served</dt><dd>Not specified in the supplied information.</dd></div>
          <div><dt>Official website</dt><dd>Not provided.</dd></div>
        </dl>
      </section>

      <div className="listing-content-grid">
        <div className="listing-main-column">
          <section className="listing-panel listing-enter" aria-labelledby="listing-overview-title">
            <p className="eyebrow">Business overview</p>
            <h2 id="listing-overview-title">What the directory entry tells us</h2>
            <p>REDS BUILDERS LIMITED appears in the supplied Southampton-area directory extract under the category “Builders”. The entry gives an address of Office 6, Racecourse Corner, Southampton, Hampshire, SO32 3QX and a telephone number of 023 9269 3337. These are the details available for this listing; they have not been independently checked by Southampton Traders. The address is presented as the address shown in the source, not as confirmation of a public walk-in office or of the places where the firm takes on work.</p>
            <p>This listing is intended to help visitors identify and contact the business using the facts provided. The extract does not describe individual trades, project types, domestic or commercial work, coverage towns, or the company’s typical jobs, so none are claimed here. It also contains no official website, accreditation, insurance details, trading history, customer reviews or ratings. Call the listed number to ask the business about your project, where it works, availability and any qualifications or insurance relevant to the work. If a business website or verified service information is supplied later, those details can be added clearly.</p>
          </section>

          <section className="listing-panel listing-enter" aria-labelledby="listing-services-title">
            <p className="eyebrow">Services offered</p>
            <h2 id="listing-services-title">Category shown in the source</h2>
            <ul className="listing-service-list">
              <li><span className="listing-bullet" aria-hidden="true" /><div><strong>Builders</strong><p>This is the directory category supplied. No individual trades or project services were specified.</p></div></li>
            </ul>
          </section>

          <section className="listing-panel listing-enter" aria-labelledby="listing-areas-title">
            <p className="eyebrow">Areas covered</p>
            <h2 id="listing-areas-title">Service coverage has not been provided</h2>
            <p>The supplied entry gives an address in Southampton, Hampshire, with postcode SO32 3QX. It does not state which towns, suburbs or postcodes the business serves, so no service-area locations are listed here.</p>
          </section>
        </div>

        <aside className="listing-sidebar listing-enter" aria-label="Contact and listing information">
          <div className="listing-panel listing-contact-card">
            <p className="eyebrow">Contact the business</p>
            <h2>Ask about your project</h2>
            <p>Specific services and coverage are not stated in the supplied directory entry. Call to ask whether the business can help.</p>
            <a className="button button-full listing-cta" href="tel:+442392693337"><Phone size={17} aria-hidden="true" />023 9269 3337</a>
          </div>
          <div className="listing-panel listing-status-card">
            <MapPin size={19} aria-hidden="true" />
            <div><strong>Source details only</strong><p>This page repeats information from the supplied directory extract. It is not an endorsement, recommendation or confirmation that the details are current.</p></div>
          </div>
          <a className="text-link listing-back-link" href="/builders/southampton/">Browse builder directory <ArrowUpRight size={15} aria-hidden="true" /></a>
        </aside>
      </div>
    </main>
  );
}
