import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Watermark IT",
  robots: { index: false },
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
