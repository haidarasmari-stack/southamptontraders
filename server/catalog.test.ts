import { describe, expect, it } from "vitest";
import { builders, locations, phoneHref, services } from "../client/src/data/catalog";
import { buildBreadcrumbJsonLd, buildBuilderProfileJsonLd, buildSiteJsonLd, buildSouthamptonLandingJsonLd } from "../client/src/data/jsonld";
import { metaForPath } from "../client/src/lib/seo";

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

  it("imports all 169 unique profiles with the recorded area counts", () => {
    expect(builders).toHaveLength(169);
    expect(new Set(builders.map((builder) => builder.slug)).size).toBe(169);
    expect(Object.fromEntries(locations.map((location) => [
      location.name,
      builders.filter((builder) => builder.Primary_Location === location.name).length,
    ]))).toEqual({
      Southampton: 62,
      Eastleigh: 20,
      Fareham: 20,
      Winchester: 19,
      Totton: 14,
      "Hedge End": 14,
      Romsey: 20,
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

  it("describes the directory organization and its crawlable breadcrumbs without inventing contact details", () => {
    const siteSchema = buildSiteJsonLd("https://southamptontraders.co.uk");
    expect(siteSchema["@graph"]).toHaveLength(2);
    expect(siteSchema["@graph"][0]).toMatchObject({
      "@type": "Organization",
      name: "Southampton Traders",
      url: "https://southamptontraders.co.uk/",
    });
    expect(siteSchema["@graph"][0]).not.toHaveProperty("telephone");

    const breadcrumb = buildBreadcrumbJsonLd([
      { name: "Home", url: "https://southamptontraders.co.uk/" },
      { name: "Builders in Southampton", url: "https://southamptontraders.co.uk/locations/southampton/" },
    ]);
    expect(breadcrumb.itemListElement).toHaveLength(2);
    expect(breadcrumb.itemListElement[1]).toMatchObject({
      "@type": "ListItem",
      position: 2,
      name: "Builders in Southampton",
      item: "https://southamptontraders.co.uk/locations/southampton/",
    });
  });

  it("marks the Southampton directory as an Organization and collection, not as a LocalBusiness", () => {
    const southamptonProfiles = builders.filter((builder) => builder.Primary_Location === "Southampton");
    const schema = buildSouthamptonLandingJsonLd(
      "https://southamptontraders.co.uk",
      "https://southamptontraders.co.uk/locations/southampton/",
      southamptonProfiles,
    );
    expect(schema["@graph"]).toContainEqual(expect.objectContaining({ "@type": "Organization", name: "Southampton Traders" }));
    const page = schema["@graph"].find((node) => node["@type"] === "CollectionPage");
    expect(page).toMatchObject({
      url: "https://southamptontraders.co.uk/locations/southampton/",
      name: "Builders in Southampton | Southampton Traders",
      mainEntity: { "@type": "ItemList", numberOfItems: southamptonProfiles.length },
    });
    const mainEntity = page && "mainEntity" in page ? page.mainEntity : undefined;
    expect(mainEntity?.itemListElement).toHaveLength(southamptonProfiles.length);
    expect(schema["@graph"].some((node) => node["@type"] === "LocalBusiness")).toBe(false);
  });

  it("keeps homepage and Southampton landing metadata concise and leaves filtered results noindexed", () => {
    const home = metaForPath("/");
    const southampton = metaForPath("/locations/southampton/");
    const filteredResults = metaForPath("/builders/southampton/");

    expect(home.title).toContain("builders in Southampton");
    expect(home.description).toContain("62 builder profiles in Southampton");
    expect(home.description.length).toBeLessThanOrEqual(160);
    expect(southampton.title).toBe("Builders in Southampton | Southampton Traders");
    expect(southampton.description).toContain("SO14–SO19");
    expect(southampton.description.length).toBeLessThanOrEqual(160);
    expect(southampton.noindex).toBe(false);
    expect(filteredResults.noindex).toBe(true);
  });

  it("keeps indexable location, service, and profile metadata concise", () => {
    const paths = [
      ...locations.map((location) => `/locations/${location.slug}/`),
      ...services.map((service) => `/services/${service.slug}/`),
      ...builders.map((builder) => `/builder/${builder.slug}/`),
    ];

    for (const path of paths) {
      const meta = metaForPath(path);
      expect(meta.noindex ?? false, path).toBe(false);
      expect(meta.title.length, path).toBeLessThanOrEqual(60);
      expect(meta.description.length, path).toBeLessThanOrEqual(160);
      expect(meta.description.length, path).toBeGreaterThanOrEqual(50);
    }

    for (const service of services) {
      const meta = metaForPath(`/services/${service.slug}/`);
      expect(meta.title).toContain("in Hampshire");
      expect(meta.description).toContain("builder profiles");
    }
  });
});
