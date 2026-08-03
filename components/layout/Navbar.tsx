'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, ShoppingBag, User, Menu, X, ChevronDown } from 'lucide-react';
import { NAV_LINKS } from '@/constants';
import { useCart, useWishlist } from '@/hooks/useStore';
import { cn } from '@/utils';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const router = useRouter();
  const { count: cartCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const searchRef = useRef<HTMLInputElement>(null);

  // Determine if we're on the homepage hero (transparent nav needed)
  const isHero = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
    setMobileExpanded(null);
  }, [pathname]);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const openCart = () => window.dispatchEvent(new CustomEvent('open-cart'));

  // Nav is transparent only on homepage before scroll
  const transparent = isHero && !scrolled;
  const textColor = transparent ? 'text-white' : 'text-[#111111]';
  const logoColor = transparent ? 'text-white group-hover:text-[#D4AF37]' : 'text-[#111111] group-hover:text-[#D4AF37]';

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-[100] transition-all duration-500',
          transparent
            ? 'bg-transparent'
            : 'bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.08)]'
        )}
      >
        {/* Announcement bar — only show when not transparent */}
        {!transparent && (
          <div className="bg-[#111111] text-white text-center py-2 text-[11px] tracking-widest uppercase">
            Free shipping on orders over $150&nbsp;&nbsp;|&nbsp;&nbsp;New arrivals every week
          </div>
        )}

        <nav className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo */}
            <Link href="/" className="flex flex-col leading-none group">
              <span className={cn('font-display text-xl lg:text-2xl font-bold tracking-[0.15em] transition-colors', logoColor)}>
                VELOURA
              </span>
              <span className="text-[8px] tracking-[0.4em] text-[#D4AF37] uppercase">Boutique</span>
            </Link>

            {/* Desktop Nav Links */}
            <ul className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map(link => (
                <li
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => link.children && setActiveDropdown(link.href)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      'flex items-center gap-1 text-[12px] font-medium tracking-widest uppercase transition-colors underline-animate',
                      pathname === link.href
                        ? 'text-[#D4AF37]'
                        : transparent
                          ? 'text-white hover:text-[#D4AF37]'
                          : 'text-[#111111] hover:text-[#D4AF37]'
                    )}
                  >
                    {link.label}
                    {link.children && (
                      <ChevronDown
                        size={12}
                        className={cn('transition-transform duration-200', activeDropdown === link.href && 'rotate-180')}
                      />
                    )}
                  </Link>

                  {/* Dropdown */}
                  {link.children && (
                    <AnimatePresence>
                      {activeDropdown === link.href && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.18 }}
                          className="absolute top-full left-0 mt-3 w-52 bg-white shadow-[0_8px_40px_rgba(0,0,0,0.14)] border-t-2 border-[#D4AF37] z-50"
                        >
                          {link.children.map(child => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={cn(
                                'block px-5 py-3 text-[11px] tracking-widest uppercase transition-colors',
                                pathname === child.href
                                  ? 'text-[#D4AF37] bg-[#F8F8F8]'
                                  : 'text-[#111111] hover:bg-[#F8F8F8] hover:text-[#D4AF37]'
                              )}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </li>
              ))}
            </ul>

            {/* Action Icons */}
            <div className="flex items-center gap-0.5 lg:gap-1">

              {/* Search */}
              <button
                onClick={() => setSearchOpen(v => !v)}
                className={cn('p-2.5 transition-colors hover:text-[#D4AF37]', textColor)}
                aria-label="Search"
                aria-expanded={searchOpen}
              >
                {searchOpen ? <X size={18} /> : <Search size={18} />}
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className={cn('relative p-2.5 transition-colors hover:text-[#D4AF37]', textColor)}
                aria-label={`Wishlist${wishlistCount > 0 ? ` (${wishlistCount} items)` : ''}`}
              >
                <Heart size={18} />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#D4AF37] text-[#111111] text-[9px] font-bold rounded-full flex items-center justify-center leading-none">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <button
                onClick={openCart}
                className={cn('relative p-2.5 transition-colors hover:text-[#D4AF37]', textColor)}
                aria-label={`Shopping cart${cartCount > 0 ? ` (${cartCount} items)` : ''}`}
              >
                <ShoppingBag size={18} />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#D4AF37] text-[#111111] text-[9px] font-bold rounded-full flex items-center justify-center leading-none">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Account */}
              <Link
                href="/account"
                className={cn('hidden lg:flex p-2.5 transition-colors hover:text-[#D4AF37]', textColor)}
                aria-label="My account"
              >
                <User size={18} />
              </Link>

              {/* Shop Now CTA */}
              <Link
                href="/shop"
                className={cn(
                  'hidden lg:inline-flex ml-3 px-5 py-2.5 text-[11px] font-semibold tracking-widest uppercase transition-all duration-300',
                  transparent
                    ? 'border border-white text-white hover:bg-white hover:text-[#111111]'
                    : 'bg-[#111111] text-white hover:bg-[#D4AF37] hover:text-[#111111]'
                )}
              >
                Shop Now
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(v => !v)}
                className={cn('lg:hidden p-2.5 transition-colors', textColor)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Expandable Search Bar */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden border-t border-[#E5E5E5]"
              >
                <form onSubmit={handleSearch} className="py-4 flex items-center gap-3">
                  <Search size={16} className="text-[#6B6B6B] shrink-0" />
                  <input
                    ref={searchRef}
                    type="search"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search for dresses, blazers, bags..."
                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-[#6B6B6B] text-[#111111]"
                  />
                  {searchQuery && (
                    <button
                      type="submit"
                      className="text-[11px] tracking-widest uppercase font-semibold text-[#D4AF37] hover:text-[#111111] transition-colors shrink-0"
                    >
                      Search
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                    className="text-[#6B6B6B] hover:text-[#111111] transition-colors"
                    aria-label="Close search"
                  >
                    <X size={16} />
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-[98] bg-black/50 lg:hidden"
              aria-hidden="true"
            />

            {/* Drawer panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.32 }}
              className="fixed top-0 left-0 bottom-0 z-[99] w-[300px] bg-white flex flex-col lg:hidden shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-[#E5E5E5]">
                <Link href="/" onClick={() => setMobileOpen(false)} className="flex flex-col leading-none">
                  <span className="font-display text-xl font-bold tracking-[0.15em] text-[#111111]">VELOURA</span>
                  <span className="text-[8px] tracking-[0.4em] text-[#D4AF37] uppercase">Boutique</span>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1 text-[#111111] hover:text-[#D4AF37] transition-colors"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Drawer nav */}
              <nav className="flex-1 overflow-y-auto px-6 py-4">
                <ul className="space-y-0">
                  {NAV_LINKS.map(link => (
                    <li key={link.href}>
                      {link.children ? (
                        <>
                          {/* Parent with children — toggle accordion */}
                          <button
                            onClick={() => setMobileExpanded(mobileExpanded === link.href ? null : link.href)}
                            className={cn(
                              'w-full flex items-center justify-between py-4 text-sm font-medium tracking-widest uppercase border-b border-[#F0F0F0] transition-colors',
                              pathname.startsWith(link.href) ? 'text-[#D4AF37]' : 'text-[#111111] hover:text-[#D4AF37]'
                            )}
                            aria-expanded={mobileExpanded === link.href}
                          >
                            {link.label}
                            <ChevronDown
                              size={14}
                              className={cn('transition-transform duration-200', mobileExpanded === link.href && 'rotate-180')}
                            />
                          </button>

                          {/* Submenu */}
                          <AnimatePresence initial={false}>
                            {mobileExpanded === link.href && (
                              <motion.ul
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.22 }}
                                className="overflow-hidden pl-3"
                              >
                                {/* Also link to the parent page */}
                                <li>
                                  <Link
                                    href={link.href}
                                    className={cn(
                                      'block py-2.5 text-xs tracking-widest uppercase transition-colors border-b border-[#F8F8F8]',
                                      pathname === link.href ? 'text-[#D4AF37]' : 'text-[#6B6B6B] hover:text-[#D4AF37]'
                                    )}
                                  >
                                    All {link.label}
                                  </Link>
                                </li>
                                {link.children.map(child => (
                                  <li key={child.href}>
                                    <Link
                                      href={child.href}
                                      className={cn(
                                        'block py-2.5 text-xs tracking-widest uppercase transition-colors border-b border-[#F8F8F8]',
                                        pathname === child.href ? 'text-[#D4AF37]' : 'text-[#6B6B6B] hover:text-[#D4AF37]'
                                      )}
                                    >
                                      {child.label}
                                    </Link>
                                  </li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          href={link.href}
                          className={cn(
                            'block py-4 text-sm font-medium tracking-widest uppercase border-b border-[#F0F0F0] transition-colors',
                            pathname === link.href ? 'text-[#D4AF37]' : 'text-[#111111] hover:text-[#D4AF37]'
                          )}
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>

                {/* Extra mobile links */}
                <div className="mt-6 pt-6 border-t border-[#E5E5E5] space-y-3">
                  <Link
                    href="/wishlist"
                    className="flex items-center gap-3 text-sm text-[#6B6B6B] hover:text-[#D4AF37] transition-colors"
                  >
                    <Heart size={16} />
                    Wishlist
                    {wishlistCount > 0 && (
                      <span className="ml-auto w-5 h-5 bg-[#D4AF37] text-[#111111] text-[9px] font-bold rounded-full flex items-center justify-center">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>
                  <Link
                    href="/account"
                    className="flex items-center gap-3 text-sm text-[#6B6B6B] hover:text-[#D4AF37] transition-colors"
                  >
                    <User size={16} />
                    My Account
                  </Link>
                </div>
              </nav>

              {/* Drawer footer CTA */}
              <div className="px-6 py-5 border-t border-[#E5E5E5]">
                <Link
                  href="/shop"
                  className="block w-full text-center py-3.5 bg-[#111111] text-white text-[11px] font-semibold tracking-widest uppercase hover:bg-[#D4AF37] hover:text-[#111111] transition-all duration-300"
                >
                  Shop Now
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
