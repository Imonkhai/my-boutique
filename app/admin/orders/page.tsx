'use client';
import { useState } from 'react';
import { Search, Eye, X, CheckCircle, Truck, Package, XCircle, RefreshCw } from 'lucide-react';
import AdminShell from '@/components/admin/AdminShell';
import { Badge, PageHeader, Card } from '@/components/admin/AdminUI';
import { ADMIN_ORDERS } from '@/lib/admin/data';
import { formatPrice } from '@/utils';
import type { AdminOrder, OrderStatus } from '@/lib/admin/types';

export default function OrdersPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selected, setSelected] = useState<AdminOrder | null>(null);

  const filtered = ADMIN_ORDERS.filter(o => {
    const matchSearch = o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || o.orderStatus === statusFilter;
    return matchSearch && matchStatus;
  });

  const statusActions: { label: string; status: OrderStatus; icon: React.ElementType; color: string }[] = [
    { label: 'Confirm', status: 'confirmed', icon: CheckCircle, color: 'text-blue-600' },
    { label: 'Process', status: 'processing', icon: Package, color: 'text-purple-600' },
    { label: 'Ship', status: 'shipped', icon: Truck, color: 'text-indigo-600' },
    { label: 'Deliver', status: 'delivered', icon: CheckCircle, color: 'text-green-600' },
    { label: 'Cancel', status: 'cancelled', icon: XCircle, color: 'text-red-500' },
    { label: 'Refund', status: 'refunded', icon: RefreshCw, color: 'text-orange-500' },
  ];

  return (
    <AdminShell>
      <PageHeader title="Orders" subtitle={`${ADMIN_ORDERS.length} total orders`} />

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {(['pending','processing','shipped','delivered'] as OrderStatus[]).map(s => {
          const count = ADMIN_ORDERS.filter(o => o.orderStatus === s).length;
          return (
            <button key={s} onClick={() => setStatusFilter(s === statusFilter ? 'all' : s)}
              className={`bg-white rounded-xl border p-4 text-left transition-all ${statusFilter === s ? 'border-[#D4AF37] shadow-sm' : 'border-slate-200 hover:border-slate-300'}`}>
              <p className="text-2xl font-bold text-slate-900">{count}</p>
              <p className="text-xs text-slate-500 capitalize mt-0.5">{s}</p>
            </button>
          );
        })}
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row gap-3 p-4 border-b border-slate-100">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search order or customer…"
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-[#D4AF37] bg-slate-50" />
          </div>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-[#D4AF37] bg-white text-slate-600">
            <option value="all">All Status</option>
            {['pending','confirmed','processing','shipped','delivered','cancelled','refunded'].map(s => (
              <option key={s} value={s} className="capitalize">{s}</option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                {['Order #','Customer','Items','Date','Total','Payment','Status','Actions'].map(h => (
                  <th key={h} className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wide px-4 py-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map(order => (
                <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs font-semibold text-slate-800">{order.orderNumber}</td>
                  <td className="px-4 py-3">
                    <p className="text-xs font-semibold text-slate-800">{order.customer.name}</p>
                    <p className="text-[10px] text-slate-400">{order.customer.email}</p>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-600">{order.items.length} item{order.items.length > 1 ? 's' : ''}</td>
                  <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-xs font-bold text-slate-800">{formatPrice(order.total)}</td>
                  <td className="px-4 py-3"><Badge status={order.paymentStatus} /></td>
                  <td className="px-4 py-3"><Badge status={order.orderStatus} /></td>
                  <td className="px-4 py-3">
                    <button onClick={() => setSelected(order)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-[#D4AF37] transition-colors">
                      <Eye size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="text-center py-12 text-slate-400 text-sm">No orders found.</div>}
        </div>
      </Card>

      {/* Order Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-[400] bg-black/50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 sticky top-0 bg-white z-10">
              <div>
                <p className="font-bold text-slate-900">{selected.orderNumber}</p>
                <p className="text-xs text-slate-500">{new Date(selected.createdAt).toLocaleString()}</p>
              </div>
              <button onClick={() => setSelected(null)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400"><X size={18} /></button>
            </div>

            <div className="p-6 space-y-5">
              {/* Customer */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-2">Customer</p>
                  <p className="text-sm font-semibold text-slate-800">{selected.customer.name}</p>
                  <p className="text-xs text-slate-500">{selected.customer.email}</p>
                  <p className="text-xs text-slate-500">{selected.customer.phone}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-2">Ship To</p>
                  <p className="text-xs text-slate-700">{selected.shippingAddress.address}</p>
                  <p className="text-xs text-slate-700">{selected.shippingAddress.city}, {selected.shippingAddress.state}</p>
                  <p className="text-xs text-slate-700">{selected.shippingAddress.country}</p>
                </div>
              </div>

              {/* Items */}
              <div>
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-3">Order Items</p>
                <div className="space-y-2">
                  {selected.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover border border-slate-200" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-800 truncate">{item.name}</p>
                        <p className="text-xs text-slate-500">SKU: {item.sku} {item.size && `· Size: ${item.size}`}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-bold text-slate-800">{formatPrice(item.price * item.quantity)}</p>
                        <p className="text-xs text-slate-400">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals */}
              <div className="bg-slate-50 rounded-xl p-4 space-y-2 text-sm">
                {[
                  { label: 'Subtotal', value: formatPrice(selected.subtotal) },
                  { label: 'Discount', value: selected.discount > 0 ? `-${formatPrice(selected.discount)}` : '—' },
                  { label: 'Shipping', value: selected.shipping === 0 ? 'FREE' : formatPrice(selected.shipping) },
                  { label: 'Tax', value: formatPrice(selected.tax) },
                ].map(row => (
                  <div key={row.label} className="flex justify-between text-slate-600">
                    <span>{row.label}</span><span>{row.value}</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total</span><span className="text-[#D4AF37]">{formatPrice(selected.total)}</span>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-3">Order Timeline</p>
                <div className="space-y-3">
                  {selected.timeline.map((t, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] mt-0.5 shrink-0" />
                        {i < selected.timeline.length - 1 && <div className="w-px flex-1 bg-slate-200 mt-1" />}
                      </div>
                      <div className="pb-3">
                        <p className="text-xs font-semibold text-slate-800">{t.status}</p>
                        <p className="text-[10px] text-slate-400">{new Date(t.date).toLocaleString()}</p>
                        {t.note && <p className="text-[10px] text-slate-500 mt-0.5">{t.note}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                {statusActions.map(a => (
                  <button key={a.status}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-200 hover:bg-slate-50 transition-colors ${a.color}`}>
                    <a.icon size={12} /> {a.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
