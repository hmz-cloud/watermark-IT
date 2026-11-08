/**
 * Builds the downloadable company profile PDFs from the site's own copy.
 *
 *   npm run profile
 *
 * Reads messages/{en,ar}.json and src/lib/site.ts, renders an A4 brochure as
 * HTML, prints it with headless Chromium (Playwright) and writes:
 *   public/profile/watermark-it-company-profile-en.pdf
 *   public/profile/watermark-it-company-profile-ar.pdf
 * With --html <dir>, it also keeps the HTML source of each PDF in <dir>.
 *
 * Re-run it after changing any text in the message files or the contact details,
 * then commit the regenerated PDFs. Needs Playwright with Chromium installed
 * (`npx playwright install chromium`). Fonts come from the @fontsource packages
 * (fixed weights, not variable) so they embed as normal fonts that every PDF
 * viewer can draw; variable fonts embed as Type 3 glyphs, which some phone
 * viewers show as blank pages. For the same reason the PDF avoids CSS masks
 * and soft (alpha) gradients.
 */
import { readFileSync, writeFileSync, mkdirSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  Network, Cable, Cctv, KeyRound, CreditCard, House, Headset, Cpu,
  BadgeCheck, DraftingCompass, LifeBuoy, Phone, MessageCircle, MapPin, Clock, UserRound,
  Building2, Store, UtensilsCrossed, Home, CircleCheck,
} from "lucide-react";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "profile");
const require = createRequire(import.meta.url);

/* ---------- Data from the site ---------- */

const siteSrc = readFileSync(join(root, "src/lib/site.ts"), "utf8");
const field = (name) => {
  const m = siteSrc.match(new RegExp(`${name}:\\s*("([^"]*)"|null)`));
  return m && m[2] !== undefined ? m[2] : null;
};
const site = {
  phoneDisplay: field("phoneDisplay"),
  whatsappNumber: field("whatsappNumber"),
  vatNumber: field("vatNumber"),
  crNumber: field("crNumber"),
};

const services = [
  ["networking", Network], ["elv", Cable], ["cctv", Cctv], ["access", KeyRound],
  ["pos", CreditCard], ["smartHome", House], ["support", Headset], ["hardware", Cpu],
];
const reasons = [["certified", BadgeCheck], ["planning", DraftingCompass], ["support", LifeBuoy]];
const steps = ["survey", "design", "supply", "install", "test", "support"];
const sectors = [["offices", Building2], ["retail", Store], ["restaurants", UtensilsCrossed], ["homes", Home]];
const points = ["survey", "engineers", "bilingual"];

const icon = (Icon, size = 22) =>
  renderToStaticMarkup(createElement(Icon, { size, strokeWidth: 1.75, "aria-hidden": "true" }));

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/* Same mark as src/components/brand/Logo.tsx. */
function logoMark(tone = "dark", id = "m") {
  const light = tone === "light";
  return `<svg viewBox="0 0 64 64" class="mark" aria-hidden="true">
  <defs>
    <radialGradient id="g-${id}" cx="0.62" cy="0.34" r="0.75"><stop offset="0" stop-color="#9AD8F5"/><stop offset="0.35" stop-color="#3B8FDB"/><stop offset="0.75" stop-color="#1F56A8"/><stop offset="1" stop-color="#132A59"/></radialGradient>
    <linearGradient id="w-${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${light ? "#9AD8F5" : "#2B6CB0"}"/><stop offset="1" stop-color="${light ? "#5BC0EB" : "#132A59"}"/></linearGradient>
    <linearGradient id="v-${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${light ? "#6997b7" : "#759fcc"}"/><stop offset="1" stop-color="${light ? "#4088b1" : "#667593"}"/></linearGradient>
  </defs>
  <path d="M9 21C3 33 7 50 22 56c9 3.6 19 2.4 26-2.6C38 57 24 55 15 47 8.6 40.6 6.5 30 9 21Z" fill="url(#w-${id})"/>
  <path d="M14.5 19.5C10.5 29 13 41.5 23 47.3c6.4 3.7 14 4 20.4 1.4C35 50 26.8 47.6 21 42 15.6 36.6 13.6 27.6 14.5 19.5Z" fill="url(#v-${id})"/>
  <circle cx="35" cy="33" r="17" fill="url(#g-${id})"/>
  <path d="M38 19.5c3 .8 5.6 2.6 7.4 5-2 .6-3.4 2-3.2 4 .2 1.8-1.4 2.6-3 2-1.6-.7-2.2-2.4-1.4-4 .8-1.5.2-3.4-1.4-4.2 0-1.2.6-2.2 1.6-2.8Zm4.4 15c1.8-.4 3.8.4 4.6 2-.8 2.8-2.4 5.2-4.6 7-1.2-1.4-1.6-3.2-1-5 .4-1.4.2-2.8 1-4Z" fill="#549ad6"/>
  <g fill="none" stroke="#E6F4FC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 27h6l4-4h4"/><path d="M18.5 33h12"/><path d="M19 39h6l4 4h4"/></g>
  <g fill="#132A59" stroke="#E6F4FC" stroke-width="1.4"><circle cx="34.6" cy="23" r="1.8"/><circle cx="32.4" cy="33" r="1.8"/><circle cx="34.6" cy="43" r="1.8"/></g>
  <g fill="${light ? "#5BC0EB" : "#2B6CB0"}">
    <rect x="44" y="12" width="4" height="4" rx="0.5"/><rect x="49" y="12" width="4" height="4" rx="0.5"/><rect x="49" y="7" width="3.4" height="3.4" rx="0.4"/><rect x="54" y="8" width="3.2" height="3.2" rx="0.4"/>
    <rect x="54" y="3.4" width="2.6" height="2.6" rx="0.3" fill="${light ? "#4ba0ca" : "#5589c0"}"/><rect x="58.4" y="5" width="2.4" height="2.4" rx="0.3" fill="${light ? "#4490b9" : "#6b98c8"}"/><rect x="58.6" y="1" width="2" height="2" rx="0.3" fill="${light ? "#3878a0" : "#8aaed4"}"/><rect x="61.4" y="2.6" width="1.6" height="1.6" rx="0.2" fill="${light ? "#306790" : "#a0bddb"}"/>
  </g>
</svg>`;
}

