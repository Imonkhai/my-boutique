import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/utils';
import type { LucideIcon } from 'lucide-react';

// ─── Stat Card ────────────────────────────────────────────────────────────────
interface StatCardProps {
  label: string;
  value: string;
  change?: number;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  prefix?: string;
}

export function StatCard({ label, value, change, icon: Icon, iconColor = 'text-slate-600', iconBg = 'bg-slate-100' }: StatCardProps) {
  const positive = change !== undefined && change >= 0;
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', iconBg)}>
          <Icon size={18} className={iconColor} />
        </div>
        {change !== undefined && (
          <div className={cn('flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full', positive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500')}>
            {positive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <p className="text-2xl font-bold text-slate-900 mb-1">{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
      {change !== undefined && (
        <p className="text-[10px] text-slate-400 mt-1">{positive ? '+' : ''}{change}% vs last period</p>
      )}
    </div>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────
const badgeStyles: Record<string, string> = {
  active:     'bg-green-50 text-green-700 border-green-200',
  inactive:   'bg-slate-100 text-slate-500 border-slate-200',
  draft:      'bg-amber-50 text-amber-700 border-amber-200',
  archived:   'bg-slate-100 text-slate-500 border-slate-200',
  pending:    'bg-amber-50 text-amber-700 border-amber-200',
  confirmed:  'bg-blue-50 text-blue-700 border-blue-200',
  processing: 'bg-purple-50 text-purple-700 border-purple-200',
  shipped:    'bg-indigo-50 text-indigo-700 border-indigo-200',
  delivered:  'bg-green-50 text-green-700 border-green-200',
  cancelled:  'bg-red-50 text-red-600 border-red-200',
  refunded:   'bg-orange-50 text-orange-600 border-orange-200',
  paid:       'bg-green-50 text-green-700 border-green-200',
  failed:     'bg-red-50 text-red-600 border-red-200',
  approved:   'bg-green-50 text-green-700 border-green-200',
  rejected:   'bg-red-50 text-red-600 border-red-200',
  expired:    'bg-slate-100 text-slate-500 border-slate-200',
  blocked:    'bg-red-50 text-red-600 border-red-200',
  'in stock': 'bg-green-50 text-green-700 border-green-200',
  'low stock':'bg-amber-50 text-amber-700 border-amber-200',
  'out of stock': 'bg-red-50 text-red-600 border-red-200',
};

export function Badge({ status }: { status: string }) {
  const key = status.toLowerCase();
  return (
    <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border capitalize', badgeStyles[key] ?? 'bg-slate-100 text-slate-600 border-slate-200')}>
      {status}
    </span>
  );
}

// ─── Page Header ──────────────────────────────────────────────────────────────
export function PageHeader({ title, subtitle, children }: { title: string; subtitle?: string; children?: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">{title}</h1>
        {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
      {children && <div className="flex items-center gap-2 flex-wrap">{children}</div>}
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
export function EmptyState({ icon: Icon, title, description }: { icon: LucideIcon; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mb-4">
        <Icon size={24} className="text-slate-400" />
      </div>
      <p className="font-semibold text-slate-700 mb-1">{title}</p>
      <p className="text-sm text-slate-400 max-w-xs">{description}</p>
    </div>
  );
}

// ─── Section Card ─────────────────────────────────────────────────────────────
export function Card({ title, children, action }: { title?: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      {title && (
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h3 className="font-semibold text-sm text-slate-800">{title}</h3>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}
