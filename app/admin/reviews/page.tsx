'use client';
import { useState } from 'react';
import { Star, CheckCircle, XCircle, Trash2 } from 'lucide-react';
import AdminShell from '@/components/admin/AdminShell';
import { Badge, PageHeader, Card } from '@/components/admin/AdminUI';
import { ADMIN_REVIEWS } from '@/lib/admin/data';

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={12} className={i <= rating ? 'text-[#D4AF37] fill-[#D4AF37]' : 'text-slate-200 fill-slate-200'} />
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const [filter, setFilter] = useState('all');
  const [reviews, setReviews] = useState(ADMIN_REVIEWS);

  const filtered = reviews.filter(r => filter === 'all' || r.status === filter);
  const avgRating = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;

  const updateStatus = (id: string, status: 'approved' | 'rejected') => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };
  const deleteReview = (id: string) => setReviews(prev => prev.filter(r => r.id !== id));

  return (
    <AdminShell>
      <PageHeader title="Reviews" subtitle={`${reviews.length} total reviews`} />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <div className="bg-white rounded-xl border border-slate-200 p-4 col-span-2 lg:col-span-1">
          <p className="text-3xl font-bold text-slate-900">{avgRating.toFixed(1)}</p>
          <StarRow rating={Math.round(avgRating)} />
          <p className="text-xs text-slate-500 mt-1">Average Rating</p>
        </div>
        {[
          { label: 'Pending', count: reviews.filter(r => r.status === 'pending').length, color: 'text-amber-600' },
          { label: 'Approved', count: reviews.filter(r => r.status === 'approved').length, color: 'text-green-600' },
          { label: 'Rejected', count: reviews.filter(r => r.status === 'rejected').length, color: 'text-red-500' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-4">
            <p className={`text-2xl font-bold ${s.color}`}>{s.count}</p>
            <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Rating breakdown */}
      <Card title="Rating Breakdown">
        <div className="p-5 space-y-2">
          {[5,4,3,2,1].map(star => {
            const count = reviews.filter(r => r.rating === star).length;
            const pct = reviews.length > 0 ? Math.round((count / reviews.length) * 100) : 0;
            return (
              <div key={star} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-12 shrink-0">
                  <span className="text-xs text-slate-600">{star}</span>
                  <Star size={11} className="text-[#D4AF37] fill-[#D4AF37]" />
                </div>
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#D4AF37] rounded-full transition-all" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-xs text-slate-500 w-8 text-right">{count}</span>
              </div>
            );
          })}
        </div>
      </Card>

      <div className="mt-4">
        <Card>
          {/* Filter tabs */}
          <div className="flex gap-1 p-4 border-b border-slate-100">
            {['all','pending','approved','rejected'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${filter === f ? 'bg-[#111111] text-white' : 'text-slate-500 hover:bg-slate-100'}`}>
                {f}
              </button>
            ))}
          </div>

          <div className="divide-y divide-slate-50">
            {filtered.map(r => (
              <div key={r.id} className="p-5 hover:bg-slate-50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <p className="text-sm font-semibold text-slate-800">{r.customer}</p>
                      <StarRow rating={r.rating} />
                      <Badge status={r.status} />
                    </div>
                    <p className="text-xs text-[#D4AF37] font-medium mb-1">{r.product}</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{r.comment}</p>
                    <p className="text-[10px] text-slate-400 mt-2">{new Date(r.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    {r.status === 'pending' && (
                      <>
                        <button onClick={() => updateStatus(r.id, 'approved')}
                          className="p-1.5 rounded-lg hover:bg-green-50 text-slate-400 hover:text-green-600 transition-colors" title="Approve">
                          <CheckCircle size={16} />
                        </button>
                        <button onClick={() => updateStatus(r.id, 'rejected')}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors" title="Reject">
                          <XCircle size={16} />
                        </button>
                      </>
                    )}
                    <button onClick={() => deleteReview(r.id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors" title="Delete">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {filtered.length === 0 && <div className="text-center py-12 text-slate-400 text-sm">No reviews found.</div>}
          </div>
        </Card>
      </div>
    </AdminShell>
  );
}
