import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import React from "react";
import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import { createServer } from "vite";
import { createLastModLookup } from "./sitemap-lastmod.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "dist", "public");
const fixedRoutes = [
  "/", "/builder/reds-builders-limited/", "/request-quote/", "/project-brief/", "/builder-area/", "/admin/",
  "/how-it-works/", "/homeowner-guides/", "/guides/home-extension-planning/", "/guides/loft-conversion/", "/guides/checking-a-builder/", "/reviews/", "/privacy/", "/cookies/", "/contact/", "/shortlist/", "/404",
];

const escapeHtml = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
const normalize = (route) => route === "/" || route === "/404" ? route : route.replace(/\/$/, "");
const headValue = (html, selector, pattern, replacement) => {
  if (pattern.test(html)) return html.replace(pattern, replacement);
  return html.replace("</head>", `${replacement}\n    </head>`);
};

const vite = await createServer({
  configFile: path.join(root, "vite.config.ts"),
  root: path.join(root, "client"),
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "error",
});

try {
  const [{ default: App }, { metaForPath, SITE_ORIGIN, SHARE_IMAGE }, { builders, locations, services, getServiceAreaPages }] = await Promise.all([
    vite.ssrLoadModule("/src/App.tsx"),
    vite.ssrLoadModule("/src/lib/seo.ts"),
    vite.ssrLoadModule("/src/data/catalog.ts"),
  ]);
  const routes = [
    ...fixedRoutes,
    ...locations.flatMap((location) => [`/builders/${location.slug}/`, `/locations/${location.slug}/`]),
    ...services.map((service) => `/services/${service.slug}/`),
    ...getServiceAreaPages().map((page) => page.path),
    ...builders.map((builder) => `/builder/${builder.slug}/`),
  ];
  const template = await fs.readFile(path.join(output, "index.html"), "utf8");
  for (const rawRoute of routes) {
    const route = normalize(rawRoute);
    const meta = metaForPath(route);
    const canonical = new URL(meta.path, SITE_ORIGIN).toString();
    const title = escapeHtml(meta.title);
    const description = escapeHtml(meta.description);
    const robots = meta.noindex ? "noindex,follow" : "index,follow";
    const markup = renderToString(React.createElement(Router, { ssrPath: rawRoute }, React.createElement(App)));
    let html = template.replace('<div id="root"></div>', `<div id="root">${markup}</div>`);
    html = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
    html = html.replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${description}" />`);
    html = html.replace(/<meta name="robots"[^>]*>/, `<meta name="robots" content="${robots}" />`);
    html = html.replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${escapeHtml(canonical)}" />`);
    html = html.replace(/<meta property="og:type"[^>]*>/, `<meta property="og:type" content="${escapeHtml(meta.ogType ?? "website")}" />`);
    html = html.replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${title}" />`);
    html = html.replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${description}" />`);
    html = html.replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${escapeHtml(canonical)}" />`);
    html = html.replace(/<meta property="og:image"[^>]*>/, `<meta property="og:image" content="${escapeHtml(SHARE_IMAGE)}" />`);
    html = html.replace(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${title}" />`);
    html = html.replace(/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${description}" />`);
    html = html.replace(/<meta name="twitter:image"[^>]*>/, `<meta name="twitter:image" content="${escapeHtml(SHARE_IMAGE)}" />`);
    const relative = route === "/" ? "index.html" : route === "/404" ? "404/index.html" : `${route.slice(1)}/index.html`;
    const destination = path.join(output, relative);
    await fs.mkdir(path.dirname(destination), { recursive: true });
    await fs.writeFile(destination, html, "utf8");
  }
  const lastModFor = createLastModLookup(root);
  const sitemapPaths = [...new Set(routes.map((rawRoute) => metaForPath(normalize(rawRoute))).filter((meta) => !meta.noindex).map((meta) => meta.path))];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapPaths.map((sitemapPath) => {
    const lastmod = lastModFor(sitemapPath);
    return `  <url><loc>${escapeHtml(new URL(sitemapPath, SITE_ORIGIN).toString())}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}</url>`;
  }).join("\n")}\n</urlset>\n`;
  await fs.writeFile(path.join(output, "sitemap.xml"), sitemap, "utf8");
  console.log(`Prerendered ${routes.length} route documents into dist/public.`);
  console.log(`Wrote sitemap.xml with ${sitemapPaths.length} indexable URLs.`);
} finally {
  await vite.close();
}
