import React, { useEffect, useState, useMemo } from 'react';
import { Search, Receipt } from 'lucide-react';
import { Input } from '../../components/ui/input';
import AdminLayout from '../../components/AdminLayout';
import { api, formatApiError } from '../../lib/api';

const formatDate = (iso) => {
  if (!iso) return '';
  try { return new Date(iso).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }); }
  catch { return iso; }
};

const STATUS_STYLES = {
  paid: 'bg-[var(--hp-blush)] text-[var(--hp-burgundy-deep)]',
  initiated: 'bg-[var(--hp-cream-deep)] text-[var(--hp-bronze)]',
  pending: 'bg-[var(--hp-cream-deep)] text-[var(--hp-bronze)]',
  expired: 'bg-[var(--hp-line-soft)] text-[var(--hp-muted)]',
  failed: 'bg-[var(--hp-line-soft)] text-[var(--hp-hibiscus)]',
};

export default function OrdersAdmin() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    api.get('/api/admin/orders')
      .then((res) => setOrders(res.data.data || []))
      .catch((err) => setError(formatApiError(err)))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return orders;
    return orders.filter((o) =>
      (o.session_id || '').toLowerCase().includes(q) ||
      JSON.stringify(o.items || []).toLowerCase().includes(q) ||
      (o.metadata?.items_summary || '').toLowerCase().includes(q)
    );
  }, [orders, query]);

  const paid = orders.filter((o) => o.payment_status === 'paid');
  const revenue = paid.reduce((s, o) => s + (o.amount || 0), 0);

  return (
    <AdminLayout>
      <div data-testid="admin-orders-page">
        <div className="flex items-start justify-between gap-4 mb-10 flex-wrap">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--hp-burgundy)] mb-2">Orders</p>
            <h1 className="text-4xl font-light leading-tight mb-2">Stripe Transactions</h1>
            <p className="text-sm text-[var(--hp-muted)] font-light">
              {loading ? 'Loading…' : `${filtered.length} of ${orders.length} · ${paid.length} paid · £${revenue.toFixed(2)} revenue`}
            </p>
          </div>
        </div>

        {error && <div className="mb-6 text-sm text-[var(--hp-hibiscus)] border border-[var(--hp-hibiscus)]/30 bg-[var(--hp-blush)]/40 px-4 py-3">{error}</div>}

        <div className="relative max-w-md mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--hp-muted)]" />
          <Input
            type="text"
            placeholder="Search by item, session id…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 bg-[var(--hp-ivory)] border-[var(--hp-line)] rounded-none py-5 text-sm focus-visible:ring-0 focus:border-[var(--hp-burgundy)]"
            data-testid="orders-search"
          />
        </div>

        {loading ? null : filtered.length === 0 ? (
          <div className="hp-card p-10 text-center text-[var(--hp-muted)]">
            <Receipt className="h-8 w-8 mx-auto mb-3 text-[var(--hp-line)]" />
            No orders yet. Once customers pay through Stripe, transactions appear here.
          </div>
        ) : (
          <div className="hp-card overflow-hidden">
            <table className="w-full" data-testid="orders-table">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-[0.18em] text-[var(--hp-muted)] border-b border-[var(--hp-line-soft)]">
                  <th className="p-4 font-normal">Created</th>
                  <th className="p-4 font-normal">Items</th>
                  <th className="p-4 font-normal">Amount</th>
                  <th className="p-4 font-normal">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((o) => (
                  <tr key={o.session_id} className="border-b border-[var(--hp-line-soft)] last:border-b-0 hover:bg-[var(--hp-blush)]/20" data-testid={`order-row-${o.session_id}`}>
                    <td className="p-4 text-sm text-[var(--hp-ink-soft)] whitespace-nowrap">{formatDate(o.created_at)}</td>
                    <td className="p-4 text-sm text-[var(--hp-ink)]">
                      {(o.items || []).map((it) => `${it.qty}× ${it.name}`).join(', ') || o.metadata?.items_summary || '—'}
                    </td>
                    <td className="p-4 text-sm text-[var(--hp-burgundy)] whitespace-nowrap">£{Number(o.amount || 0).toFixed(2)}</td>
                    <td className="p-4">
                      <span className={`text-[10px] uppercase tracking-[0.18em] px-2 py-1 ${STATUS_STYLES[o.payment_status] || 'bg-[var(--hp-line-soft)] text-[var(--hp-muted)]'}`}>
                        {o.payment_status || 'unknown'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
