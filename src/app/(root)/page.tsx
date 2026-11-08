import type { Metadata } from "next";
import { shareImage, siteUrl } from "@/lib/site";

// "/" is the language selector (hreflang x-default): it must stay indexable
// and point at both language versions, or Google may ignore the hreflang set.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Watermark IT | IT Infrastructure in Riyadh",
  description:
    "IT infrastructure and low current systems in Riyadh: network cabling, CCTV, access control, POS and smart homes. English and Arabic.",
  alternates: {
    canonical: "/",
    languages: { en: "/en/", ar: "/ar/", "x-default": "/" },
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Watermark IT",
    title: "Watermark IT | IT Infrastructure in Riyadh",
    images: [shareImage("en", "Watermark IT")],
  },
  twitter: { card: "summary_large_image", images: [shareImage("en", "Watermark IT").url] },
};

// Runs before paint: Arabic browsers go to /ar/, everyone else to /en/.
// Relative URLs keep this working under the GitHub Pages sub-path (/watermark-IT/).
const redirectScript = `
  try {
    var lang = (navigator.languages && navigator.languages[0]) || navigator.language || "";
    location.replace(/^ar\\b/i.test(lang) ? "./ar/" : "./en/");
  } catch (e) { location.replace("./en/"); }
`;

export default function RootRedirect() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: redirectScript }} />
      {/* Fallback when JavaScript is off. */}
      <noscript>
        <meta httpEquiv="refresh" content="0; url=./en/" />
      </noscript>
      <p style={{ fontFamily: "system-ui, sans-serif", padding: 24 }}>
        <a href="./en/">English</a> · <a href="./ar/" lang="ar">العربية</a>
      </p>
    </>
  );
}
