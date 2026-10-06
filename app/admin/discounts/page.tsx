'use client';
import { useState } from 'react';
import { Plus, X, Tag } from 'lucide-react';
import AdminShell from '@/components/admin/AdminShell';
import { Badge, PageHeader, Card } from '@/components/admin/AdminUI';
import { ADMIN_DISCOUNTS } from '@/lib/admin/data';
import { formatPrice } from '@/utils';

export default function DiscountsPage() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ code: '', type: 'percentage', value: '', minOrder: '', usageLimit: '', startDate: '', endDate: '', status: 'active' });

  return (
    <AdminShell>
      <PageHeader title="Discounts & Coupons" subtitle={`${ADMIN_DISCOUNTS.length} discount codes`}>
        <button onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#111111] text-white text-sm font-medium rounded-lg hover:bg-[#D4AF37] hover:text-[#111111] transition-all">
          <Plus size={15} /> Create Discount
        </button>
      </PageHeader>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: 'Active Codes', value: ADMIN_DISCOUNTS.filter(d => d.status === 'active').length, color: 'text-green-600' },
          { label: 'Total Uses', value: ADMIN_DISCOUNTS.reduce((s, d) => s + d.usageCount, 0), color: 'text-blue-600' },
          { label: 'Expired', value: ADMIN_DISCOUNTS.filter(d => d.status === 'expired').length, color: 'text-slate-500' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-4">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                {['Code','Type','Value','Min Order','Usage','Expires','Status',''].map(h => (
                  <th key={h} className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wide px-4 py-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {ADMIN_DISCOUNTS.map(d => (
                <tr key={d.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Tag size={13} className="text-[#D4AF37]" />
                      <span className="font-mono font-bold text-slate-800 text-xs">{d.code}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-600 capitalize">{d.type}</td>
                  <td className="px-4 py-3 text-xs font-bold text-slate-800">
                    {d.type === 'percentage' ? `${d.value}%` : formatPrice(d.value)}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-600">{d.minOrderAmount > 0 ? formatPrice(d.minOrderAmount) : '—'}</td>
                  <td className="px-4 py-3">
                    <div className="text-xs text-slate-600">{d.usageCount} / {d.usageLimit}</div>
                    <div className="mt-1 h-1 bg-slate-100 rounded-full overflow-hidden w-16">
                      <div className="h-full bg-[#D4AF37] rounded-full" style={{ width: `${Math.min(100, (d.usageCount / d.usageLimit) * 100)}%` }} />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">{d.endDate}</td>
                  <td className="px-4 py-3"><Badge status={d.status} /></td>
                  <td className="px-4 py-3">
                    <button className="text-xs text-slate-400 hover:text-red-500 transition-colors">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[400] bg-black/50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <p className="font-bold text-slate-900">Create Discount Code</p>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><X size={16} /></button>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Coupon Code', key: 'code', placeholder: 'e.g. SUMMER20', type: 'text' },
                { label: 'Discount Value', key: 'value', placeholder: '10', type: 'number' },
                { label: 'Min. Order Amount (₦)', key: 'minOrder', placeholder: '50000', type: 'number' },
                { label: 'Usage Limit', key: 'usageLimit', placeholder: '100', type: 'number' },
                { label: 'Start Date', key: 'startDate', placeholder: '', type: 'date' },
                { label: 'End Date', key: 'endDate', placeholder: '', type: 'date' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">{f.label}</label>
                  <input type={f.type} value={(form as Record<string, string>)[f.key]} placeholder={f.placeholder}
                    onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#D4AF37]" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Discount Type</label>
                <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#D4AF37]">
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed Amount (₦)</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50">Cancel</button>
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 bg-[#111111] text-white rounded-lg text-sm font-medium hover:bg-[#D4AF37] hover:text-[#111111] transition-all">Create</button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
