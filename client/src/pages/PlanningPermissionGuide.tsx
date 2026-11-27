import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import GuideArticleLayout from "@/components/GuideArticleLayout";

const pagePath = "/guides/planning-permission";

const external = (href: string, label: string) => <a href={href} target="_blank" rel="noopener noreferrer">{label} <ArrowUpRight size={13} aria-hidden="true" /></a>;

export default function PlanningPermissionGuide() {
  return <GuideArticleLayout path={pagePath} headline="Do I need planning permission? A guide for Hampshire homeowners" section="Planning and approvals" publishedDate="2026-11-27">
    <section aria-labelledby="short-answer">
      <h2 id="short-answer">The short answer</h2>
      <p>Some extensions, loft conversions and porches can be built without a planning application, under rules called <strong>permitted development</strong>. Many others need planning permission. Whether your project qualifies depends on the type of property, what has already been built, where the home is, and the exact size and design of the work. This guide covers England. It explains the main questions to ask, but it is not legal or planning advice, and the council's answer is the one that counts.</p>
    </section>

    <section aria-labelledby="permitted-development">
      <h2 id="permitted-development">What permitted development means</h2>
      <p>Permitted development rights let householders carry out certain work without applying for planning permission, as long as the work stays within set limits and conditions. They apply to houses. Flats and maisonettes do not have the same householder rights, so most external changes to a flat need an application.</p>
      <p>The limits are measured against the <strong>original house</strong>: the house as it was first built, or as it stood on 1 July 1948 if it is older. Earlier extensions, including ones built by previous owners, count towards the allowance.</p>
      <h3>Common limits at the time of writing</h3>
      <p>These are the headline figures in the national rules as of November 2026. Each comes with further conditions on materials, windows, boundaries and roof shape, and changes to the rules have been proposed, so always check the current guidance on the Planning Portal before relying on them.</p>
      <ul>
        <li><strong>Single-storey rear extension:</strong> up to 3 metres deep for a semi-detached or terraced house, or 4 metres for a detached house, and no higher than 4 metres. Deeper single-storey extensions (up to 6 or 8 metres) may be possible through the council's prior approval process, which involves notifying neighbours.</li>
        <li><strong>Side extension:</strong> single storey, no higher than 4 metres, and no wider than half the width of the original house.</li>
        <li><strong>Loft conversion:</strong> no more than 40 cubic metres of extra roof space for a terraced house, or 50 cubic metres for a semi-detached or detached house. A dormer must not face the highway at the front, and balconies and raised platforms are not allowed.</li>
        <li><strong>Porch:</strong> a ground floor area of no more than 3 square metres and no higher than 3 metres.</li>
      </ul>
      <p>{external("https://www.planningportal.co.uk/", "Check the rules on the Planning Portal")}</p>
    </section>

    <section aria-labelledby="restrictions">
      <h2 id="restrictions">When the usual rules do not apply</h2>
      <p>Permitted development rights can be reduced or removed. Check these before assuming a project is allowed:</p>
      <ul>
        <li><strong>Conservation areas:</strong> side extensions, some rear extensions over one storey, cladding and roof alterations are more restricted.</li>
        <li><strong>National parks:</strong> parts of this area sit in the New Forest National Park or the South Downs National Park, where the rules are tighter and the National Park Authority deals with planning.</li>
        <li><strong>Listed buildings:</strong> listed building consent is needed for work that affects the character of a listed building, inside or out, whether or not planning permission is needed.</li>
        <li><strong>Article 4 directions:</strong> a council can remove specific rights in a defined area.</li>
        <li><strong>Planning conditions:</strong> the permission for your house, especially on newer estates, may have removed permitted development rights. Your property's planning history will show this.</li>
      </ul>
    </section>

    <section aria-labelledby="certificate">
      <h2 id="certificate">Get it confirmed with a Lawful Development Certificate</h2>
      <p>If you think a project is permitted development, you can apply to the council for a Lawful Development Certificate before building. It is optional, but it gives you a formal record that the work was lawful. That record can help when you sell the house, because a buyer's solicitor may ask for proof.</p>
    </section>

    <section aria-labelledby="building-regs">
      <h2 id="building-regs">Building regulations are a separate approval</h2>
      <p>Planning decides whether a building is acceptable in its setting. Building regulations cover how it is built: structure, fire safety, insulation, drainage, ventilation and stairs. Most extensions and loft conversions need building regulations approval even when they do not need planning permission. Approval can come from the council's building control team or a registered building control approver, and some work such as replacement windows or electrical installations can be self-certified by an installer registered with a competent person scheme.</p>
      <p>At the end of the job you should get a completion certificate. Keep it with your house documents, because you will need it when you sell. Ask your builder at the start who is arranging building control and inspections.</p>
    </section>

    <section aria-labelledby="which-council">
      <h2 id="which-council">Which council to contact</h2>
      <p>Planning and building control are run by the local district or city council, not Hampshire County Council. For the areas in this directory:</p>
      <ul>
        <li><strong>Southampton:</strong> Southampton City Council</li>
        <li><strong>Eastleigh and Hedge End:</strong> Eastleigh Borough Council</li>
        <li><strong>Fareham:</strong> Fareham Borough Council</li>
        <li><strong>Winchester:</strong> Winchester City Council, or the South Downs National Park Authority inside the park</li>
        <li><strong>Romsey:</strong> Test Valley Borough Council</li>
        <li><strong>Totton and the New Forest:</strong> New Forest District Council, or the New Forest National Park Authority inside the park</li>
      </ul>
      <p>If you are not sure which council covers your address, use the official postcode finder. {external("https://www.gov.uk/find-local-council", "Find your local council on GOV.UK")}</p>
    </section>

    <section aria-labelledby="neighbours">
      <h2 id="neighbours">Do not forget your neighbours</h2>
      <p>Even when no planning application is needed, building on or near a shared wall or boundary may mean serving notice on your neighbours under the Party Wall etc. Act 1996. Read the <Link href="/guides/party-wall-agreements/">party wall guide</Link> for what that involves.</p>
    </section>

    <section aria-labelledby="planning-questions">
      <h2 id="planning-questions">Questions to ask your designer or builder</h2>
      <ul>
        <li>Does this design need planning permission, or does it fall within permitted development? How did you check?</li>
        <li>Is the house in a conservation area or national park, or have its permitted development rights been removed?</li>
        <li>Should we apply for a Lawful Development Certificate before starting?</li>
        <li>Who is applying for building regulations approval, and who arranges the inspections?</li>
        <li>Does any of the work need party wall notices?</li>
      </ul>
    </section>

    <div className="content-page-cta">
      <Link className="button" href="/guides/home-extension-planning/">Read the extension planning guide <ArrowRight size={16} aria-hidden="true" /></Link>
      <Link className="button button-outline" href="/services/extensions/">Browse extension builders <ArrowRight size={16} aria-hidden="true" /></Link>
    </div>
  </GuideArticleLayout>;
}
