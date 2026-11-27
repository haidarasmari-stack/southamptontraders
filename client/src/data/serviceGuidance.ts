/**
 * Homeowner guidance shown on service, service-in-area and location pages:
 * what affects the price of each kind of work, frequently asked questions,
 * and how to check a business before hiring it.
 *
 * Everything here is general guidance or comes from the directory data.
 * No prices, ratings, reviews or vetting claims are made.
 */
import { getBuildersForLocation, getBuildersForServiceInLocation, getLocation, getService, locations, serviceTrade } from "@/data/catalog";

export type Faq = { question: string; answer: string };

/** Which council handles planning and building control for each launch area. */
export const localCouncils: Record<string, { council: string; note?: string }> = {
  southampton: { council: "Southampton City Council" },
  eastleigh: { council: "Eastleigh Borough Council" },
  "hedge-end": { council: "Eastleigh Borough Council" },
  fareham: { council: "Fareham Borough Council" },
  winchester: { council: "Winchester City Council", note: "Parts of the district fall within the South Downs National Park, where the National Park Authority decides planning applications." },
  totton: { council: "New Forest District Council" },
  "new-forest": { council: "New Forest District Council", note: "Inside the New Forest National Park, planning applications go to the New Forest National Park Authority instead." },
  romsey: { council: "Test Valley Borough Council" },
};

/** Factors that change the price of each kind of work. Deliberately no price figures. */
export const costFactors: Record<string, string[]> = {
  extensions: [
    "Size, number of storeys and how complex the roof is",
    "Foundations and ground conditions, including nearby trees and drains",
    "Steelwork, glazing and how much of the existing house is opened up",
    "Whether drawings, structural calculations and approval fees are included",
    "The finish level: kitchen, flooring, heating and decoration",
  ],
  renovations: [
    "The condition of the property once walls and floors are opened up",
    "Rewiring, replumbing or heating changes",
    "How many trades are needed and who coordinates them",
    "Whether you are living in the property during the work",
    "Fixtures and finishes you choose",
  ],
  "loft-conversions": [
    "Type of conversion: rooflight, dormer, hip-to-gable or mansard",
    "Roof structure, head height and any steel beams needed",
    "Staircase position and fire-safety upgrades to the rest of the house",
    "Insulation, heating and whether a bathroom is added",
    "Scaffolding time and access to the roof",
  ],
  "new-builds": [
    "Plot conditions, access and services connections",
    "House size, design and specification",
    "Planning conditions and any required surveys",
    "Structural warranty and building control costs",
    "Whether the price is for the shell or a finished home",
  ],
  brickwork: [
    "Length and height of wall, or area of repointing",
    "Brick type and how hard it is to match existing brickwork",
    "Foundations needed for new walls",
    "Scaffolding and access",
    "Removal of old material and making good",
  ],
  roofing: [
    "Roof area, pitch and number of storeys",
    "Repair, partial strip or full re-roof",
    "Covering: concrete tiles, clay tiles, slate or a flat-roof system",
    "Scaffolding and how long it stays up",
    "Replacing battens, membrane, leadwork, fascias or guttering",
  ],
  plastering: [
    "Area of walls and ceilings",
    "Skim coat, full re-plaster or plasterboarding",
    "Condition of the existing surface and removal of old plaster",
    "Access, such as stairwells and high ceilings",
    "Protection and clear-up of the room",
  ],
  groundworks: [
    "Volume of digging and spoil to remove",
    "Ground conditions and the depth of foundations needed",
    "Drainage runs and connections to sewers",
    "Access for diggers and lorries",
    "Underground services that need tracing or moving",
  ],
  "kitchens-and-bathrooms": [
    "Supply and fit, or fit only",
    "Moving plumbing, waste pipes, gas or electrics",
    "Tiling, waterproofing and flooring",
    "Units, worktops and sanitaryware chosen",
    "Removal of the old room and making good walls",
  ],
};

