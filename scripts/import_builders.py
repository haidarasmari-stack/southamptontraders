#!/usr/bin/env python3
"""Generate static builder records and crawler route documents from the checked-in CSV."""

from __future__ import annotations

import csv
import json
import re
import unicodedata
import xml.sax.saxutils as xml_utils
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE_CSV = ROOT / "data" / "southampton-traders-builders.csv"
OUTPUT_JSON = ROOT / "client" / "src" / "data" / "builders.json"
ROUTE_MANIFEST = ROOT / "client" / "public" / "manus-routes.json"
SITEMAP = ROOT / "client" / "public" / "sitemap.xml"
SITE_ORIGIN = "https://southamptontraders.co.uk"

COLUMNS = [
    "Business_Name",
    "Primary_Location",
    "Full_Address_Or_Postcode",
    "Phone_Number",
    "Website_URL",
    "Primary_Service",
    "Secondary_Services",
    "SEO_Meta_Title",
    "SEO_Meta_Description",
    "Unique_Profile_Summary",
]
SERVICES = [
    "Extensions",
    "Renovations",
    "Loft conversions",
    "New builds",
    "Brickwork",
    "Roofing",
    "Plastering",
    "Groundworks",
    "Kitchens & bathrooms",
]
AREAS = [
    ("Southampton", "southampton"),
    ("Eastleigh", "eastleigh"),
    ("Fareham", "fareham"),
    ("New Forest", "new-forest"),
    ("Winchester", "winchester"),
    ("Totton", "totton"),
    ("Hedge End", "hedge-end"),
    ("Romsey", "romsey"),
]
BRAND_SUFFIX = " | Southampton Traders"


def slugify(value: str) -> str:
    ascii_value = unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode("ascii")
    ascii_value = ascii_value.lower().replace("&", " and ")
    return re.sub(r"-+", "-", re.sub(r"[^a-z0-9]+", "-", ascii_value)).strip("-")


def title_for(row: dict[str, str]) -> str:
    """Prefer the full legal/display name over source aliases; fit within 60 chars."""
    name = row["Business_Name"].strip()
    service = row["Primary_Service"].strip()
    location = row["Primary_Location"].strip()
    candidates = [
        f"{name} – {service} in {location}{BRAND_SUFFIX}",
        f"{name} – {service}{BRAND_SUFFIX}",
        f"{name}{BRAND_SUFFIX}",
        f"{name} – {service} in {location}",
        f"{name} – {service}",
        f"{name} in {location}{BRAND_SUFFIX}",
        f"{name} in {location}",
        name,
    ]
    for candidate in candidates:
        if len(candidate) <= 60:
            return candidate
    # Only unusually long business names reach this fallback. The full name remains
    # visible in the page H1 and JSON-LD; the SEO title itself must stay <= 60 chars.
    return name[:59].rstrip() + "…"


def validate(rows: list[dict[str, str]]) -> None:
    if not rows:
        raise ValueError("The builders CSV is empty.")
    if list(rows[0].keys()) != COLUMNS:
        raise ValueError(f"CSV columns differ from the required ten-column schema: {list(rows[0].keys())}")
    names = [row["Business_Name"].strip() for row in rows]
    if len(names) != len(set(names)):
        raise ValueError("Duplicate business names found.")
    slugs = [slugify(name) for name in names]
    if len(slugs) != len(set(slugs)):
        raise ValueError("Duplicate profile slugs found; resolve them explicitly before publishing.")
    allowed_services = set(SERVICES)
    for row in rows:
        if row["Primary_Location"] not in {name for name, _ in AREAS}:
            raise ValueError(f"Unexpected primary location: {row['Primary_Location']}")
        all_services = [row["Primary_Service"].strip()] + [part.strip() for part in row["Secondary_Services"].split(",") if part.strip()]
        if not set(all_services).issubset(allowed_services):
            raise ValueError(f"Unexpected service in {row['Business_Name']}: {all_services}")
        if not 140 <= len(row["SEO_Meta_Description"]) <= 155:
            raise ValueError(f"SEO description length outside 140–155 for {row['Business_Name']}.")
        word_count = len(re.findall(r"\b[\w’'-]+\b", row["Unique_Profile_Summary"]))
        if not 15 <= word_count <= 150:
            raise ValueError(f"Profile summary word count outside 15–150 for {row['Business_Name']}.")
        if row["Website_URL"].strip() and not row["Website_URL"].startswith("https://"):
            raise ValueError(f"Website URL is not HTTPS for {row['Business_Name']}.")


