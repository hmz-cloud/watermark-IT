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

/** Order here = order on the page and in the footer. Keys map to Services.items.* in messages. */
export const services: { key: ServiceKey; icon: LucideIcon }[] = [
  { key: "networking", icon: Network },
  { key: "elv", icon: Cable },
  { key: "cctv", icon: Cctv },
  { key: "access", icon: KeyRound },
  { key: "pos", icon: CreditCard },
  { key: "smartHome", icon: House },
  { key: "support", icon: Headset },
  { key: "hardware", icon: Cpu },
];

export type ServiceKey =
  | "networking"
  | "elv"
  | "cctv"
  | "access"
  | "pos"
  | "smartHome"
  | "support"
  | "hardware";
