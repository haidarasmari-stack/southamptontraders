import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import GuideArticleLayout from "@/components/GuideArticleLayout";

const pagePath = "/guides/party-wall-agreements";

export default function PartyWallGuide() {
  return <GuideArticleLayout path={pagePath} headline="Party wall agreements: a homeowner's guide" section="Planning and approvals" publishedDate="2026-11-27">
    <section aria-labelledby="what-is-it">
      <h2 id="what-is-it">What the Party Wall Act is for</h2>
      <p>The Party Wall etc. Act 1996 applies in England and Wales. If you plan certain building work on or near a wall, boundary or foundations you share with a neighbour, it says you must tell them in writing before you start. It gives both sides a set way to agree the work or settle disagreements. People often call the end result a "party wall agreement", although the formal document is a <strong>party wall award</strong>.</p>
      <p>The Act is separate from planning permission and building regulations. Having one does not replace the others, and it does not decide where a boundary is.</p>
    </section>

    <section aria-labelledby="what-work">
      <h2 id="what-work">Work that usually needs notice</h2>
      <ul>
        <li><strong>Work to a shared wall</strong>, such as cutting into it to take steel beams for a loft conversion, removing a chimney breast attached to it, raising it, or demolishing and rebuilding it.</li>
        <li><strong>Building a new wall</strong> on or right up against the boundary line, for example the side wall of a rear extension.</li>
        <li><strong>Digging foundations near a neighbour's building</strong>: within 3 metres of it and deeper than its foundations, or within 6 metres if the dig would go below a 45-degree line down from the bottom of its foundations.</li>
      </ul>
      <p>Minor work, such as putting up shelves, fixing kitchen units or rewiring, does not normally need notice. If in doubt, ask your designer or a party wall surveyor.</p>
    </section>

    <section aria-labelledby="notice">
      <h2 id="notice">How and when to give notice</h2>
      <p>The person doing the work, called the building owner, must serve written notice on each affected neighbour. That includes leaseholders with more than a year left on their lease, as well as freeholders. The notice should describe the work and when it will start.</p>
      <ul>
        <li><strong>At least 2 months before</strong> work to a shared wall starts.</li>
        <li><strong>At least 1 month before</strong> building a new wall on the boundary or digging near a neighbour's foundations.</li>
      </ul>
      <p>A neighbour can agree to a shorter notice period in writing. A notice lapses if the work does not start within a year. Templates for the notices are in the government's guidance.</p>
      <p><a href="https://www.gov.uk/party-walls-building-works" target="_blank" rel="noopener noreferrer">Read the GOV.UK guide to party walls <ArrowUpRight size={13} aria-hidden="true" /></a></p>
    </section>

    <section aria-labelledby="responses">
      <h2 id="responses">What happens after the notice</h2>
      <p>Your neighbour can agree to the work in writing, or disagree. If they do neither within 14 days, the law treats it as a dispute.</p>
      <p>A dispute here does not mean an argument. It simply starts the formal process: the two of you either appoint one <strong>agreed surveyor</strong> to act for both, or each appoint your own surveyor. The surveyors usually record the condition of the neighbour's property before work starts and then make an award setting out how and when the work will be done. The building owner normally pays the surveyors' fees.</p>
      <p>Talking to your neighbours before the notice arrives, and showing them the drawings, often makes the process quicker and friendlier.</p>
    </section>

    <section aria-labelledby="ignore">
      <h2 id="ignore">If notice is not given</h2>
      <p>There is no criminal penalty, but a neighbour can seek a court order to stop the work until the proper process is followed. A missing notice can also make it harder to resolve claims for damage later. Building without the right notices can cause delays and extra costs that are far greater than doing it properly at the start.</p>
    </section>

    <section aria-labelledby="party-wall-questions">
      <h2 id="party-wall-questions">Questions to ask your builder or designer</h2>
      <ul>
        <li>Does any part of this job need party wall notices, and which neighbours are affected?</li>
        <li>Who will prepare and serve the notices, and has that been allowed for in the timetable?</li>
        <li>Is the quoted start date realistic given the notice periods?</li>
        <li>How will the neighbour's side of the wall and garden be protected during the work?</li>
      </ul>
      <p>Party wall notices are often needed for <Link href="/services/loft-conversions/">loft conversions</Link> in terraced and semi-detached houses and for <Link href="/services/extensions/">extensions</Link> built close to the boundary. For permission questions, read <Link href="/guides/planning-permission/">do I need planning permission?</Link></p>
    </section>

    <div className="content-page-cta">
      <Link className="button" href="/guides/loft-conversion/">Read the loft conversion guide <ArrowRight size={16} aria-hidden="true" /></Link>
      <Link className="button button-outline" href="/homeowner-guides/">More homeowner guides <ArrowRight size={16} aria-hidden="true" /></Link>
    </div>
  </GuideArticleLayout>;
}