/** Two general questions for each kind of work. */
const serviceFaqs: Record<string, Faq[]> = {
  extensions: [
    { question: "Do I need planning permission for an extension?", answer: "Not always. Many single-storey rear extensions can be built under permitted development rights, but there are limits on size and height, and the rules differ for conservation areas and flats. Check with your council or the Planning Portal before you commit to a design." },
    { question: "Does an extension need Building Regulations approval?", answer: "Yes. Extensions need Building Regulations approval covering structure, fire safety, insulation and drainage, even when planning permission is not needed. Agree with your builder who will apply to building control and book inspections." },
  ],
  renovations: [
    { question: "Do renovations need Building Regulations approval?", answer: "Some do. Removing structural walls, rewiring, new heating systems and replacement windows normally need approval or certification. Cosmetic work such as decorating usually does not. Ask the builder which parts of your project are notifiable." },
    { question: "How do I avoid surprise costs on a renovation?", answer: "Get a survey or opening-up work before pricing where possible, and agree in writing how unforeseen work will be priced and approved before it is carried out." },
  ],
  "loft-conversions": [
    { question: "Do I need planning permission for a loft conversion?", answer: "Many loft conversions fall under permitted development, but dormers on the front of the house, conversions in conservation areas and flats usually need planning permission. Building Regulations approval is needed in almost all cases." },
    { question: "Will I need a party wall agreement?", answer: "If the work affects a wall shared with a neighbour, as often happens in terraced and semi-detached houses, the Party Wall etc. Act 1996 usually requires you to give your neighbour notice before work starts." },
  ],
  "new-builds": [
    { question: "Do I need planning permission to build a new house?", answer: "Yes. A new dwelling always needs full planning permission. Some builders price from approved drawings, while others can work with your architect before approval." },
    { question: "Do new homes need a warranty?", answer: "Mortgage lenders usually expect a structural warranty or a professional consultant's certificate on a new home. Ask each builder how they provide this before you sign." },
  ],
  brickwork: [
    { question: "Do garden walls need planning permission?", answer: "Walls up to 1 metre high next to a road, or up to 2 metres elsewhere, usually do not need planning permission, but listed buildings and conservation areas have stricter rules. Check with your council if you are unsure." },
    { question: "Can new brickwork match my existing walls?", answer: "Often, but it depends on finding a close brick and mortar. Ask the bricklayer how they will source a match and whether they can build a small sample panel first." },
  ],
  roofing: [
    { question: "Does a new roof need Building Regulations approval?", answer: "Replacing more than a quarter of a roof's covering usually needs Building Regulations approval, which can include upgrading insulation. Some roofers can self-certify through a competent person scheme. Ask how your job will be signed off." },
    { question: "Should I get a roof repaired or replaced?", answer: "It depends on the age and condition of the covering and timbers. Ask roofers to explain their recommendation and show photos of the problem areas, and compare more than one opinion." },
  ],
  plastering: [
    { question: "How long before I can paint new plaster?", answer: "New plaster needs to dry fully before painting, which can take days or weeks depending on thickness, the room and the weather. Ask your plasterer for drying guidance and use a mist coat first." },
    { question: "Should I skim or re-plaster?", answer: "A skim coat suits sound walls with a poor surface. Walls with blown, cracked or damp plaster may need hacking off and re-plastering or boarding. A plasterer can tell you after seeing the walls." },
  ],
  groundworks: [
    { question: "Who checks foundations for an extension?", answer: "Building control inspects foundation excavations before concrete is poured. Agree with your groundworker or main builder who books this inspection." },
    { question: "Do I need permission to connect to a public sewer?", answer: "Yes. New connections to a public sewer need approval from the water company, and building over or near a public sewer may also need its agreement. In this area that is usually Southern Water." },
  ],
  "kitchens-and-bathrooms": [
    { question: "Who can do the gas and electrical work in a new kitchen?", answer: "Gas work must be done by a Gas Safe registered engineer. New electrical circuits, and most electrical work in bathrooms, must be certified under Building Regulations, usually by an electrician registered with a competent person scheme." },
    { question: "Should I buy my own kitchen or bathroom suite?", answer: "Some fitters supply everything, others fit only. Buying your own can give you more choice, but check who is responsible if a part is damaged, missing or faulty." },
  ],
};

const directoryFaq: Faq = {
  question: "Does Southampton Traders vet or recommend these businesses?",
  answer: "No. Listings are compiled from public company and trade sources, and listing is not an endorsement. Before hiring, check the business yourself: look it up on Companies House, ask for proof of insurance, and confirm any trade memberships with the scheme directly.",
};

function councilAnswer(locationSlug: string) {
  const entry = localCouncils[locationSlug];
  const place = getLocation(locationSlug);
  if (!entry || !place) return undefined;
  return `Planning applications and building control in ${place.name} are handled by ${entry.council}.${entry.note ? ` ${entry.note}` : ""} You can also use a registered building control approver instead of the council for building control.`;
}

