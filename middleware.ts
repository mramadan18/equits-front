import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";
import { AuthRoutes, MainRoutes } from "./types";

const intlMiddleware = createMiddleware(routing);

const authPages = [
  AuthRoutes.LOGIN,
  AuthRoutes.REGISTER,
  AuthRoutes.VERIFY_EMAIL,
  AuthRoutes.FORGOT_PASSWORD,
  AuthRoutes.RESET_PASSWORD,
  AuthRoutes.VERIFY_RESET_OTP,
];

const protectedPages = [
  MainRoutes.HOME,
  MainRoutes.REPO,
  MainRoutes.NEW_PROJECT,
  MainRoutes.DRAFT_PROJECTS,
  MainRoutes.SETTINGS,
];

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get("jwt")?.value;
  const isVerified = request.cookies.get("isVerified")?.value === "true";

  const isAuthPage = authPages.some((page) => pathname.includes(page));
  const isProtectedPage = protectedPages.some((page) =>
    pathname.includes(page),
  );

  if (session && isVerified && isAuthPage) {
    // Use request.nextUrl.origin to avoid leaking internal ports (e.g., :8080)
    // in production when behind a reverse proxy like Railway.
    const homeUrl = new URL(MainRoutes.HOME, request.nextUrl.origin);
    return NextResponse.redirect(homeUrl);
  }

  if (!session && !isVerified && isProtectedPage) {
    const loginUrl = new URL(AuthRoutes.LOGIN, request.nextUrl.origin);
    return NextResponse.redirect(loginUrl);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/", "/(ar|en)/:path*", "/((?!api|_next|.*\\..*).*)"],
};
