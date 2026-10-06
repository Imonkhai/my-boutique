'use client';
import { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, AreaChart, Area,
} from 'recharts';
import AdminShell from '@/components/admin/AdminShell';
import { PageHeader, Card } from '@/components/admin/AdminUI';
import { REVENUE_DATA, CATEGORY_DATA } from '@/lib/admin/data';
import { formatPrice } from '@/utils';

const PERIODS = ['Today', '7 Days', '30 Days', '3 Months', '12 Months'];
const PIE_COLORS = ['#D4AF37','#111111','#6B7280','#3B82F6','#10B981','#F59E0B','#EF4444'];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState('30 Days');

  const totalRevenue = REVENUE_DATA.reduce((s, d) => s + d.revenue, 0);
  const totalOrders  = REVENUE_DATA.reduce((s, d) => s + d.orders, 0);
  const avgOrder     = Math.round(totalRevenue / totalOrders);
  const topCategory  = CATEGORY_DATA[0];

  return (
    <AdminShell>
      <PageHeader title="Analytics" subtitle="Track your store performance">
        <button className="px-4 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 flex items-center gap-2">
          Export CSV
        </button>
      </PageHeader>

      {/* Period Tabs */}
      <div className="flex gap-1 mb-6 bg-white border border-slate-200 rounded-xl p-1 w-fit">
        {PERIODS.map(p => (
          <button key={p} onClick={() => setPeriod(p)}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${period === p ? 'bg-[#111111] text-white' : 'text-slate-500 hover:text-slate-700'}`}>
            {p}
          </button>
        ))}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Revenue', value: formatPrice(totalRevenue), change: '+12.4%', positive: true },
          { label: 'Total Orders', value: totalOrders.toString(), change: '+8.1%', positive: true },
          { label: 'Avg. Order Value', value: formatPrice(avgOrder), change: '+3.7%', positive: true },
          { label: 'Top Category', value: topCategory.category, change: `${topCategory.percentage}% share`, positive: true },
        ].map(k => (
          <div key={k.label} className="bg-white rounded-xl border border-slate-200 p-5">
            <p className="text-2xl font-bold text-slate-900">{k.value}</p>
            <p className="text-xs text-slate-500 mt-1">{k.label}</p>
            <p className={`text-xs font-medium mt-1 ${k.positive ? 'text-green-600' : 'text-red-500'}`}>{k.change} vs prev period</p>
          </div>
        ))}
      </div>

      {/* Revenue Area Chart */}
      <Card title="Revenue Trend" action={<span className="text-xs text-slate-400">Jan 2025</span>}>
        <div className="p-5" style={{ height: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={REVENUE_DATA} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} tickFormatter={v => `₦${(v/1000000).toFixed(1)}M`} />
              <Tooltip formatter={(v: number) => [formatPrice(v), 'Revenue']} contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }} />
              <Area type="monotone" dataKey="revenue" stroke="#D4AF37" strokeWidth={2.5} fill="url(#revenueGrad)" dot={false} activeDot={{ r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        {/* Orders Bar */}
        <Card title="Orders per Day">
          <div className="p-5" style={{ height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REVENUE_DATA} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={false} interval={2} />
                <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }} />
                <Bar dataKey="orders" fill="#111111" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Category Pie */}
        <Card title="Revenue by Category">
          <div className="p-5" style={{ height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={CATEGORY_DATA} dataKey="revenue" nameKey="category" cx="50%" cy="50%" outerRadius={90} innerRadius={50}>
                  {CATEGORY_DATA.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v: number) => [formatPrice(v), 'Revenue']} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Avg Order Value Line */}
        <Card title="Average Order Value">
          <div className="p-5" style={{ height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={REVENUE_DATA} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={false} interval={2} />
                <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={false} tickFormatter={v => `₦${(v/1000).toFixed(0)}K`} />
                <Tooltip formatter={(v: number) => [formatPrice(v), 'AOV']} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Line type="monotone" dataKey="avgOrderValue" stroke="#3B82F6" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Category Table */}
        <Card title="Category Performance">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  {['Category','Revenue','Units','Share'].map(h => (
                    <th key={h} className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wide px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {CATEGORY_DATA.map(c => (
                  <tr key={c.category} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-xs font-semibold text-slate-800">{c.category}</td>
                    <td className="px-4 py-3 text-xs font-bold text-slate-800">{formatPrice(c.revenue)}</td>
                    <td className="px-4 py-3 text-xs text-slate-600">{c.units}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#D4AF37] rounded-full" style={{ width: `${c.percentage}%` }} />
                        </div>
                        <span className="text-xs text-slate-500 w-8">{c.percentage}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AdminShell>
  );
}
