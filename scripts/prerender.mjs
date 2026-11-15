import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import React from "react";
import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import { createServer } from "vite";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "dist", "public");
const routes = [
  "/", "/builders/southampton/", "/builders/eastleigh/", "/builders/fareham/", "/builders/winchester/", "/builders/totton/", "/builders/hedge-end/", "/builders/romsey/", "/builders/nearby-hampshire/",
  "/services/extensions/", "/services/renovations/", "/services/loft-conversions/", "/services/new-builds/", "/services/brickwork/", "/services/roofing/", "/services/plastering/", "/services/groundworks/", "/services/kitchens-and-bathrooms/",
  "/locations/southampton/", "/locations/eastleigh/", "/locations/fareham/", "/locations/winchester/", "/locations/totton/", "/locations/hedge-end/", "/locations/romsey/", "/locations/nearby-hampshire/",
  "/builder/shoreline-build-example/", "/builder/brick-and-beam-example/", "/builder/hearthside-projects-example/", "/builder/loftline-example/",
  "/request-quote/", "/builder-area/", "/admin/", "/how-it-works/", "/reviews/", "/privacy/", "/cookies/", "/contact/", "/404",
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
  const [{ default: App }, { metaForPath, SITE_ORIGIN, SHARE_IMAGE }] = await Promise.all([
    vite.ssrLoadModule("/src/App.tsx"),
    vite.ssrLoadModule("/src/lib/seo.ts"),
  ]);
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
  console.log(`Prerendered ${routes.length} route documents into dist/public.`);
} finally {
  await vite.close();
}
