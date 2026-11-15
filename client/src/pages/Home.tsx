import { ArrowRight, ArrowUpRight, Check, Compass, Hammer, MapPin, MessageSquareText, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import SearchPanel from "@/components/SearchPanel";
import { demoBuilders, locations, services } from "@/data/catalog";
import { usePageMeta } from "@/lib/seo";

const photo = "/manus-storage/hero-renovation_853be6f1.webp";

export default function Home() {
  usePageMeta({
    title: "Find local builders in Southampton | Southampton Traders",
    description: "Explore the Southampton Traders demonstration directory for local building services. Search by project and Hampshire location; every sample listing is clearly marked.",
    path: "/",
  });

  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-rule" />Southampton & nearby Hampshire</p>
          <h1>Find the right people to <em>build it right.</em></h1>
          <p className="hero-lede">A clearer way to explore local building services, compare example profiles and plan your next project.</p>
          <SearchPanel />
          <div className="hero-proof"><span><Check size={15} aria-hidden="true" /> No fake reviews</span><span><Check size={15} aria-hidden="true" /> Clear demo labels</span><span><Check size={15} aria-hidden="true" /> Built around local search</span></div>
        </div>
        <div className="hero-visual">
          <img src={photo} alt="Illustrative home renovation in progress; not work completed by an example listing." fetchPriority="high" />
          <div className="hero-photo-caption"><span className="photo-mark" aria-hidden="true">ST</span><span><strong>Room to make it yours</strong><small>Illustrative photo · not a listed builder’s project</small></span></div>
          <div className="hero-index">01 <span> / LOCAL WORK</span></div>
        </div>
      </section>

      <section className="intro-band">
        <div className="wrap intro-band-inner"><p><span className="intro-mark">ST</span> Southampton Traders is a new local directory concept. The profiles below are fictional examples while the site is being prepared.</p><Link className="text-link" href="/how-it-works/">How the directory works <ArrowUpRight size={16} aria-hidden="true" /></Link></div>
      </section>

      <section className="section wrap" id="services">
        <div className="section-heading"><div><p className="eyebrow">Start with the work</p><h2>What are you building?</h2></div><Link className="text-link" href="/builders/southampton/">Browse all examples <ArrowRight size={17} aria-hidden="true" /></Link></div>
        <div className="service-grid">
          {services.map((service, index) => (
            <Link className="service-tile" href={`/services/${service.slug}/`} key={service.slug}>
              <span className="service-number">{String(index + 1).padStart(2, "0")}</span>
              <span className="service-tile-icon" aria-hidden="true"><Hammer size={21} strokeWidth={1.7} /></span>
              <strong>{service.name}</strong>
              <span className="service-tile-arrow"><ArrowUpRight size={17} aria-hidden="true" /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="feature-strip">
        <div className="wrap feature-strip-inner">
          <div className="feature-strip-title"><p className="eyebrow eyebrow-light">A better starting point</p><h2>Clarity comes before the first call.</h2><p>See what a local builder profile can include—without pretending that an example is a recommendation.</p><Link className="button button-light" href="/builders/southampton/">Explore demo profiles <ArrowRight size={17} aria-hidden="true" /></Link></div>
          <div className="feature-list">
            <div><span className="feature-icon"><Compass size={20} aria-hidden="true" /></span><p><strong>Search by project</strong><small>Choose a trade and a place before you compare.</small></p></div>
            <div><span className="feature-icon"><ShieldCheck size={20} aria-hidden="true" /></span><p><strong>Trust, clearly labelled</strong><small>No invented ratings, badges or credentials.</small></p></div>
            <div><span className="feature-icon"><MessageSquareText size={20} aria-hidden="true" /></span><p><strong>Know what happens next</strong><small>Quote forms are demonstrations only and send nothing.</small></p></div>
          </div>
        </div>
      </section>

      <section className="section wrap nearby-section">
        <div className="section-heading"><div><p className="eyebrow">The launch area</p><h2>Southampton, then outwards.</h2><p className="section-intro">Browse the first Hampshire locations in the directory demo.</p></div><span className="location-count">{locations.length - 1} places</span></div>
        <div className="location-list">
          {locations.filter((location) => location.slug !== "nearby-hampshire").map((location) => <Link href={`/locations/${location.slug}/`} key={location.slug}><MapPin size={16} aria-hidden="true" />{location.name}<ArrowUpRight size={15} aria-hidden="true" /></Link>)}
        </div>
      </section>

      <section className="closing-cta wrap"><div><p className="eyebrow">For local builders</p><h2>Make your business easier to find.</h2><p>See how a builder profile could work. This sign-up demo does not create an account or send an email.</p></div><Link className="button" href="/builder-area/">Open builder demo <ArrowRight size={17} aria-hidden="true" /></Link></section>

      <section className="sr-only" aria-label="Directory demonstration details"><h2>Example listing count</h2><p>{demoBuilders.length} fictional builder profiles are included for product demonstration only.</p></section>
    </>
  );
}
