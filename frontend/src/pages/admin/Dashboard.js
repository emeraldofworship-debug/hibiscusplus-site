import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, ShoppingBag, BookOpen, Mail, MessageSquare, ArrowRight } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { api, formatApiError } from '../../lib/api';
import { useAuth } from '../../contexts/AuthContext';

const STAT_TILES = [
  { key: 'recipes', label: 'Recipes', icon: Leaf, link: '/admin/recipes' },
  { key: 'products', label: 'Products', icon: ShoppingBag, link: '/admin/products' },
  { key: 'blog_posts', label: 'Blog Posts', icon: BookOpen, link: '/admin/blog' },
  { key: 'newsletter_subscribers', label: 'Subscribers', icon: Mail, link: '/admin/subscribers' },
  { key: 'feedback', label: 'Feedback', icon: MessageSquare, link: '/admin/feedback' },
];

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/api/admin/stats')
      .then((res) => setStats(res.data))
      .catch((err) => setError(formatApiError(err)));
  }, []);

  return (
    <AdminLayout>
      <div data-testid="admin-dashboard">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--hp-burgundy)] mb-3">Dashboard</p>
        <h1 className="text-4xl md:text-5xl font-light leading-tight mb-2">
          Welcome back, <span className="italic text-[var(--hp-burgundy)]">{user?.name?.split(' ')[0] || 'Admin'}.</span>
        </h1>
        <p className="text-sm text-[var(--hp-muted)] font-light mb-10">
          A snapshot of what's live on HibiscusPlus right now.
        </p>

        {error && (
          <div className="mb-6 text-sm text-[var(--hp-hibiscus)] border border-[var(--hp-hibiscus)]/30 bg-[var(--hp-blush)]/40 px-4 py-3">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {STAT_TILES.map(({ key, label, icon: Icon, link }) => {
            const value = stats ? (stats[key] ?? 0) : '—';
            const tile = (
              <div
                className="hp-card p-6 flex items-start justify-between gap-4 h-full"
                data-testid={`stat-${key}`}
              >
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--hp-bronze)] mb-3">{label}</p>
                  <p className="text-4xl font-light text-[var(--hp-burgundy-deep)]">{value}</p>
                </div>
                <div className="w-10 h-10 flex items-center justify-center border border-[var(--hp-line)] text-[var(--hp-burgundy)]">
                  <Icon className="h-4 w-4" />
                </div>
              </div>
            );
            return link ? (
              <Link key={key} to={link} className="group">{tile}</Link>
            ) : (
              <div key={key}>{tile}</div>
            );
          })}
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
          <Link to="/admin/recipes" className="hp-card p-7 flex items-center justify-between" data-testid="quick-recipes">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--hp-burgundy)] mb-2">Quick action</p>
              <h3 className="text-2xl font-light text-[var(--hp-burgundy-deep)]">Add a new recipe</h3>
              <p className="text-sm text-[var(--hp-muted)] mt-1 font-light">Brew up a fresh blend page in under a minute.</p>
            </div>
            <ArrowRight className="h-5 w-5 text-[var(--hp-burgundy)]" />
          </Link>
          <Link to="/admin/blog" className="hp-card p-7 flex items-center justify-between" data-testid="quick-blog">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--hp-burgundy)] mb-2">Quick action</p>
              <h3 className="text-2xl font-light text-[var(--hp-burgundy-deep)]">Write a journal entry</h3>
              <p className="text-sm text-[var(--hp-muted)] mt-1 font-light">Share a story from the steeping pot.</p>
            </div>
            <ArrowRight className="h-5 w-5 text-[var(--hp-burgundy)]" />
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
}