/* ---------- Fonts: static weights, embedded so the PDF needs no network ---------- */

const fontFile = (pkg, file) =>
  readFileSync(join(dirname(require.resolve(`@fontsource/${pkg}/package.json`)), "files", file)).toString("base64");
const face = (family, pkg, file, weight) =>
  `@font-face{font-family:"${family}";font-weight:${weight};font-style:normal;src:url(data:font/woff2;base64,${fontFile(pkg, file)}) format("woff2");}`;
const fontFaces = [
  ...[400, 500, 600, 700].map((w) => face("Inter", "inter", `inter-latin-${w}-normal.woff2`, w)),
  ...[400, 500, 600, 700].map((w) => face("IBM Plex Sans Arabic", "ibm-plex-sans-arabic", `ibm-plex-sans-arabic-arabic-${w}-normal.woff2`, w)),
  face("JetBrains Mono", "jetbrains-mono", "jetbrains-mono-latin-600-normal.woff2", 600),
].join("\n");

/* Opaque vector grid for the navy pages (a CSS gradient grid fades to transparent, which becomes a PDF soft mask). */
// Plain vector lines: an SVG <pattern> is rasterised into an image with an alpha channel.
const gridPath = (() => {
  const W = 794, H = 1123, step = 34; // A4 at 96 dpi, ~9 mm cells
  let d = "";
  for (let x = step; x < W; x += step) d += `M${x} 0V${H}`;
  for (let y = step; y < H; y += step) d += `M0 ${y}H${W}`;
  return d;
})();
const grid = () => `<svg class="grid" viewBox="0 0 794 1123" preserveAspectRatio="xMinYMin slice" aria-hidden="true"><path d="${gridPath}" fill="none" stroke="#152c5e" stroke-width="1"/></svg>`;

/* ---------- Styles ---------- */

