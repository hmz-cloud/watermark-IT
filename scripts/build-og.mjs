/**
 * Builds the social share images (Open Graph / X cards) from the site's own copy.
 *
 *   npm run og
 *
 * Writes public/og/watermark-it-en.png and public/og/watermark-it-ar.png (1200×630).
 * Re-run after changing the company name, tagline, hero title or service names, then
 * commit the PNGs. Needs Playwright with Chromium (`npx playwright install chromium`).
 */
import { readFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { esc, fontFaces, logoMark } from "./lib/brand.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "og");
const require = createRequire(import.meta.url);

const site = readFileSync(join(root, "src/lib/site.ts"), "utf8");
const phone = site.match(/phoneDisplay:\s*"([^"]+)"/)[1];
const host = new URL(site.match(/siteUrl\s*=\s*"([^"]+)"/)[1]).host;

const W = 1200, H = 630;
// Opaque hairline grid, as on the hero and the profile's navy pages.
const grid = (() => {
  let d = "";
  for (let x = 40; x < W; x += 40) d += `M${x} 0V${H}`;
  for (let y = 30; y < H; y += 40) d += `M0 ${y}H${W}`;
  return d;
})();

const chips = ["networking", "cctv", "access", "pos", "smartHome"];

function page(locale) {
  const m = JSON.parse(readFileSync(join(root, "messages", `${locale}.json`), "utf8"));
  const ar = locale === "ar";
  return `<!DOCTYPE html>
<html lang="${locale}" dir="${ar ? "rtl" : "ltr"}">
<head><meta charset="utf-8"><style>
${fontFaces}
* { box-sizing: border-box; margin: 0; }
html, body { width: ${W}px; height: ${H}px; }
body { position: relative; overflow: hidden; background: #0d1f45; color: #c9d5ea;
  font-family: ${ar ? '"IBM Plex Sans Arabic", "Inter"' : '"Inter", "IBM Plex Sans Arabic"'}, sans-serif; }
.grid { position: absolute; inset: 0; }
.wrap { position: absolute; inset: 0; padding: 64px 72px 56px; display: flex; flex-direction: column; justify-content: space-between; }
.brand { display: flex; align-items: center; gap: 16px; }
.brand .mark { width: 64px; height: 64px; }
.name { font-size: 30px; font-weight: 700; color: #fff; letter-spacing: ${ar ? "0" : "-0.01em"}; line-height: 1.2; }
.tag { font-size: 18px; color: #c9d5ea; margin-top: 2px; }
h1 { font-size: ${ar ? 52 : 54}px; line-height: ${ar ? 1.35 : 1.1}; font-weight: 600; color: #fff;
  letter-spacing: ${ar ? "0" : "-0.025em"}; max-width: 780px; text-wrap: balance; }
.loc { color: #5bc0eb; font-size: 20px; font-weight: 600; margin-bottom: 18px; }
.chips { display: flex; flex-wrap: wrap; gap: 10px; max-width: 820px; }
.chip { font-size: 18px; color: #fff; background: #1a3670; border: 1px solid #2a4378; border-radius: 6px; padding: 7px 14px; }
.foot { display: flex; justify-content: space-between; align-items: center; gap: 24px; padding-top: 22px; border-top: 1px solid #2a4378; font-size: 20px; }
.foot b { color: #fff; font-weight: 600; }
.ltr { direction: ltr; unicode-bidi: isolate; }
.big { position: absolute; top: 120px; ${ar ? "left" : "right"}: 56px; width: 300px; height: 300px; }
</style></head>
<body>
<svg class="grid" viewBox="0 0 ${W} ${H}" aria-hidden="true"><path d="${grid}" fill="none" stroke="#152c5e" stroke-width="1"/></svg>
<div class="big">${logoMark("light", "big").replace('class="mark"', 'width="300" height="300"')}</div>
<div class="wrap">
  <div class="brand">${logoMark("light", "small")}<div><div class="name">${esc(m.Common.companyName)}</div><div class="tag">${esc(m.Common.tagline)}</div></div></div>
  <div>
    <p class="loc">${esc(m.Hero.location)}</p>
    <h1>${esc(m.Hero.title)}</h1>
  </div>
  <div class="chips">${chips.map((k) => `<span class="chip">${esc(m.Services.items[k].title)}</span>`).join("")}</div>
  <div class="foot"><b class="ltr">${esc(host)}</b><span class="ltr">${esc(phone)}</span></div>
</div>
</body></html>`;
}

mkdirSync(outDir, { recursive: true });
const { chromium } = require("playwright");
const browser = await chromium.launch();
try {
  for (const locale of ["en", "ar"]) {
    const p = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
    await p.setContent(page(locale), { waitUntil: "load" });
    await p.evaluate(() => document.fonts.ready);
    const file = join(outDir, `watermark-it-${locale}.png`);
    await p.screenshot({ path: file, type: "png" });
    await p.close();
    console.log("wrote", file);
  }
} finally {
  await browser.close();
}
