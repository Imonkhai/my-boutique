import type { Metadata } from 'next';
import Link from 'next/link';
import { User, ShoppingBag, Heart, MapPin, Settings, LogIn } from 'lucide-react';
import { Reveal } from '@/components/ui/Animations';

export const metadata: Metadata = { title: 'My Account' };

const accountLinks = [
  { icon: ShoppingBag, label: 'My Orders', desc: 'Track and manage your orders', href: '#' },
  { icon: Heart, label: 'Wishlist', desc: 'Your saved favourite pieces', href: '/wishlist' },
  { icon: MapPin, label: 'Addresses', desc: 'Manage your delivery addresses', href: '#' },
  { icon: Settings, label: 'Account Settings', desc: 'Update your profile and password', href: '#' },
];

export default function AccountPage() {
  return (
    <div className="pt-[88px]">
      <div className="bg-[#111111] text-white py-16 lg:py-20 text-center">
        <p className="text-[#D4AF37] text-[11px] tracking-[0.5em] uppercase mb-3">Welcome Back</p>
        <h1 className="font-display text-4xl lg:text-6xl font-semibold">My Account</h1>
      </div>

      <div className="max-w-[600px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <Reveal className="text-center mb-12">
          <div className="w-20 h-20 bg-[#F8F8F8] border border-[#E5E5E5] rounded-full flex items-center justify-center mx-auto mb-4">
            <User size={32} className="text-[#6B6B6B]" />
          </div>
          <p className="text-[#6B6B6B] text-sm">Sign in to access your account, orders, and wishlist.</p>
        </Reveal>

        <Reveal delay={0.1} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {accountLinks.map(({ icon: Icon, label, desc, href }) => (
            <Link
              key={label}
              href={href}
              className="group flex items-start gap-4 p-5 border border-[#E5E5E5] hover:border-[#D4AF37] transition-all duration-300"
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

        <Reveal delay={0.2} className="flex flex-col sm:flex-row gap-3">
          <Link
            href="#"
            className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#111111] text-white text-[11px] font-semibold tracking-widest uppercase hover:bg-[#D4AF37] hover:text-[#111111] transition-all duration-300"
          >
            <LogIn size={15} /> Sign In
          </Link>
          <Link
            href="#"
            className="flex-1 flex items-center justify-center gap-2 py-3.5 border border-[#111111] text-[#111111] text-[11px] font-semibold tracking-widest uppercase hover:bg-[#111111] hover:text-white transition-all duration-300"
          >
            Create Account
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
