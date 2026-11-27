import importedBuilders from "./builders.json";
import placementOverrides from "./listing-placement-overrides.json";

export type Service = {
  slug: string;
  name: string;
  description: string;
  icon: string;
};

export type Location = {
  slug: string;
  name: string;
  description: string;
  postcodeCoverage: string;
};

export type BuilderCsvRow = {
  slug: string;
  Business_Name: string;
  Primary_Location: string;
  Full_Address_Or_Postcode: string;
  Phone_Number: string;
  Website_URL: string;
  Primary_Service: string;
  Secondary_Services: string;
  SEO_Meta_Title: string;
  SEO_Meta_Description: string;
  Unique_Profile_Summary: string;
};

export type BuilderProfile = BuilderCsvRow & {
  name: string;
  summary: string;
  serviceSlugs: string[];
  locationSlugs: string[];
  sponsoredServiceSlugs: string[];
  primaryServiceSlug: string;
};

export const services: Service[] = [
  { slug: "extensions", name: "Extensions", description: "Browse local builder profiles that list extensions among their services.", icon: "addition" },
  { slug: "renovations", name: "Renovations", description: "Browse Hampshire businesses listing residential renovation services.", icon: "refresh" },
  { slug: "loft-conversions", name: "Loft conversions", description: "Find directory profiles that list loft conversions as a service.", icon: "roof" },
  { slug: "new-builds", name: "New builds", description: "Explore businesses listing new-build work among their services.", icon: "home" },
  { slug: "brickwork", name: "Brickwork", description: "Browse local business profiles that list brickwork services.", icon: "brick" },
  { slug: "roofing", name: "Roofing", description: "Find businesses listing roofing services across the launch areas.", icon: "roof" },
  { slug: "plastering", name: "Plastering", description: "Browse directory profiles that list plastering among their services.", icon: "wall" },
  { slug: "groundworks", name: "Groundworks", description: "Explore businesses listing groundworks services in Hampshire.", icon: "ground" },
  { slug: "kitchens-and-bathrooms", name: "Kitchens & bathrooms", description: "Browse profiles listing kitchen and bathroom services.", icon: "kitchen" },
];

export const locations: Location[] = [
  { slug: "southampton", name: "Southampton", description: "Builder profiles assigned to the Southampton launch area. Current directory coverage is not exhaustive.", postcodeCoverage: "SO14–SO19" },
  { slug: "eastleigh", name: "Eastleigh", description: "Builder profiles assigned to the Eastleigh launch area. Current directory coverage is not exhaustive.", postcodeCoverage: "SO50, SO53" },
  { slug: "fareham", name: "Fareham", description: "Builder profiles assigned to the Fareham launch area. Current directory coverage is not exhaustive.", postcodeCoverage: "PO14–PO17" },
  { slug: "new-forest", name: "New Forest", description: "Builder profiles based in or serving the New Forest and nearby Fordingbridge area. Current directory coverage is not exhaustive.", postcodeCoverage: "New Forest District & nearby SP6" },
  { slug: "winchester", name: "Winchester", description: "Builder profiles assigned to the Winchester launch area. Current directory coverage is not exhaustive.", postcodeCoverage: "SO21–SO23" },
  { slug: "totton", name: "Totton", description: "Builder profiles assigned to the Totton launch area. Current directory coverage is not exhaustive.", postcodeCoverage: "SO40" },
  { slug: "hedge-end", name: "Hedge End", description: "Builder profiles assigned to the Hedge End launch area. Current directory coverage is not exhaustive.", postcodeCoverage: "SO30" },
  { slug: "romsey", name: "Romsey", description: "Builder profiles assigned to the Romsey launch area. Current directory coverage is not exhaustive.", postcodeCoverage: "SO51" },
];

const serviceSlugByName: Record<string, string> = {
  Extensions: "extensions",
  Renovations: "renovations",
  "Loft conversions": "loft-conversions",
  "New builds": "new-builds",
  Brickwork: "brickwork",
  Roofing: "roofing",
  Plastering: "plastering",
  Groundworks: "groundworks",
  "Kitchens & bathrooms": "kitchens-and-bathrooms",
};

const locationSlugByName: Record<string, string> = Object.fromEntries(
  locations.map((location) => [location.name, location.slug]),
);

type PlacementOverride = { additionalLocationSlugs?: string[]; sponsoredServiceSlugs?: string[] };
const placementByBuilder = placementOverrides as Record<string, PlacementOverride>;

