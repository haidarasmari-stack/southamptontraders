import type { ReactNode } from "react";
import { BookOpenCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/SiteFrame";
import { buildArticleJsonLd, serializeJsonLd } from "@/data/jsonld";
import { metaForPath, SITE_ORIGIN, usePageMeta } from "@/lib/seo";

const PUBLISHED_DATE = "2026-11-25";
const DISPLAY_DATE = "25 November 2026";

type GuideArticleLayoutProps = {
  path: string;
  headline: string;
  section: string;
  children: ReactNode;
  /** ISO date the guide was published, when it differs from the original guides. */
  publishedDate?: string;
};

export default function GuideArticleLayout({ path, headline, section, children, publishedDate = PUBLISHED_DATE }: GuideArticleLayoutProps) {
  const displayDate = publishedDate === PUBLISHED_DATE ? DISPLAY_DATE : new Date(`${publishedDate}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
  const meta = metaForPath(path);
  const canonicalUrl = new URL(meta.path, SITE_ORIGIN).toString();
  const jsonLd = buildArticleJsonLd(SITE_ORIGIN, canonicalUrl, {
    headline,
    description: meta.description,
    section,
    datePublished: publishedDate,
    dateModified: publishedDate,
  });

  usePageMeta(meta);

  return <div className="page wrap narrow-page">
    <Breadcrumbs items={[
      { label: "Home", href: "/" },
      { label: "Homeowner guides", href: "/homeowner-guides/" },
      { label: headline },
    ]} />
    <article className="policy-content homeowner-guide-content">
      <div className="page-heading content-page-heading">
        <span className="browse-icon"><BookOpenCheck size={21} aria-hidden="true" /></span>
        <p className="eyebrow">{section}</p>
        <h1>{headline}</h1>
        <p className="section-intro">{meta.description}</p>
        <p className="guide-byline">By Southampton Traders · First published and last updated <time dateTime={publishedDate}>{displayDate}</time></p>
      </div>
      {children}
    </article>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />
  </div>;
}
