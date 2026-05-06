import React, { useEffect, useState, useMemo } from 'react';
import { Download, Search, Mail } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import AdminLayout from '../../components/AdminLayout';
import { api, formatApiError } from '../../lib/api';

const formatDate = (iso) => {
  if (!iso) return '';
  try { return new Date(iso).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }); }
  catch { return iso; }
};

export default function SubscribersAdmin() {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all'); // all | active | inactive | breakfast | blog

  useEffect(() => {
    api.get('/api/admin/subscribers')
      .then((res) => setSubs(res.data.data || []))
      .catch((err) => setError(formatApiError(err)))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return subs.filter((s) => {
      const q = query.trim().toLowerCase();
      const matchQ = !q || (s.email || '').toLowerCase().includes(q);
      const interest = (s.interest || s.source || '').toLowerCase();
      const matchF =
        filter === 'all' ? true :
        filter === 'active' ? s.is_active !== false :
        filter === 'inactive' ? s.is_active === false :
        filter === 'breakfast' ? interest.includes('breakfast') :
        filter === 'blog' ? interest.includes('blog') : true;
      return matchQ && matchF;
    });
  }, [subs, query, filter]);

  const exportCSV = () => {
    const rows = [['Email', 'Subscribed At', 'Active', 'Interest/Source']];
    filtered.forEach((s) => rows.push([
      s.email || '',
      s.subscribed_at || '',
      s.is_active === false ? 'no' : 'yes',
      s.interest || s.source || '',
    ]));
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hibiscusplus-subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const FILTERS = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'inactive', label: 'Unsubscribed' },
    { key: 'breakfast', label: 'Breakfast list' },
    { key: 'blog', label: 'Blog list' },
  ];

  return (
    <AdminLayout>
      <div data-testid="admin-subscribers-page">
        <div className="flex items-start justify-between gap-4 mb-10 flex-wrap">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--hp-burgundy)] mb-2">Newsletter</p>
            <h1 className="text-4xl font-light leading-tight mb-2">Subscribers</h1>
            <p className="text-sm text-[var(--hp-muted)] font-light">
              {loading ? 'Loading…' : `${filtered.length} of ${subs.length} subscribers`}
            </p>
          </div>
          <Button
            onClick={exportCSV}
            disabled={filtered.length === 0}
            className="bg-[var(--hp-burgundy)] text-[var(--hp-ivory)] hover:bg-[var(--hp-wine)] rounded-none text-[11px] uppercase tracking-[0.2em] px-5 py-3 h-auto disabled:opacity-50"
            data-testid="subscribers-export-csv"
          >
            <Download className="h-4 w-4 mr-2" /> Export CSV
          </Button>
        </div>

        {error && (
          <div className="mb-6 text-sm text-[var(--hp-hibiscus)] border border-[var(--hp-hibiscus)]/30 bg-[var(--hp-blush)]/40 px-4 py-3">{error}</div>
        )}

        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--hp-muted)]" />
            <Input
              type="text"
              placeholder="Search email…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 bg-[var(--hp-ivory)] border-[var(--hp-line)] rounded-none py-5 text-sm focus-visible:ring-0 focus:border-[var(--hp-burgundy)]"
              data-testid="subscribers-search"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                data-testid={`subscribers-filter-${f.key}`}
                className={`text-[11px] uppercase tracking-[0.18em] px-3 py-2 border transition-all duration-300 ${
                  filter === f.key
                    ? 'bg-[var(--hp-burgundy)] text-[var(--hp-ivory)] border-[var(--hp-burgundy)]'
                    : 'bg-transparent text-[var(--hp-ink-soft)] border-[var(--hp-line)] hover:border-[var(--hp-burgundy)]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? null : filtered.length === 0 ? (
          <div className="hp-card p-10 text-center text-[var(--hp-muted)]">No subscribers match.</div>
        ) : (
          <div className="hp-card overflow-hidden">
            <table className="w-full" data-testid="subscribers-table">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-[0.18em] text-[var(--hp-muted)] border-b border-[var(--hp-line-soft)]">
                  <th className="p-4 font-normal">Email</th>
                  <th className="p-4 font-normal">Subscribed</th>
                  <th className="p-4 font-normal">Status</th>
                  <th className="p-4 font-normal">Interest</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr key={s.id || s.email} className="border-b border-[var(--hp-line-soft)] last:border-b-0 hover:bg-[var(--hp-blush)]/20" data-testid={`subscriber-row-${s.email}`}>
                    <td className="p-4 text-sm">
                      <a href={`mailto:${s.email}`} className="text-[var(--hp-burgundy)] hover:text-[var(--hp-wine)] flex items-center gap-2">
                        <Mail className="h-3.5 w-3.5" /> {s.email}
                      </a>
                    </td>
                    <td className="p-4 text-sm text-[var(--hp-ink-soft)]">{formatDate(s.subscribed_at)}</td>
                    <td className="p-4 text-sm">
                      <span className={`text-[10px] uppercase tracking-[0.18em] px-2 py-1 ${
                        s.is_active === false
                          ? 'bg-[var(--hp-line-soft)] text-[var(--hp-muted)]'
                          : 'bg-[var(--hp-blush)] text-[var(--hp-burgundy-deep)]'
                      }`}>
                        {s.is_active === false ? 'Unsubscribed' : 'Active'}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-[var(--hp-ink-soft)]">{s.interest || s.source || '—'}</td>
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
