import { ArrowRight, CheckCircle2, ClipboardList, Flag, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { FormEvent, useState } from "react";
import { Link, useParams } from "wouter";
import { Breadcrumbs } from "@/components/SiteFrame";
import { builders, locations, services } from "@/data/catalog";
import { usePageMeta } from "@/lib/seo";
import NotFound from "@/pages/NotFound";

const pages = {
  "how-it-works": {
    label: "How it works",
    eyebrow: "A clearer way to start",
    title: "Start with the work. Compare with care.",
    description: "Browse a current, non-exhaustive set of Southampton and Hampshire builder profiles. Filter by the exact service and launch area; demo enquiry forms are not sent or saved.",
    icon: "steps",
  },
  reviews: {
    label: "Review rules",
    eyebrow: "Trust, built carefully",
    title: "Honest feedback starts with real work.",
    description: "Reviews should come from a declared or completed job, describe a genuine customer experience, and be moderated consistently. Southampton Traders currently publishes no reviews or ratings.",
    icon: "reviews",
  },
  privacy: {
    label: "Privacy",
    eyebrow: "Demo privacy notice",
    title: "Nothing you type is sent or saved.",
    description: "Demo enquiries are not sent or saved. The project brief stays in page memory only; avoid personal details, precise addresses or confidential information.",
    icon: "privacy",
  },
  cookies: {
    label: "Cookies",
    eyebrow: "Analytics and storage",
    title: "Page analytics may be active; forms stay private.",
    description: "The hosting platform currently enables Umami and Plausible page analytics. This demo does not send entered form values or customer contact details to those analytics.",
    icon: "cookies",
  },
  contact: {
    label: "Contact",
    eyebrow: "Questions & feedback",
    title: "Help shape a useful local directory.",
    description: "This contact page is a demonstration only. Its feedback form does not send or store a message. Please do not include personal or sensitive details.",
    icon: "contact",
  },
} as const;

type PageKey = keyof typeof pages;
const icons = { steps: ClipboardList, reviews: Flag, privacy: LockKeyhole, cookies: ShieldCheck, contact: Mail };

export default function ContentPages() {
  const { slug } = useParams<{ slug: string }>();
  const page = pages[slug as PageKey];
  const [submitted, setSubmitted] = useState(false);
  usePageMeta({ title: `${page?.label ?? "Information"} | Southampton Traders`, description: page?.description ?? "Information about Southampton Traders and its directory.", path: `/${slug ?? "information"}/`, noindex: slug !== "how-it-works" });
  if (!page) return <NotFound />;

  const Icon = icons[page.icon];
  const isPrivacy = slug === "privacy";
  const isReviews = slug === "reviews";
  const isContact = slug === "contact";
  const isHow = slug === "how-it-works";
  const isCookies = slug === "cookies";
  const sendFeedback = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.currentTarget.reset();
    setSubmitted(true);
  };

  return <div className="page wrap narrow-page">
    <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: page.label }]} />
    <div className="page-heading content-page-heading">
      <span className="browse-icon"><Icon size={21} aria-hidden="true" /></span>
      <p className="eyebrow">{page.eyebrow}</p>
      <h1>{page.title}</h1>
      <p className="section-intro">{page.description}</p>
    </div>

    {isHow && <div className="step-list">
      <article><span>01</span><div><h2>Choose the work</h2><p>Filter across {services.length} listed categories: {services.map((service, index) => <span key={service.slug}>{index > 0 ? (index === services.length - 1 ? ", and " : ", ") : ""}{service.name}</span>)}.</p></div></article>
      <article><span>02</span><div><h2>Choose an area</h2><p>Explore {locations.length} launch areas: {locations.map((location, index) => <span key={location.slug}>{index > 0 ? (index === locations.length - 1 ? ", and " : ", ") : ""}{location.name}</span>)}. Each area has its own current listing count.</p></div></article>
      <article><span>03</span><div><h2>Compare the details</h2><p>The current dataset contains {builders.length} profiles and is not exhaustive. Profiles use public company or trade-source information; no ratings, reviews, accreditations or unsupported claims are added.</p></div></article>
      <article><span>04</span><div><h2>Save profiles to compare</h2><p>Use “Save to shortlist” on a profile to collect a few options in this browser. No account is needed, and only the saved public profile IDs are stored locally.</p></div></article>
      <article><span>05</span><div><h2>Contact a business directly</h2><p>Call or visit a company website only where a direct detail is listed. Quote, builder-area and report forms are previews only: they are not sent or saved.</p></div></article>
      <article><span>06</span><div><h2>Spot sponsored placements</h2><p>Some service searches show a clearly labelled Sponsored listing. This is a promotional placement, not a recommendation or verification badge. Payment for sponsored placement is not currently processed by this website.</p></div></article>
      <article><span>07</span><div><h2>Prepare a project brief</h2><p>Use the project brief tool to create a draft for your own use. It stays in page memory and is not submitted, sent or stored. Copy or print it only if you choose, then contact businesses yourself.</p></div></article>
      <div className="content-page-cta"><Link className="button" href="/builders/southampton/">Browse current profiles <ArrowRight size={16} /></Link><Link className="button button-outline" href="/project-brief/">Prepare a project brief <ArrowRight size={16} /></Link><Link className="text-link" href="/request-quote/">Preview a quote request</Link></div>
    </div>}

    {isReviews && <section className="policy-content">
      <h2>When reviews are eligible</h2><p>In a future live service, a customer could submit a review only after declaring a job with the builder or confirming that the work was completed. The site should explain the eligibility check and ask for relevant, first-hand feedback.</p>
      <h2>Moderation and replies</h2><p>Businesses should be able to respond professionally. Customers and businesses should be able to report content for review. Moderators should apply published rules consistently and keep a decision record.</p>
      <h2>What we show today</h2><p>There are no customer reviews, star ratings, accreditations or verification badges in the directory. Profiles are factual listings, not recommendations. Sponsored listings are clearly labelled promotional placements and do not indicate verification or endorsement. Payment for sponsored placement is not currently processed by this website.</p>
      <Link className="button" href="/builders/southampton/">Browse the directory <ArrowRight size={16} /></Link>
    </section>}

    {isPrivacy && <section className="policy-content">
      <div className="privacy-callout"><ShieldCheck size={20} aria-hidden="true" /><p><strong>This prototype does not collect form submissions.</strong> Demo form entries are used only for a visible page response, then cleared. The project brief stays in page memory while this page is open. Nothing is sent to the server, analytics, email or a business.</p></div>
      <h2>Saved shortlist</h2><p>If you save profiles for comparison, the site stores only their public business-profile IDs in local storage in your current browser. This shortlist is not sent to the server and is separate from information typed into demonstration forms.</p>
      <h2>Project brief builder</h2><p>The project brief is prepared in page memory only; it is not saved in local storage or sent anywhere. Copying places the draft on your device clipboard only when you choose that button. If you share it outside the site, you control where it goes.</p>
      <h2>Please do not enter real details</h2><p>Do not enter real names, email addresses, phone numbers, home or project addresses, business contact details, access details, credentials, or confidential project information. Public forms are prototypes and are not an enquiry or support channel.</p>
      <h2>Platform page analytics</h2><p>The hosting platform currently enables Umami and Plausible page analytics. These services may process page paths, referrals and device or browser categories; their network requests also carry IP addresses that providers describe how they process. This site does not send typed quote, contact, report or profile form values to analytics, and it does not configure custom interaction events. Standard hosting or CDN request logs may also process technical request data. See the <Link href="/cookies/">cookie information page</Link> for provider links.</p>
      <h2>When real enquiries are introduced</h2><p>Before any live data collection begins, the site owner must approve it. The live service should identify which builders receive an enquiry, collect only necessary details, explain retention and sharing, use appropriate security and access controls, and provide a way to request access or deletion.</p>
    </section>}

    {isCookies && <section className="policy-content">
      <h2>Platform analytics</h2><p>This project currently has platform site analytics enabled. The hosting platform injects Umami and Plausible scripts to report site usage. These services may process page paths, referrals, browser or device categories, approximate region and engagement. Their network requests carry IP addresses; provider privacy notices describe how those are handled. The app does not send names, email addresses, phone numbers, project descriptions, credentials or other form values to analytics, and this MVP has no custom search, profile-view or quote-submission analytics events.</p>
      <p>Read the providers’ notices: <a href="https://umami.is/privacy" target="_blank" rel="noreferrer">Umami privacy notice</a> and <a href="https://plausible.io/data-policy" target="_blank" rel="noreferrer">Plausible data policy</a>. The owner can change the platform analytics setting. Hosting and CDN logs may still process standard technical request information.</p>
      <h2>Cookies and advertising</h2><p>The directory does not configure advertising pixels. Sponsored listings are on-site promotional placements; this website does not currently process payment for them. The analytics providers describe cookieless analytics, but this notice does not claim that all platform or CDN technical storage or request processing is disabled. Review the provider notices and current platform setting before changing analytics or adding new tracking.</p>
      <h2>Future changes</h2><p>If additional analytics, non-essential cookies or tracking are added later, the owner should review the purpose, provider, consent requirements, retention, privacy notice and cookie controls before launch.</p>
    </section>}

    {isContact && <section className="policy-content">
      <div className="privacy-callout"><Mail size={20} aria-hidden="true" /><p><strong>Feedback is not delivered.</strong> This demonstration has no live support inbox, and the form below does not send or save messages.</p></div>
      {submitted ? <div className="confirmation-card" role="status"><CheckCircle2 size={25} aria-hidden="true" /><div><h2>Demo complete</h2><p>Your message was cleared and not sent.</p></div></div> : <form className="form-card" onSubmit={sendFeedback}>
        <label className="form-field"><span>Test subject</span><input name="subject" required maxLength={80} autoComplete="off" placeholder="Example only" /></label>
        <label className="form-field"><span>Test message</span><textarea name="message" required maxLength={500} rows={4} placeholder="Do not include personal or confidential details." /></label>
        <button className="button" type="submit">Preview message <ArrowRight size={16} /></button>
      </form>}
    </section>}
  </div>;
}
