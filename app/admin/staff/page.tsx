'use client';
import { useState } from 'react';
import { Plus, X, Shield } from 'lucide-react';
import AdminShell from '@/components/admin/AdminShell';
import { Badge, PageHeader, Card } from '@/components/admin/AdminUI';
import { STAFF_MEMBERS } from '@/lib/admin/data';
import type { AdminRole } from '@/lib/admin/types';

const ROLE_LABELS: Record<AdminRole, string> = {
  super_admin: 'Super Admin', admin: 'Admin', manager: 'Manager',
  sales: 'Sales Staff', inventory: 'Inventory Manager', content: 'Content Manager',
};

const PERMISSIONS = ['Products','Orders','Customers','Inventory','Analytics','Marketing','Content','Settings','Staff','Discounts'];

const ROLE_PERMISSIONS: Record<AdminRole, string[]> = {
  super_admin: PERMISSIONS,
  admin: ['Products','Orders','Customers','Inventory','Analytics','Marketing','Content','Discounts'],
  manager: ['Products','Orders','Customers','Inventory','Analytics'],
  sales: ['Orders','Customers'],
  inventory: ['Products','Inventory'],
  content: ['Products','Content','Marketing'],
};

export default function StaffPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<AdminRole>('sales');

  return (
    <AdminShell>
      <PageHeader title="Staff & Roles" subtitle={`${STAFF_MEMBERS.length} team members`}>
        <button onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#111111] text-white text-sm font-medium rounded-lg hover:bg-[#D4AF37] hover:text-[#111111] transition-all">
          <Plus size={15} /> Invite Staff
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Staff List */}
        <div className="lg:col-span-2">
          <Card title="Team Members">
            <div className="divide-y divide-slate-50">
              {STAFF_MEMBERS.map(s => (
                <div key={s.id} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] font-bold text-sm shrink-0">
                    {s.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800">{s.name}</p>
                    <p className="text-xs text-slate-500">{s.email}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Last login: {new Date(s.lastLogin).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right shrink-0 space-y-1">
                    <div>
                      <span className="inline-block text-[10px] font-semibold bg-[#D4AF37]/10 text-[#D4AF37] px-2 py-0.5 rounded-full">
                        {ROLE_LABELS[s.role]}
                      </span>
                    </div>
                    <Badge status={s.status} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Permissions Matrix */}
        <div>
          <Card title="Role Permissions">
            <div className="p-4">
              <div className="mb-3">
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Preview Role</label>
                <select value={selectedRole} onChange={e => setSelectedRole(e.target.value as AdminRole)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#D4AF37]">
                  {(Object.keys(ROLE_LABELS) as AdminRole[]).map(r => (
                    <option key={r} value={r}>{ROLE_LABELS[r]}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                {PERMISSIONS.map(perm => {
                  const has = ROLE_PERMISSIONS[selectedRole].includes(perm);
                  return (
                    <div key={perm} className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs ${has ? 'bg-green-50' : 'bg-slate-50'}`}>
                      <div className="flex items-center gap-2">
                        <Shield size={12} className={has ? 'text-green-500' : 'text-slate-300'} />
                        <span className={has ? 'text-slate-700 font-medium' : 'text-slate-400'}>{perm}</span>
                      </div>
                      <span className={`font-semibold ${has ? 'text-green-600' : 'text-slate-300'}`}>{has ? '✓' : '✗'}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Invite Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[400] bg-black/50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <p className="font-bold text-slate-900">Invite Staff Member</p>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><X size={16} /></button>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Full Name', placeholder: 'Jane Doe', type: 'text' },
                { label: 'Email Address', placeholder: 'jane@giftcollection.com', type: 'email' },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#D4AF37]" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Role</label>
                <select className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#D4AF37]">
                  {(Object.entries(ROLE_LABELS) as [AdminRole, string][]).map(([k, v]) => (
                    <option key={k} value={k}>{v}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50">Cancel</button>
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 bg-[#111111] text-white rounded-lg text-sm font-medium hover:bg-[#D4AF37] hover:text-[#111111] transition-all">Send Invite</button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