def build_route_manifest(rows: list[dict[str, str]]) -> dict[str, list[dict[str, str]]]:
    routes = [
        {"path": "/", "title": "Find local builders in Southampton | Southampton Traders"},
        {"path": "/builders/:location/", "title": "Builders by Hampshire location | Southampton Traders"},
        {"path": "/builder/:slug/", "title": "Local builder profile | Southampton Traders"},
        {"path": "/builder/reds-builders-limited/", "title": "REDS BUILDERS LIMITED – Builder in Southampton"},
        {"path": "/services/:slug/", "title": "Building services in Hampshire | Southampton Traders"},
        {"path": "/locations/:slug/", "title": "Builders by Hampshire location | Southampton Traders"},
        {"path": "/:slug/", "title": "Southampton Traders information"},
        {"path": "/request-quote/", "title": "Quote form demo | Southampton Traders"},
        {"path": "/builder-area/", "title": "Builder area demo | Southampton Traders"},
        {"path": "/admin/", "title": "Admin tools demo | Southampton Traders"},
        {"path": "/how-it-works/", "title": "How Southampton Traders works"},
        {"path": "/reviews/", "title": "Review rules | Southampton Traders"},
        {"path": "/privacy/", "title": "Privacy information | Southampton Traders"},
        {"path": "/cookies/", "title": "Cookie information | Southampton Traders"},
        {"path": "/contact/", "title": "Contact and feedback | Southampton Traders"},
    ]
    for location, slug in AREAS:
        routes.append({"path": f"/builders/{slug}/", "title": f"Builders in {location} | Southampton Traders"})
        routes.append({"path": f"/locations/{slug}/", "title": f"Builders in {location} | Southampton Traders"})
    for service in SERVICES:
        service_slug = slugify(service)
        routes.append({"path": f"/services/{service_slug}/", "title": f"{service} builders | Southampton Traders"})
    for row in rows:
        routes.append({"path": f"/builder/{row['slug']}/", "title": row["SEO_Meta_Title"]})
    return {"routes": routes}


def build_sitemap(rows: list[dict[str, str]]) -> str:
    paths = ["/"]
    paths.extend(f"/locations/{slug}/" for _, slug in AREAS)
    paths.extend(f"/services/{slugify(service)}/" for service in SERVICES)
    paths.extend(f"/builder/{row['slug']}/" for row in rows)
    paths.extend(["/builder/reds-builders-limited/", "/how-it-works/"])
    locations = "\n".join(
        f"  <url><loc>{xml_utils.escape(SITE_ORIGIN + path)}</loc></url>" for path in paths
    )
    return (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        f"{locations}\n"
        "</urlset>\n"
    )


def main() -> None:
    with SOURCE_CSV.open("r", encoding="utf-8-sig", newline="") as source:
        rows = list(csv.DictReader(source))
    validate(rows)
    area_counts = Counter(row["Primary_Location"] for row in rows)
    for row in rows:
        row["slug"] = slugify(row["Business_Name"])
        # Source titles sometimes use short aliases instead of the exact Business_Name.
        # Preserve the raw CSV unchanged and derive a truthful title for the website.
        row["SEO_Meta_Title"] = title_for(row)
    OUTPUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_JSON.write_text(json.dumps(rows, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    ROUTE_MANIFEST.write_text(json.dumps(build_route_manifest(rows), ensure_ascii=False, separators=(",", ":")) + "\n", encoding="utf-8")
    SITEMAP.write_text(build_sitemap(rows), encoding="utf-8")
    print(f"Imported {len(rows)} builder records; area counts: {dict(area_counts)}")
    print(f"Generated {OUTPUT_JSON.relative_to(ROOT)}, route manifest and sitemap.")


if __name__ == "__main__":
    main()
