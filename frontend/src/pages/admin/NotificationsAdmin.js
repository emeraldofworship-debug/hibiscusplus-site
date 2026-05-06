import React, { useEffect, useState, useMemo } from 'react';
import { Bell, Mail, ShoppingBag, Star, Search, AlertTriangle } from 'lucide-react';
import { Input } from '../../components/ui/input';
import AdminLayout from '../../components/AdminLayout';
import { api, formatApiError } from '../../lib/api';

const formatDate = (iso) => {
  if (!iso) return '';
  try { return new Date(iso).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }); }
  catch { return iso; }
};

const ICON = { 'order.paid': ShoppingBag, 'feedback.new': Star, 'newsletter.subscribed': Mail };
const COLOR = { 'order.paid': 'text-[var(--hp-burgundy)]', 'feedback.new': 'text-[var(--hp-bronze)]', 'newsletter.subscribed': 'text-[var(--hp-burgundy-deep)]' };

export default function NotificationsAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    api.get('/api/admin/notifications')
      .then((res) => setItems(res.data.data || []))
      .catch((err) => setError(formatApiError(err)))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((n) =>
      (n.title || '').toLowerCase().includes(q) ||
      (n.body || '').toLowerCase().includes(q) ||
      (n.kind || '').toLowerCase().includes(q)
    );
  }, [items, query]);

  const emailEnabled = items.some((n) => n.channels?.some((c) => c.ok));
  const anyChannels = items.some((n) => (n.channels || []).length > 0);

  return (
    <AdminLayout>
      <div data-testid="admin-notifications-page">
        <div className="flex items-start justify-between gap-4 mb-10 flex-wrap">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--hp-burgundy)] mb-2">Activity</p>
            <h1 className="text-4xl font-light leading-tight mb-2">Notifications</h1>
            <p className="text-sm text-[var(--hp-muted)] font-light">
              {loading ? 'Loading…' : `${filtered.length} of ${items.length}`} · Orders, feedback, subscribers
            </p>
          </div>
        </div>

        {!emailEnabled && anyChannels && (
          <div className="mb-6 hp-card p-5 flex gap-3 items-start" data-testid="email-not-configured">
            <AlertTriangle className="h-5 w-5 text-[var(--hp-bronze)] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-[var(--hp-burgundy-deep)] mb-1">Email delivery not configured yet</p>
              <p className="text-xs text-[var(--hp-muted)] font-light leading-relaxed">
                Notifications are being captured here, but emails aren't being sent.
                Add a <code className="text-[var(--hp-burgundy)]">RESEND_API_KEY</code> environment variable in <code>backend/.env</code> (sign up free at resend.com → API keys → create) and restart the backend. Until then this page is your live activity feed.
              </p>
            </div>
          </div>
        )}

        {error && <div className="mb-6 text-sm text-[var(--hp-hibiscus)] border border-[var(--hp-hibiscus)]/30 bg-[var(--hp-blush)]/40 px-4 py-3">{error}</div>}

        <div className="relative max-w-md mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--hp-muted)]" />
          <Input
            type="text"
            placeholder="Search notifications…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 bg-[var(--hp-ivory)] border-[var(--hp-line)] rounded-none py-5 text-sm focus-visible:ring-0 focus:border-[var(--hp-burgundy)]"
            data-testid="notifications-search"
          />
        </div>

        {loading ? null : filtered.length === 0 ? (
          <div className="hp-card p-10 text-center text-[var(--hp-muted)]">
            <Bell className="h-8 w-8 mx-auto mb-3 text-[var(--hp-line)]" />
            No notifications yet. Activity will appear here as people interact with your site.
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((n) => {
              const Icon = ICON[n.kind] || Bell;
              const color = COLOR[n.kind] || 'text-[var(--hp-muted)]';
              const sentOk = (n.channels || []).filter((c) => c.ok).length;
              return (
                <article key={n.id} className="hp-card p-5 flex gap-4 items-start" data-testid={`notification-${n.id}`}>
                  <div className="w-10 h-10 flex items-center justify-center border border-[var(--hp-line)] shrink-0">
                    <Icon className={`h-4 w-4 ${color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[var(--hp-burgundy-deep)] font-medium leading-tight mb-1">{n.title}</p>
                    <p className="text-xs text-[var(--hp-ink-soft)] font-light leading-relaxed line-clamp-2">{n.body}</p>
                    <div className="flex items-center gap-3 mt-2 text-[10px] uppercase tracking-[0.18em] text-[var(--hp-muted)]">
                      <span>{formatDate(n.created_at)}</span>
                      <span>·</span>
                      <span>{n.kind}</span>
                      {(n.channels || []).length > 0 && (
                        <>
                          <span>·</span>
                          <span className={sentOk ? 'text-[var(--hp-burgundy)]' : 'text-[var(--hp-bronze)]'}>
                            {sentOk ? `${sentOk} email sent` : 'Email pending (no API key)'}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
