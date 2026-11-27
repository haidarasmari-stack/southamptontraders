import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { buildFaqPageJsonLd, serializeJsonLd } from "@/data/jsonld";
import { costFactors, hiringChecks, type Faq } from "@/data/serviceGuidance";

export function CostFactors({ serviceSlug, title }: { serviceSlug: string; title: string }) {
  const factors = costFactors[serviceSlug];
  if (!factors?.length) return null;
  return <section className="section-block guidance-section" aria-labelledby="cost-factors-title">
    <p className="eyebrow">Pricing</p>
    <h2 id="cost-factors-title">{title}</h2>
    <p>Prices depend on the job, so ask each business for a written, itemised quote after a site visit. These are the things that usually change the price:</p>
    <ul className="guidance-list">{factors.map((factor) => <li key={factor}>{factor}</li>)}</ul>
    <p className="results-disclaimer">Southampton Traders does not publish price estimates. See <Link href="/homeowner-guides/">how to compare builder quotes</Link>.</p>
  </section>;
}

export function HiringChecklist({ title = "How to check a business before you hire" }: { title?: string }) {
  return <section className="section-block guidance-section" aria-labelledby="hiring-checklist-title">
    <p className="eyebrow">Check before you hire</p>
    <h2 id="hiring-checklist-title">{title}</h2>
    <p>Southampton Traders does not vet listed businesses. These checks take a few minutes and use official sources you can rely on.</p>
    <ol className="hiring-checklist">{hiringChecks.map((check) => <li key={check.heading}>
      <h3>{check.heading}</h3>
      <p>{check.body}</p>
      {check.link && <a className="text-link" href={check.link.href} target="_blank" rel="noopener noreferrer">{check.link.label} <ArrowUpRight size={14} aria-hidden="true" /></a>}
    </li>)}</ol>
    <p className="results-disclaimer">Read the full <Link href="/guides/checking-a-builder/">guide to checking a builder</Link>.</p>
  </section>;
}

export function FaqSection({ faqs, title, pageUrl }: { faqs: Faq[]; title: string; pageUrl: string }) {
  if (!faqs.length) return null;
  return <section className="section-block guidance-section" aria-labelledby="faq-title">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqPageJsonLd(pageUrl, faqs)) }} />
    <p className="eyebrow">Questions</p>
    <h2 id="faq-title">{title}</h2>
    <div className="faq-list">{faqs.map((faq) => <article key={faq.question} className="faq-item">
      <h3>{faq.question}</h3>
      <p>{faq.answer}</p>
    </article>)}</div>
  </section>;
}
