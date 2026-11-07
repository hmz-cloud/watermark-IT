import { useTranslations } from "next-intl";
import { BadgeCheck, DraftingCompass, LifeBuoy, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sectionIds } from "@/lib/site";

const reasons: { key: "certified" | "planning" | "support"; icon: LucideIcon }[] = [
  { key: "certified", icon: BadgeCheck },
  { key: "planning", icon: DraftingCompass },
  { key: "support", icon: LifeBuoy },
];

/** Three columns separated by a cyan rule along the top — no boxed cards. */
export function WhyUs() {
  const t = useTranslations("WhyUs");

  return (
    <section id={sectionIds.whyUs} aria-labelledby="whyus-title" className="bg-white py-20 sm:py-24">
      <Container>
        <SectionHeading id="whyus-title" title={t("title")} subtitle={t("subtitle")} />

        <ul className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
          {reasons.map(({ key, icon: Icon }) => (
            <li key={key} className="border-t-2 border-cyan pt-6">
              <Icon className="size-8 text-brand" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="mt-4 text-xl font-semibold text-ink">{t(`items.${key}.title`)}</h3>
              <p className="mt-3 max-w-[42ch] leading-relaxed text-muted">{t(`items.${key}.description`)}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
