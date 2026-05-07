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
  MainRoutes.SETTINGS,
  MainRoutes.SAVED,
];

export default function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const fullPath = search ? `${pathname}${search}` : pathname;
  const session = request.cookies.get("jwt")?.value;
  const isVerified = request.cookies.get("isVerified")?.value === "true";

  const isAuthPage = authPages.some((page) => pathname.startsWith(page));
  const isProtectedPage = protectedPages.some((page) =>
    pathname.startsWith(page),
  );

  // الصفحات المخصصة للزوار فقط
  const isGuestOnlyPage =
    pathname === MainRoutes.LANDING || pathname.startsWith(MainRoutes.EXPLORE);

  // 1. إذا كان مسجل دخول وموثق وحاول يدخل صفحات اللوجن أو صفحات الزوار -> وديه الهوم
  if (session && isVerified && (isAuthPage || isGuestOnlyPage)) {
    const callbackUrl = request.nextUrl.searchParams.get("callbackUrl");
    let redirectUrl = callbackUrl || MainRoutes.HOME;

    // Prevent infinite loop if callbackUrl is also an auth page or guest page
    if (
      authPages.some((page) => redirectUrl.startsWith(page)) ||
      redirectUrl === MainRoutes.LANDING ||
      redirectUrl.startsWith(MainRoutes.EXPLORE)
    ) {
      redirectUrl = MainRoutes.HOME;
    }

    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  // 2. إذا كان مسجل دخول وغير موثق -> اجباري يروح صفحة الـ Verify
  // استثني صفحة الـ Verify نفسها عشان ميعملش Infinite Loop
  if (session && !isVerified) {
    if (pathname !== AuthRoutes.VERIFY_EMAIL) {
      const verifyUrl = new URL(AuthRoutes.VERIFY_EMAIL, request.url);
      const callbackUrl =
        request.nextUrl.searchParams.get("callbackUrl") ||
        (isProtectedPage ? fullPath : null);
      if (callbackUrl) {
        verifyUrl.searchParams.set("callbackUrl", callbackUrl);
      }
      return NextResponse.redirect(verifyUrl);
    }
    return NextResponse.next();
  }

  // 3. إذا مش مسجل دخول وبيحاول يدخل صفحة محمية -> وديه اللوجن
  if (!session && isProtectedPage) {
    const loginUrl = new URL(AuthRoutes.LOGIN, request.url);
    // حفظ المسار اللي كان رايحه عشان نرجعه ليه بعد اللوجن
    loginUrl.searchParams.set("callbackUrl", fullPath);
    return NextResponse.redirect(loginUrl);
  }

  // السماح بالمرور لأي صفحة مشتركة (Shared) زي talents أو projects/[id]
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files (svg, png, etc)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