export const builders: BuilderProfile[] = (importedBuilders as BuilderCsvRow[]).map((row) => {
  const serviceNames = [...new Set([row.Primary_Service, ...row.Secondary_Services.split(",")]
    .map((service) => service.trim())
    .filter(Boolean))];
  const locationSlug = locationSlugByName[row.Primary_Location];
  const placement = placementByBuilder[row.slug];
  return {
    ...row,
    name: row.Business_Name,
    summary: row.Unique_Profile_Summary,
    primaryServiceSlug: serviceSlugByName[row.Primary_Service],
    serviceSlugs: serviceNames.map((service) => serviceSlugByName[service]).filter(Boolean),
    locationSlugs: [...new Set([locationSlug, ...(placement?.additionalLocationSlugs ?? [])].filter((slug): slug is string => Boolean(slug)))],
    sponsoredServiceSlugs: placement?.sponsoredServiceSlugs ?? [],
  };
});

export function getService(slug: string | undefined) {
  return services.find((service) => service.slug === slug);
}

export function getLocation(slug: string | undefined) {
  return locations.find((location) => location.slug === slug);
}

export function getBuilder(slug: string | undefined) {
  return builders.find((builder) => builder.slug === slug);
}

export function getBuildersForLocation(slug: string) {
  return builders.filter((builder) => builder.locationSlugs.includes(slug));
}

export function getBuildersForService(slug: string) {
  return builders
    .filter((builder) => builder.serviceSlugs.includes(slug))
    .sort((left, right) => Number(right.sponsoredServiceSlugs.includes(slug)) - Number(left.sponsoredServiceSlugs.includes(slug)));
}

export function getSponsoredServiceForSearch(query: string) {
  const text = query.toLocaleLowerCase("en-GB");
  if (/\b(loft|lofts|attic|attics)\b/.test(text)) return "loft-conversions";
  if (/\b(kitchen|kitchens|bath|baths|bathroom|bathrooms)\b/.test(text)) return "kitchens-and-bathrooms";
  return "";
}

export function serviceName(slug: string) {
  return getService(slug)?.name ?? slug.replaceAll("-", " ");
}

export function locationName(slug: string) {
  return getLocation(slug)?.name ?? slug.replaceAll("-", " ");
}

export function phoneHref(phone: string) {
  const value = phone.trim();
  if (!value) return "";
  const compact = value.replace(/[()\s.-]/g, "");
  if (compact.startsWith("+")) return `tel:${compact}`;
  const digits = compact.replace(/\D/g, "");
  if (digits.startsWith("0")) return `tel:+44${digits.slice(1)}`;
  if (digits.startsWith("44")) return `tel:+${digits}`;
  return `tel:${digits}`;
}

export type ServiceSearchCopy = {
  /** The trade name people type into search, e.g. "Roofers". */
  trade: string;
  /** Short advice specific to this kind of work, shown on service-in-area pages. */
  checks: Array<{ heading: string; body: string }>;
};

