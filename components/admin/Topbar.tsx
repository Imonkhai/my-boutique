'use client';
import { useState, useRef, useEffect } from 'react';
import { Menu, Search, Bell, Plus, ChevronDown, User, Settings, LogOut, Store, HelpCircle, X } from 'lucide-react';
import Link from 'next/link';
import { ADMIN_NOTIFICATIONS } from '@/lib/admin/data';
import { cn } from '@/utils';

interface Props { onMenuClick: () => void; }

export default function AdminTopbar({ onMenuClick }: Props) {
  const [notifOpen, setNotifOpen]   = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const notifRef   = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unread = ADMIN_NOTIFICATIONS.filter(n => !n.read).length;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const notifIcon: Record<string, string> = {
    order: 'bg-blue-100 text-blue-600',
    stock: 'bg-amber-100 text-amber-600',
    customer: 'bg-green-100 text-green-600',
    review: 'bg-purple-100 text-purple-600',
    payment: 'bg-red-100 text-red-600',
    system: 'bg-slate-100 text-slate-600',
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center px-4 gap-3 shrink-0 sticky top-0 z-[50]">
      {/* Mobile menu toggle */}
      <button onClick={onMenuClick} className="lg:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-500">
        <Menu size={20} />
      </button>

      {/* Search */}
      <div className="flex-1 max-w-md">
        {searchOpen ? (
          <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-2 bg-slate-50">
            <Search size={15} className="text-slate-400 shrink-0" />
            <input autoFocus placeholder="Search products, orders, customers…" className="flex-1 bg-transparent text-sm outline-none text-slate-700 placeholder:text-slate-400" />
            <button onClick={() => setSearchOpen(false)}><X size={14} className="text-slate-400" /></button>
          </div>
        ) : (
          <button onClick={() => setSearchOpen(true)} className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-600 transition-colors">
            <Search size={15} />
            <span className="hidden sm:inline">Search…</span>
            <kbd className="hidden sm:inline text-[10px] border border-slate-200 rounded px-1.5 py-0.5 text-slate-400">⌘K</kbd>
          </button>
        )}
      </div>

      <div className="flex items-center gap-1 ml-auto">
        {/* Store status */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full text-xs font-medium text-green-700">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Store Live
        </div>

        {/* Quick add */}
        <Link href="/admin/products/new" className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#111111] text-white text-xs font-medium rounded-lg hover:bg-[#D4AF37] hover:text-[#111111] transition-all duration-200">
          <Plus size={14} /> Add Product
        </Link>

        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <button onClick={() => { setNotifOpen(v => !v); setProfileOpen(false); }}
            className="relative p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors">
            <Bell size={18} />
            {unread > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">{unread}</span>
            )}
          </button>
          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                <p className="font-semibold text-sm text-slate-800">Notifications</p>
                {unread > 0 && <span className="text-xs text-[#D4AF37] font-medium">{unread} unread</span>}
              </div>
              <ul className="max-h-80 overflow-y-auto divide-y divide-slate-50">
                {ADMIN_NOTIFICATIONS.map(n => (
                  <li key={n.id} className={cn('px-4 py-3 hover:bg-slate-50 transition-colors cursor-pointer', !n.read && 'bg-blue-50/40')}>
                    <div className="flex gap-3">
                      <span className={cn('w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0', notifIcon[n.type])}>
                        <Bell size={13} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-slate-800">{n.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{n.message}</p>
                        <p className="text-[10px] text-slate-400 mt-1">{new Date(n.createdAt).toLocaleString()}</p>
                      </div>
                      {!n.read && <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-1" />}
                    </div>
                  </li>
                ))}
              </ul>
              <div className="px-4 py-2 border-t border-slate-100 text-center">
                <button className="text-xs text-[#D4AF37] hover:underline font-medium">Mark all as read</button>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div ref={profileRef} className="relative">
          <button onClick={() => { setProfileOpen(v => !v); setNotifOpen(false); }}
            className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-lg hover:bg-slate-100 transition-colors">
            <div className="w-7 h-7 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#111111] text-xs font-bold">A</div>
            <span className="hidden sm:block text-sm font-medium text-slate-700">Amara</span>
            <ChevronDown size={14} className="text-slate-400" />
          </button>
          {profileOpen && (
            <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-100">
                <p className="text-sm font-semibold text-slate-800">Amara Osei</p>
                <p className="text-xs text-slate-500">admin@giftcollection.com</p>
                <span className="inline-block mt-1 text-[10px] bg-[#D4AF37]/10 text-[#D4AF37] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide">Super Admin</span>
              </div>
              {[
                { icon: User, label: 'My Profile', href: '/admin/settings' },
                { icon: Settings, label: 'Account Settings', href: '/admin/settings' },
                { icon: Store, label: 'View Store', href: '/' },
                { icon: HelpCircle, label: 'Help', href: '#' },
              ].map(item => (
                <Link key={item.label} href={item.href} onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">
                  <item.icon size={15} className="text-slate-400" />
                  {item.label}
                </Link>
              ))}
              <div className="border-t border-slate-100">
                <Link href="/" className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
                  <LogOut size={15} /> Logout
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
