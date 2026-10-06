'use client';
import Link from 'next/link';
import {
  ShoppingCart, Users, Package, TrendingUp, AlertTriangle,
  ArrowRight, DollarSign, Clock, CheckCircle,
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts';
import AdminShell from '@/components/admin/AdminShell';
import { StatCard, Badge, Card } from '@/components/admin/AdminUI';
import { ADMIN_PRODUCTS, ADMIN_ORDERS, ADMIN_CUSTOMERS, REVENUE_DATA, CATEGORY_DATA } from '@/lib/admin/data';
import { formatPrice } from '@/utils';

const PIE_COLORS = ['#D4AF37','#111111','#6B7280','#3B82F6','#10B981','#F59E0B','#EF4444'];

export default function AdminDashboard() {
  const totalRevenue = REVENUE_DATA.reduce((s, d) => s + d.revenue, 0);
  const totalOrders  = REVENUE_DATA.reduce((s, d) => s + d.orders, 0);
  const pendingOrders = ADMIN_ORDERS.filter(o => o.orderStatus === 'pending').length;
  const lowStock = ADMIN_PRODUCTS.filter(p => p.stock > 0 && p.stock <= p.lowStockThreshold).length;
  const outOfStock = ADMIN_PRODUCTS.filter(p => p.stock === 0).length;
  const avgOrder = Math.round(totalRevenue / totalOrders);

  const recentOrders = ADMIN_ORDERS.slice(0, 5);
  const topProducts  = [...ADMIN_PRODUCTS].sort((a, b) => b.revenue - a.revenue).slice(0, 5);
  const lowStockProducts = ADMIN_PRODUCTS.filter(p => p.stock <= p.lowStockThreshold);

  return (
    <AdminShell>
      {/* Greeting */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Good morning, Amara 👋</h1>
        <p className="text-sm text-slate-500 mt-1">Here's what's happening with your store today.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Revenue (Jan)" value={formatPrice(totalRevenue)} change={12.4} icon={DollarSign} iconBg="bg-[#D4AF37]/10" iconColor="text-[#D4AF37]" />
        <StatCard label="Total Orders" value={totalOrders.toString()} change={8.1} icon={ShoppingCart} iconBg="bg-blue-50" iconColor="text-blue-600" />
        <StatCard label="Pending Orders" value={pendingOrders.toString()} change={-5.2} icon={Clock} iconBg="bg-amber-50" iconColor="text-amber-600" />
        <StatCard label="Total Customers" value={ADMIN_CUSTOMERS.length.toString()} change={15.3} icon={Users} iconBg="bg-green-50" iconColor="text-green-600" />
        <StatCard label="Total Products" value={ADMIN_PRODUCTS.length.toString()} icon={Package} iconBg="bg-purple-50" iconColor="text-purple-600" />
        <StatCard label="Low Stock Items" value={lowStock.toString()} icon={AlertTriangle} iconBg="bg-amber-50" iconColor="text-amber-600" />
        <StatCard label="Out of Stock" value={outOfStock.toString()} icon={AlertTriangle} iconBg="bg-red-50" iconColor="text-red-500" />
        <StatCard label="Avg. Order Value" value={formatPrice(avgOrder)} change={3.7} icon={TrendingUp} iconBg="bg-indigo-50" iconColor="text-indigo-600" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Revenue Line Chart */}
        <Card title="Revenue — Jan 2025" action={<span className="text-xs text-slate-400">Last 15 days</span>}>
          <div className="p-4 lg:col-span-2" style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={REVENUE_DATA} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={false} interval={2} />
                <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={false} tickFormatter={v => `₦${(v/1000000).toFixed(1)}M`} />
                <Tooltip formatter={(v: number) => [formatPrice(v), 'Revenue']} contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }} />
                <Line type="monotone" dataKey="revenue" stroke="#D4AF37" strokeWidth={2.5} dot={false} activeDot={{ r: 4, fill: '#D4AF37' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Orders Bar Chart */}
        <Card title="Daily Orders" action={<span className="text-xs text-slate-400">Jan 2025</span>}>
          <div className="p-4" style={{ height: 220 }}>
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
        <Card title="Sales by Category">
          <div className="p-4" style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={CATEGORY_DATA} dataKey="percentage" nameKey="category" cx="50%" cy="50%" outerRadius={75} innerRadius={40}>
                  {CATEGORY_DATA.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v: number) => [`${v}%`, 'Share']} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Orders */}
        <Card title="Recent Orders" action={<Link href="/admin/orders" className="text-xs text-[#D4AF37] hover:underline flex items-center gap-1">View all <ArrowRight size={11} /></Link>}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  {['Order', 'Customer', 'Total', 'Status'].map(h => (
                    <th key={h} className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wide px-5 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentOrders.map(order => (
                  <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3">
                      <Link href={`/admin/orders`} className="font-medium text-slate-800 hover:text-[#D4AF37] text-xs">{order.orderNumber}</Link>
                    </td>
                    <td className="px-5 py-3 text-xs text-slate-600">{order.customer.name}</td>
                    <td className="px-5 py-3 text-xs font-semibold text-slate-800">{formatPrice(order.total)}</td>
                    <td className="px-5 py-3"><Badge status={order.orderStatus} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Top Products */}
        <Card title="Top Selling Products" action={<Link href="/admin/products" className="text-xs text-[#D4AF37] hover:underline flex items-center gap-1">View all <ArrowRight size={11} /></Link>}>
          <ul className="divide-y divide-slate-50">
            {topProducts.map((p, i) => (
              <li key={p.id} className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 transition-colors">
                <span className="text-xs font-bold text-slate-300 w-4">{i + 1}</span>
                <img src={p.featuredImage} alt={p.name} className="w-9 h-9 rounded-lg object-cover border border-slate-100" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-800 truncate">{p.name}</p>
                  <p className="text-[10px] text-slate-400">{p.unitsSold} sold</p>
                </div>
                <p className="text-xs font-bold text-slate-800 shrink-0">{formatPrice(p.revenue)}</p>
              </li>
            ))}
          </ul>
        </Card>

        {/* Low Stock Alert */}
        <Card title="Low Stock Alerts" action={<Link href="/admin/inventory" className="text-xs text-[#D4AF37] hover:underline flex items-center gap-1">Manage <ArrowRight size={11} /></Link>}>
          <ul className="divide-y divide-slate-50">
            {lowStockProducts.map(p => (
              <li key={p.id} className="flex items-center gap-3 px-5 py-3">
                <img src={p.featuredImage} alt={p.name} className="w-9 h-9 rounded-lg object-cover border border-slate-100" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-800 truncate">{p.name}</p>
                  <p className="text-[10px] text-slate-400">SKU: {p.sku}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className={`text-xs font-bold ${p.stock === 0 ? 'text-red-500' : 'text-amber-600'}`}>{p.stock === 0 ? 'Out of Stock' : `${p.stock} left`}</p>
                  <p className="text-[10px] text-slate-400">Min: {p.lowStockThreshold}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        {/* Quick Stats */}
        <Card title="Order Status Breakdown">
          <div className="p-5 space-y-3">
            {(['pending','confirmed','processing','shipped','delivered','cancelled'] as const).map(status => {
              const count = ADMIN_ORDERS.filter(o => o.orderStatus === status).length;
              const pct = Math.round((count / ADMIN_ORDERS.length) * 100);
              return (
                <div key={status}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="capitalize text-slate-600 font-medium">{status}</span>
                    <span className="text-slate-800 font-semibold">{count}</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#D4AF37] rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </AdminShell>
  );
}
