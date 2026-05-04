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
  // 1. السطر السحري لحل مشكلة Railway:
  // بنمسح البورت تماماً في بيئة الإنتاج عشان next-intl ميعملش Redirect بالغلط
  if (process.env.NODE_ENV === "production") {
    request.nextUrl.port = "";
    // تأكيد إضافي لـ Railway عشان يتعامل كأنه HTTPS بدون بورتات داخلية
    request.headers.set("x-forwarded-port", "443");
    request.headers.set("x-forwarded-proto", "https");
  }

  const { pathname } = request.nextUrl;
  const session = request.cookies.get("jwt")?.value;
  const isVerified = request.cookies.get("isVerified")?.value === "true";

  const isAuthPage = authPages.some((page) => pathname.includes(page));
  const isProtectedPage = protectedPages.some((page) =>
    pathname.includes(page),
  );

  // 2. استخدام clone() وتغيير الـ pathname بدل استخدام origin
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

  // بعد ما نظفنا الـ request فوق، next-intl هيحولك لـ /ar بدون 8080
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/", "/(ar|en)/:path*", "/((?!api|_next|.*\\..*).*)"],
};
