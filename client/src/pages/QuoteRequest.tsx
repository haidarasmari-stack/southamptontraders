import { ArrowLeft, CheckCircle2, ClipboardCheck } from "lucide-react";
import { FormEvent, useState } from "react";
import { Link } from "wouter";
import { Breadcrumbs } from "@/components/SiteFrame";
import { getBuilder, locations, services } from "@/data/catalog";
import { usePageMeta } from "@/lib/seo";

export default function QuoteRequest() {
  const [submitted, setSubmitted] = useState(false);
  const params = new URLSearchParams(typeof window === "undefined" ? "" : window.location.search);
  const selectedBuilder = getBuilder(params.get("builder") ?? undefined);
  usePageMeta({ title: "Request a quote · demo | Southampton Traders", description: "Try the Southampton Traders project enquiry form in demonstration mode. No personal details are sent or stored.", path: "/request-quote/", noindex: true });

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  }

  return (
    <div className="page wrap narrow-page">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Request a quote" }]} />
      <Link className="back-link" href={selectedBuilder ? `/builder/${selectedBuilder.slug}/` : "/builders/southampton/"}><ArrowLeft size={15} aria-hidden="true" /> Back</Link>
      <div className="page-heading"><p className="eyebrow">Enquiry preview · not sent</p><h1>Tell us about the work.</h1><p className="section-intro">{selectedBuilder ? `This demo form is shown for ${selectedBuilder.name}.` : "Describe your project to see how a quote request could work."} No builder will receive this information.</p></div>
      <div className="form-warning"><ClipboardCheck size={20} aria-hidden="true" /><p><strong>Please use test details only.</strong> This public demonstration does not send or save form values. Do not enter real names, phone numbers, email addresses, addresses or project details.</p></div>
      {submitted ? <div className="confirmation-card" role="status"><span className="confirmation-icon"><CheckCircle2 size={24} aria-hidden="true" /></span><div><p className="eyebrow">Demo complete</p><h2>Your example request was not sent.</h2><p>No builder was contacted and nothing was saved. When real enquiries are enabled, this screen will explain exactly which builders receive your details and how to manage them.</p><Link className="button" href="/builders/southampton/">Return to builders</Link></div></div> : <form className="form-card" onSubmit={submit}>
        <div className="form-section-title"><span>01</span><div><h2>Project details</h2><p>Share a little about what you want to build.</p></div></div>
        <label className="form-field"><span>Type of work <b>*</b></span><select name="service" required defaultValue=""><option value="" disabled>Select a service</option>{services.map((service) => <option key={service.slug} value={service.slug}>{service.name}</option>)}</select></label>
        <label className="form-field"><span>Project location <b>*</b></span><select name="location" required defaultValue=""><option value="" disabled>Select a town</option>{locations.map((location) => <option key={location.slug} value={location.slug}>{location.name}</option>)}</select></label>
        <label className="form-field"><span>What would you like done? <b>*</b></span><textarea name="description" required minLength={20} maxLength={1200} rows={5} placeholder="A short test description (20–1,200 characters)" /><small>Keep this to sample text. Do not include an address or any private information.</small></label>
        <div className="form-row"><label className="form-field"><span>When are you hoping to start? <b>*</b></span><select name="timing" required defaultValue=""><option value="" disabled>Select timing</option><option>As soon as possible (demo)</option><option>Within 1–3 months (demo)</option><option>In 3–6 months (demo)</option><option>Just planning (demo)</option></select></label><label className="form-field"><span>Budget range <small>(optional)</small></span><select name="budget" defaultValue=""><option value="">Prefer not to say</option><option>Under £5,000 (demo)</option><option>£5,000–£15,000 (demo)</option><option>£15,000–£50,000 (demo)</option><option>£50,000+ (demo)</option></select></label></div>
        <div className="form-section-title section-divider"><span>02</span><div><h2>Your contact details</h2><p>Only use fictional test values in this live demonstration.</p></div></div>
        <label className="form-field"><span>Name <b>*</b></span><input name="name" required autoComplete="off" maxLength={80} placeholder="Example Customer" /></label>
        <div className="form-row"><label className="form-field"><span>Email <b>*</b></span><input name="email" type="email" required autoComplete="off" maxLength={120} placeholder="you@example.test" /></label><label className="form-field"><span>Phone <small>(optional)</small></span><input name="phone" type="tel" autoComplete="off" maxLength={24} placeholder="Example number only" /></label></div>
        <label className="form-field consent-field"><input type="checkbox" name="demoAcknowledgement" required /><span>I understand this is a demonstration. My details will not be sent to a builder or saved.</span></label>
        <div className="honeypot" aria-hidden="true"><label htmlFor="website">Leave this blank</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
        <button className="button button-full form-submit" type="submit">Preview request confirmation <CheckCircle2 size={17} aria-hidden="true" /></button>
        <p className="form-privacy-note">In the real service, you would be told which builder(s) see your enquiry before you submit it. <Link href="/privacy/">Read the demo privacy note.</Link></p>
      </form>}
    </div>
  );
}
