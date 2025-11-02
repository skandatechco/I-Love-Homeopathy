import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SUPPORTED_LANGS = ['en', 'hi', 'ta'];
const DEFAULT_LANG = 'en';

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  
  // CRITICAL: Exclude /admin paths FIRST - before any other processing
  // This prevents admin routes from being redirected to /en/admin
  if (pathname.startsWith('/admin')) {
    return NextResponse.next();
  }
  
  // Don't process if path is static asset or API
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  // Extract first segment as potential language
  const pathSegments = pathname.split('/').filter(Boolean);
  const firstSegment = pathSegments[0];

  // If first segment is a valid language, continue
  if (firstSegment && SUPPORTED_LANGS.includes(firstSegment)) {
    return NextResponse.next();
  }

  // If no language prefix, redirect to default language
  // This handles root "/" and paths like "/remedies/something"
  const redirectUrl = req.nextUrl.clone();
  redirectUrl.pathname = `/${DEFAULT_LANG}${pathname}`;
  
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - admin (admin dashboard and CMS - exact match /admin or /admin/*)
     */
    '/((?!_next/static|_next/image|favicon\\.ico|admin).*)',
  ],
};
