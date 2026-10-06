import { NextRequest, NextResponse } from 'next/server';
import {
  users,
  verifyPassword,
  createSession,
  buildSetCookie,
  ensureDefaultAdminUser,
} from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password)
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });

    await ensureDefaultAdminUser();

    const entry = [...users.values()].find(u => u.user.email.toLowerCase() === email.toLowerCase().trim());
    if (!entry)
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });

    const valid = await verifyPassword(password, entry.passwordHash);
    if (!valid)
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });

    const session = await createSession(entry.user);

    const res = NextResponse.json({ user: entry.user, message: 'Signed in successfully' });
    res.headers.set('Set-Cookie', buildSetCookie(session.token, 7 * 24 * 60 * 60));
    return res;
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
