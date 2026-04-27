import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

const publicAuthPages = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // نفحص وجود الـ Cookie (اسم الـ cookie يعتمد على الباك-أند ولكن غالباً يكون session أو token)
  // وبما أن الباك-أند هيدير الـ cookies فنحن نفترض وجودها
  const session =
    request.cookies.get("session") || request.cookies.get("token");

  // إذا كان المستخدم مسجل دخول ويحاول دخول صفحة login/register
  const isAuthPage = publicAuthPages.some((page) => pathname.includes(page));

  if (session && isAuthPage) {
    const locale = pathname.split("/")[1] || "en";
    return NextResponse.redirect(new URL(`/${locale}/`, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/", "/(ar|en)/:path*", "/((?!api|_next|.*\\..*).*)"],
};
