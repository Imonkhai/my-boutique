import { NextRequest, NextResponse } from 'next/server';
import {
  users, hashPassword, createSession,
  validateEmail, validatePassword, buildSetCookie,
} from '@/lib/auth';
import type { User } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, password, phone } = await req.json();

    // Validate
    if (!firstName?.trim() || !lastName?.trim())
      return NextResponse.json({ error: 'First and last name are required' }, { status: 400 });
    if (!validateEmail(email))
      return NextResponse.json({ error: 'Valid email address required' }, { status: 400 });
    const pwError = validatePassword(password);
    if (pwError)
      return NextResponse.json({ error: pwError }, { status: 400 });

    // Check duplicate
    const exists = [...users.values()].some(u => u.user.email.toLowerCase() === email.toLowerCase());
    if (exists)
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 });

    // Create user
    const user: User = {
      id: `usr_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase().trim(),
      phone: phone?.trim() || undefined,
      createdAt: new Date().toISOString(),
      addresses: [],
    };

    const passwordHash = await hashPassword(password);
    users.set(user.id, { user, passwordHash });

    const session = await createSession(user);

    const res = NextResponse.json({ user, message: 'Account created successfully' }, { status: 201 });
    res.headers.set('Set-Cookie', buildSetCookie(session.token, 7 * 24 * 60 * 60));
    return res;
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
