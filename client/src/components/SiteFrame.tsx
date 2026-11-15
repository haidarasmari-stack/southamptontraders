import { ArrowRight, ArrowUpRight, Menu } from "lucide-react";
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
  return (
    <header className="site-header">
      <div className="header-inner wrap">
        <BrandMark />
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link href="/builders/southampton/">Find a builder</Link>
          <Link href="/how-it-works/">How it works</Link>
          <Link href="/builder-area/">For builders</Link>
        </nav>
        <Link className="button button-small header-cta" href="/request-quote/">Request a quote <ArrowUpRight size={16} aria-hidden="true" /></Link>
        <details className="mobile-nav">
          <summary aria-label="Open navigation menu"><Menu size={22} aria-hidden="true" /><span className="sr-only">Menu</span></summary>
          <nav aria-label="Mobile navigation">
            <Link href="/builders/southampton/">Find a builder</Link>
            <Link href="/how-it-works/">How it works</Link>
            <Link href="/builder-area/">For builders</Link>
            <Link href="/reviews/">Review rules</Link>
            <Link href="/admin/">Admin demonstration</Link>
            <Link href="/request-quote/">Request a quote</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}

export function DemoNotice() {
  return (
    <aside className="demo-notice wrap" aria-label="Important demonstration notice">
      <span className="demo-notice-dot" aria-hidden="true" />
      <p><strong>Demo site.</strong> Every builder is an example, not a real business. Forms do not send or save anything—please don’t enter real personal details.</p>
      <Link href="/privacy/" className="demo-notice-link">More about this <ArrowUpRight size={14} aria-hidden="true" /></Link>
    </aside>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-main">
        <div className="footer-brand-block"><BrandMark /><p>A clear local starting point for home projects around Southampton.</p></div>
        <div className="footer-links">
          <div><strong>Explore</strong><Link href="/builders/southampton/">Find a builder</Link><Link href="/how-it-works/">How it works</Link><Link href="/reviews/">Review rules</Link></div>
          <div><strong>Information</strong><Link href="/privacy/">Privacy</Link><Link href="/cookies/">Cookies</Link><Link href="/contact/">Contact</Link></div>
          <div><strong>For builders</strong><Link href="/builder-area/">Builder demo</Link><Link href="/admin/">Admin demo</Link></div>
        </div>
      </div>
      <div className="wrap footer-bottom"><span>© {new Date().getFullYear()} Southampton Traders · Demonstration directory</span><span>Illustrative images are stock photos, not evidence of a listed builder’s work.</span></div>
    </footer>
  );
}

export default function SiteFrame({ children }: { children: ReactNode }) {
  return <div className="site-shell"><a className="skip-link" href="#main">Skip to content</a><SiteHeader /><DemoNotice /><main id="main">{children}</main><SiteFooter /></div>;
}
