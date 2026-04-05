import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SUPPORTED_LANGS = ["en", "hi", "ta"];
const DEFAULT_LANG = "en";
const isAdminRoute = createRouteMatcher(["/admin/editor(.*)"]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  if (isAdminRoute(req)) {
    await auth.protect();
  }

  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (
    pathname.startsWith("/en/admin") ||
    pathname.startsWith("/hi/admin") ||
    pathname.startsWith("/ta/admin")
  ) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = pathname.replace(/^\/(en|hi|ta)\/admin/, "/admin");
    return NextResponse.redirect(redirectUrl);
  }

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  const pathSegments = pathname.split("/").filter(Boolean);
  const firstSegment = pathSegments[0];

  if (firstSegment && SUPPORTED_LANGS.includes(firstSegment)) {
    return NextResponse.next();
  }

  const redirectUrl = req.nextUrl.clone();
  redirectUrl.pathname = `/${DEFAULT_LANG}${pathname}`;
  return NextResponse.redirect(redirectUrl);
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon\\.ico|api).*)"],
};
