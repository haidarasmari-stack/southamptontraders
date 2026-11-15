import { ArrowRight, CheckCircle2, ClipboardList, Flag, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { FormEvent, useState } from "react";
import { Link, useParams } from "wouter";
import { Breadcrumbs } from "@/components/SiteFrame";
import { usePageMeta } from "@/lib/seo";
import NotFound from "@/pages/NotFound";

const pages = {
  "how-it-works": {
    label: "How it works",
    eyebrow: "A clearer way to start",
    title: "Start with the work. Compare with care.",
    description: "Find local building firms by the work you need and the places you need them. The current site is a demonstration, with no live businesses or enquiries.",
    icon: "steps",
  },
  reviews: {
    label: "Review rules",
    eyebrow: "Trust, built carefully",
    title: "Honest feedback starts with real work.",
    description: "Reviews should come from a declared or completed job, describe a genuine customer experience, and be moderated consistently. There are no reviews or ratings in this demonstration.",
    icon: "reviews",
  },
  privacy: {
    label: "Privacy",
    eyebrow: "Demo privacy notice",
    title: "Nothing you type is sent or saved.",
    description: "This public site is a non-persistent prototype. Do not enter real personal details, business information, project addresses or confidential material in its forms.",
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
  usePageMeta({ title: `${page?.label ?? "Information"} | Southampton Traders`, description: page?.description ?? "Information about the Southampton Traders demonstration directory.", path: `/${slug ?? "information"}/`, noindex: slug !== "how-it-works" });
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
      <article><span>01</span><div><h2>Choose the work</h2><p>Start with a service such as an extension, renovation, loft conversion, new build, brickwork, roofing, plastering, groundworks, kitchen or bathroom.</p></div></article>
      <article><span>02</span><div><h2>Choose an area</h2><p>Explore Southampton, Eastleigh, Fareham, Winchester, Totton, Hedge End, Romsey and nearby Hampshire towns.</p></div></article>
      <article><span>03</span><div><h2>Compare the details</h2><p>Look for clear business information and know what is—and is not—verified. This demo has fictional profiles only, with no real credentials or customer reviews.</p></div></article>
      <article><span>04</span><div><h2>Ask about your project</h2><p>In a future live service, you would see which builder(s) receive your enquiry. Here, quote forms are non-persistent previews; nothing is sent.</p></div></article>
      <div className="content-page-cta"><Link className="button" href="/builders/southampton/">Browse demo profiles <ArrowRight size={16} /></Link><Link className="text-link" href="/request-quote/">Preview a quote request</Link></div>
    </div>}

    {isReviews && <section className="policy-content">
      <h2>When reviews are eligible</h2><p>In a future live service, a customer could submit a review only after declaring a job with the builder or confirming that the work was completed. The site should explain the eligibility check and ask for relevant, first-hand feedback.</p>
      <h2>Moderation and replies</h2><p>Businesses should be able to respond professionally. Customers and businesses should be able to report content for review. Moderators should apply published rules consistently and keep a decision record.</p>
      <h2>What we show today</h2><p>There are no customer reviews, star ratings, accreditations or verification badges in this demo. Example profiles are not recommendations. Sponsored placements are not part of this MVP; any future paid placement must be labelled clearly.</p>
      <Link className="button" href="/builders/southampton/">See the demo directory <ArrowRight size={16} /></Link>
    </section>}

    {isPrivacy && <section className="policy-content">
      <div className="privacy-callout"><ShieldCheck size={20} aria-hidden="true" /><p><strong>This prototype does not collect form submissions.</strong> Entries are used only in your current page for a visible demo response, then cleared. No form values are sent to the server, analytics, email or database.</p></div>
      <h2>Please do not enter real details</h2><p>Do not enter real names, email addresses, phone numbers, home or project addresses, business contact details, credentials, or confidential project information. Public forms are prototypes and are not an enquiry or support channel.</p>
      <h2>Platform page analytics</h2><p>The hosting platform currently enables Umami and Plausible page analytics. These services may process page paths, referrals and device or browser categories; their network requests also carry IP addresses that providers describe how they process. This site does not send typed quote, contact, report or profile form values to analytics, and it does not configure custom interaction events. Standard hosting or CDN request logs may also process technical request data. See the <Link href="/cookies/">cookie information page</Link> for provider links.</p>
      <h2>When real enquiries are introduced</h2><p>Before any live data collection begins, the site owner must approve it. The live service should identify which builders receive an enquiry, collect only necessary details, explain retention and sharing, use appropriate security and access controls, and provide a way to request access or deletion.</p>
    </section>}

    {isCookies && <section className="policy-content">
      <h2>Platform analytics</h2><p>This project currently has platform site analytics enabled. The hosting platform injects Umami and Plausible scripts to report site usage. These services may process page paths, referrals, browser or device categories, approximate region and engagement. Their network requests carry IP addresses; provider privacy notices describe how those are handled. The app does not send names, email addresses, phone numbers, project descriptions, credentials or other form values to analytics, and this MVP has no custom search, profile-view or quote-submission analytics events.</p>
      <p>Read the providers’ notices: <a href="https://umami.is/privacy" target="_blank" rel="noreferrer">Umami privacy notice</a> and <a href="https://plausible.io/data-policy" target="_blank" rel="noreferrer">Plausible data policy</a>. The owner can change the platform analytics setting. Hosting and CDN logs may still process standard technical request information.</p>
      <h2>Cookies and advertising</h2><p>The directory does not configure advertising pixels or advertising campaigns. The analytics providers describe cookieless analytics, but this notice does not claim that all platform or CDN technical storage or request processing is disabled. Review the provider notices and current platform setting before changing analytics or adding new tracking.</p>
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
