import { describe, expect, it } from "vitest";
import { builders, locations, phoneHref, services } from "../client/src/data/catalog";
import { buildBuilderProfileJsonLd } from "../client/src/data/jsonld";

const expectedServices = [
  "Extensions",
  "Renovations",
  "Loft conversions",
  "New builds",
  "Brickwork",
  "Roofing",
  "Plastering",
  "Groundworks",
  "Kitchens & bathrooms",
];

const expectedAreas = ["Southampton", "Eastleigh", "Fareham", "Winchester", "Totton", "Hedge End", "Romsey"];

describe("researched builder catalog", () => {
  it("contains the exact nine service categories and seven launch areas", () => {
    expect(services.map((service) => service.name)).toEqual(expectedServices);
    expect(locations.map((location) => location.name)).toEqual(expectedAreas);
  });

  it("imports all 129 unique profiles with the recorded area counts", () => {
    expect(builders).toHaveLength(129);
    expect(new Set(builders.map((builder) => builder.slug)).size).toBe(129);
    expect(Object.fromEntries(locations.map((location) => [
      location.name,
      builders.filter((builder) => builder.Primary_Location === location.name).length,
    ]))).toEqual({
      Southampton: 56,
      Eastleigh: 12,
      Fareham: 18,
      Winchester: 10,
      Totton: 10,
      "Hedge End": 8,
      Romsey: 15,
    });
  });

  it("creates a direct UK telephone URI and leaves an absent number empty", () => {
    expect(phoneHref("023 9269 3337")).toBe("tel:+442392693337");
    expect(phoneHref("")).toBe("");
  });

  it("omits missing phone and website facts from profile structured data", () => {
    const withoutPhone = builders.find((builder) => !builder.Phone_Number.trim());
    const withoutWebsite = builders.find((builder) => !builder.Website_URL.trim());
    expect(withoutPhone).toBeDefined();
    expect(withoutWebsite).toBeDefined();

    const phoneSchema = buildBuilderProfileJsonLd(withoutPhone!, `https://southamptontraders.co.uk/builder/${withoutPhone!.slug}/`);
    const phoneBusiness = phoneSchema["@graph"].find((node) => node["@type"] === "HomeAndConstructionBusiness");
    expect(phoneBusiness).not.toHaveProperty("telephone");

    const websiteSchema = buildBuilderProfileJsonLd(withoutWebsite!, `https://southamptontraders.co.uk/builder/${withoutWebsite!.slug}/`);
    const websiteBusiness = websiteSchema["@graph"].find((node) => node["@type"] === "HomeAndConstructionBusiness");
    expect(websiteBusiness).not.toHaveProperty("url");
  });
});
