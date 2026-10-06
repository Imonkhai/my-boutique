'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Phone, ArrowRight, Sparkles } from 'lucide-react';
import { showToast } from '@/components/ui/Toaster';
import Button from '@/components/ui/Button';

export default function RegisterPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
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
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, phone, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || 'Unable to create account');
      }

      showToast('Account created successfully. You are now signed in.', 'success');
      router.push('/account');
      router.refresh();
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Account creation failed', 'error');
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
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-6 lg:gap-10 items-stretch">
          <section className="bg-white p-6 sm:p-8 lg:p-10 border border-[#E5E5E5] order-2 lg:order-1">
            <div className="mb-8">
              <p className="text-[11px] tracking-[0.5em] uppercase text-[#6B6B6B] mb-2">Create account</p>
              <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#111111]">Join Gift Collection</h1>
              <p className="mt-3 text-sm text-[#6B6B6B] leading-relaxed">
                Sign up to save your wishlist, manage delivery details, and checkout faster next time.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="mb-2 block text-[11px] font-medium tracking-widest uppercase text-[#6B6B6B]">First name</span>
                  <div className="flex items-center gap-3 border border-[#E5E5E5] px-4 py-3 focus-within:border-[#D4AF37]">
                    <User size={16} className="text-[#6B6B6B]" />
                    <input
                      type="text"
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                      placeholder="Jane"
                      className="w-full bg-transparent text-sm outline-none placeholder:text-[#BBBBBB]"
                      required
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="mb-2 block text-[11px] font-medium tracking-widest uppercase text-[#6B6B6B]">Last name</span>
                  <div className="flex items-center gap-3 border border-[#E5E5E5] px-4 py-3 focus-within:border-[#D4AF37]">
                    <User size={16} className="text-[#6B6B6B]" />
                    <input
                      type="text"
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                      placeholder="Doe"
                      className="w-full bg-transparent text-sm outline-none placeholder:text-[#BBBBBB]"
                      required
                    />
                  </div>
                </label>
              </div>

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
                <span className="mb-2 block text-[11px] font-medium tracking-widest uppercase text-[#6B6B6B]">Phone number</span>
                <div className="flex items-center gap-3 border border-[#E5E5E5] px-4 py-3 focus-within:border-[#D4AF37]">
                  <Phone size={16} className="text-[#6B6B6B]" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-transparent text-sm outline-none placeholder:text-[#BBBBBB]"
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
                    placeholder="Minimum 8 characters"
                    className="w-full bg-transparent text-sm outline-none placeholder:text-[#BBBBBB]"
                    required
                  />
                </div>
                <p className="mt-2 text-xs text-[#6B6B6B]">Use at least 8 characters with an uppercase letter and a number.</p>
              </label>

              <div className="flex items-center justify-between gap-3 text-xs text-[#6B6B6B]">
                <span>Already have an account?</span>
                <Link href="/account/login" className="text-[#D4AF37] hover:text-[#111111] transition-colors">
                  Sign in
                </Link>
              </div>

              <Button type="submit" variant="primary" size="lg" loading={submitting} className="w-full">
                Create Account <ArrowRight size={16} />
              </Button>
            </form>
          </section>

          <section className="rounded-none bg-[#111111] text-white p-6 sm:p-8 lg:p-10 flex flex-col justify-between order-1 lg:order-2 min-h-[420px]">
            <div>
              <p className="text-[11px] tracking-[0.5em] uppercase text-[#D4AF37] mb-4">Why join?</p>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold leading-tight">Your boutique account, curated for you</h2>
              <p className="mt-4 text-sm text-white/80 leading-relaxed">
                Create a personal account to save your favourites, move faster through checkout, and keep track of every luxury piece you love.
              </p>
            </div>

            <div className="mt-8 space-y-3 text-sm text-white/85">
              <div className="flex items-center gap-3">
                <Sparkles size={18} className="text-[#D4AF37]" />
                Save your favourite looks in your wishlist
              </div>
              <div className="flex items-center gap-3">
                <Sparkles size={18} className="text-[#D4AF37]" />
                Reuse your delivery details for quicker checkout
              </div>
              <div className="flex items-center gap-3">
                <Sparkles size={18} className="text-[#D4AF37]" />
                Track orders and stay connected to new arrivals
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
