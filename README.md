# Watermark IT — corporate website

Bilingual (English / Arabic, RTL) site for Watermark IT Company, Riyadh.
Next.js 16 (App Router) · Tailwind CSS v4 · next-intl · lucide-react · react-hook-form + zod.

## Run

```bash
npm install
npm run dev      # http://localhost:3000  → redirects to /en
npm run build    # production build (prerenders /en and /ar)
npm run lint
```

## Where things live

| What | Where |
| --- | --- |
| All visible text | `messages/en.json`, `messages/ar.json` (keys type-checked against `en.json`) |
| Phone, WhatsApp, VAT / CR numbers | `src/lib/site.ts` |
| Brand colours, fonts, radii, motion | `src/app/globals.css` (`@theme` block) |
| Locales and RTL rule | `src/i18n/routing.ts` |
| Locale redirect (Next 16 "proxy", formerly middleware) | `src/proxy.ts` |
| Page sections | `src/components/sections/*` |
| Navbar, footer, language switch | `src/components/layout/*` |
| Logo (vector redraw of the business-card mark; swap in the designer's SVG when available) | `src/components/brand/Logo.tsx` |

## Notes

- **RTL:** components use logical utilities (`ms-`, `pe-`, `start-`, `end-`) so the layout mirrors automatically under `dir="rtl"`. Phone numbers are wrapped in `dir="ltr"`.
- **Contact form:** there is no backend. Submitting opens WhatsApp with the request prefilled. To send email or post to a CRM instead, replace `onSubmit` in `src/components/sections/ContactForm.tsx`.
- **next-intl plugin:** not used, because Windows Application Control blocks the `@swc/core` binary it loads. `next.config.ts` sets the `next-intl/config` alias by hand. See the comment there to switch back.
- **Adding a service:** add an entry to `src/components/sections/servicesData.ts` and matching `Services.items.<key>` text in both message files.
