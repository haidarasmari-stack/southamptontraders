import { ArrowRight, BookOpenCheck } from "lucide-react";
import { Link } from "wouter";
import { Breadcrumbs } from "@/components/SiteFrame";
import { usePageMeta } from "@/lib/seo";

export default function HomeownerGuides() {
  usePageMeta({
    title: "Builder & Home Extension Guides | Southampton Traders",
    description: "Southampton homeowner guides to finding a reliable builder, planning a house extension, comparing loft and renovation options, and reviewing builder quotes.",
    path: "/homeowner-guides/",
  });

  return <div className="page wrap narrow-page">
    <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Homeowner guides" }]} />
    <div className="page-heading content-page-heading">
      <span className="browse-icon"><BookOpenCheck size={21} aria-hidden="true" /></span>
      <p className="eyebrow">Plan with clearer questions</p>
      <h1>Homeowner guides to choosing building work and builders</h1>
      <p className="section-intro">Use these practical prompts to shape your project, speak with tradespeople and compare the information in their quotes. Southampton Traders is a directory, not a vetting or quote-checking service.</p>
    </div>

    <article className="policy-content homeowner-guide-content">
      <section aria-labelledby="reliable-builder">
        <h2 id="reliable-builder">How to find a reliable builder</h2>
        <p>Start with the work you need and look for builders whose stated services and area fit the project. Ask for relevant examples, who will manage the job, what work is included, and whether the people doing specialist tasks are appropriately qualified for them. Contact previous clients if the builder can provide references, and check business details and any relevant insurance or credentials directly with the provider. Ask questions, check the answers, and make your own decision: a directory listing is not a guarantee or endorsement.</p>
        <h3>Questions to ask builders</h3>
        <p>Ask who your main contact will be, who will carry out each part of the work, what is excluded, how changes are agreed, how the site will be kept safe and accessible, what the expected sequence is, and how delays or defects will be handled. Request written answers and make sure you understand them before agreeing to proceed.</p>
        <p>People searching for the <strong>best builders in Southampton</strong> should compare fit for their particular project rather than rely on a universal ranking. Our <Link href="/locations/southampton/">Southampton builder directory</Link> shows the businesses currently listed and the service information available for each; its coverage is not exhaustive and listings are not recommendations.</p>
      </section>

      <section aria-labelledby="project-choice">
        <h2 id="project-choice">Renovation vs extension: which suits your home?</h2>
        <p>A renovation changes or improves space within the existing building. An extension adds floor area beyond the current footprint. The right option depends on the space you need, the existing layout and structure, the site, your budget and the disruption you can accommodate. Write down what is not working in the home before deciding which type of work might solve it.</p>
        <h3>Extension vs loft conversion</h3>
        <p>An extension creates space outward from the building; a loft conversion adapts space within the roof. Compare usable room shape, access, daylight, headroom, structure, storage, disruption and professional design or approval needs. A suitable designer or building professional can assess what is feasible in your specific property. Browse <Link href="/services/extensions/">extension builders</Link> or <Link href="/services/loft-conversions/">loft-conversion listings</Link> to see the businesses currently included in the directory.</p>
      </section>

      <section aria-labelledby="loft-conversion">
        <h2 id="loft-conversion">What is a loft conversion?</h2>
        <p>A loft conversion adapts some or all of the space beneath a roof so it can be used as part of the home. The design may involve stairs, insulation, roof windows or other structural changes, depending on the building and proposal. The existing roof, usable headroom, access and intended room all affect what might work. Ask a suitably qualified professional to assess the property and confirm which permissions, approvals and technical requirements apply to your plans.</p>
      </section>

      <section aria-labelledby="extension-planning">
        <h2 id="extension-planning">House extension planning guide: questions to resolve first</h2>
        <p>Before requesting prices, describe the rooms and functions you want, how the new space should connect to the house, and any constraints such as access, boundaries, drainage or keeping parts of the home in use. Gather available plans and agree who will develop the design and coordinate any required applications, inspections or technical information. Requirements depend on the property and proposal, so confirm current planning and building-control requirements with the relevant local authority and your project professionals rather than assuming permission is or is not needed.</p>
        <p>A clear brief helps builders understand the same scope. Use the <Link href="/project-brief/">project brief tool</Link> to draft an outline in your browser; it is not sent or saved by this site.</p>
      </section>

      <section aria-labelledby="compare-quotes">
        <h2 id="compare-quotes">How to compare builder quotes</h2>
        <p>To compare builder quotes fairly, give each builder the same drawings, specification and scope, then check what each price includes and excludes. Compare materials and allowances, preparation and finishing, waste removal, access arrangements, project duration, payment stages, tax treatment where stated, and how variations are priced. Ask each builder to explain unclear assumptions in writing. A lower headline total may cover a different scope, so do not compare totals alone.</p>
        <h3>Builder quote comparison: make a like-for-like list</h3>
        <p>Put each quote alongside the same checklist: work items, quantities or allowances, specified products, exclusions, start and completion assumptions, payment schedule, change process and quote validity. Record unanswered questions and ask all bidders the same follow-up where possible. Southampton Traders does not assess, verify or negotiate quotes; the comparison is for you to make directly with the businesses.</p>
        <h3>Project brief for builders</h3>
        <p>A useful project brief for builders states the property area, desired outcome, rooms or parts of the home affected, known constraints, preferred materials or finishes, timing expectations and the drawings or specifications available. Separate confirmed requirements from ideas still open to discussion. Avoid sending sensitive personal details in an initial brief.</p>
      </section>

      <section aria-labelledby="costs-and-pricing">
        <h2 id="costs-and-pricing">Roofing and brickwork costs: what affects a quote?</h2>
        <p>Roofing costs can depend on roof area and shape, access and scaffold needs, the existing covering and its condition, materials, insulation or repairs included, and disposal arrangements. Brickwork costs can vary with the amount and type of work, access, brick and mortar specification, preparation, structural requirements and making good. These are factors to ask about, not price estimates; this site does not publish a verified local price guide. Request an itemised assessment based on the actual property and scope.</p>
        <h3>Fixed price or day rate for a building project?</h3>
        <p>A fixed price can make the agreed scope and total easier to understand, but check assumptions, exclusions and the process for changes. A day rate charges for time and should explain the rate, expected crew, how time is recorded, materials and any other costs, plus how the total will be kept under review. Neither approach removes the need for a written scope and clear change approval. Ask the builder which arrangement suits the known and unknown parts of your project and get the terms in writing.</p>
      </section>

      <div className="content-page-cta">
        <Link className="button" href="/locations/southampton/">Browse Southampton builders <ArrowRight size={16} aria-hidden="true" /></Link>
        <Link className="button button-outline" href="/project-brief/">Prepare a project brief <ArrowRight size={16} aria-hidden="true" /></Link>
      </div>
    </article>
  </div>;
}
