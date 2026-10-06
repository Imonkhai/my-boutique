'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().trim().min(1, 'Email is required').email('Enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: 'admin@giftcollection.com', password: 'Gift@2025' },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Unable to sign in');
      }

      const redirectTo = searchParams.get('redirect') || '/admin/dashboard';
      router.push(redirectTo);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to sign in');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
        <div className="grid md:grid-cols-2">
          <div className="hidden md:flex flex-col justify-between bg-[#111111] p-8 text-white">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F7E7B3]">
                <ShieldCheck size={12} /> Gift Collection
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-semibold tracking-tight">Boutique operations, beautifully managed.</h1>
              <p className="mt-4 max-w-sm text-sm text-slate-300">
                Manage inventory, orders, customers, and campaigns from one premium dashboard.
              </p>
            </div>

            <div className="grid gap-3 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#D4AF37]" /> Real-time stock visibility
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#D4AF37]" /> Order workflow automation
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#D4AF37]" /> Customer and revenue insights
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            <div className="mb-6 flex items-center justify-between">
              <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800">
                <ArrowLeft size={14} /> Back to store
              </Link>
            </div>

            <div className="mb-8">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#D4AF37]">Admin access</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Sign in to your dashboard</h2>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Email address</label>
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 transition focus-within:border-[#D4AF37] focus-within:bg-white">
                  <Mail size={16} className="text-slate-400" />
                  <input
                    type="email"
                    autoComplete="email"
                    placeholder="admin@giftcollection.com"
                    className="w-full border-0 bg-transparent px-1 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                    {...form.register('email')}
                  />
                </div>
                {form.formState.errors.email && (
                  <p className="mt-2 text-xs text-red-500">{form.formState.errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 transition focus-within:border-[#D4AF37] focus-within:bg-white">
                  <LockKeyhole size={16} className="text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="w-full border-0 bg-transparent px-1 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                    {...form.register('password')}
                  />
                  <button
                    type="button"
                    className="text-slate-400 hover:text-slate-700"
                    onClick={() => setShowPassword(v => !v)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {form.formState.errors.password && (
                  <p className="mt-2 text-xs text-red-500">{form.formState.errors.password.message}</p>
                )}
              </div>

              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                  {error}
                </div>
              )}

              <div className="flex items-center justify-between gap-4 text-xs text-slate-500">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="h-3.5 w-3.5 rounded border-slate-300" /> Remember me
                </label>
                <Link href="/admin/login" className="font-medium text-[#D4AF37] hover:underline">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-[#111111] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#D4AF37] hover:text-[#111111] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? 'Signing in...' : 'Sign in to dashboard'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
