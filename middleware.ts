import { NextRequest, NextResponse } from "next/server";
import { AuthRoutes, MainRoutes } from "./types";

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
    const homeUrl = request.nextUrl.clone();
    homeUrl.pathname = MainRoutes.HOME;
    return NextResponse.redirect(homeUrl);
  }

  // JWT exists but email not verified → force to verify-email page
  if (session && !isVerified && !isAuthPage) {
    const verifyUrl = request.nextUrl.clone();
    verifyUrl.pathname = AuthRoutes.VERIFY_EMAIL;
    return NextResponse.redirect(verifyUrl);
  }

  if (!session && !isVerified && isProtectedPage) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = AuthRoutes.LOGIN;
    return NextResponse.redirect(loginUrl);
  }

  // Return next response since we are no longer using intlMiddleware
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
