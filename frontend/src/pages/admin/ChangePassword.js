import React, { useState } from 'react';
import { Lock, Save } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { toast } from 'sonner';
import { Toaster } from '../../components/ui/sonner';
import AdminLayout from '../../components/AdminLayout';
import { api, formatApiError } from '../../lib/api';

export default function ChangePassword() {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (next.length < 8) return setError('New password must be at least 8 characters.');
    if (next !== confirm) return setError('New passwords do not match.');
    setSubmitting(true);
    try {
      await api.post('/api/admin/change-password', { current_password: current, new_password: next });
      toast.success('Password updated.');
      setCurrent(''); setNext(''); setConfirm('');
    } catch (err) {
      setError(formatApiError(err));
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls = "bg-[var(--hp-cream)] border-[var(--hp-line)] text-[var(--hp-ink)] rounded-none py-5 focus:border-[var(--hp-burgundy)] focus-visible:ring-0";

  return (
    <AdminLayout>
      <Toaster position="top-center" />
      <div className="max-w-xl" data-testid="change-password-page">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--hp-burgundy)] mb-2">Account</p>
        <h1 className="text-4xl font-light leading-tight mb-2">Change password</h1>
        <p className="text-sm text-[var(--hp-muted)] font-light mb-10">
          Use a long passphrase you don't reuse anywhere else.
        </p>

        <form onSubmit={handleSubmit} className="hp-card p-8 space-y-5" data-testid="change-password-form">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 flex items-center justify-center border border-[var(--hp-burgundy)]/30 text-[var(--hp-burgundy)]">
              <Lock className="h-4 w-4" />
            </div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--hp-burgundy)]">Update credentials</p>
          </div>

          <div>
            <label className="text-[11px] uppercase tracking-[0.18em] text-[var(--hp-muted)] mb-2 block">Current password</label>
            <Input type="password" value={current} onChange={(e) => setCurrent(e.target.value)} required autoComplete="current-password" className={inputCls} data-testid="cp-current" />
          </div>
          <div>
            <label className="text-[11px] uppercase tracking-[0.18em] text-[var(--hp-muted)] mb-2 block">New password</label>
            <Input type="password" value={next} onChange={(e) => setNext(e.target.value)} required autoComplete="new-password" minLength={8} className={inputCls} data-testid="cp-new" />
            <p className="text-[11px] text-[var(--hp-muted)] mt-1">Minimum 8 characters.</p>
          </div>
          <div>
            <label className="text-[11px] uppercase tracking-[0.18em] text-[var(--hp-muted)] mb-2 block">Confirm new password</label>
            <Input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required autoComplete="new-password" className={inputCls} data-testid="cp-confirm" />
          </div>

          {error && (
            <div className="text-sm text-[var(--hp-hibiscus)] border border-[var(--hp-hibiscus)]/30 bg-[var(--hp-blush)]/40 px-3 py-2" data-testid="cp-error">{error}</div>
          )}

          <Button
            type="submit"
            disabled={submitting}
            className="bg-[var(--hp-burgundy)] text-[var(--hp-ivory)] hover:bg-[var(--hp-wine)] rounded-none text-[11px] uppercase tracking-[0.2em] px-6 py-5 h-auto disabled:opacity-60"
            data-testid="cp-submit"
          >
            <Save className="h-4 w-4 mr-2" /> {submitting ? 'Updating…' : 'Update Password'}
          </Button>
        </form>
      </div>
    </AdminLayout>
  );
}
