"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Container";
import { buttonClasses } from "@/components/ui/Button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { sectionIds } from "@/lib/site";

const links = [
  { key: "services", hash: sectionIds.services },
  { key: "whyUs", hash: sectionIds.whyUs },
  { key: "contact", hash: sectionIds.contact },
] as const;

/**
 * Sticky header. Layout is Logo | links | actions using flex in document order,
 * so under dir="rtl" the whole bar mirrors automatically (logo on the right).
 */
export function Navbar() {
  const t = useTranslations("Nav");
  const tc = useTranslations("Common");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Add a bottom rule once the page scrolls, so the bar separates from content.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: Esc closes and returns focus to the toggle; Tab is trapped inside.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const focusables = () =>
      Array.from(panel?.querySelectorAll<HTMLElement>("a, button") ?? []);
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const items = [toggleRef.current!, ...focusables()];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={clsx(
        "sticky top-0 z-40 bg-white/90 backdrop-blur-md transition-[border-color] duration-200",
        "border-b",
        scrolled || open ? "border-line" : "border-transparent",
      )}
    >
      <Container className="flex h-18 items-center justify-between gap-6">
        <Link href="/" aria-label={tc("companyName")} className="rounded-md" onClick={close}>
          <Logo name={tc("companyName")} tagline={tc("tagline")} />
        </Link>

        <nav aria-label={t("mainNav")} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {links.map(({ key, hash }) => (
              <li key={key}>
                <Link
                  href={{ pathname: "/", hash }}
                  className="inline-flex h-11 items-center rounded-[var(--radius-control)] px-4 text-[15px] font-medium text-ink transition-colors duration-200 hover:text-brand"
                >
                  {t(key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {/* Visibility lives on a wrapper: putting `hidden` next to the
              components' own `inline-flex` class lets inline-flex win. */}
          <div className="hidden items-center gap-2 sm:flex">
            <LanguageSwitcher />
            <Link href={{ pathname: "/", hash: sectionIds.contact }} className={buttonClasses("primary", "md")}>
              {t("getQuote")}
            </Link>
          </div>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-[var(--radius-control)] text-ink hover:bg-paper lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
          </button>
        </div>
      </Container>

      {/* Mobile panel — rendered only when open so hidden links are not tabbable. */}
      {open && (
        <div id="mobile-menu" ref={panelRef} className="border-t border-line bg-white lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            <nav aria-label={t("mainNav")}>
              <ul className="flex flex-col">
                {links.map(({ key, hash }) => (
                  <li key={key}>
                    <Link
                      href={{ pathname: "/", hash }}
                      onClick={close}
                      className="flex h-12 items-center rounded-[var(--radius-control)] px-3 text-base font-medium text-ink hover:bg-paper"
                    >
                      {t(key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-3 flex flex-col gap-3 border-t border-line pt-4 sm:hidden">
              <Link
                href={{ pathname: "/", hash: sectionIds.contact }}
                onClick={close}
                className={buttonClasses("primary", "lg", "w-full")}
              >
                {t("getQuote")}
              </Link>
              <LanguageSwitcher className="justify-center" />
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
