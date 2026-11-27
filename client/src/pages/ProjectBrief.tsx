import { ArrowRight, Clipboard, Printer, ShieldCheck } from "lucide-react";
import { type FormEvent, useState } from "react";
import { Link } from "wouter";
import { Breadcrumbs } from "@/components/SiteFrame";
import { locations, services } from "@/data/catalog";
import { buildProjectBrief } from "@/lib/projectBrief";
import { usePageMeta } from "@/lib/seo";

export default function ProjectBrief() {
  const [service, setService] = useState("");
  const [area, setArea] = useState("southampton");
  const [scope, setScope] = useState("");
  const [materials, setMaterials] = useState("");
  const [timing, setTiming] = useState("Flexible / not sure");
  const [brief, setBrief] = useState("");
  const [status, setStatus] = useState("");

  usePageMeta({
    title: "Prepare a builder project brief | Southampton Traders",
    description: "Create a copy-ready project outline to discuss with builders. It stays in page memory and is not sent or saved by Southampton Traders.",
    path: "/project-brief/",
    noindex: true,
  });

  function prepareBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const selectedService = services.find((item) => item.slug === service);
    const selectedArea = locations.find((item) => item.slug === area);
    setBrief(buildProjectBrief({
      service: selectedService?.name ?? "",
      area: selectedArea?.name ?? "",
      scope,
      materials,
      timing,
    }));
    setStatus("Draft prepared. No enquiry was submitted, sent or saved.");
  }

  async function copyBrief() {
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard access unavailable");
      await navigator.clipboard.writeText(brief);
      setStatus("Copied to your clipboard. You can share it yourself with businesses.");
    } catch {
      setStatus("Clipboard access was blocked. You can select and copy the draft below instead.");
    }
  }

  return (
    <div className="page wrap project-brief-page">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Prepare a project brief" }]} />
      <div className="page-heading">
        <p className="eyebrow">A clearer first conversation</p>
        <h1>Prepare a project brief.</h1>
        <p className="section-intro">Set out the basics once, then use the same outline when you speak to each builder. This tool does not request quotes or contact any business.</p>
      </div>

      <div className="project-brief-layout">
        <form className="form-card project-brief-form" onSubmit={prepareBrief}>
          <div className="privacy-callout project-brief-privacy" role="note">
            <ShieldCheck size={20} aria-hidden="true" />
            <p><strong>Private draft, not an enquiry.</strong> Your entries stay in this open page only; they are not sent to Southampton Traders, analytics or builders, and are not saved to browser storage. Do not enter names, phone/email, exact addresses, access details or sensitive information.</p>
          </div>

          <div className="form-row">
            <label className="form-field"><span>What service is this for? <b aria-hidden="true">*</b></span>
              <select required value={service} onChange={(event) => setService(event.target.value)}>
                <option value="" disabled>Choose a service</option>
                {services.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
              </select>
            </label>
            <label className="form-field"><span>Which launch area? <b aria-hidden="true">*</b></span>
              <select required value={area} onChange={(event) => setArea(event.target.value)}>
                {locations.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
              </select>
            </label>
          </div>

          <label className="form-field"><span>What work are you planning? <b aria-hidden="true">*</b></span>
            <textarea required maxLength={700} rows={5} value={scope} onChange={(event) => setScope(event.target.value)} placeholder="For example: replace the kitchen units and worktops, keeping the existing layout." />
            <small>Describe the work only—leave out names and property addresses. Up to 700 characters.</small>
          </label>

          <label className="form-field"><span>Materials or preferences <span className="field-optional">(optional)</span></span>
            <textarea maxLength={400} rows={3} value={materials} onChange={(event) => setMaterials(event.target.value)} placeholder="For example: undecided on materials; would like low-maintenance options." />
            <small>Up to 400 characters. Do not add personal or confidential information.</small>
          </label>

          <label className="form-field"><span>When would you like the work to start?</span>
            <select value={timing} onChange={(event) => setTiming(event.target.value)}>
              <option>As soon as practical</option>
              <option>Within 1–3 months</option>
              <option>More than 3 months away</option>
              <option>Flexible / not sure</option>
            </select>
          </label>

          <button className="button form-submit" type="submit">Prepare my draft <ArrowRight size={17} aria-hidden="true" /></button>
          <p className="form-privacy-note">Nothing is submitted. <Link href="/privacy/">Read the privacy information</Link>.</p>
        </form>

        <aside className="project-brief-aside" aria-labelledby="project-brief-tips-title">
          <p className="eyebrow">Make quotes easier to compare</p>
          <h2 id="project-brief-tips-title">Give each builder the same starting point.</h2>
          <ol>
            <li>Describe the work and what you would like included.</li>
            <li>Note material preferences, or say if you are undecided.</li>
            <li>Ask each business for a written quote and expected dates.</li>
          </ol>
          <p>Confirm services, availability, quote details and relevant credentials directly with each business. Southampton Traders does not vet, recommend or guarantee listed companies.</p>
        </aside>
      </div>

      {brief && <section className="project-brief-preview" aria-labelledby="project-brief-preview-title">
        <div className="project-brief-preview-heading">
          <div><p className="eyebrow">Ready for your own use</p><h2 id="project-brief-preview-title">Your project brief</h2></div>
          <div className="project-brief-actions">
            <button className="button button-outline" type="button" onClick={copyBrief}><Clipboard size={16} aria-hidden="true" /> Copy draft</button>
            <button className="button button-outline" type="button" onClick={() => window.print()}><Printer size={16} aria-hidden="true" /> Print</button>
          </div>
        </div>
        <p className="project-brief-status" role="status">{status}</p>
        <pre className="project-brief-output">{brief}</pre>
      </section>}

      <nav className="project-brief-related" aria-label="Next steps">
        <Link className="text-link" href="/builders/southampton/">Browse Southampton builders <ArrowRight size={16} aria-hidden="true" /></Link>
        <Link className="text-link" href="/shortlist/">Compare saved profiles <ArrowRight size={16} aria-hidden="true" /></Link>
      </nav>
    </div>
  );
}
