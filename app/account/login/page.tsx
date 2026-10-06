'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { showToast } from '@/components/ui/Toaster';
import Button from '@/components/ui/Button';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (data?.user) router.replace('/account');
      })
      .finally(() => setIsCheckingSession(false));
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || 'Unable to sign in');
      }

      showToast('Welcome back! You are now signed in.', 'success');
      router.push('/account');
      router.refresh();
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Sign in failed', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (isCheckingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F8F8] pt-[88px]">
        <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F8F8] pt-[88px] px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl py-10 sm:py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-6 lg:gap-10 items-stretch">
          <section className="rounded-none bg-[#111111] text-white p-6 sm:p-8 lg:p-10 flex flex-col justify-between min-h-[420px]">
            <div>
              <p className="text-[11px] tracking-[0.5em] uppercase text-[#D4AF37] mb-4">Your account</p>
              <h1 className="font-display text-4xl sm:text-5xl font-semibold leading-tight">Welcome back to Gift Collection</h1>
              <p className="mt-4 max-w-xl text-sm text-white/80 leading-relaxed">
                Access your wishlist, saved addresses, and your order history in one secure place.
              </p>
            </div>

            <div className="mt-8 grid gap-3 text-sm text-white/85">
              <div className="flex items-center gap-3">
                <ShieldCheck size={18} className="text-[#D4AF37]" />
                Secure checkout with saved session
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck size={18} className="text-[#D4AF37]" />
                Easy order tracking and account management
              </div>
            </div>
          </section>

          <section className="bg-white p-6 sm:p-8 lg:p-10 border border-[#E5E5E5]">
            <div className="mb-8">
              <p className="text-[11px] tracking-[0.5em] uppercase text-[#6B6B6B] mb-2">Sign in</p>
              <h2 className="font-display text-3xl font-semibold text-[#111111]">Access your dashboard</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <label className="block">
                <span className="mb-2 block text-[11px] font-medium tracking-widest uppercase text-[#6B6B6B]">Email address</span>
                <div className="flex items-center gap-3 border border-[#E5E5E5] px-4 py-3 focus-within:border-[#D4AF37]">
                  <Mail size={16} className="text-[#6B6B6B]" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-transparent text-sm outline-none placeholder:text-[#BBBBBB]"
                    required
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-2 block text-[11px] font-medium tracking-widest uppercase text-[#6B6B6B]">Password</span>
                <div className="flex items-center gap-3 border border-[#E5E5E5] px-4 py-3 focus-within:border-[#D4AF37]">
                  <Lock size={16} className="text-[#6B6B6B]" />
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full bg-transparent text-sm outline-none placeholder:text-[#BBBBBB]"
                    required
                  />
                </div>
              </label>

              <div className="flex items-center justify-between gap-3 text-xs text-[#6B6B6B]">
                <span>Need an account?</span>
                <Link href="/account/register" className="text-[#D4AF37] hover:text-[#111111] transition-colors">
                  Create one
                </Link>
              </div>

              <Button type="submit" variant="primary" size="lg" loading={submitting} className="w-full">
                Sign In <ArrowRight size={16} />
              </Button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