const css = `
:root {
  --navy: #132a59; --navy-900: #0d1f45; --navy-700: #24447f; --line-dark: #2a4378;
  --brand: #2b6cb0; --brand-50: #eaf2fb; --cyan: #5bc0eb; --cyan-300: #9ad8f5;
  --paper: #f4f7fb; --line: #dce3ee; --ink: #132a59; --body: #3b4a66; --muted: #5b6a85; --on-navy: #c9d5ea;
  --sheet: #ffffff; --desk: #dfe6f0;
  --font: "Inter", "IBM Plex Sans Arabic", ui-sans-serif, system-ui, sans-serif;
  --mono: "JetBrains Mono", ui-monospace, monospace;
  color-scheme: light;
}
:root:lang(ar) { --font: "IBM Plex Sans Arabic", "Inter", ui-sans-serif, system-ui, sans-serif; }
* { box-sizing: border-box; }
body { margin: 0; background: var(--desk); color: var(--body); font-family: var(--font); -webkit-font-smoothing: antialiased; }
h1, h2, h3, p { margin: 0; }
h1, h2, h3 { color: var(--ink); text-wrap: balance; }
:lang(ar) h1, :lang(ar) h2, :lang(ar) h3 { letter-spacing: 0 !important; line-height: 1.35 !important; }
svg { display: block; flex-shrink: 0; }

.sheet { position: relative; overflow: hidden; background: var(--sheet); display: flex; flex-direction: column; }
.inner { flex: 1; display: flex; flex-direction: column; gap: 9mm; padding: 18mm 18mm 0; }
.navy { background: var(--navy-900); color: var(--on-navy); }
.navy h1, .navy h2, .navy h3 { color: #fff; }
/* Engineering grid: opaque hairlines (no masks or transparency, which some PDF viewers render blank). */
.grid { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }

.eyebrow { font-size: 9pt; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; color: var(--brand); }
:lang(ar) .eyebrow { letter-spacing: 0; font-size: 10.5pt; }
.navy .eyebrow { color: var(--cyan); }
.h2 { font-size: 28pt; font-weight: 600; letter-spacing: -.02em; line-height: 1.15; margin-top: 2.5mm; }
.lead { font-size: 12pt; line-height: 1.6; max-width: 150mm; }
.small { font-size: 10.5pt; line-height: 1.6; }
.ico { color: var(--brand); }
.navy .ico { color: var(--cyan); }

/* Running footer */
.foot { display: flex; justify-content: space-between; align-items: center; gap: 6mm; margin: 0 18mm; padding: 5mm 0 9mm; border-top: 1px solid var(--line); font-size: 8.5pt; color: var(--muted); }
.foot b { color: var(--ink); font-weight: 600; }
.foot .num { font-family: var(--mono); font-variant-numeric: tabular-nums; }

/* Cover */
.cover .inner { justify-content: space-between; padding-bottom: 16mm; position: relative; }
.brandline { display: flex; align-items: center; gap: 4mm; }
.brandline .mark { width: 15mm; height: 15mm; }
.brandline .name { font-size: 15pt; font-weight: 700; color: #fff; letter-spacing: -.01em; }
.brandline .tag { font-size: 9pt; color: var(--on-navy); }
.cover-mark .mark { width: 74mm; height: 74mm; }
.cover h1 { font-size: 40pt; font-weight: 600; line-height: 1.06; letter-spacing: -.03em; margin-top: 5mm; max-width: 160mm; }
.cover .sub { font-size: 13pt; line-height: 1.55; margin-top: 7mm; max-width: 140mm; }
.cover-points { list-style: none; margin: 0; padding: 6mm 0 0; border-top: 1px solid var(--line-dark); display: grid; grid-template-columns: repeat(3, 1fr); gap: 6mm; font-size: 9.5pt; line-height: 1.45; }
.cover-points li { display: flex; gap: 2.5mm; align-items: flex-start; }
.cover-points svg { color: var(--cyan); margin-top: .3mm; }
.cover-meta { display: flex; justify-content: space-between; gap: 6mm; font-size: 9pt; margin-top: 7mm; }
.cover-meta span { display: inline-flex; gap: 2mm; align-items: center; }
.ltr { direction: ltr; unicode-bidi: isolate; }

/* About */
.two { display: grid; grid-template-columns: 1fr 1fr; gap: 6mm; }
.panel { background: var(--paper); border: 1px solid var(--line); border-radius: 3mm; padding: 6mm; display: flex; flex-direction: column; gap: 2.5mm; }
.panel h3 { font-size: 13pt; font-weight: 600; }
.panel p { font-size: 11pt; line-height: 1.6; }
.reasons { display: grid; grid-template-columns: repeat(3, 1fr); gap: 7mm; }
.reason { display: flex; flex-direction: column; gap: 2.5mm; padding-top: 5mm; border-top: 2px solid var(--brand); }
.reason h3 { font-size: 12pt; font-weight: 600; }
.h3 { font-size: 14pt; font-weight: 600; }

/* Services */
.services { display: grid; grid-template-columns: 1fr 1fr; border-top: 1px solid var(--line); }
.svc { display: flex; gap: 4.5mm; padding: 8mm 0; border-bottom: 1px solid var(--line); }
.svc:nth-child(odd) { padding-inline-end: 6mm; border-inline-end: 1px solid var(--line); }
.svc:nth-child(even) { padding-inline-start: 6mm; }
.svc .badge { width: 11mm; height: 11mm; border-radius: 2mm; background: var(--brand-50); display: grid; place-items: center; color: var(--brand); }
.svc h3 { font-size: 12.5pt; font-weight: 600; margin-bottom: 1.5mm; }
.band { margin-top: auto; margin-bottom: 6mm; border-radius: 3mm; padding: 7mm; display: flex; align-items: center; gap: 6mm; }
.band p { font-size: 13pt; line-height: 1.45; color: #fff; font-weight: 500; }
.band .mark { width: 16mm; height: 16mm; }
.band > svg { color: var(--cyan); }

/* Process */
.steps { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0; border: 1px solid var(--line); border-radius: 3mm; overflow: hidden; }
.step { padding: 8mm 6mm; display: flex; flex-direction: column; gap: 2mm; border-inline-end: 1px solid var(--line); border-bottom: 1px solid var(--line); }
.step:nth-child(3n) { border-inline-end: 0; }
.step:nth-child(n+4) { border-bottom: 0; }
.step .n { font-family: var(--mono); font-size: 9pt; color: var(--brand); font-weight: 600; }
.step h3 { font-size: 12pt; font-weight: 600; }
.sectors { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4mm; }
.sector { background: var(--paper); border-radius: 3mm; padding: 6mm 5mm; display: flex; flex-direction: column; gap: 4mm; font-size: 11pt; font-weight: 500; color: var(--ink); line-height: 1.35; }

/* Contact */
.contact .inner { position: relative; justify-content: space-between; padding-bottom: 14mm; }
.contact .h2 { font-size: 30pt; max-width: 140mm; }
.contact .lead { color: var(--on-navy); margin-top: 5mm; }
.rows { display: grid; grid-template-columns: 1fr 1fr; gap: 0 10mm; border-top: 1px solid var(--line-dark); }
.row { display: flex; gap: 4mm; padding: 5mm 0; border-bottom: 1px solid var(--line-dark); }
.row .lbl { font-size: 8.5pt; text-transform: uppercase; letter-spacing: .1em; color: var(--cyan-300); }
:lang(ar) .row .lbl { text-transform: none; letter-spacing: 0; font-size: 9.5pt; }
.row .val { font-size: 13pt; color: #fff; font-weight: 500; margin-top: 1mm; }
.legal { display: flex; justify-content: space-between; align-items: flex-end; gap: 8mm; font-size: 8.5pt; }
.legal dl { display: flex; gap: 6mm; margin: 0; }
.legal dt { display: inline; } .legal dd { display: inline; margin: 0 0 0 1.5mm; color: #fff; }

/* Print: fixed A4 sheets */
@page { size: A4; margin: 0; }
@media print {
  body { background: none; }
  .sheet { width: 210mm; height: 297mm; page-break-after: always; break-after: page; }
  .sheet:last-child { page-break-after: auto; break-after: auto; }
  .screen-only { display: none !important; }
}

/* Screen: the same sheets, stacked, and reflowed on narrow screens */
@media screen {
  body { padding-block: 24px 48px; padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); }
  .sheet { max-width: 210mm; min-height: min(297mm, 140vw); margin: 0 auto 24px; border-radius: 4px; box-shadow: 0 1px 2px rgba(13,31,69,.08), 0 8px 24px rgba(13,31,69,.08); }
  .inner { padding: clamp(20px, 7vw, 68px) clamp(20px, 7vw, 68px) 0; gap: 32px; }
  .foot { margin: 32px clamp(20px, 7vw, 68px) 0; padding-bottom: 28px; }
  .cover .inner, .contact .inner { padding-bottom: clamp(24px, 6vw, 60px); gap: 40px; }
}
@media screen and (max-width: 640px) {
  .cover h1 { font-size: 30px; } .h2 { font-size: 24px; } .contact .h2 { font-size: 26px; }
  .cover-mark .mark { width: 120px; height: 120px; }
  .two, .reasons, .services, .steps, .rows, .cover-points { grid-template-columns: 1fr; }
  .sectors { grid-template-columns: 1fr 1fr; }
  .svc:nth-child(odd), .svc:nth-child(even) { padding-inline: 0; border-inline-end: 0; }
  .step { border-inline-end: 0 !important; border-bottom: 1px solid var(--line) !important; }
  .step:last-child { border-bottom: 0 !important; }
  .cover-meta, .legal, .foot { flex-direction: column; align-items: flex-start; }
  .band { flex-direction: column; align-items: flex-start; }
}
.toolbar { max-width: 210mm; margin: 0 auto 20px; display: flex; flex-wrap: wrap; gap: 10px; align-items: center; justify-content: space-between; font-size: 14px; color: var(--ink); }
.toolbar a { display: inline-flex; align-items: center; min-height: 40px; padding: 0 16px; border-radius: 6px; background: var(--brand); color: #fff; font-weight: 600; text-decoration: none; }
.toolbar a.alt { background: var(--sheet); color: var(--ink); border: 1px solid var(--line); }
.toolbar a:focus-visible { outline: 2px solid var(--navy); outline-offset: 3px; }
`;

