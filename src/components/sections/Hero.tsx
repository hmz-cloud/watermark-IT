import { useLocale, useTranslations } from "next-intl";
import { CircleCheck, FileDown, MapPin, MessageCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { buttonClasses } from "@/components/ui/Button";
import { HeroSchematic } from "./HeroSchematic";
import { profilePdfHref, sectionIds, whatsappLink } from "@/lib/site";

const points = ["survey", "engineers", "bilingual"] as const;

export function Hero() {
  const t = useTranslations("Hero");
  const tw = useTranslations("WhatsApp");
  const tp = useTranslations("Profile");
  const locale = useLocale();

  return (
    <section aria-labelledby="hero-title" className="on-navy relative isolate overflow-hidden bg-navy-900">
      {/* Background: faint engineering grid, fading out toward the content edge. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.35] [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_75%)]"
        style={{
          backgroundImage:
            "linear-gradient(#24447F 1px, transparent 1px), linear-gradient(90deg, #24447F 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <Container className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:py-28">
        <div className="lg:col-span-7">
          <p className="inline-flex items-center gap-2 text-sm font-medium text-cyan">
            <MapPin className="size-4" aria-hidden="true" />
            {t("location")}
          </p>

          <h1
            id="hero-title"
            className="mt-5 text-4xl font-semibold leading-[1.08] tracking-[-0.025em] text-balance text-white sm:text-5xl lg:text-[3.5rem]"
          >
            {t("title")}
          </h1>

          <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-on-navy">{t("subtitle")}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href={{ pathname: "/", hash: sectionIds.contact }} className={buttonClasses("accent", "lg")}>
              {t("primaryCta")}
            </Link>
            <a
              href={whatsappLink(tw("greeting"))}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses("outlineLight", "lg")}
            >
              <MessageCircle className="size-5" aria-hidden="true" />
              {t("secondaryCta")}
            </a>
          </div>

          <a
            href={profilePdfHref(locale)}
            download
            className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-cyan underline-offset-4 transition-colors duration-200 hover:text-cyan-300 hover:underline"
          >
            <FileDown className="size-4" aria-hidden="true" />
            {tp("download")}
            <span className="text-on-navy">({tp("downloadMeta")})</span>
          </a>

          <ul className="mt-10 grid gap-3 border-t border-line-dark pt-6 text-sm text-on-navy sm:grid-cols-3 sm:gap-6">
            {points.map((key) => (
              <li key={key} className="flex items-start gap-2">
                <CircleCheck className="mt-0.5 size-4 shrink-0 text-cyan" aria-hidden="true" />
                {t(`points.${key}`)}
              </li>
            ))}
          </ul>
        </div>

        {/* Mirrors in RTL so cables still run toward the reading start. */}
        <div className="hidden lg:col-span-5 lg:block">
          <HeroSchematic className="w-full rtl:-scale-x-100" />
        </div>
      </Container>
    </section>
  );
}
