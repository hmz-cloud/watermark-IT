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

const nextConfig: NextConfig = {
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
