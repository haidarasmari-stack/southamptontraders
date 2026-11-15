import { ArrowRight, BriefcaseBusiness, CheckCircle2, ClipboardList, Eye, PencilLine, ShieldCheck } from "lucide-react";
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
  usePageMeta({ title: "For builders · dashboard demo | Southampton Traders", description: "Explore the Southampton Traders builder onboarding, profile editor and enquiries dashboard demonstration. Nothing is sent or saved.", path: "/builder-area/", noindex: true });

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

  const registerPreview = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNotice("Registration preview complete. No account was created and no verification email was sent.");
    event.currentTarget.reset();
  };

  return <div className="page wrap">
    <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "For builders" }]} />
    <div className="page-heading"><p className="eyebrow">Builder tools · demonstration only</p><h1>Show the work. Keep control.</h1><p className="section-intro">Preview a future builder profile and dashboard. This is not account registration: details stay in this page and clear when you leave.</p></div>
    <div className="form-warning"><ShieldCheck size={20} aria-hidden="true" /><p><strong>Demo only—please use test information.</strong> No account, verification email, profile or enquiry response is created or saved. Do not enter real contact details or confidential business information.</p></div>
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
          <div className="form-row"><label className="form-field"><span>Services</span><select name="services" multiple size={4}>{services.map((service) => <option key={service.slug}>{service.name}</option>)}</select><small>Use Ctrl/Command to choose more than one.</small></label><label className="form-field"><span>Locations served</span><select name="locations" multiple size={4}>{locations.filter((location) => location.slug !== "nearby-hampshire").map((location) => <option key={location.slug}>{location.name}</option>)}</select></label></div>
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
