/**
 * Single source of truth for company contact details.
 * Update VAT / CR here once they are issued — every component reads from this file.
 */
export const site = {
  phoneDisplay: "+966 53 891 7030",
  phoneHref: "tel:+966538917030",
  // wa.me expects the number in international format without "+" or spaces.
  whatsappNumber: "966538917030",
  email: "info@watermark-it.sa", // placeholder — replace with the real mailbox
  vatNumber: null as string | null,
  crNumber: null as string | null,
} as const;

/** Build a wa.me deep link, optionally with a prefilled message. */
export function whatsappLink(text?: string) {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/** Anchor ids shared by the navbar, footer and homepage sections. */
export const sectionIds = {
  services: "services",
  whyUs: "why-us",
  contact: "contact",
} as const;
