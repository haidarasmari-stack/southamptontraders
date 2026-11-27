import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import GuideArticleLayout from "@/components/GuideArticleLayout";

const pagePath = "/guides/home-extension-planning";

export default function HomeExtensionGuide() {
  return <GuideArticleLayout path={pagePath} headline="House extension planning guide for Southampton homeowners" section="Home extension planning">
    <section aria-labelledby="extension-goals">
      <h2 id="extension-goals">Start with what the new space needs to do</h2>
      <p>Before looking at drawings or asking for a price, write down the problem you want the extension to solve. Note which rooms or activities need more space, how the new area should connect to the existing home, and which parts of the house need to remain usable during the work. A clear outcome helps a designer and builders discuss the same project rather than make different assumptions.</p>
    </section>

    <section aria-labelledby="extension-feasibility">
      <h2 id="extension-feasibility">Check the property and site before settling on a design</h2>
      <p>The existing layout and structure, boundaries, access, drainage, services, daylight and the intended room can all affect the design. The actual site and building need to be assessed; online guidance cannot confirm what is feasible for a particular home. Gather any plans you already have and ask an appropriately qualified designer or building professional to identify what needs checking before the scope is fixed.</p>
    </section>

    <section aria-labelledby="extension-approvals">
      <h2 id="extension-approvals">Confirm planning and building-control requirements</h2>
      <p>Do not assume that every extension needs the same permissions, or that none are needed. Requirements depend on the property and proposal. Ask the relevant local authority and your project professionals which planning, building-control or other approvals may apply, who will prepare the information, and who is responsible for submitting applications and arranging the required checks. Agree responsibilities in writing before work begins. Our guides to <Link href="/guides/planning-permission/">planning permission</Link> and <Link href="/guides/party-wall-agreements/">party wall notices</Link> explain the main rules.</p>
    </section>

    <section aria-labelledby="extension-brief">
      <h2 id="extension-brief">Prepare a clear project brief for builders</h2>
      <p>A useful brief describes the intended rooms and functions, the connection to the existing home, known site constraints, preferred materials or finishes, access and disruption considerations, timing expectations, and any drawings or specifications available. Separate decisions that are already settled from options still open to discussion. Southampton Traders' <Link href="/project-brief/">project brief tool</Link> can help draft an outline in your browser; the details are not sent or saved by this site.</p>
    </section>

    <section aria-labelledby="extension-questions">
      <h2 id="extension-questions">Questions to ask extension builders</h2>
      <p>Ask what work is included and excluded, which materials or allowances are assumed, who will manage the job, and who will carry out any specialist tasks. Clarify how the site will be protected and accessed, what the expected work sequence is, how waste and making good are handled, how payment stages work, and how changes or delays will be agreed. Request written explanations for unclear points before comparing proposals.</p>
    </section>

    <section aria-labelledby="extension-quotes">
      <h2 id="extension-quotes">Compare extension quotes on the same scope</h2>
      <p>Give each builder the same drawings, specification and written brief where possible. Compare the work items, exclusions, material allowances, access arrangements, duration assumptions, payment stages and process for variations—not just the headline total. Site preparation, structural work, access, roof and brickwork choices, services, finishes and waste arrangements are examples of details to clarify. They are questions to ask about, not local price estimates; ask for an itemised assessment based on your property and the agreed work.</p>
    </section>

    <section aria-labelledby="extension-or-loft">
      <h2 id="extension-or-loft">Could a loft conversion suit the project instead?</h2>
      <p>An extension adds space beyond the existing footprint, while a loft conversion adapts space beneath the roof. Compare the usable room shape, access, daylight, headroom, storage, site constraints and disruption. A professional can assess what is feasible in your property. Read the <Link href="/guides/loft-conversion/">loft conversion guide</Link> or browse <Link href="/services/extensions/">extension builder listings</Link>; directory listings are not verified recommendations.</p>
    </section>

    <div className="content-page-cta">
      <Link className="button" href="/services/extensions/">Browse extension builder listings <ArrowRight size={16} aria-hidden="true" /></Link>
      <Link className="button button-outline" href="/homeowner-guides/">More homeowner guides <ArrowRight size={16} aria-hidden="true" /></Link>
    </div>
  </GuideArticleLayout>;
}
