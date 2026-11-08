import {
  Network,
  Cable,
  Cctv,
  KeyRound,
  CreditCard,
  House,
  Headset,
  Cpu,
  type LucideIcon,
} from "lucide-react";

/**
 * Order here = order on the page and in the footer. Keys map to Services.items.* and
 * ServicePages.* in messages. `slug` is the URL segment of the service's own page,
 * /{locale}/services/{slug}/ — the same in both languages; changing one breaks
 * indexed links, so add a redirect if you ever must.
 */
export const services: { key: ServiceKey; slug: string; icon: LucideIcon }[] = [
  { key: "networking", slug: "network-cabling", icon: Network },
  { key: "elv", slug: "low-current-systems", icon: Cable },
  { key: "cctv", slug: "cctv-installation", icon: Cctv },
  { key: "access", slug: "access-control", icon: KeyRound },
  { key: "pos", slug: "pos-systems", icon: CreditCard },
  { key: "smartHome", slug: "smart-home", icon: House },
  { key: "support", slug: "it-support", icon: Headset },
  { key: "hardware", slug: "it-hardware-supply", icon: Cpu },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);

/** Locale-relative path of a service page, for next-intl's <Link>. */
export const servicePath = (slug: string) => `/services/${slug}`;

export type ServiceKey =
  | "networking"
  | "elv"
  | "cctv"
  | "access"
  | "pos"
  | "smartHome"
  | "support"
  | "hardware";
