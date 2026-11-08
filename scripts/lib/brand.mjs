/**
 * Brand pieces shared by the generators in scripts/ (company profile PDF, social share images).
 * Print-safe on purpose: static font weights (variable fonts embed in PDFs as Type 3 glyphs,
 * which some viewers show blank) and a logo with no transparency (soft masks do the same).
 */
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);

/** HTML-escape text from the message files. */
export const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/**
 * The globe mark from src/components/brand/Logo.tsx, with its see-through parts pre-blended
 * to solid colours. tone "light" is for navy grounds, "dark" for white. `id` keeps gradient
 * ids unique when the mark appears more than once on a page.
 */
export function logoMark(tone = "dark", id = "m") {
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

const fontFile = (pkg, file) =>
  readFileSync(join(dirname(require.resolve(`@fontsource/${pkg}/package.json`)), "files", file)).toString("base64");
const face = (family, pkg, file, weight) =>
  `@font-face{font-family:"${family}";font-weight:${weight};font-style:normal;src:url(data:font/woff2;base64,${fontFile(pkg, file)}) format("woff2");}`;

/** @font-face rules for Inter, IBM Plex Sans Arabic and JetBrains Mono, embedded as data URIs. */
export const fontFaces = [
  ...[400, 500, 600, 700].map((w) => face("Inter", "inter", `inter-latin-${w}-normal.woff2`, w)),
  ...[400, 500, 600, 700].map((w) => face("IBM Plex Sans Arabic", "ibm-plex-sans-arabic", `ibm-plex-sans-arabic-arabic-${w}-normal.woff2`, w)),
  face("JetBrains Mono", "jetbrains-mono", "jetbrains-mono-latin-600-normal.woff2", 600),
].join("\n");
