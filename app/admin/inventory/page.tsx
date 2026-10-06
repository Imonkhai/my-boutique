'use client';
import { useState } from 'react';
import { Search, AlertTriangle, Plus, Minus, X } from 'lucide-react';
import AdminShell from '@/components/admin/AdminShell';
import { Badge, PageHeader, Card } from '@/components/admin/AdminUI';
import { ADMIN_PRODUCTS } from '@/lib/admin/data';
import type { AdminProduct } from '@/lib/admin/types';

export default function InventoryPage() {
  const [search, setSearch] = useState('');
  const [stockFilter, setStockFilter] = useState('all');
  const [adjusting, setAdjusting] = useState<AdminProduct | null>(null);
  const [adjustment, setAdjustment] = useState(0);
  const [reason, setReason] = useState('');

  const stockStatus = (p: AdminProduct) => {
    if (p.stock === 0) return 'out of stock';
    if (p.stock <= p.lowStockThreshold) return 'low stock';
    return 'in stock';
  };

  const filtered = ADMIN_PRODUCTS.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    const status = stockStatus(p);
    const matchStock = stockFilter === 'all' || status === stockFilter;
    return matchSearch && matchStock;
  });

  const applyAdjustment = () => {
    if (adjusting) {
      adjusting.stock = Math.max(0, adjusting.stock + adjustment);
      setAdjusting(null);
      setAdjustment(0);
      setReason('');
    }
  };

  return (
    <AdminShell>
      <PageHeader title="Inventory" subtitle="Monitor and manage stock levels">
        <button className="flex items-center gap-2 px-4 py-2 bg-[#111111] text-white text-sm font-medium rounded-lg hover:bg-[#D4AF37] hover:text-[#111111] transition-all">
          <Plus size={15} /> Bulk Update
        </button>
      </PageHeader>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: 'In Stock', count: ADMIN_PRODUCTS.filter(p => p.stock > p.lowStockThreshold).length, color: 'text-green-600', bg: 'bg-green-50 border-green-200' },
          { label: 'Low Stock', count: ADMIN_PRODUCTS.filter(p => p.stock > 0 && p.stock <= p.lowStockThreshold).length, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200' },
          { label: 'Out of Stock', count: ADMIN_PRODUCTS.filter(p => p.stock === 0).length, color: 'text-red-600', bg: 'bg-red-50 border-red-200' },
        ].map(s => (
          <div key={s.label} className={`rounded-xl border p-4 ${s.bg}`}>
            <p className={`text-2xl font-bold ${s.color}`}>{s.count}</p>
            <p className="text-xs text-slate-600 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row gap-3 p-4 border-b border-slate-100">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search product or SKU…"
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-[#D4AF37] bg-slate-50" />
          </div>
          <select value={stockFilter} onChange={e => setStockFilter(e.target.value)}
            className="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-[#D4AF37] bg-white text-slate-600">
            <option value="all">All Stock</option>
            <option value="in stock">In Stock</option>
            <option value="low stock">Low Stock</option>
            <option value="out of stock">Out of Stock</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                {['Product','SKU','Stock','Reserved','Available','Threshold','Status','Action'].map(h => (
                  <th key={h} className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wide px-4 py-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map(p => {
                const available = p.stock - p.reserved;
                const status = stockStatus(p);
                return (
                  <tr key={p.id} className={`hover:bg-slate-50 transition-colors ${status === 'out of stock' ? 'bg-red-50/30' : status === 'low stock' ? 'bg-amber-50/30' : ''}`}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={p.featuredImage} alt={p.name} className="w-9 h-9 rounded-lg object-cover border border-slate-100 shrink-0" />
                        <p className="text-xs font-semibold text-slate-800 truncate max-w-[140px]">{p.name}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs font-mono text-slate-500">{p.sku}</td>
                    <td className="px-4 py-3">
                      <span className={`text-sm font-bold ${p.stock === 0 ? 'text-red-500' : p.stock <= p.lowStockThreshold ? 'text-amber-600' : 'text-slate-800'}`}>{p.stock}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500">{p.reserved}</td>
                    <td className="px-4 py-3 text-xs font-semibold text-slate-700">{available}</td>
                    <td className="px-4 py-3 text-xs text-slate-500">{p.lowStockThreshold}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        {(status === 'low stock' || status === 'out of stock') && <AlertTriangle size={12} className={status === 'out of stock' ? 'text-red-500' : 'text-amber-500'} />}
                        <Badge status={status} />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => { setAdjusting(p); setAdjustment(0); }}
                        className="px-3 py-1.5 text-xs font-medium border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-[#D4AF37] text-slate-600 transition-colors">
                        Adjust
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Adjust Modal */}
      {adjusting && (
        <div className="fixed inset-0 z-[400] bg-black/50 flex items-center justify-center p-4" onClick={() => setAdjusting(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <p className="font-bold text-slate-900">Adjust Stock</p>
              <button onClick={() => setAdjusting(null)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><X size={16} /></button>
            </div>
            <div className="flex items-center gap-3 mb-4 p-3 bg-slate-50 rounded-xl">
              <img src={adjusting.featuredImage} alt={adjusting.name} className="w-10 h-10 rounded-lg object-cover" />
              <div>
                <p className="text-sm font-semibold text-slate-800">{adjusting.name}</p>
                <p className="text-xs text-slate-400">Current stock: <strong>{adjusting.stock}</strong></p>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-xs font-semibold text-slate-600 mb-2">Adjustment</label>
              <div className="flex items-center gap-3">
                <button onClick={() => setAdjustment(a => a - 1)} className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-slate-600"><Minus size={14} /></button>
                <input type="number" value={adjustment} onChange={e => setAdjustment(Number(e.target.value))}
                  className="flex-1 text-center border border-slate-200 rounded-lg py-2 text-sm font-bold focus:outline-none focus:border-[#D4AF37]" />
                <button onClick={() => setAdjustment(a => a + 1)} className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-slate-600"><Plus size={14} /></button>
              </div>
              <p className="text-xs text-slate-400 mt-2 text-center">New stock: <strong className="text-slate-800">{Math.max(0, adjusting.stock + adjustment)}</strong></p>
            </div>
            <div className="mb-4">
              <label className="block text-xs font-semibold text-slate-600 mb-2">Reason</label>
              <select value={reason} onChange={e => setReason(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#D4AF37]">
                <option value="">Select reason</option>
                <option>Restock received</option>
                <option>Damaged goods</option>
                <option>Manual correction</option>
                <option>Return processed</option>
              </select>
            </div>
            <button onClick={applyAdjustment}
              className="w-full py-2.5 bg-[#111111] text-white rounded-lg text-sm font-medium hover:bg-[#D4AF37] hover:text-[#111111] transition-all">
              Apply Adjustment
            </button>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