export function faqsForServiceArea(serviceSlug: string, locationSlug: string): Faq[] {
  const service = getService(serviceSlug);
  const place = getLocation(locationSlug);
  if (!service || !place) return [];
  const trade = serviceTrade(serviceSlug).toLowerCase();
  const count = getBuildersForServiceInLocation(serviceSlug, locationSlug).length;
  const council = councilAnswer(locationSlug);
  return [
    { question: `How many ${trade} are listed in ${place.name}?`, answer: `Southampton Traders currently lists ${count} businesses in ${place.name} (${place.postcodeCoverage}) that include ${service.name.toLowerCase()} among their services. The list is not exhaustive.` },
    ...(serviceFaqs[serviceSlug] ?? []),
    ...(council ? [{ question: `Who handles planning and building control in ${place.name}?`, answer: council }] : []),
    { question: "How many quotes should I get?", answer: "Getting at least three written quotes based on the same brief makes it easier to compare scope and price. Ask each business to list what is included and excluded." },
    directoryFaq,
  ];
}

export function faqsForService(serviceSlug: string): Faq[] {
  const service = getService(serviceSlug);
  if (!service) return [];
  const trade = serviceTrade(serviceSlug).toLowerCase();
  const areas = locations.filter((location) => getBuildersForServiceInLocation(serviceSlug, location.slug).length > 0).map((location) => location.name);
  return [
    ...(serviceFaqs[serviceSlug] ?? []),
    ...(areas.length ? [{ question: `Which areas do the listed ${trade} cover?`, answer: `Listings for ${service.name.toLowerCase()} currently cover ${areas.join(", ")}. Each business sets its own working area, so confirm that it covers your postcode.` }] : []),
    { question: "How many quotes should I get?", answer: "Getting at least three written quotes based on the same brief makes it easier to compare scope and price. Ask each business to list what is included and excluded." },
    directoryFaq,
  ];
}

export function faqsForLocation(locationSlug: string): Faq[] {
  const place = getLocation(locationSlug);
  if (!place) return [];
  const count = getBuildersForLocation(locationSlug).length;
  const council = councilAnswer(locationSlug);
  return [
    { question: `How many builders are listed in ${place.name}?`, answer: `Southampton Traders currently lists ${count} business profiles in ${place.name} (${place.postcodeCoverage}). Some businesses cover more than one area. The list is not exhaustive.` },
    ...(council ? [{ question: `Who handles planning and building control in ${place.name}?`, answer: council }] : []),
    { question: "What should I check before hiring a builder?", answer: "Check the company on Companies House if it is a limited company, ask for proof of public liability insurance, confirm any trade memberships with the scheme itself, and get a written quote with a clear scope and payment schedule." },
    directoryFaq,
  ];
}

/** Official places homeowners can check a business or a project themselves. */
export const hiringChecks: Array<{ heading: string; body: string; link?: { label: string; href: string } }> = [
  { heading: "Look the company up", body: "Limited companies are listed on Companies House. Check the company is active, its registered address, and how long it has been trading.", link: { label: "Search Companies House", href: "https://find-and-update.company-information.service.gov.uk/" } },
  { heading: "Ask for proof of insurance", body: "Ask to see a current public liability insurance certificate, and check the cover and expiry date. For larger jobs, ask whether the business also has employer's liability cover." },
  { heading: "Confirm trade memberships directly", body: "If a business says it belongs to a scheme, check the scheme's own register rather than relying on a logo. TrustMark is the government-endorsed quality scheme for work in the home.", link: { label: "Search TrustMark", href: "https://www.trustmark.org.uk/" } },
  { heading: "Gas work needs Gas Safe registration", body: "By law, anyone working on gas appliances or pipework must be on the Gas Safe Register. Ask for their registration number and check it.", link: { label: "Check the Gas Safe Register", href: "https://www.gassaferegister.co.uk/" } },
  { heading: "Check how the work will be signed off", body: "Electrical, window and heating work can be self-certified by members of a competent person scheme. Other work needs building control approval from your council or a registered building control approver.", link: { label: "Competent person schemes on GOV.UK", href: "https://www.gov.uk/guidance/competent-person-scheme-current-schemes-and-how-schemes-are-authorised" } },
  { heading: "Get it in writing and pay in stages", body: "Get a written quote with the scope, exclusions, timings and payment schedule. Avoid paying large sums up front, and tie payments to completed stages of work." },
  { heading: "Know your rights", body: "Under the Consumer Rights Act 2015, a trader must carry out work with reasonable care and skill. If you sign a contract at home, you usually have 14 days to cancel.", link: { label: "Citizens Advice consumer help", href: "https://www.citizensadvice.org.uk/consumer/" } },
];
