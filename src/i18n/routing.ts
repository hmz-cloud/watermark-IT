import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ar"],
  defaultLocale: "en",
});

export type Locale = (typeof routing.locales)[number];

/** Arabic is the only RTL locale; keep this the one place that decides direction. */
export const getDirection = (locale: string) => (locale === "ar" ? "rtl" : "ltr");
