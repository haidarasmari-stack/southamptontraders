import { ArrowRight, BookmarkCheck, Trash2 } from "lucide-react";
import { Link } from "wouter";
import BuilderCard from "@/components/BuilderCard";
import { Breadcrumbs } from "@/components/SiteFrame";
import { useShortlist } from "@/contexts/ShortlistContext";
import { getBuilder } from "@/data/catalog";
import { usePageMeta } from "@/lib/seo";

export default function Shortlist() {
  const { savedBuilderSlugs, ready, clearShortlist } = useShortlist();
  const savedBuilders = savedBuilderSlugs.map((slug) => getBuilder(slug)).filter((builder) => builder !== undefined);
  usePageMeta({
    title: "Your builder shortlist | Southampton Traders",
    description: "Review builder profiles you saved in this browser and compare their listed services and contact details.",
    path: "/shortlist/",
    noindex: true,
  });

  return (
    <div className="page wrap">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Your shortlist" }]} />
      <div className="page-heading shortlist-heading">
        <p className="eyebrow">Compare at your pace · Southampton Traders</p>
        <h1>Your builder shortlist</h1>
        <p className="section-intro">Save profiles while you browse, then compare their listed services and contact details. Your shortlist is stored in this browser only; it is not an enquiry or recommendation.</p>
        <Link className="button button-outline project-brief-shortlist-link" href="/project-brief/">Prepare a brief to compare quotes <ArrowRight size={16} aria-hidden="true" /></Link>
        {ready && savedBuilders.length > 0 && (
          <button className="button button-outline shortlist-clear" type="button" onClick={clearShortlist}>
            <Trash2 size={16} aria-hidden="true" /> Clear shortlist
          </button>
        )}
      </div>

      {!ready ? (
        <p className="shortlist-status" role="status">Loading saved profiles…</p>
      ) : savedBuilders.length > 0 ? (
        <>
          <section className="section-block" aria-labelledby="saved-profiles-title">
            <div className="section-heading"><div><p className="eyebrow">Saved in this browser</p><h2 id="saved-profiles-title">{savedBuilders.length} {savedBuilders.length === 1 ? "profile" : "profiles"} to compare</h2></div></div>
            <div className="builder-card-list">
              {savedBuilders.map((builder) => <BuilderCard key={builder.slug} builder={builder} sponsored={builder.sponsoredServiceSlugs.length > 0} />)}
            </div>
          </section>
          <section className="shortlist-guide" aria-labelledby="compare-title">
            <p className="eyebrow">Before you choose</p>
            <h2 id="compare-title">Ask each business the same questions.</h2>
            <ul>
              <li>Does the company take on the service and work you need?</li>
              <li>What is included in the written quote, and what could change the price?</li>
              <li>Who will do the work, and what are the expected start and finish dates?</li>
              <li>Which qualifications, insurance or permissions are relevant to this project?</li>
            </ul>
            <p>Confirm answers and current availability directly with each business. Southampton Traders does not verify, recommend or guarantee listed companies.</p>
          </section>
        </>
      ) : (
        <section className="empty-state shortlist-empty">
          <span className="empty-icon"><BookmarkCheck size={21} aria-hidden="true" /></span>
          <h2>No saved profiles yet</h2>
          <p>Choose “Save to shortlist” on any builder card or profile to collect a few options here. Saved profile IDs stay in this browser.</p>
          <Link className="button" href="/builders/southampton/">Find builders <ArrowRight size={16} aria-hidden="true" /></Link>
        </section>
      )}
    </div>
  );
}
