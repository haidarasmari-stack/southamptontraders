import { ArrowRight, BriefcaseBusiness, CheckCircle2, ClipboardList, Eye, PencilLine, Send, ShieldCheck } from "lucide-react";
import { FormEvent, useState } from "react";
import { Link } from "wouter";
import { Breadcrumbs } from "@/components/SiteFrame";
import { locations, services } from "@/data/catalog";
import { usePageMeta } from "@/lib/seo";

type ProfilePreview = {
  businessName: string;
  website: string;
  description: string;
  services: string[];
  locations: string[];
  hours: string;
  credentials: string;
};

const demoEnquiries = [
  { id: "Q-101", work: "Kitchen renovation", place: "Southampton", timing: "Planning ahead", status: "New" },
  { id: "Q-102", work: "Small extension", place: "Eastleigh", timing: "Within 1–3 months", status: "Sample only" },
];

export default function BuilderArea() {
  const [activeTab, setActiveTab] = useState<"overview" | "profile" | "enquiries">("overview");
  const [preview, setPreview] = useState<ProfilePreview | null>(null);
  const [notice, setNotice] = useState("");
  const [requestSent, setRequestSent] = useState(false);
  const [requestError, setRequestError] = useState("");
  const [requestPending, setRequestPending] = useState(false);
  usePageMeta({ title: "Get your building business listed | Southampton Traders", description: "Builders and companies can send Southampton Traders a request to be considered for the local directory. Requests are reviewed and are not published automatically.", path: "/builder-area/", noindex: true });

  const savePreview = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const text = (name: string) => String(values.get(name) ?? "").trim();
    setPreview({
      businessName: text("businessName") || "Example Building Company",
      website: text("website"),
      description: text("description") || "Fictional profile for demonstration.",
      services: values.getAll("services").map(String),
      locations: values.getAll("locations").map(String),
      hours: text("hours"),
      credentials: text("credentials"),
    });
    setNotice("Profile preview updated in this page only. It was not saved.");
  };

  const submitListingRequest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRequestError("");
    const form = event.currentTarget;
    const values = new FormData(form);
    const text = (name: string) => String(values.get(name) ?? "").trim();
    const serviceSlugs = values.getAll("serviceSlugs").map(String) as (typeof services)[number]["slug"][];
    const locationSlugs = values.getAll("locationSlugs").map(String) as (typeof locations)[number]["slug"][];
    if (values.get("consent") !== "on") {
      setRequestError("Confirm that you are authorized to send these details for review.");
      return;
    }
    if (!serviceSlugs.length || !locationSlugs.length) {
      setRequestError("Choose at least one service and one area served.");
      return;
    }
    setRequestPending(true);
    try {
      const response = await fetch("/api/builder-application", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
        businessName: text("businessName"),
        contactName: text("contactName"),
        contactEmail: text("contactEmail"),
        contactPhone: text("contactPhone") || undefined,
        websiteUrl: text("websiteUrl") || undefined,
        description: text("description"),
        serviceSlugs,
        locationSlugs,
        consent: true,
        honeypot: text("companyFax"),
        }),
      });
      if (!response.ok) {
        const error = await response.json().catch(() => null) as { message?: string } | null;
        throw new Error(error?.message || "The request could not be delivered. Please try again later.");
      }
      form.reset();
      setRequestSent(true);
    } catch (error) {
      setRequestError(error instanceof Error && error.message.startsWith("Too many requests")
        ? error.message
        : "We couldn't deliver your request just now. Your details remain in this form; please try again later.");
    } finally {
      setRequestPending(false);
    }
  };

  const registerPreview = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNotice("Registration preview complete. No account was created and no verification email was sent.");
    event.currentTarget.reset();
  };

  return <div className="page wrap">
    <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "For builders" }]} />
    <div className="page-heading"><p className="eyebrow">For local builders and companies</p><h1>Request to be listed.</h1><p className="section-intro">Share your business details for Southampton Traders to review. A request is not an account, endorsement or automatic directory listing.</p></div>
    <div className="form-warning" role="note"><ShieldCheck size={20} aria-hidden="true" /><p><strong>Your request goes to the site owner for manual review.</strong> Your contact details are not displayed publicly or sent to listed builders. Do not submit passwords, identity documents, customer details or confidential information.</p></div>
    <section className="listing-request-section" id="listing-request" aria-labelledby="listing-request-title">
      <div className="section-heading"><div><p className="eyebrow">Business listing request</p><h2 id="listing-request-title">Tell us about your company.</h2></div><span className="demo-pill">Reviewed before any listing</span></div>
      {requestSent ? <div className="confirmation-card" role="status"><span className="confirmation-icon"><CheckCircle2 size={24} aria-hidden="true" /></span><div><p className="eyebrow">Request submitted</p><h3>Your details were accepted for review.</h3><p>The platform notification service accepted your request for the site owner. This does not confirm it has been read. It has not been added to the directory, and no account or confirmation email has been created. We do not provide an automated review status.</p><button className="button button-outline" type="button" onClick={() => setRequestSent(false)}>Send another request</button></div></div> : <form className="form-card listing-request-form" onSubmit={submitListingRequest}>
        <div className="form-row"><label className="form-field"><span>Business or company name <b>*</b></span><input name="businessName" required minLength={2} maxLength={120} autoComplete="organization" /></label><label className="form-field"><span>Your name <b>*</b></span><input name="contactName" required minLength={2} maxLength={100} autoComplete="name" /></label></div>
        <div className="form-row"><label className="form-field"><span>Contact email <b>*</b></span><input name="contactEmail" type="email" required maxLength={254} autoComplete="email" /><small>Used by the site owner to review and follow up on this request.</small></label><label className="form-field"><span>Contact phone <small>(optional)</small></span><input name="contactPhone" type="tel" maxLength={40} autoComplete="tel" /></label></div>
        <label className="form-field"><span>Business website <small>(optional)</small></span><input name="websiteUrl" type="url" maxLength={300} placeholder="https://" autoComplete="url" /></label>
        <fieldset className="listing-choice-group"><legend>Services you provide <b>*</b></legend><p>Select every service you want considered for the directory.</p><div className="listing-choice-grid">{services.map((service) => <label className="check-row" key={service.slug}><input type="checkbox" name="serviceSlugs" value={service.slug} /><span>{service.name}</span></label>)}</div></fieldset>
        <fieldset className="listing-choice-group"><legend>Areas you serve <b>*</b></legend><p>Select at least one current directory launch area.</p><div className="listing-choice-grid">{locations.map((location) => <label className="check-row" key={location.slug}><input type="checkbox" name="locationSlugs" value={location.slug} /><span>{location.name}</span></label>)}</div></fieldset>
        <label className="form-field"><span>Brief business description <b>*</b></span><textarea name="description" required minLength={20} maxLength={1000} rows={4} placeholder="Describe the building work your company carries out and its local coverage." /><small>20–1,000 characters. Do not include customer or homeowner information.</small></label>
        <label className="check-row consent-row"><input type="checkbox" name="consent" required /><span>I confirm I am authorized to submit these details and agree Southampton Traders may send them to the site owner to review this listing request and contact me about it. I understand nothing is published automatically and no account is created.</span></label>
        <div className="honeypot" aria-hidden="true"><label htmlFor="listing-company-fax">Leave this field blank</label><input id="listing-company-fax" name="companyFax" tabIndex={-1} autoComplete="off" /></div>
        {requestError && <p className="form-error" role="alert">{requestError}</p>}
        <button className="button form-submit" type="submit" disabled={requestPending}>{requestPending ? "Sending request…" : "Send listing request"} <Send size={16} aria-hidden="true" /></button>
        <p className="form-privacy-note">Your request is handled as described in the <Link href="/privacy/">privacy information</Link>. Submitting does not guarantee inclusion.</p>
      </form>}
    </section>
    <div className="dashboard-shell">
      <nav className="dashboard-tabs" aria-label="Builder demo sections">
        <button type="button" aria-pressed={activeTab === "overview"} onClick={() => setActiveTab("overview")}><BriefcaseBusiness size={16} /> Overview</button>
        <button type="button" aria-pressed={activeTab === "profile"} onClick={() => setActiveTab("profile")}><PencilLine size={16} /> Profile preview</button>
        <button type="button" aria-pressed={activeTab === "enquiries"} onClick={() => setActiveTab("enquiries")}><ClipboardList size={16} /> Sample enquiries</button>
      </nav>
      {activeTab === "overview" && <section className="dashboard-content">
        <span className="demo-pill">Sample dashboard · fictional data</span><h2>Your future workspace</h2><p>Manage a profile, review incoming enquiries and control which contact details appear. This preview is open to everyone and is not a protected account.</p>
        <div className="dashboard-stat-row"><div className="stat-card"><span>Profile status</span><strong>Draft example</strong></div><div className="stat-card"><span>New enquiries</span><strong>2 samples</strong></div><div className="stat-card"><span>Verification</span><strong>Not verified</strong></div></div>
        <div className="dashboard-shortcuts"><button className="button" type="button" onClick={() => setActiveTab("profile")}>Preview your profile <ArrowRight size={16} /></button><button className="button button-outline" type="button" onClick={() => setActiveTab("enquiries")}>View sample enquiries <ArrowRight size={16} /></button></div>
        <div className="builder-register-box"><div><p className="eyebrow">Future account journey</p><h3>See the registration preview</h3><p>Email verification is not active in this demo; this form does not create an account or send a message.</p></div><form onSubmit={registerPreview} className="inline-register"><label className="sr-only" htmlFor="demo-builder-email">Test email</label><input id="demo-builder-email" type="email" required autoComplete="off" placeholder="example@example.test" /><button className="button button-small" type="submit">Preview sign-up</button></form></div>
      </section>}
      {activeTab === "profile" && <section className="dashboard-content">
        <span className="demo-pill">Profile editor · temporary preview</span><h2>Build a sample business profile</h2><p>Credentials are not verified here. If a future business supplies a credential, the label must remain “business supplied” until an administrator verifies it.</p>
        <form className="form-card embedded-form" onSubmit={savePreview}>
          <div className="form-row"><label className="form-field"><span>Business name</span><input name="businessName" defaultValue="Example Building Company" maxLength={100} /></label><label className="form-field"><span>Website <small>(optional)</small></span><input name="website" type="url" placeholder="https://example.test" /></label></div>
          <label className="form-field"><span>Business description</span><textarea name="description" rows={3} maxLength={800} defaultValue="A fictional building company profile for demonstration." /></label>
          <div className="form-row"><label className="form-field"><span>Services</span><select name="services" multiple size={4}>{services.map((service) => <option key={service.slug}>{service.name}</option>)}</select><small>Use Ctrl/Command to choose more than one.</small></label><label className="form-field"><span>Locations served</span><select name="locations" multiple size={4}>{locations.map((location) => <option key={location.slug}>{location.name}</option>)}</select></label></div>
          <div className="form-row"><label className="form-field"><span>Public business contact <small>(demo)</small></span><input name="businessContact" type="email" placeholder="business@example.test" autoComplete="off" /></label><label className="form-field"><span>Opening hours <small>(optional)</small></span><input name="hours" placeholder="Example: weekdays, 9–5" /></label></div>
          <label className="form-field"><span>Credentials <small>(demo)</small></span><input name="credentials" placeholder="Use a fictional example only" /><small>Any future supplied credential will be labelled “business supplied” until verified.</small></label>
          <label className="form-field"><span>Photos <small>(not uploaded)</small></span><input name="photos" type="file" accept="image/*" multiple disabled /><small>Uploads are disabled in this demonstration.</small></label>
          <label className="check-row consent-row"><input type="checkbox" name="contactConsent" /><span>In a future account, I would consent to this example business contact being public.</span></label>
          <button className="button" type="submit">Preview profile only <Eye size={16} /></button>
        </form>
        {preview && <div className="profile-preview-card" role="status"><span className="demo-pill">Preview · not saved</span><h3>{preview.businessName}</h3><p>{preview.description}</p><p><strong>Website:</strong> {preview.website || "Not provided"}</p><p><strong>Services:</strong> {preview.services.length ? preview.services.join(", ") : "None selected"}</p><p><strong>Locations:</strong> {preview.locations.length ? preview.locations.join(", ") : "None selected"}</p><p><strong>Opening hours:</strong> {preview.hours || "Not provided"}</p>{preview.credentials && <p><strong>Credential · business supplied, not verified:</strong> {preview.credentials}</p>}<p>Contact information and photos are not shown in this public preview. No account, message or saved profile was created.</p></div>}
      </section>}
      {activeTab === "enquiries" && <section className="dashboard-content"><span className="demo-pill">Fictional enquiries · no real customers</span><h2>Enquiry inbox preview</h2><p>These example entries do not represent customer submissions. Replies are not sent.</p><div className="table-scroll"><table className="data-table"><thead><tr><th>Ref</th><th>Work</th><th>Location</th><th>Timing</th><th>Status</th><th>Demo response</th></tr></thead><tbody>{demoEnquiries.map((enquiry) => <tr key={enquiry.id}><td>{enquiry.id}</td><td>{enquiry.work}</td><td>{enquiry.place}</td><td>{enquiry.timing}</td><td><span className="status-tag">{enquiry.status}</span></td><td><button type="button" className="text-button" onClick={() => setNotice(`Response preview for ${enquiry.id}: not sent or saved.`)}>Preview reply</button></td></tr>)}</tbody></table></div><Link className="text-link" href="/request-quote/">Try the customer-side quote form <ArrowRight size={16} /></Link></section>}
      {notice && <p className="inline-success" role="status"><CheckCircle2 size={16} aria-hidden="true" />{notice}</p>}
    </div>
  </div>;
}
