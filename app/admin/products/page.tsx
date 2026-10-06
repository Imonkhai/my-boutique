'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Filter, Edit2, Trash2, Copy, Eye, MoreHorizontal } from 'lucide-react';
import AdminShell from '@/components/admin/AdminShell';
import { Badge, PageHeader, Card } from '@/components/admin/AdminUI';
import { ADMIN_PRODUCTS } from '@/lib/admin/data';
import { formatPrice } from '@/utils';
import type { AdminProduct } from '@/lib/admin/types';

export default function ProductsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const categories = ['all', ...Array.from(new Set(ADMIN_PRODUCTS.map(p => p.category)))];

  const filtered = ADMIN_PRODUCTS.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || p.status === statusFilter;
    const matchCat = categoryFilter === 'all' || p.category === categoryFilter;
    return matchSearch && matchStatus && matchCat;
  });

  const stockStatus = (p: AdminProduct) => {
    if (p.stock === 0) return 'out of stock';
    if (p.stock <= p.lowStockThreshold) return 'low stock';
    return 'in stock';
  };

  return (
    <AdminShell>
      <PageHeader title="Products" subtitle={`${ADMIN_PRODUCTS.length} total products`}>
        <Link href="/admin/products/new"
          className="flex items-center gap-2 px-4 py-2 bg-[#111111] text-white text-sm font-medium rounded-lg hover:bg-[#D4AF37] hover:text-[#111111] transition-all">
          <Plus size={15} /> Add Product
        </Link>
      </PageHeader>

      <Card>
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 p-4 border-b border-slate-100">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or SKU…"
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-[#D4AF37] bg-slate-50" />
          </div>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-[#D4AF37] bg-white text-slate-600">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
          <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}
            className="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-[#D4AF37] bg-white text-slate-600">
            {categories.map(c => <option key={c} value={c}>{c === 'all' ? 'All Categories' : c}</option>)}
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                {['Product', 'SKU', 'Category', 'Price', 'Stock', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wide px-4 py-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.featuredImage} alt={p.name} className="w-10 h-10 rounded-lg object-cover border border-slate-100 shrink-0" />
                      <div>
                        <p className="font-semibold text-slate-800 text-xs">{p.name}</p>
                        <p className="text-[10px] text-slate-400">{p.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500 font-mono">{p.sku}</td>
                  <td className="px-4 py-3 text-xs text-slate-600">{p.category}</td>
                  <td className="px-4 py-3">
                    <p className="text-xs font-semibold text-slate-800">{formatPrice(p.price)}</p>
                    {p.discountPrice && <p className="text-[10px] text-slate-400 line-through">{formatPrice(p.discountPrice)}</p>}
                  </td>
                  <td className="px-4 py-3">
                    <Badge status={stockStatus(p)} />
                    <p className="text-[10px] text-slate-400 mt-0.5">{p.stock} units</p>
                  </td>
                  <td className="px-4 py-3"><Badge status={p.status} /></td>
                  <td className="px-4 py-3">
                    <div className="relative">
                      <button onClick={() => setOpenMenu(openMenu === p.id ? null : p.id)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                        <MoreHorizontal size={15} />
                      </button>
                      {openMenu === p.id && (
                        <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-slate-200 rounded-xl shadow-lg z-10 overflow-hidden">
                          {[
                            { icon: Eye, label: 'View', action: () => {} },
                            { icon: Edit2, label: 'Edit', action: () => {} },
                            { icon: Copy, label: 'Duplicate', action: () => {} },
                            { icon: Trash2, label: 'Delete', action: () => {}, danger: true },
                          ].map(item => (
                            <button key={item.label} onClick={() => { item.action(); setOpenMenu(null); }}
                              className={`w-full flex items-center gap-2 px-3 py-2 text-xs hover:bg-slate-50 transition-colors ${item.danger ? 'text-red-500' : 'text-slate-600'}`}>
                              <item.icon size={13} /> {item.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-400 text-sm">No products found.</div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 text-xs text-slate-500">
          <span>Showing {filtered.length} of {ADMIN_PRODUCTS.length} products</span>
          <div className="flex gap-1">
            {[1].map(p => (
              <button key={p} className="w-7 h-7 rounded-lg bg-[#111111] text-white text-xs font-medium">{p}</button>
            ))}
          </div>
        </div>
      </Card>
    </AdminShell>
  );
}
