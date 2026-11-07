import type { ReactNode } from "react";

/**
 * Minimal root layout for the bare "/" URL only.
 * Static hosting (GitHub Pages) has no server to detect the locale, so "/"
 * is a tiny page that forwards to /en/ or /ar/ (see page.tsx).
 * The real site layout lives in app/[locale]/layout.tsx.
 */
export default function RootRedirectLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
