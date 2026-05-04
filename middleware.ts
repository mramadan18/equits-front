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

  const isAuthPage = authPages.some((page) => pathname.startsWith(page));
  const isProtectedPage = protectedPages.some((page) =>
    pathname.startsWith(page),
  );

  // 1. إذا كان مسجل دخول وموثق وحاول يدخل صفحات اللوجن -> وديه الهوم
  if (session && isVerified && isAuthPage) {
    return NextResponse.redirect(new URL(MainRoutes.HOME, request.url));
  }

  // 2. إذا كان مسجل دخول وغير موثق -> اجباري يروح صفحة الـ Verify
  // استثني صفحة الـ Verify نفسها وصفحة الـ Logout (إن وجدت) عشان ميعملش Infinite Loop
  if (session && !isVerified) {
    if (pathname !== AuthRoutes.VERIFY_EMAIL) {
      return NextResponse.redirect(
        new URL(AuthRoutes.VERIFY_EMAIL, request.url),
      );
    }
    return NextResponse.next();
  }

  // 3. إذا مش مسجل دخول وبيحاول يدخل صفحة محمية -> وديه اللوجن
  if (!session && isProtectedPage) {
    const loginUrl = new URL(AuthRoutes.LOGIN, request.url);
    // اختياري: حفظ المسار اللي كان رايحه عشان نرجعه ليه بعد اللوجن
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

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
