import React, { useEffect, useState, useMemo } from 'react';
import { Star, Search, Mail } from 'lucide-react';
import { Input } from '../../components/ui/input';
import AdminLayout from '../../components/AdminLayout';
import { api, formatApiError } from '../../lib/api';

const formatDate = (iso) => {
  if (!iso) return '';
  try { return new Date(iso).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }); }
  catch { return iso; }
};

const Stars = ({ rating = 0 }) => (
  <div className="flex gap-0.5" data-testid="feedback-stars">
    {[1, 2, 3, 4, 5].map((n) => (
      <Star
        key={n}
        className={`h-4 w-4 ${n <= rating ? 'text-[var(--hp-burgundy)] fill-[var(--hp-burgundy)]' : 'text-[var(--hp-line)]'}`}
      />
    ))}
  </div>
);

export default function FeedbackAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    api.get('/api/admin/feedback')
      .then((res) => setItems(res.data.data || []))
      .catch((err) => setError(formatApiError(err)))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((f) =>
      (f.name || '').toLowerCase().includes(q) ||
      (f.email || '').toLowerCase().includes(q) ||
      (f.blend || '').toLowerCase().includes(q) ||
      (f.taste || '').toLowerCase().includes(q) ||
      (f.comments || '').toLowerCase().includes(q)
    );
  }, [items, query]);

  const avgRating = useMemo(() => {
    const rated = items.filter((f) => typeof f.rating === 'number' && f.rating > 0);
    if (rated.length === 0) return null;
    return (rated.reduce((sum, f) => sum + f.rating, 0) / rated.length).toFixed(1);
  }, [items]);

  return (
    <AdminLayout>
      <div data-testid="admin-feedback-page">
        <div className="flex items-start justify-between gap-4 mb-10 flex-wrap">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--hp-burgundy)] mb-2">Tasting Feedback</p>
            <h1 className="text-4xl font-light leading-tight mb-2">What people are saying</h1>
            <p className="text-sm text-[var(--hp-muted)] font-light">
              {loading ? 'Loading…' : `${filtered.length} of ${items.length} responses${avgRating ? ` · avg ${avgRating}/5` : ''}`}
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-6 text-sm text-[var(--hp-hibiscus)] border border-[var(--hp-hibiscus)]/30 bg-[var(--hp-blush)]/40 px-4 py-3">{error}</div>
        )}

        <div className="relative flex-1 max-w-md mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--hp-muted)]" />
          <Input
            type="text"
            placeholder="Search by name, blend, or comment…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 bg-[var(--hp-ivory)] border-[var(--hp-line)] rounded-none py-5 text-sm focus-visible:ring-0 focus:border-[var(--hp-burgundy)]"
            data-testid="feedback-search"
          />
        </div>

        {loading ? null : filtered.length === 0 ? (
          <div className="hp-card p-10 text-center text-[var(--hp-muted)]">No feedback responses yet.</div>
        ) : (
          <div className="space-y-4">
            {filtered.map((f, i) => (
              <article
                key={f.submitted_at || i}
                className="hp-card p-6 md:p-8"
                data-testid={`feedback-item-${i}`}
              >
                <div className="flex items-start justify-between gap-6 flex-wrap mb-4">
                  <div>
                    <h3 className="text-xl text-[var(--hp-burgundy-deep)] font-medium mb-1">{f.name || 'Anonymous'}</h3>
                    {f.email && (
                      <a href={`mailto:${f.email}`} className="text-sm text-[var(--hp-muted)] hover:text-[var(--hp-burgundy)] flex items-center gap-1.5">
                        <Mail className="h-3 w-3" /> {f.email}
                      </a>
                    )}
                  </div>
                  <div className="text-right">
                    {typeof f.rating === 'number' && f.rating > 0 && <Stars rating={f.rating} />}
                    <p className="text-[11px] text-[var(--hp-muted)] mt-2">{formatDate(f.submitted_at)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm">
                  {f.blend && (
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--hp-bronze)] mb-1">Blend</p>
                      <p className="text-[var(--hp-ink)]">{f.blend}</p>
                    </div>
                  )}
                  {f.wouldBuy && (
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--hp-bronze)] mb-1">Would purchase</p>
                      <p className="text-[var(--hp-ink)]">{f.wouldBuy}</p>
                    </div>
                  )}
                  {f.taste && (
                    <div className="md:col-span-2">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--hp-bronze)] mb-1">Taste notes</p>
                      <p className="text-[var(--hp-ink-soft)] font-light leading-relaxed">{f.taste}</p>
                    </div>
                  )}
                  {f.comments && (
                    <div className="md:col-span-2 pt-2 border-t border-[var(--hp-line-soft)]">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--hp-bronze)] mb-1">Comments</p>
                      <p className="text-[var(--hp-ink-soft)] font-light leading-relaxed italic">"{f.comments}"</p>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
