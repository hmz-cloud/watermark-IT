"use client";

import { useLocale, useTranslations } from "next-intl";
import { Languages } from "lucide-react";
import clsx from "clsx";
import { Link, usePathname } from "@/i18n/navigation";

/** Toggles between EN and AR while staying on the same page. */
export function LanguageSwitcher({ className }: { className?: string }) {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const pathname = usePathname();
  const target = locale === "ar" ? "en" : "ar";

  return (
    <Link
      href={pathname}
      locale={target}
      hrefLang={target}
      aria-label={t("switchLanguageLabel")}
      className={clsx(
        "inline-flex h-11 items-center gap-1.5 rounded-[var(--radius-control)] px-3 text-sm font-medium",
        "text-ink transition-colors duration-200 hover:bg-paper hover:text-brand",
        className,
      )}
    >
      <Languages className="size-4" aria-hidden="true" />
      {/* Label is shown in the *target* language so users can find it. */}
      <span lang={target}>{t("switchLanguage")}</span>
    </Link>
  );
}
