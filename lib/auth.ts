import type { User, AuthSession } from '@/types';

export const DEFAULT_ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@giftcollection.com';
export const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Gift@2025';
export const COOKIE_NAME = 'gc-auth-token';

// ─── In-memory stores (replace with DB in production) ────────────────────────
export const users = new Map<string, { user: User; passwordHash: string }>();
export const sessions = new Map<string, AuthSession>();

function getAuthSecret(): string {
  return process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || 'gc-secret-2025';
}

function encodeBase64Url(input: Uint8Array): string {
  let binary = '';
  input.forEach(byte => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

function decodeBase64Url(input: string): Uint8Array {
  const normalized = input.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized + '='.repeat((4 - (normalized.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function signPayload(payload: Record<string, unknown>): Promise<string> {
  const encoder = new TextEncoder();
  const secret = encoder.encode(getAuthSecret());
  const key = await crypto.subtle.importKey('raw', secret, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const json = JSON.stringify(payload);
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(json));
  const signaturePart = encodeBase64Url(new Uint8Array(signature));
  const payloadPart = encodeBase64Url(encoder.encode(json));
  return `${signaturePart}.${payloadPart}`;
}

async function verifySignedPayload(token: string): Promise<Record<string, unknown> | null> {
  if (!token || !token.includes('.')) return null;

  const [signaturePart, payloadPart] = token.split('.');
  if (!signaturePart || !payloadPart) return null;

  try {
    const encoder = new TextEncoder();
    const secret = encoder.encode(getAuthSecret());
    const key = await crypto.subtle.importKey('raw', secret, { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']);
    const signature = decodeBase64Url(signaturePart);
    const payloadJson = new TextDecoder().decode(decodeBase64Url(payloadPart));
    const signatureBuffer = signature.buffer.slice(signature.byteOffset, signature.byteOffset + signature.byteLength) as ArrayBuffer;
    const verified = await crypto.subtle.verify('HMAC', key, signatureBuffer, encoder.encode(payloadJson));
    if (!verified) return null;

    const parsed = JSON.parse(payloadJson) as Record<string, unknown>;
    const exp = Number(parsed.expiresAt ?? 0);
    if (Number.isFinite(exp) && exp < Date.now()) return null;

    return parsed;
  } catch {
    return null;
  }
}

export async function ensureDefaultAdminUser(): Promise<{ user: User; passwordHash: string }> {
  const adminId = 'admin_1';
  const existing = users.get(adminId);
  if (existing) return existing;

  const user: User = {
    id: adminId,
    firstName: 'Amara',
    lastName: 'Osei',
    email: DEFAULT_ADMIN_EMAIL.toLowerCase().trim(),
    phone: '+234 800 000 0000',
    role: 'admin',
    createdAt: new Date().toISOString(),
    addresses: [],
  };

  const passwordHash = await hashPassword(DEFAULT_ADMIN_PASSWORD);
  users.set(adminId, { user, passwordHash });
  return { user, passwordHash };
}

// ─── Simple hash (use bcrypt in production) ───────────────────────────────────
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const secret = getAuthSecret();
  const data = encoder.encode(password + secret);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return (await hashPassword(password)) === hash;
}

// ─── Token ────────────────────────────────────────────────────────────────────
export function generateToken(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map(b => b.toString(16).padStart(2, '0')).join('');
}

// ─── Session helpers ──────────────────────────────────────────────────────────
export async function createSession(user: User): Promise<AuthSession> {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
  const token = await signPayload({ user, expiresAt });
  const session: AuthSession = { user, token, expiresAt };
  sessions.set(token, session);
  return session;
}

export async function getSession(token: string): Promise<AuthSession | null> {
  const existing = sessions.get(token);
  if (existing) {
    if (new Date(existing.expiresAt) < new Date()) {
      sessions.delete(token);
      return null;
    }
    return existing;
  }

  const verified = await verifySignedPayload(token);
  if (!verified || typeof verified.user !== 'object' || !verified.expiresAt) return null;

  const user = verified.user as User;
  const expiresAt = String(verified.expiresAt);
  if (new Date(expiresAt) < new Date()) return null;

  const session: AuthSession = { user, token, expiresAt };
  sessions.set(token, session);
  return session;
}

export function deleteSession(token: string): void {
  sessions.delete(token);
}

// ─── Cookie helpers ───────────────────────────────────────────────────────────
export function getTokenFromCookie(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;
  const cookies = cookieHeader.split(';').map(cookie => cookie.trim());
  const match = cookies.find(cookie => cookie.startsWith(`${COOKIE_NAME}=`));
  return match ? decodeURIComponent(match.slice(COOKIE_NAME.length + 1)) : null;
}

export function buildSetCookie(token: string, maxAge: number): string {
  return `${COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}`;
}

// ─── Validation ───────────────────────────────────────────────────────────────
export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePassword(password: string): string | null {
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (!/[A-Z]/.test(password)) return 'Password must contain an uppercase letter';
  if (!/[0-9]/.test(password)) return 'Password must contain a number';
  return null;
}
