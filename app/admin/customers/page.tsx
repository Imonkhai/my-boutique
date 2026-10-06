'use client';
import { useState } from 'react';
import { Search, Eye, X, Mail, Phone, ShoppingBag, DollarSign } from 'lucide-react';
import AdminShell from '@/components/admin/AdminShell';
import { Badge, PageHeader, Card } from '@/components/admin/AdminUI';
import { ADMIN_CUSTOMERS, ADMIN_ORDERS } from '@/lib/admin/data';
import { formatPrice } from '@/utils';
import type { AdminCustomer } from '@/lib/admin/types';

export default function CustomersPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selected, setSelected] = useState<AdminCustomer | null>(null);

  const filtered = ADMIN_CUSTOMERS.filter(c => {
    const name = `${c.firstName} ${c.lastName}`.toLowerCase();
    const matchSearch = name.includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const customerOrders = selected ? ADMIN_ORDERS.filter(o => o.customer.id === selected.id) : [];

  return (
    <AdminShell>
      <PageHeader title="Customers" subtitle={`${ADMIN_CUSTOMERS.length} registered customers`} />

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Total Customers', value: ADMIN_CUSTOMERS.length },
          { label: 'Active', value: ADMIN_CUSTOMERS.filter(c => c.status === 'active').length },
          { label: 'Total Revenue', value: formatPrice(ADMIN_CUSTOMERS.reduce((s, c) => s + c.totalSpent, 0)) },
          { label: 'Avg. Spend', value: formatPrice(Math.round(ADMIN_CUSTOMERS.reduce((s, c) => s + c.totalSpent, 0) / ADMIN_CUSTOMERS.filter(c => c.totalSpent > 0).length)) },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-xl font-bold text-slate-900">{s.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row gap-3 p-4 border-b border-slate-100">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or email…"
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-[#D4AF37] bg-slate-50" />
          </div>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-[#D4AF37] bg-white text-slate-600">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                {['Customer','Email','Phone','Orders','Total Spent','Last Purchase','Status',''].map(h => (
                  <th key={h} className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wide px-4 py-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] text-xs font-bold shrink-0">
                        {c.firstName[0]}{c.lastName[0]}
                      </div>
                      <p className="text-xs font-semibold text-slate-800">{c.firstName} {c.lastName}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500">{c.email}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">{c.phone}</td>
                  <td className="px-4 py-3 text-xs font-semibold text-slate-800 text-center">{c.totalOrders}</td>
                  <td className="px-4 py-3 text-xs font-bold text-slate-800">{formatPrice(c.totalSpent)}</td>
                  <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">{c.lastPurchase}</td>
                  <td className="px-4 py-3"><Badge status={c.status} /></td>
                  <td className="px-4 py-3">
                    <button onClick={() => setSelected(c)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-[#D4AF37] transition-colors">
                      <Eye size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="text-center py-12 text-slate-400 text-sm">No customers found.</div>}
        </div>
      </Card>

      {/* Customer Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-[400] bg-black/50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <p className="font-bold text-slate-900">Customer Profile</p>
              <button onClick={() => setSelected(null)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-5">
              {/* Profile */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] text-xl font-bold">
                  {selected.firstName[0]}{selected.lastName[0]}
                </div>
                <div>
                  <p className="font-bold text-slate-900">{selected.firstName} {selected.lastName}</p>
                  <Badge status={selected.status} />
                  <p className="text-xs text-slate-400 mt-1">Member since {new Date(selected.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Contact */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 rounded-xl p-3 flex items-center gap-2">
                  <Mail size={14} className="text-slate-400" />
                  <div>
                    <p className="text-[10px] text-slate-400">Email</p>
                    <p className="text-xs font-medium text-slate-700 truncate">{selected.email}</p>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 flex items-center gap-2">
                  <Phone size={14} className="text-slate-400" />
                  <div>
                    <p className="text-[10px] text-slate-400">Phone</p>
                    <p className="text-xs font-medium text-slate-700">{selected.phone}</p>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 flex items-center gap-2">
                  <ShoppingBag size={14} className="text-slate-400" />
                  <div>
                    <p className="text-[10px] text-slate-400">Total Orders</p>
                    <p className="text-xs font-bold text-slate-800">{selected.totalOrders}</p>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 flex items-center gap-2">
                  <DollarSign size={14} className="text-slate-400" />
                  <div>
                    <p className="text-[10px] text-slate-400">Total Spent</p>
                    <p className="text-xs font-bold text-[#D4AF37]">{formatPrice(selected.totalSpent)}</p>
                  </div>
                </div>
              </div>

              {/* Order History */}
              {customerOrders.length > 0 && (
                <div>
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-3">Order History</p>
                  <div className="space-y-2">
                    {customerOrders.map(o => (
                      <div key={o.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                        <div>
                          <p className="text-xs font-semibold text-slate-800">{o.orderNumber}</p>
                          <p className="text-[10px] text-slate-400">{new Date(o.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-bold text-slate-800">{formatPrice(o.total)}</p>
                          <Badge status={o.orderStatus} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              <div>
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-2">Internal Notes</p>
                <textarea rows={3} placeholder="Add a note about this customer…"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#D4AF37] resize-none bg-slate-50" />
                <button className="mt-2 px-4 py-1.5 bg-[#111111] text-white text-xs rounded-lg hover:bg-[#D4AF37] hover:text-[#111111] transition-all">Save Note</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
