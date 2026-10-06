'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Package, Tag, Layers, ShoppingCart, Users, Archive,
  Percent, Star, BarChart2, Megaphone, FileText, UserCog, Settings,
  HelpCircle, BookOpen, LogOut, ChevronLeft, ChevronRight, X, Gift,
} from 'lucide-react';
import { cn } from '@/utils';

const NAV = [
  { label: 'Dashboard',    href: '/admin/dashboard',  icon: LayoutDashboard },
  { label: 'Products',     href: '/admin/products',   icon: Package },
  { label: 'Orders',       href: '/admin/orders',     icon: ShoppingCart },
  { label: 'Customers',    href: '/admin/customers',  icon: Users },
  { label: 'Inventory',    href: '/admin/inventory',  icon: Archive },
  { label: 'Discounts',    href: '/admin/discounts',  icon: Percent },
  { label: 'Reviews',      href: '/admin/reviews',    icon: Star },
  { label: 'Analytics',    href: '/admin/analytics',  icon: BarChart2 },
  { label: 'Staff',        href: '/admin/staff',      icon: UserCog },
  { label: 'Settings',     href: '/admin/settings',   icon: Settings },
];

const BOTTOM_NAV = [
  { label: 'Help & Support', href: '#', icon: HelpCircle },
  { label: 'Documentation',  href: '#', icon: BookOpen },
];

interface Props {
  collapsed: boolean;
  onCollapse: (v: boolean) => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export default function AdminSidebar({ collapsed, onCollapse, mobileOpen, onMobileClose }: Props) {
  const pathname = usePathname();

  const NavItem = ({ item }: { item: typeof NAV[0] }) => {
    const active = pathname === item.href || pathname.startsWith(item.href + '/');
    return (
      <Link
        href={item.href}
        onClick={onMobileClose}
        className={cn(
          'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group',
          active
            ? 'bg-[#D4AF37]/10 text-[#D4AF37]'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
        )}
        title={collapsed ? item.label : undefined}
      >
        <item.icon size={18} className={cn('shrink-0', active ? 'text-[#D4AF37]' : 'text-slate-400 group-hover:text-slate-600')} />
        {!collapsed && <span className="truncate">{item.label}</span>}
        {active && !collapsed && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />}
      </Link>
    );
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={cn('flex items-center h-16 px-4 border-b border-slate-200 shrink-0', collapsed ? 'justify-center' : 'justify-between')}>
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#111111] flex items-center justify-center rounded">
              <Gift size={14} className="text-[#D4AF37]" />
            </div>
            <div>
              <p className="text-[11px] font-bold tracking-widest text-[#111111] uppercase leading-none">Gift</p>
              <p className="text-[9px] tracking-[0.3em] text-[#D4AF37] uppercase leading-none">Collection</p>
            </div>
          </div>
        )}
        {collapsed && <div className="w-7 h-7 bg-[#111111] flex items-center justify-center rounded"><Gift size={14} className="text-[#D4AF37]" /></div>}
        <button
          onClick={() => onCollapse(!collapsed)}
          className="hidden lg:flex w-6 h-6 items-center justify-center rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {!collapsed && <p className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase px-3 mb-2">Main Menu</p>}
        {NAV.map(item => <NavItem key={item.href} item={item} />)}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-slate-200 space-y-0.5">
        {BOTTOM_NAV.map(item => (
          <Link key={item.label} href={item.href}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
            title={collapsed ? item.label : undefined}
          >
            <item.icon size={16} className="shrink-0 text-slate-400" />
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}
        <Link href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors"
          title={collapsed ? 'Logout' : undefined}
        >
          <LogOut size={16} className="shrink-0" />
          {!collapsed && <span>Logout</span>}
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className={cn(
        'hidden lg:flex flex-col bg-white border-r border-slate-200 h-screen sticky top-0 transition-all duration-300 shrink-0',
        collapsed ? 'w-[60px]' : 'w-[220px]'
      )}>
        {sidebarContent}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 z-[300] bg-black/40 lg:hidden" onClick={onMobileClose} />
          <aside className="fixed top-0 left-0 bottom-0 z-[301] w-[220px] bg-white border-r border-slate-200 flex flex-col lg:hidden shadow-2xl">
            <button onClick={onMobileClose} className="absolute top-4 right-4 p-1 rounded hover:bg-slate-100 text-slate-400">
              <X size={18} />
            </button>
            {sidebarContent}
          </aside>
        </>
      )}
    </>
  );
}
