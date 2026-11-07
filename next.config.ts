import type { NextConfig } from "next";

/*
 * next-intl setup WITHOUT `createNextIntlPlugin`.
 *
 * The official plugin eagerly loads `@swc/core` (for its optional message
 * extractor), and Windows Smart App Control / Application Control blocks that
 * native binary on this machine. The only thing the plugin does that we need is
 * aliasing `next-intl/config` to our request config, so we do that here.
 * If the binary is ever allowed, you can switch back to:
 *   export default createNextIntlPlugin("./src/i18n/request.ts")(nextConfig);
 */
const requestConfig = "./src/i18n/request.ts";

/*
 * GitHub Pages hosting: the site is exported as plain static files to ./out.
 * PAGES_BASE_PATH is set by the deploy workflow (e.g. "/watermark-IT") because
 * project sites are served from a sub-path. Locally it is empty.
 */
const basePath = process.env.PAGES_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  // /en/ → out/en/index.html, which GitHub Pages serves without extra config.
  trailingSlash: true,
  turbopack: {
    resolveAlias: {
      // Turbopack needs a relative path here.
      "next-intl/config": requestConfig,
    },
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
