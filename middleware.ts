import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { COOKIE_NAME, getSession } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value ?? null;
  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    if (token && (await getSession(token))) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
    return NextResponse.next();
  }

  if (!token || !(await getSession(token))) {
    const url = new URL('/admin/login', request.url);
    url.searchParams.set('redirect', `${pathname}${search}`);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
