import React, { useEffect, useState } from 'react';
import { Save, Image as ImageIcon } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Toaster } from '../../components/ui/sonner';
import { toast } from 'sonner';
import AdminLayout from '../../components/AdminLayout';
import { api, formatApiError } from '../../lib/api';

export default function BrandingAdmin() {
  const [logoUrl, setLogoUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/settings/branding`)
      .then((r) => r.json())
      .then((d) => setLogoUrl(d.logo_url || ''))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('/api/admin/settings/branding', { logo_url: logoUrl.trim() });
      toast.success('Logo updated. Refresh the public site to see the change.');
    } catch (err) {
      toast.error(formatApiError(err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <Toaster position="top-center" />
      <div className="max-w-2xl" data-testid="branding-admin-page">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--hp-burgundy)] mb-2">Branding</p>
        <h1 className="text-4xl font-light leading-tight mb-2">Logo</h1>
        <p className="text-sm text-[var(--hp-muted)] font-light mb-10">
          Paste a public image URL. The new logo appears across the site once saved.
          Tip: upload to imgur.com, postimages.org, or any image host you trust.
        </p>

        <form onSubmit={handleSave} className="hp-card p-8 space-y-6">
          <div>
            <label className="text-[11px] uppercase tracking-[0.18em] text-[var(--hp-muted)] mb-2 block">Logo URL</label>
            <Input
              type="url"
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              placeholder="https://example.com/your-logo.png"
              required
              className="bg-[var(--hp-cream)] border-[var(--hp-line)] rounded-none py-5 focus:border-[var(--hp-burgundy)] focus-visible:ring-0"
              data-testid="branding-logo-url"
            />
          </div>

          <div className="border border-[var(--hp-line)] bg-[var(--hp-cream)] p-6 flex items-center justify-center min-h-[180px]" data-testid="branding-preview">
            {loading ? (
              <p className="text-sm text-[var(--hp-muted)]">Loading current logo…</p>
            ) : logoUrl ? (
              <img src={logoUrl} alt="Current logo preview" className="max-h-32 w-auto" />
            ) : (
              <ImageIcon className="h-10 w-10 text-[var(--hp-line)]" />
            )}
          </div>

          <Button
            type="submit"
            disabled={saving || loading}
            className="bg-[var(--hp-burgundy)] text-[var(--hp-ivory)] hover:bg-[var(--hp-wine)] rounded-none text-[11px] uppercase tracking-[0.2em] px-6 py-5 h-auto disabled:opacity-60"
            data-testid="branding-save-btn"
          >
            <Save className="h-4 w-4 mr-2" /> {saving ? 'Saving…' : 'Save Logo'}
          </Button>
        </form>
      </div>
    </AdminLayout>
  );
}
