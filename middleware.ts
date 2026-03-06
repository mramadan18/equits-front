import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest } from "next/server";

// تعريف الـ middleware في متغير منفصل
const intlMiddleware = createMiddleware(routing);

// تصدير دالة صريحة
export default function middleware(request: NextRequest) {
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/", "/(ar|en)/:path*", "/((?!api|_next|.*\\..*).*)"],
};
