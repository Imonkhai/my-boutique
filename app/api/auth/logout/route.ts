import { NextRequest, NextResponse } from 'next/server';
import { deleteSession, getTokenFromCookie, COOKIE_NAME } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const token = getTokenFromCookie(req.headers.get('cookie'));
  if (token) deleteSession(token);

  const res = NextResponse.json({ message: 'Signed out' });
  res.headers.set('Set-Cookie', `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`);
  return res;
}
