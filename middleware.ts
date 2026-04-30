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
    return NextResponse.redirect(new URL(MainRoutes.HOME, request.url));
  }

  if (!session && !isVerified && isProtectedPage) {
    return NextResponse.redirect(new URL(AuthRoutes.LOGIN, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/", "/(ar|en)/:path*", "/((?!api|_next|.*\\..*).*)"],
};
