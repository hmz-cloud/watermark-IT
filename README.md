# Watermark IT — corporate website

Bilingual (English / Arabic, RTL) site for Watermark IT Company, Riyadh.
Next.js 16 (App Router) · Tailwind CSS v4 · next-intl · lucide-react · react-hook-form + zod.

## Run

```bash
npm install
npm run dev      # http://localhost:3000  → redirects to /en
npm run build    # production build (prerenders /en and /ar)
npm run lint
npm run profile  # regenerate the company profile PDFs in public/profile/
```

## Where things live

| What | Where |
| --- | --- |
| All visible text | `messages/en.json`, `messages/ar.json` (keys type-checked against `en.json`) |
| Phone, WhatsApp, VAT / CR numbers, canonical site URL (`siteUrl`) | `src/lib/site.ts` |
| SEO: robots.txt, sitemap.xml, structured data | `src/app/robots.ts`, `src/app/sitemap.ts`, `src/components/seo/BusinessJsonLd.tsx`; titles and descriptions in `Meta` of the message files |
| Brand colours, fonts, radii, motion | `src/app/globals.css` (`@theme` block) |
| Locales and RTL rule | `src/i18n/routing.ts` |
| Locale redirect (Next 16 "proxy", formerly middleware) | `src/proxy.ts` |
| Page sections | `src/components/sections/*` |
| Navbar, footer, language switch | `src/components/layout/*` |
| Company profile PDFs (EN/AR) and their generator | `public/profile/`, `scripts/build-profile.mjs` (text from the `Profile` keys in `messages/*.json`) |
| Logo (vector redraw of the business-card mark; swap in the designer's SVG when available) | `src/components/brand/Logo.tsx` |

## Notes

- **RTL:** components use logical utilities (`ms-`, `pe-`, `start-`, `end-`) so the layout mirrors automatically under `dir="rtl"`. Phone numbers are wrapped in `dir="ltr"`.
- **Contact form:** there is no backend. Submitting opens WhatsApp with the request prefilled. To send email or post to a CRM instead, replace `onSubmit` in `src/components/sections/ContactForm.tsx`.
- **next-intl plugin:** not used, because Windows Application Control blocks the `@swc/core` binary it loads. `next.config.ts` sets the `next-intl/config` alias by hand. See the comment there to switch back.
- **Adding a service:** add an entry to `src/components/sections/servicesData.ts` and matching `Services.items.<key>` text in both message files.
- **Company profile PDF:** the hero and footer link to `public/profile/watermark-it-company-profile-{en,ar}.pdf`. The PDFs are committed, not built in CI. After changing site copy, contact details or VAT/CR numbers, run `npm run profile` and commit the new PDFs. It needs Playwright with Chromium (`npx playwright install chromium`) and internet access for Google Fonts. VAT/CR appear on the back page once they are set in `src/lib/site.ts`.