export const serviceSearchCopy: Record<string, ServiceSearchCopy> = {
  extensions: {
    trade: "Extension builders",
    checks: [
      { heading: "Planning or permitted development", body: "Many single-storey rear extensions fall under permitted development, but limits apply to size, height and conservation areas. Check with the council's planning service before you commit to a design." },
      { heading: "Building Regulations sign-off", body: "Extensions need Building Regulations approval for structure, insulation, drainage and fire safety. Ask the builder who will submit to building control and who arranges inspections." },
      { heading: "What the quote includes", body: "Ask whether drawings, structural calculations, foundations, steelwork and the finished kitchen or flooring are included, or priced separately." },
    ],
  },
  renovations: {
    trade: "Renovation builders",
    checks: [
      { heading: "Survey before you start", body: "Older homes can hide damp, rot or outdated wiring. A survey or opening-up work before pricing reduces surprises once walls and floors are exposed." },
      { heading: "Order of trades", body: "Ask who coordinates electricians, plumbers, plasterers and decorators, and how the work will be sequenced if you are living in the property." },
      { heading: "Contingency", body: "Agree in writing how unforeseen work will be priced and approved, so changes do not appear only on the final invoice." },
    ],
  },
  "loft-conversions": {
    trade: "Loft conversion specialists",
    checks: [
      { heading: "Head height and roof type", body: "Measure the tallest point of the loft. Roof shape, trusses and head height decide whether a rooflight, dormer, hip-to-gable or mansard conversion is realistic." },
      { heading: "Approvals and neighbours", body: "Most loft conversions need Building Regulations approval, including fire-safe escape routes. Work on a shared wall may need a Party Wall Act notice to neighbours." },
      { heading: "Stairs and services", body: "Ask where the new staircase will land, and whether heating, electrics and insulation upgrades are part of the price." },
    ],
  },
  "new-builds": {
    trade: "New build builders",
    checks: [
      { heading: "Planning permission first", body: "A new dwelling needs full planning permission. Ask builders whether they price from approved drawings or can work with your architect before approval." },
      { heading: "Structural warranty", body: "Mortgage lenders usually expect a structural warranty or professional consultant's certificate on a new home. Ask how the builder handles this." },
      { heading: "Programme and stage payments", body: "Agree a build programme and tie payments to completed stages such as foundations, wall plate, roof and first fix." },
    ],
  },
  brickwork: {
    trade: "Bricklayers",
    checks: [
      { heading: "Matching existing bricks", body: "For extensions and repairs, ask how the bricklayer will source a close brick and mortar match, and whether a sample panel is included." },
      { heading: "Walls, piers and repointing", body: "Garden walls, chimney work and repointing need different skills. Check that the profile lists the type of brickwork you need." },
      { heading: "Scaffolding and waste", body: "Confirm whether scaffolding, skip hire and clearing away are included in the price." },
    ],
  },
  roofing: {
    trade: "Roofers",
    checks: [
      { heading: "Repair or replace", body: "Ask the roofer to explain whether a leak needs a local repair or a wider re-roof, and to show photos of the problem areas." },
      { heading: "Materials and guarantees", body: "Check the tile, slate or flat-roof system being quoted, and what written guarantee covers materials and workmanship." },
      { heading: "Access and scaffolding", body: "Confirm whether scaffolding is included, how long it will stay up, and whether any neighbour access is needed." },
    ],
  },
  plastering: {
    trade: "Plasterers",
    checks: [
      { heading: "Skim, re-plaster or boarding", body: "Ask whether walls will be skimmed, fully re-plastered or plasterboarded, as each suits a different wall condition." },
      { heading: "Drying time", body: "New plaster needs time to dry before painting. Ask for drying guidance so decorating is not booked too early." },
      { heading: "Preparation and protection", body: "Confirm who removes old plaster, protects floors and fixtures, and clears up afterwards." },
    ],
  },
  groundworks: {
    trade: "Groundworkers",
    checks: [
      { heading: "Utilities and drainage", body: "Before digging, ask how underground services will be traced and whether drainage connections need building control or water company approval." },
      { heading: "Spoil removal", body: "Excavation creates a lot of spoil. Check whether muck-away, grab lorries and skips are included." },
      { heading: "Foundations and inspections", body: "For extensions and new builds, ask who books the building control foundation inspection and what happens if ground conditions change the design." },
    ],
  },
  "kitchens-and-bathrooms": {
    trade: "Kitchen & bathroom fitters",
    checks: [
      { heading: "Supply or fit only", body: "Ask whether the quote covers supplying units, worktops and sanitaryware, or fitting only items you buy yourself." },
      { heading: "Gas and electrics", body: "Gas work must be done by a Gas Safe registered engineer, and new electrical circuits in kitchens and bathrooms usually need certification. Ask who carries this out." },
      { heading: "Waterproofing and tiling", body: "For showers and wet rooms, ask how walls and floors will be tanked or waterproofed before tiling." },
    ],
  },
};

/** Minimum listings before a service-in-area page is published, so no page is thin. */
export const MIN_SERVICE_AREA_PROFILES = 3;

export function serviceTrade(slug: string) {
  return serviceSearchCopy[slug]?.trade ?? `${serviceName(slug)} builders`;
}

export function getBuildersForServiceInLocation(serviceSlug: string, locationSlug: string) {
  return getBuildersForService(serviceSlug).filter((builder) => builder.locationSlugs.includes(locationSlug));
}

export function hasServiceAreaPage(serviceSlug: string, locationSlug: string) {
  return Boolean(getService(serviceSlug) && getLocation(locationSlug))
    && getBuildersForServiceInLocation(serviceSlug, locationSlug).length >= MIN_SERVICE_AREA_PROFILES;
}

export function getServiceAreaPages() {
  return services.flatMap((service) => locations
    .filter((location) => hasServiceAreaPage(service.slug, location.slug))
    .map((location) => ({ service, location, path: `/services/${service.slug}/${location.slug}/` })));
}
