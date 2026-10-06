'use client';
import { useState } from 'react';
import { Save } from 'lucide-react';
import AdminShell from '@/components/admin/AdminShell';
import { PageHeader } from '@/components/admin/AdminUI';

const TABS = ['Store', 'Payment', 'Shipping', 'Tax', 'Account'];
const inputCls = "w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#D4AF37] bg-white";
const labelCls = "block text-xs font-semibold text-slate-600 mb-1.5";

export default function SettingsPage() {
  const [tab, setTab] = useState('Store');
  const [saved, setSaved] = useState(false);

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <AdminShell>
      <PageHeader title="Settings" subtitle="Manage your store configuration" />

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-white border border-slate-200 rounded-xl p-1 w-fit overflow-x-auto">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${tab === t ? 'bg-[#111111] text-white' : 'text-slate-500 hover:text-slate-700'}`}>
            {t}
          </button>
        ))}
      </div>

      {saved && <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700 font-medium">✓ Settings saved successfully.</div>}

      <div className="max-w-2xl space-y-5">
        {tab === 'Store' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <h3 className="font-semibold text-sm text-slate-800 border-b border-slate-100 pb-3">Store Information</h3>
            {[
              { label: 'Store Name', placeholder: 'Gift Collection', type: 'text' },
              { label: 'Contact Email', placeholder: 'hello@giftcollection.com', type: 'email' },
              { label: 'Phone Number', placeholder: '+234 800 000 0000', type: 'tel' },
              { label: 'Store Address', placeholder: '12 Victoria Island, Lagos', type: 'text' },
              { label: 'Website URL', placeholder: 'https://giftcollection.com', type: 'url' },
            ].map(f => (
              <div key={f.label}>
                <label className={labelCls}>{f.label}</label>
                <input type={f.type} placeholder={f.placeholder} className={inputCls} />
              </div>
            ))}
            <div>
              <label className={labelCls}>Store Description</label>
              <textarea rows={3} placeholder="A premium fashion boutique…" className={inputCls + ' resize-none'} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Instagram', placeholder: '@giftcollection' },
                { label: 'Facebook', placeholder: 'giftcollection' },
                { label: 'Twitter / X', placeholder: '@giftcollection' },
                { label: 'WhatsApp', placeholder: '+234 800 000 0000' },
              ].map(f => (
                <div key={f.label}>
                  <label className={labelCls}>{f.label}</label>
                  <input placeholder={f.placeholder} className={inputCls} />
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'Payment' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
            <h3 className="font-semibold text-sm text-slate-800 border-b border-slate-100 pb-3">Payment Gateways</h3>
            {[
              { name: 'Paystack', desc: 'Accept cards, bank transfers, USSD', recommended: true },
              { name: 'Flutterwave', desc: 'Accept multiple payment methods across Africa' },
              { name: 'Stripe', desc: 'Accept international card payments' },
            ].map(gw => (
              <div key={gw.name} className="border border-slate-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{gw.name}</p>
                    <p className="text-xs text-slate-500">{gw.desc}</p>
                  </div>
                  {gw.recommended && <span className="text-[10px] bg-[#D4AF37]/10 text-[#D4AF37] font-semibold px-2 py-0.5 rounded-full">Recommended</span>}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Public Key</label>
                    <input type="password" placeholder="pk_live_…" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Secret Key</label>
                    <input type="password" placeholder="sk_live_…" className={inputCls} />
                  </div>
                </div>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" className="accent-[#D4AF37]" />
                  <span className="text-xs text-slate-600">Enable {gw.name}</span>
                </label>
              </div>
            ))}
          </div>
        )}

        {tab === 'Shipping' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <h3 className="font-semibold text-sm text-slate-800 border-b border-slate-100 pb-3">Shipping Settings</h3>
            {[
              { label: 'Standard Delivery Fee (₦)', placeholder: '0', hint: 'Set to 0 for free standard shipping' },
              { label: 'Express Delivery Fee (₦)', placeholder: '3500' },
              { label: 'Overnight Delivery Fee (₦)', placeholder: '7000' },
              { label: 'Free Shipping Threshold (₦)', placeholder: '50000', hint: 'Orders above this get free standard shipping' },
            ].map(f => (
              <div key={f.label}>
                <label className={labelCls}>{f.label}</label>
                <input type="number" placeholder={f.placeholder} className={inputCls} />
                {f.hint && <p className="text-[10px] text-slate-400 mt-1">{f.hint}</p>}
              </div>
            ))}
            <div>
              <label className={labelCls}>Delivery Zones</label>
              <textarea rows={3} placeholder="Lagos, Abuja, Port Harcourt, Ibadan…" className={inputCls + ' resize-none'} />
            </div>
          </div>
        )}

        {tab === 'Tax' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <h3 className="font-semibold text-sm text-slate-800 border-b border-slate-100 pb-3">Tax Configuration</h3>
            <div>
              <label className={labelCls}>VAT Rate (%)</label>
              <input type="number" defaultValue="8" className={inputCls} />
              <p className="text-[10px] text-slate-400 mt-1">Applied to all orders at checkout</p>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="accent-[#D4AF37]" />
              <span className="text-sm text-slate-600">Show tax breakdown at checkout</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-[#D4AF37]" />
              <span className="text-sm text-slate-600">Prices include tax</span>
            </label>
          </div>
        )}

        {tab === 'Account' && (
          <div className="space-y-5">
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
              <h3 className="font-semibold text-sm text-slate-800 border-b border-slate-100 pb-3">Admin Profile</h3>
              <div className="grid grid-cols-2 gap-4">
                <div><label className={labelCls}>First Name</label><input defaultValue="Amara" className={inputCls} /></div>
                <div><label className={labelCls}>Last Name</label><input defaultValue="Osei" className={inputCls} /></div>
              </div>
              <div><label className={labelCls}>Email</label><input type="email" defaultValue="admin@giftcollection.com" className={inputCls} /></div>
              <div><label className={labelCls}>Phone</label><input type="tel" placeholder="+234 800 000 0000" className={inputCls} /></div>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
              <h3 className="font-semibold text-sm text-slate-800 border-b border-slate-100 pb-3">Change Password</h3>
              {['Current Password','New Password','Confirm New Password'].map(f => (
                <div key={f}><label className={labelCls}>{f}</label><input type="password" placeholder="••••••••" className={inputCls} /></div>
              ))}
            </div>
          </div>
        )}

        <button onClick={save}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#111111] text-white text-sm font-medium rounded-lg hover:bg-[#D4AF37] hover:text-[#111111] transition-all">
          <Save size={15} /> Save Changes
        </button>
      </div>
    </AdminShell>
  );
}
