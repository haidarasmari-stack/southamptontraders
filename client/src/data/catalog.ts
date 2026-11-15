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
};

export type BuilderPhoto = {
  src: string;
  alt: string;
  credit: "Pexels" | "Unsplash";
};

export type DemoBuilder = {
  slug: string;
  name: string;
  summary: string;
  about: string;
  serviceSlugs: string[];
  locationSlugs: string[];
  availability: "taking-work" | "limited" | "not-set";
  photos: BuilderPhoto[];
  credentials: string[];
  reviews: never[];
  isVerified: false;
};

export const services: Service[] = [
  { slug: "extensions", name: "Extensions", description: "Explore the demonstration journey for planning a home extension.", icon: "addition" },
  { slug: "renovations", name: "Renovations", description: "Compare example profiles for whole-home and room-by-room renovation work.", icon: "refresh" },
  { slug: "loft-conversions", name: "Loft conversions", description: "See how the directory organizes loft-conversion services.", icon: "roof" },
  { slug: "new-builds", name: "New builds", description: "Browse the example path for new-build project enquiries.", icon: "home" },
  { slug: "brickwork", name: "Brickwork", description: "Find example builders offering brickwork and masonry services.", icon: "brick" },
  { slug: "roofing", name: "Roofing", description: "Explore the roofing category in this directory demonstration.", icon: "roof" },
  { slug: "plastering", name: "Plastering", description: "Browse example plastering service profiles.", icon: "wall" },
  { slug: "groundworks", name: "Groundworks", description: "Explore groundwork services in the directory demonstration.", icon: "ground" },
  { slug: "kitchens-and-bathrooms", name: "Kitchens & bathrooms", description: "See how kitchen and bathroom project listings appear.", icon: "kitchen" },
];

export const locations: Location[] = [
  { slug: "southampton", name: "Southampton", description: "Example directory listings for Southampton. All businesses shown are fictional demonstrations." },
  { slug: "eastleigh", name: "Eastleigh", description: "Example directory listings for Eastleigh. All businesses shown are fictional demonstrations." },
  { slug: "fareham", name: "Fareham", description: "Example directory listings for Fareham. All businesses shown are fictional demonstrations." },
  { slug: "winchester", name: "Winchester", description: "Example directory listings for Winchester. All businesses shown are fictional demonstrations." },
  { slug: "totton", name: "Totton", description: "Example directory listings for Totton. All businesses shown are fictional demonstrations." },
  { slug: "hedge-end", name: "Hedge End", description: "Example directory listings for Hedge End. All businesses shown are fictional demonstrations." },
  { slug: "romsey", name: "Romsey", description: "Example directory listings for Romsey. All businesses shown are fictional demonstrations." },
  { slug: "nearby-hampshire", name: "Nearby Hampshire", description: "The directory can expand to nearby Hampshire towns as real profiles are approved." },
];

const demoPhotos = {
  renovation: {
    src: "/manus-storage/hero-renovation_853be6f1.webp",
    alt: "Illustrative interior during a home renovation; not work completed by a listed business.",
    credit: "Pexels" as const,
  },
  extension: {
    src: "/manus-storage/extension-underway_359cb60e.webp",
    alt: "Illustrative house-extension construction scene; not work completed by a listed business.",
    credit: "Pexels" as const,
  },
  masonry: {
    src: "/manus-storage/masonry-demo_2fd80f57.webp",
    alt: "Illustrative masonry work; not work completed by a listed business.",
    credit: "Pexels" as const,
  },
  kitchen: {
    src: "/manus-storage/kitchen-demo_856b1ec4.webp",
    alt: "Illustrative renovated kitchen; not work completed by a listed business.",
    credit: "Unsplash" as const,
  },
};

export const demoBuilders: DemoBuilder[] = [
  {
    slug: "shoreline-build-example",
    name: "Example: Shoreline Build Co.",
    summary: "A fictional profile showing how a Southampton extension and renovation listing could look.",
    about: "This made-up profile is here to demonstrate the directory layout only. It does not represent a real company, completed job, accreditation or customer recommendation.",
    serviceSlugs: ["extensions", "renovations", "brickwork"],
    locationSlugs: ["southampton", "eastleigh", "hedge-end"],
    availability: "taking-work",
    photos: [demoPhotos.extension, demoPhotos.renovation],
    credentials: [],
    reviews: [],
    isVerified: false,
  },
  {
    slug: "brick-and-beam-example",
    name: "Example: Brick & Beam South",
    summary: "A fictional example for a brickwork and small-build profile.",
    about: "This sample company name and description are fictional. The accompanying stock photo is illustrative and is not evidence of this example business's work.",
    serviceSlugs: ["brickwork", "new-builds", "groundworks"],
    locationSlugs: ["southampton", "fareham", "totton"],
    availability: "limited",
    photos: [demoPhotos.masonry],
    credentials: [],
    reviews: [],
    isVerified: false,
  },
  {
    slug: "hearthside-projects-example",
    name: "Example: Hearthside Projects",
    summary: "A fictional demonstration profile for kitchen, bathroom and renovation work.",
    about: "This made-up profile helps illustrate a kitchen-project listing. The photo is a stock image and is not connected to a real builder or client project.",
    serviceSlugs: ["kitchens-and-bathrooms", "renovations"],
    locationSlugs: ["southampton", "winchester", "romsey"],
    availability: "not-set",
    photos: [demoPhotos.kitchen],
    credentials: [],
    reviews: [],
    isVerified: false,
  },
  {
    slug: "loftline-example",
    name: "Example: Loftline Hampshire",
    summary: "A fictional sample profile for loft conversions and roofing.",
    about: "This is a demonstration-only name. No real business, available dates, credentials, work history or reviews are being claimed.",
    serviceSlugs: ["loft-conversions", "roofing", "extensions"],
    locationSlugs: ["southampton", "eastleigh", "romsey", "nearby-hampshire"],
    availability: "not-set",
    photos: [demoPhotos.renovation],
    credentials: [],
    reviews: [],
    isVerified: false,
  },
];

export function getService(slug: string | undefined) {
  return services.find((service) => service.slug === slug);
}

export function getLocation(slug: string | undefined) {
  return locations.find((location) => location.slug === slug);
}

export function getBuilder(slug: string | undefined) {
  return demoBuilders.find((builder) => builder.slug === slug);
}

export function serviceName(slug: string) {
  return getService(slug)?.name ?? slug.replaceAll("-", " ");
}

export function locationName(slug: string) {
  return getLocation(slug)?.name ?? slug.replaceAll("-", " ");
}
