import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import GuideArticleLayout from "@/components/GuideArticleLayout";
import { hiringChecks } from "@/data/serviceGuidance";

const pagePath = "/guides/checking-a-builder";

export default function CheckingABuilderGuide() {
  return <GuideArticleLayout path={pagePath} headline="How to check a builder before you hire" section="Hiring guidance" publishedDate="2026-11-27">
    <section aria-labelledby="why-check">
      <h2 id="why-check">Why you should check for yourself</h2>
      <p>Southampton Traders lists businesses from public company and trade sources. We do not vet, rate or recommend them. Whichever site you use to find a builder, a few minutes of your own checks using official registers is the most reliable way to avoid problems.</p>
    </section>

    <section aria-labelledby="seven-checks">
      <h2 id="seven-checks">Seven checks before you hire</h2>
      {hiringChecks.map((check) => <div key={check.heading}>
        <h3>{check.heading}</h3>
        <p>{check.body}{check.link && <> <a href={check.link.href} target="_blank" rel="noopener noreferrer">{check.link.label} <ArrowUpRight size={13} aria-hidden="true" /></a></>}</p>
      </div>)}
    </section>

    <section aria-labelledby="warning-signs">
      <h2 id="warning-signs">Warning signs</h2>
      <ul>
        <li>Someone knocks on your door saying your roof, drive or chimney needs urgent work.</li>
        <li>Pressure to decide on the spot, or a price that is only available today.</li>
        <li>Requests for cash only, or for a large payment before any work or materials arrive.</li>
        <li>No landline, business address or written quote, only a mobile number.</li>
        <li>Reluctance to show insurance, registration numbers or previous work.</li>
      </ul>
    </section>

    <section aria-labelledby="references">
      <h2 id="references">Ask for references and recent work</h2>
      <p>Ask for two or three recent customers with similar jobs, and phone them. Ask whether the work finished on time and on budget, how changes were handled, and whether they would hire the business again. If you can, look at finished work in person. Reviews on any website are useful, but a conversation with a previous customer tells you more.</p>
    </section>

    <section aria-labelledby="approved-traders">
      <h2 id="approved-traders">Trading Standards approved trader schemes</h2>
      <p>Some councils run approved trader schemes, such as Buy With Confidence, where Trading Standards checks a business before it can join. If a business says it is a member, check the scheme's own website. <a href="https://www.buywithconfidence.gov.uk/" target="_blank" rel="noopener noreferrer">Search Buy With Confidence <ArrowUpRight size={13} aria-hidden="true" /></a></p>
    </section>

    <section aria-labelledby="problems">
      <h2 id="problems">If something goes wrong</h2>
      <p>Raise the problem with the business in writing first and keep copies of quotes, invoices, messages and photos. If that does not resolve it, the Citizens Advice consumer helpline (0808 223 1133) can advise and pass reports to Trading Standards. If the business belongs to a trade scheme, the scheme may have a complaints or dispute process.</p>
    </section>

    <div className="content-page-cta">
      <Link className="button" href="/locations/southampton/">Browse Southampton builders <ArrowRight size={16} aria-hidden="true" /></Link>
      <Link className="button button-outline" href="/project-brief/">Prepare a project brief <ArrowRight size={16} aria-hidden="true" /></Link>
    </div>
  </GuideArticleLayout>;
}