/* ---------- Pages ---------- */

function build(locale, { toolbar = "" } = {}) {
  const m = JSON.parse(readFileSync(join(root, "messages", `${locale}.json`), "utf8"));
  const P = m.Profile;
  const company = m.Common.companyName;
  const year = new Date().getFullYear();
  const dir = locale === "ar" ? "rtl" : "ltr";
  const pages = 5;
  const foot = (n) => `<footer class="foot"><span><b>${esc(company)}</b> · ${esc(P.docTitle)}</span><span class="num ltr">${String(n).padStart(2, "0")} / ${String(pages).padStart(2, "0")}</span></footer>`;

  const cover = `
<section class="sheet navy cover">
  ${grid()}
  <div class="inner">
    <div class="brandline">${logoMark("light", "c1")}<div><div class="name">${esc(company)}</div><div class="tag">${esc(m.Common.tagline)}</div></div></div>
    <div>
      <div class="cover-mark">${logoMark("light", "c2")}</div>
      <p class="eyebrow" style="margin-top:10mm">${esc(P.eyebrow)} · <span class="ltr">${year}</span></p>
      <h1>${esc(m.Hero.title)}</h1>
      <p class="sub">${esc(m.Hero.subtitle)}</p>
    </div>
    <div>
      <ul class="cover-points">${points.map((k) => `<li>${icon(CircleCheck, 16)}<span>${esc(m.Hero.points[k])}</span></li>`).join("")}</ul>
      <div class="cover-meta">
        <span>${icon(MapPin, 14)}${esc(m.Hero.location)}</span>
        <span>${icon(Phone, 14)}<span class="ltr">${esc(site.phoneDisplay)}</span></span>
      </div>
    </div>
  </div>
</section>`;

  const about = `
<section class="sheet">
  <div class="inner">
    <header><p class="eyebrow">${esc(P.aboutEyebrow)}</p><h2 class="h2">${esc(P.aboutTitle)}</h2></header>
    <p class="lead">${esc(P.aboutBody1)}</p>
    <p class="lead" style="margin-top:-3mm">${esc(P.aboutBody2)}</p>
    <div class="two">
      <div class="panel"><h3>${esc(P.missionTitle)}</h3><p>${esc(P.mission)}</p></div>
      <div class="panel"><h3>${esc(P.visionTitle)}</h3><p>${esc(P.vision)}</p></div>
    </div>
    <h3 class="h3" style="margin-top:3mm">${esc(P.valuesTitle)}</h3>
    <div class="reasons">${reasons.map(([k, I]) => `
      <div class="reason"><span class="ico">${icon(I, 24)}</span><h3>${esc(m.WhyUs.items[k].title)}</h3><p class="small">${esc(m.WhyUs.items[k].description)}</p></div>`).join("")}
    </div>
  </div>
  ${foot(2)}
</section>`;

  const servicesPage = `
<section class="sheet">
  <div class="inner">
    <header><p class="eyebrow">${esc(P.servicesEyebrow)}</p><h2 class="h2">${esc(m.Services.title)}</h2><p class="lead" style="margin-top:3mm">${esc(m.Services.subtitle)}</p></header>
    <div class="services">${services.map(([k, I]) => `
      <div class="svc"><span class="badge">${icon(I, 20)}</span><div><h3>${esc(m.Services.items[k].title)}</h3><p class="small">${esc(m.Services.items[k].description)}</p></div></div>`).join("")}
    </div>
    <div class="band navy">${logoMark("light", "b1")}<div><p>${esc(m.WhyUs.subtitle)}</p></div></div>
  </div>
  ${foot(3)}
</section>`;

  const process = `
<section class="sheet">
  <div class="inner">
    <header><p class="eyebrow">${esc(P.processEyebrow)}</p><h2 class="h2">${esc(P.processTitle)}</h2></header>
    <ol class="steps">${steps.map((k, i) => `
      <li class="step"><span class="n">${String(i + 1).padStart(2, "0")}</span><h3>${esc(P.process[k].title)}</h3><p class="small">${esc(P.process[k].description)}</p></li>`).join("")}
    </ol>
    <h3 class="h3" style="margin-top:4mm">${esc(P.sectorsTitle)}</h3>
    <div class="sectors">${sectors.map(([k, I]) => `<div class="sector"><span class="ico">${icon(I, 22)}</span>${esc(P.sectors[k])}</div>`).join("")}</div>
    <div class="band navy">${icon(CircleCheck, 28)}<div><p>${esc(m.Hero.points.survey)}</p><p class="small" style="color:var(--on-navy);font-weight:400;margin-top:1mm">${esc(m.Contact.contactPerson)} · <span class="ltr">${esc(site.phoneDisplay)}</span></p></div></div>
  </div>
  ${foot(4)}
</section>`;

  const legalItems = [
    site.vatNumber && `<div><dt>${esc(m.Footer.vat)}:</dt><dd class="ltr">${esc(site.vatNumber)}</dd></div>`,
    site.crNumber && `<div><dt>${esc(m.Footer.cr)}:</dt><dd class="ltr">${esc(site.crNumber)}</dd></div>`,
  ].filter(Boolean).join("");

  const row = (I, label, value) => `<div class="row"><span class="ico">${icon(I, 20)}</span><div><div class="lbl">${esc(label)}</div><div class="val">${value}</div></div></div>`;
  const C = m.Contact;
  const contact = `
<section class="sheet navy contact">
  ${grid()}
  <div class="inner">
    <header><p class="eyebrow">${esc(P.contactEyebrow)}</p><h2 class="h2">${esc(P.contactTitle)}</h2><p class="lead">${esc(P.contactBody)}</p></header>
    <div class="rows">
      ${row(UserRound, C.infoTitle, `${esc(C.contactPerson)}`)}
      ${row(Phone, C.phoneLabel, `<span class="ltr">${esc(site.phoneDisplay)}</span>`)}
      ${row(MessageCircle, C.whatsappLabel, `<span class="ltr">wa.me/${esc(site.whatsappNumber)}</span>`)}
      ${row(MapPin, C.locationLabel, esc(C.location))}
      ${row(Clock, C.hoursLabel, esc(C.hours))}
    </div>
    <div class="legal">
      <div class="brandline">${logoMark("light", "c3")}<div><div class="name">${esc(company)}</div><div class="tag">${esc(m.Common.tagline)}</div></div></div>
      <div>${legalItems ? `<dl>${legalItems}</dl>` : ""}<p style="margin-top:2mm">${esc(m.Footer.rights.replace("{year}", year))}</p></div>
    </div>
  </div>
</section>`;

  const head = `<title>${esc(company)} · ${esc(P.docTitle)}</title>
<style>${fontFaces}${css}</style>`;
  const body = `${toolbar}${cover}${about}${servicesPage}${process}${contact}`;
  return { head, body, dir, title: `${company} · ${P.docTitle}` };
}

const doc = ({ head, body, dir }, locale) =>
  `<!DOCTYPE html>\n<html lang="${locale}" dir="${dir}">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n${head}\n</head>\n<body>\n${body}\n</body>\n</html>\n`;

/* ---------- Render ---------- */

mkdirSync(outDir, { recursive: true });
const htmlFlag = process.argv.indexOf("--html");
const htmlDir = htmlFlag > -1 ? process.argv[htmlFlag + 1] : mkdtempSync(join(tmpdir(), "profile-"));
mkdirSync(htmlDir, { recursive: true });
const { chromium } = require("playwright");
const browser = await chromium.launch();
try {
  for (const locale of ["en", "ar"]) {
    const html = doc(build(locale), locale);
    const htmlPath = join(htmlDir, `watermark-it-company-profile-${locale}.html`);
    writeFileSync(htmlPath, html);
    const page = await browser.newPage();
    await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    const pdfPath = join(outDir, `watermark-it-company-profile-${locale}.pdf`);
    await page.pdf({ path: pdfPath, format: "A4", printBackground: true, preferCSSPageSize: true });
    await page.close();
    console.log("wrote", pdfPath);
  }
} finally {
  await browser.close();
}

