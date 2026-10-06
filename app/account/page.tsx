'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, ShoppingBag, Heart, MapPin, Settings, LogOut, ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/ui/Animations';
import Button from '@/components/ui/Button';
import { showToast } from '@/components/ui/Toaster';
import type { User as AuthUser } from '@/types';

const accountLinks = [
  { icon: ShoppingBag, label: 'My Orders', desc: 'Track and manage your orders', href: '#' },
  { icon: Heart, label: 'Wishlist', desc: 'Your saved favourite pieces', href: '/wishlist' },
  { icon: MapPin, label: 'Addresses', desc: 'Manage your delivery addresses', href: '#' },
  { icon: Settings, label: 'Account Settings', desc: 'Update your profile and password', href: '#' },
];

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await fetch('/api/auth/me', { cache: 'no-store' });
        const data = await res.json();

        if (!res.ok || !data?.user) {
          router.replace('/account/login');
          return;
        }

        setUser(data.user);
      } catch {
        router.replace('/account/login');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      showToast('You have been signed out.', 'info');
      router.push('/');
      router.refresh();
    } catch {
      showToast('Unable to sign out right now.', 'error');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F8F8] pt-[88px]">
        <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="pt-[88px]">
      <div className="bg-[#111111] text-white py-16 lg:py-20 text-center">
        <p className="text-[#D4AF37] text-[11px] tracking-[0.5em] uppercase mb-3">Welcome Back</p>
        <h1 className="font-display text-4xl lg:text-6xl font-semibold">My Account</h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6 lg:gap-8">
          <Reveal className="bg-white border border-[#E5E5E5] p-6 sm:p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-[#F8F8F8] border border-[#E5E5E5] rounded-full flex items-center justify-center">
                <User size={28} className="text-[#6B6B6B]" />
              </div>
              <div>
                <p className="text-[11px] tracking-[0.5em] uppercase text-[#6B6B6B]">Signed in</p>
                <h2 className="font-display text-2xl font-semibold text-[#111111]">{user.firstName} {user.lastName}</h2>
                <p className="text-sm text-[#6B6B6B]">{user.email}</p>
              </div>
            </div>

            <div className="space-y-3 text-sm text-[#6B6B6B]">
              <p><span className="font-medium text-[#111111]">Member since:</span> {new Date(user.createdAt).toLocaleDateString()}</p>
              {user.phone && <p><span className="font-medium text-[#111111]">Phone:</span> {user.phone}</p>}
            </div>

            <div className="mt-6">
              <Button onClick={handleLogout} variant="outline" size="sm" className="w-full sm:w-auto">
                <LogOut size={15} /> Sign Out
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {accountLinks.map(({ icon: Icon, label, desc, href }) => (
              <Link
                key={label}
                href={href}
                className="group flex items-start gap-4 p-5 border border-[#E5E5E5] bg-white hover:border-[#D4AF37] transition-all duration-300"
              >
                <div className="w-10 h-10 bg-[#F8F8F8] flex items-center justify-center shrink-0 group-hover:bg-[#D4AF37] transition-colors">
                  <Icon size={18} className="text-[#6B6B6B] group-hover:text-[#111111] transition-colors" />
                </div>
                <div>
                  <p className="font-medium text-sm text-[#111111] group-hover:text-[#D4AF37] transition-colors">{label}</p>
                  <p className="text-xs text-[#6B6B6B] mt-0.5">{desc}</p>
                </div>
              </Link>
            ))}
          </Reveal>
        </div>

        <Reveal delay={0.2} className="mt-8 bg-white border border-[#E5E5E5] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-[11px] tracking-[0.5em] uppercase text-[#6B6B6B] mb-2">Quick access</p>
              <h3 className="font-display text-2xl font-semibold text-[#111111]">Continue shopping</h3>
            </div>
            <Link href="/shop" className="inline-flex items-center gap-2 text-sm font-medium text-[#D4AF37] hover:text-[#111111] transition-colors">
              Browse collection <ArrowRight size={15} />
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
