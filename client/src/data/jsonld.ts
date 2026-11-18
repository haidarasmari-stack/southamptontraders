import type { BuilderProfile } from "@/data/catalog";

const text = (value: string | undefined) => (typeof value === "string" ? value.trim() : "");

export function buildBuilderProfileJsonLd(row: BuilderProfile, profileUrl: string) {
  const publicProfileUrl = text(profileUrl);
  const businessId = publicProfileUrl ? `${publicProfileUrl}#business` : undefined;
  const webPageId = publicProfileUrl ? `${publicProfileUrl}#webpage` : undefined;
  const services = [...new Set([row.Primary_Service, ...row.Secondary_Services.split(",")]
    .map((service) => service.trim())
    .filter(Boolean))];

  const business = {
    "@type": "HomeAndConstructionBusiness",
    ...(businessId ? { "@id": businessId } : {}),
    name: text(row.Business_Name),
    ...(text(row.Website_URL) ? { url: text(row.Website_URL) } : {}),
    ...(text(row.Phone_Number) ? { telephone: text(row.Phone_Number) } : {}),
    ...(text(row.Full_Address_Or_Postcode) ? { address: text(row.Full_Address_Or_Postcode) } : {}),
    ...(text(row.Primary_Location) ? { areaServed: { "@type": "Place", name: text(row.Primary_Location) } } : {}),
    ...(services.length ? { knowsAbout: services } : {}),
    ...(text(row.Unique_Profile_Summary) ? { description: text(row.Unique_Profile_Summary) } : {}),
    ...(webPageId ? { mainEntityOfPage: { "@id": webPageId } } : {}),
  };

  const webPage = {
    "@type": "WebPage",
    ...(webPageId ? { "@id": webPageId } : {}),
    ...(publicProfileUrl ? { url: publicProfileUrl } : {}),
    ...(text(row.SEO_Meta_Title) ? { name: text(row.SEO_Meta_Title) } : {}),
    ...(text(row.SEO_Meta_Description) ? { description: text(row.SEO_Meta_Description) } : {}),
    ...(businessId ? { mainEntity: { "@id": businessId } } : { mainEntity: business }),
  };

  return { "@context": "https://schema.org", "@graph": [webPage, business] };
}

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}
