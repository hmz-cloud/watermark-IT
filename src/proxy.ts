import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next.js 16 renamed middleware → proxy. Detects locale and redirects "/" → "/en" or "/ar".
export default createMiddleware(routing);

export const config = {
  // Skip API routes, Next internals and files with an extension (favicon, images…).
  matcher: "/((?!api|trpc|_next|_vercel|.*\..*).*)",
};
