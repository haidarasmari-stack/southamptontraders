import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import GuideArticleLayout from "@/components/GuideArticleLayout";

const pagePath = "/guides/loft-conversion";

export default function LoftConversionGuide() {
  return <GuideArticleLayout path={pagePath} headline="Loft conversion guide for Southampton homeowners" section="Loft conversion guidance">
    <section aria-labelledby="what-is-loft-conversion">
      <h2 id="what-is-loft-conversion">What is a loft conversion?</h2>
      <p>A loft conversion adapts some or all of the space beneath a roof so it can be used as part of the home. Depending on the building and proposal, the design may involve a new staircase, insulation, roof windows or other structural changes. The work needed is specific to the property; a directory listing or general guide cannot establish whether a particular loft is suitable.</p>
    </section>

    <section aria-labelledby="loft-feasibility">
      <h2 id="loft-feasibility">What to check before planning the work</h2>
      <p>Ask a suitably qualified professional to assess the roof and existing structure, usable headroom and floor area, safe access, daylight, insulation, services and the room you intend to create. Consider where a staircase could go, how storage may change, and how the work would affect the rest of the home. These are topics for a property-specific assessment, not a checklist that can confirm feasibility on its own.</p>
    </section>

    <section aria-labelledby="loft-design-approvals">
      <h2 id="loft-design-approvals">Agree who will handle design and approvals</h2>
      <p>Before appointing a builder, ask who will develop the design and technical information, assess any structural changes, and coordinate specialist work. Confirm with the relevant local authority and your project professionals which planning, building-control or other requirements apply to your proposal. Ask who is responsible for applications, inspections and records; do not assume that every loft project follows the same approval route.</p>
    </section>

    <section aria-labelledby="loft-builder-questions">
      <h2 id="loft-builder-questions">Questions to ask loft-conversion builders</h2>
      <p>Ask what surveys or drawings the proposal is based on, what work is included and excluded, and whether the price assumes particular structural work, stairs, roof windows, insulation, services or finishes. Clarify who manages the project and any specialist trades, how the home will be protected, what the work sequence is, and how changes, delays and defects will be handled. Request written answers and a clear scope before agreeing to proceed.</p>
    </section>

    <section aria-labelledby="loft-quotes">
      <h2 id="loft-quotes">Compare loft-conversion quotes fairly</h2>
      <p>Give each builder the same drawings, specification and brief where possible. Compare the scope, structural assumptions, access and staircase details, roof alterations, materials and allowances, services, finishing work, waste, duration assumptions, payment stages and change process. Ask builders to explain differences in writing. A total is only comparable when you understand what each proposal includes; this guide does not provide verified local prices.</p>
    </section>

    <section aria-labelledby="loft-or-extension">
      <h2 id="loft-or-extension">Loft conversion or house extension?</h2>
      <p>A loft conversion adapts space within the roof; an extension adds space outside the current footprint. Compare the room shape and headroom you could achieve, access, daylight, storage, the site's constraints and the disruption you can accommodate. The better fit depends on the existing home and the space you need, so ask a professional to assess both options where appropriate. Read the <Link href="/guides/home-extension-planning/">house extension planning guide</Link> for a structured way to prepare that alternative project.</p>
    </section>

    <div className="content-page-cta">
      <Link className="button" href="/services/loft-conversions/">Browse loft-conversion listings <ArrowRight size={16} aria-hidden="true" /></Link>
      <Link className="button button-outline" href="/project-brief/">Prepare a project brief <ArrowRight size={16} aria-hidden="true" /></Link>
    </div>
  </GuideArticleLayout>;
}
