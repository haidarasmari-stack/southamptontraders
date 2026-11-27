import { ArrowRight, ArrowUpRight, BookmarkCheck, Menu } from "lucide-react";
import { useShortlist } from "@/contexts/ShortlistContext";
import type { ReactNode } from "react";
import { Link } from "wouter";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className={`brand-mark${compact ? " brand-mark-compact" : ""}`} aria-label="Southampton Traders home">
      <svg className="brand-symbol" viewBox="0 0 44 44" aria-hidden="true">
        <path d="M5 21.5 22 7l17 14.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11 20.5v16h22v-16M18 36.5V25h8v11.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 16.5h14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity=".65" />
      </svg>
      {!compact && <span className="brand-wordmark"><strong>Southampton</strong><span>Traders</span></span>}
    </Link>
  );
}

export function Breadcrumbs({ items }: { items: Array<{ label: string; href?: string }> }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>{items.map((item, index) => <li key={`${item.label}-${index}`}>
        {index > 0 && <ArrowRight size={13} aria-hidden="true" />}
        {item.href && index !== items.length - 1 ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
      </li>)}</ol>
    </nav>
  );
}

function SiteHeader() {
  const { savedBuilderSlugs } = useShortlist();
  return (
    <header className="site-header">
      <div className="header-inner wrap">
        <BrandMark />
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link href="/locations/southampton/">Find a builder</Link>
          <Link href="/project-brief/">Plan a project</Link>
          <Link href="/how-it-works/">How it works</Link>
          <Link href="/builder-area/">For builders</Link>
        </nav>
        <Link className="button button-small header-cta" href="/shortlist/" aria-label={`Open shortlist with ${savedBuilderSlugs.length} saved ${savedBuilderSlugs.length === 1 ? "profile" : "profiles"}`}><BookmarkCheck size={16} aria-hidden="true" /> Shortlist <span className="shortlist-count">{savedBuilderSlugs.length}</span></Link>
        <details className="mobile-nav">
          <summary aria-label="Open navigation menu"><Menu size={22} aria-hidden="true" /><span className="sr-only">Menu</span></summary>
          <nav aria-label="Mobile navigation">
            <Link href="/locations/southampton/">Find a builder</Link>
            <Link href="/project-brief/">Prepare a project brief</Link>
            <Link href="/shortlist/">Shortlist ({savedBuilderSlugs.length})</Link>
            <Link href="/how-it-works/">How it works</Link>
            <Link href="/homeowner-guides/">Homeowner guides</Link>
            <Link href="/builder-area/">For builders</Link>
            <Link href="/reviews/">Review rules</Link>
            <Link href="/request-quote/">Request a quote</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-main">
        <div className="footer-brand-block"><BrandMark /><p>Builder profiles across eight nearby regional areas. Current coverage is not exhaustive.</p></div>
        <div className="footer-links">
          <div><strong>Explore</strong><Link href="/locations/southampton/">Find a builder</Link><Link href="/project-brief/">Prepare a project brief</Link><Link href="/shortlist/">Your shortlist</Link><Link href="/how-it-works/">How it works</Link><Link href="/homeowner-guides/">Homeowner guides</Link><Link href="/reviews/">Review rules</Link></div>
          <div><strong>Information</strong><Link href="/privacy/">Privacy</Link><Link href="/cookies/">Cookies</Link><Link href="/contact/">Contact</Link></div>
          <div><strong>For builders</strong><Link href="/builder-area/">Request a listing</Link></div>
        </div>
      </div>
      <div className="wrap footer-bottom"><span>Southampton Traders · Current directory coverage is not exhaustive.</span><span>Illustrative images are not evidence of work by a listed business.</span></div>
    </footer>
  );
}

export default function SiteFrame({ children }: { children: ReactNode }) {
  return <div className="site-shell"><a className="skip-link" href="#main">Skip to content</a><SiteHeader /><main id="main">{children}</main><SiteFooter /></div>;
}
