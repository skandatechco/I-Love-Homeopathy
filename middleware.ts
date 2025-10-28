// language prefix enforcement and cookie persistence is future work.
// For now this is a placeholder for i18n-aware routing.
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(_req: NextRequest) {
  return NextResponse.next();
}
