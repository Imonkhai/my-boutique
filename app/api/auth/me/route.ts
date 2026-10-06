import { NextRequest, NextResponse } from 'next/server';
import { getSession, getTokenFromCookie } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const token = getTokenFromCookie(req.headers.get('cookie'));
  if (!token) return NextResponse.json({ user: null }, { status: 401 });

  const session = await getSession(token);
  if (!session) return NextResponse.json({ user: null }, { status: 401 });

  return NextResponse.json({ user: session.user });
}
