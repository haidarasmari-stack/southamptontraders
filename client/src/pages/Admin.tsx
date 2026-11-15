import { AlertTriangle, ArrowRight, CheckCircle2, ClipboardCheck, Search, ShieldAlert } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { Breadcrumbs } from "@/components/SiteFrame";
import { demoBuilders } from "@/data/catalog";
import { usePageMeta } from "@/lib/seo";

type ModerationStatus = "Pending review" | "Changes requested" | "Approved (demo only)" | "Rejected (demo only)" | "Suspended (demo only)";
const adminSections = ["Customers", "Builder accounts", "Profiles", "Services", "Locations", "Enquiries", "Reviews", "Reports"];

export default function Admin() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [statuses, setStatuses] = useState<Record<string, ModerationStatus>>({});
  const [audit, setAudit] = useState<string[]>([]);
  usePageMeta({ title: "Admin tools · demo | Southampton Traders", description: "A public demonstration of directory administration and moderation concepts. It is not a secure admin system and saves no actions.", path: "/admin/", noindex: true });
  const rows = useMemo(() => demoBuilders.filter((builder) => {
    const status = statuses[builder.slug] ?? "Pending review";
    return (!query || `${builder.name} ${builder.summary}`.toLowerCase().includes(query.toLowerCase())) && (statusFilter === "all" || status === statusFilter);
  }), [query, statusFilter, statuses]);
  const moderate = (slug: string, action: ModerationStatus) => {
    setStatuses((current) => ({ ...current, [slug]: action }));
    setAudit((current) => [`${new Date().toLocaleTimeString()} · ${action} · ${demoBuilders.find((builder) => builder.slug === slug)?.name ?? slug} (temporary preview)`, ...current].slice(0, 6));
  };
  return <div className="page wrap">
    <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Admin demo" }]} />
    <div className="page-heading"><p className="eyebrow">Moderation concepts · public demonstration</p><h1>Admin workspace preview.</h1><p className="section-intro">A clickable model of review and listing controls—not a secure admin tool and not connected to real users or businesses.</p></div>
    <div className="form-warning admin-warning"><ShieldAlert size={20} aria-hidden="true" /><p><strong>Not for real moderation.</strong> Anyone can open this public demo. Changes and the decision-log preview exist only in this browser page and disappear on reload. No data is transmitted or stored.</p></div>
    <div className="admin-overview"><div className="stat-card"><span>Example profiles</span><strong>{demoBuilders.length}</strong></div><div className="stat-card"><span>Real reviews</span><strong>None</strong></div><div className="stat-card"><span>Pending reports</span><strong>0 real</strong></div><div className="stat-card"><span>Access protection</span><strong>Demo only</strong></div></div>
    <div className="admin-shell"><aside className="admin-sidebar"><p className="eyebrow">Workspace sections</p>{adminSections.map((section) => <button type="button" key={section} className={section === "Profiles" ? "admin-nav-active" : ""} onClick={() => setAudit((current) => [`${section} view selected (demonstration only).`, ...current].slice(0, 6))}>{section}<span>{section === "Profiles" ? demoBuilders.length : "—"}</span></button>)}</aside>
      <section className="admin-main"><div className="admin-main-heading"><div><p className="eyebrow">Listing review</p><h2>Example profiles</h2></div><span className="demo-pill">No live data</span></div><div className="admin-filters"><label className="search-input-wrap"><Search size={16} aria-hidden="true" /><span className="sr-only">Search profiles</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search example profiles" /></label><label><span className="sr-only">Filter by status</span><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option value="all">All statuses</option><option>Pending review</option><option>Changes requested</option><option>Approved (demo only)</option><option>Rejected (demo only)</option><option>Suspended (demo only)</option></select></label></div>
        {rows.length ? <div className="admin-profile-list">{rows.map((builder) => { const status = statuses[builder.slug] ?? "Pending review"; return <article className="admin-profile-row" key={builder.slug}><div><span className="demo-pill demo-pill-inline">Fictional example</span><h3>{builder.name}</h3><p>{builder.summary}</p><span className="status-tag">{status}</span></div><div className="admin-action-group"><label className="sr-only" htmlFor={`decision-${builder.slug}`}>Moderation decision for {builder.name}</label><select id={`decision-${builder.slug}`} defaultValue="" onChange={(event) => event.target.value && moderate(builder.slug, event.target.value as ModerationStatus)}><option value="" disabled>Choose a demo action</option><option>Changes requested</option><option>Approved (demo only)</option><option>Rejected (demo only)</option><option>Suspended (demo only)</option></select><Link className="text-link" href={`/builder/${builder.slug}/`}>View example <ArrowRight size={14} /></Link></div></article>; })}</div> : <div className="empty-state"><h3>No example profiles match</h3><p>Try a different search or status filter.</p></div>}
      </section>
    </div>
    <section className="audit-preview"><div className="section-heading compact-heading"><div><p className="eyebrow">Decision records</p><h2>Temporary audit preview</h2></div><ClipboardCheck size={20} aria-hidden="true" /></div><p>A real moderation service should record who made each decision, when, what changed and why. This public demo keeps a short on-screen preview only.</p>{audit.length ? <ol>{audit.map((entry, index) => <li key={`${entry}-${index}`}><CheckCircle2 size={15} aria-hidden="true" />{entry}</li>)}</ol> : <p className="audit-empty"><AlertTriangle size={15} aria-hidden="true" />No demo decisions yet. Choose a temporary action above to preview the interaction.</p>}</section>
  </div>;
}
