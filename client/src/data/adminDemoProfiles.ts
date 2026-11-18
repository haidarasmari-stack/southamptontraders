export type AdminDemoProfile = {
  slug: string;
  name: string;
  summary: string;
};

// Synthetic rows are used only inside the explicitly labelled admin demonstration.
export const adminDemoProfiles: AdminDemoProfile[] = [
  {
    slug: "shoreline-build-example",
    name: "Example: Shoreline Build Co.",
    summary: "A fictional profile showing how a Southampton extension and renovation listing could look.",
  },
  {
    slug: "brick-and-beam-example",
    name: "Example: Brick & Beam South",
    summary: "A fictional example for a brickwork and small-build profile.",
  },
  {
    slug: "hearthside-projects-example",
    name: "Example: Hearthside Projects",
    summary: "A fictional demonstration profile for kitchen, bathroom and renovation work.",
  },
  {
    slug: "loftline-example",
    name: "Example: Loftline Hampshire",
    summary: "A fictional sample profile for loft conversions and roofing.",
  },
];
