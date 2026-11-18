import importedBuilders from "./builders.json";

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

export const builders: BuilderProfile[] = (importedBuilders as BuilderCsvRow[]).map((row) => {
  const serviceNames = [...new Set([row.Primary_Service, ...row.Secondary_Services.split(",")]
    .map((service) => service.trim())
    .filter(Boolean))];
  const locationSlug = locationSlugByName[row.Primary_Location];
  return {
    ...row,
    name: row.Business_Name,
    summary: row.Unique_Profile_Summary,
    primaryServiceSlug: serviceSlugByName[row.Primary_Service],
    serviceSlugs: serviceNames.map((service) => serviceSlugByName[service]).filter(Boolean),
    locationSlugs: locationSlug ? [locationSlug] : [],
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
  return builders.filter((builder) => builder.serviceSlugs.includes(slug));
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
