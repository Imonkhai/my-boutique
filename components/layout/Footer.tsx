'use client';
import Link from 'next/link';
import { Globe, Rss, Share2, CirclePlay, Mail, Phone, MapPin, CreditCard } from 'lucide-react';

const shopLinks = [
  { label: 'New Arrivals', href: '/new-arrivals' },
  { label: 'Best Sellers', href: '/best-sellers' },
  { label: 'Collections', href: '/collections' },
  { label: 'Sale', href: '/sale' },
  { label: 'All Products', href: '/shop' },
];

const helpLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Blog', href: '/blog' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms & Conditions', href: '/terms' },
];

const socialLinks = [
  { icon: Globe, href: '#', label: 'Instagram' },
  { icon: Share2, href: '#', label: 'Facebook' },
  { icon: Rss, href: '#', label: 'Twitter' },
  { icon: CirclePlay, href: '#', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-white">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="font-display text-2xl lg:text-3xl font-semibold mb-2">Join the Veloura Circle</h3>
              <p className="text-white/60 text-sm">Exclusive access to new arrivals, private sales, and style inspiration.</p>
            </div>
            <form className="flex w-full max-w-md gap-0" onSubmit={e => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-5 py-3.5 bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm outline-none focus:border-[#D4AF37] transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3.5 bg-[#D4AF37] text-[#111111] text-[11px] font-semibold tracking-widest uppercase hover:bg-[#C4A030] transition-colors shrink-0"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <div className="font-display text-2xl font-bold tracking-[0.15em]">VELOURA</div>
              <div className="text-[8px] tracking-[0.4em] text-[#D4AF37] uppercase">Boutique</div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Curated luxury fashion for the discerning woman. Elegant fashion, timeless style.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 border border-white/20 flex items-center justify-center text-white/60 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-widest uppercase text-[#D4AF37] mb-5">Shop</h4>
            <ul className="space-y-3">
              {shopLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-widest uppercase text-[#D4AF37] mb-5">Help</h4>
            <ul className="space-y-3">
              {helpLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-widest uppercase text-[#D4AF37] mb-5">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-white/60">
                <MapPin size={15} className="shrink-0 mt-0.5 text-[#D4AF37]" />
                <span>12 Rue de la Paix, Paris, France 75001</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Phone size={15} className="shrink-0 text-[#D4AF37]" />
                <a href="tel:+33123456789" className="hover:text-white transition-colors">+33 1 23 45 67 89</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Mail size={15} className="shrink-0 text-[#D4AF37]" />
                <a href="mailto:hello@veloura.com" className="hover:text-white transition-colors">hello@veloura.com</a>
              </li>
            </ul>
            <div className="mt-6">
              <p className="text-[11px] tracking-widest uppercase text-[#D4AF37] mb-3">Opening Hours</p>
              <p className="text-sm text-white/60">Mon – Sat: 10:00 – 20:00</p>
              <p className="text-sm text-white/60">Sunday: 12:00 – 18:00</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">© {new Date().getFullYear()} Veloura Boutique. All rights reserved.</p>
          <div className="flex items-center gap-2 text-white/40">
            <CreditCard size={20} />
            <span className="text-xs">Visa</span>
            <span className="text-xs">Mastercard</span>
            <span className="text-xs">Amex</span>
            <span className="text-xs">PayPal</span>
            <span className="text-xs">Apple Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
