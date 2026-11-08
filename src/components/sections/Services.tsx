import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { servicePath, services } from "./servicesData";
import { sectionIds } from "@/lib/site";

/**
 * The 8 services sit in one panel split by 1px rules (like a patch panel),
 * instead of 8 floating cards. `gap-px` over a line-coloured background draws
 * the dividers, so they stay correct at every breakpoint and in RTL.
 */
export function Services() {
  const t = useTranslations("Services");

  return (
    <section id={sectionIds.services} aria-labelledby="services-title" className="bg-paper py-20 sm:py-24">
      <Container>
        <SectionHeading id="services-title" title={t("title")} subtitle={t("subtitle")} />

        <ul className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-panel)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ key, slug, icon }) => (
            <li key={key} className="bg-white">
              <ServiceCard
                icon={icon}
                title={t(`items.${key}.title`)}
                description={t(`items.${key}.description`)}
                href={servicePath(slug)}
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
