import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from 'sonner';
import AdminLayout from './AdminLayout';
import { api, formatApiError } from '../lib/api';

/**
 * Generic admin CRUD page.
 *
 * Props:
 *  - title: page heading
 *  - subtitle: short description
 *  - resourcePath: '/api/recipes' (read) — must support GET returning {data: [...]}
 *  - adminPath: '/api/admin/recipes' (create/update/delete)
 *  - columns: [{ key, label, type? ('image'|'badge'|'text'), render? (item)=>node }]
 *  - fields: [{ key, label, type ('text'|'textarea'|'list'|'image'|'boolean'), placeholder?, required? }]
 *  - emptyItem: () => initial values for a new entry
 *  - testidPrefix
 */
export const AdminCrudPage = ({
  title,
  subtitle,
  resourcePath,
  adminPath,
  columns,
  fields,
  emptyItem,
  testidPrefix,
}) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null | object (new) | existing
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get(resourcePath);
      setItems(data.data || []);
    } catch (err) {
      toast.error(formatApiError(err));
    } finally {
      setLoading(false);
    }
  }, [resourcePath]);

  useEffect(() => { load(); }, [load]);

  const handleNew = () => setEditing({ ...emptyItem(), __isNew: true });
  const handleEdit = (item) => setEditing({ ...item });
  const handleCancel = () => setEditing(null);

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete "${item.name || item.title || item.id}"? This cannot be undone.`)) return;
    try {
      await api.delete(`${adminPath}/${item.id}`);
      toast.success('Deleted.');
      setItems((prev) => prev.filter((x) => x.id !== item.id));
    } catch (err) {
      toast.error(formatApiError(err));
    }
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    const payload = { ...editing };
    delete payload.__isNew;
    delete payload._id;

    // Normalise list-type fields from CSV strings if user typed them.
    fields.forEach((f) => {
      if (f.type === 'list' && typeof payload[f.key] === 'string') {
        payload[f.key] = payload[f.key].split(',').map((s) => s.trim()).filter(Boolean);
      }
    });

    try {
      if (editing.__isNew) {
        const { data } = await api.post(adminPath, payload);
        setItems((prev) => [data.data, ...prev]);
        toast.success('Created.');
      } else {
        const { data } = await api.put(`${adminPath}/${editing.id}`, payload);
        setItems((prev) => prev.map((x) => (x.id === editing.id ? data.data : x)));
        toast.success('Saved.');
      }
      setEditing(null);
    } catch (err) {
      toast.error(formatApiError(err));
    } finally {
      setSaving(false);
    }
  };

  const updateField = (key, value) => setEditing((prev) => ({ ...prev, [key]: value }));

  return (
    <AdminLayout>
      <div data-testid={`${testidPrefix}-page`}>
        <div className="flex items-start justify-between gap-4 mb-10">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--hp-burgundy)] mb-2">{title}</p>
            <h1 className="text-4xl font-light leading-tight mb-2">{subtitle}</h1>
            <p className="text-sm text-[var(--hp-muted)] font-light">{items.length} entries</p>
          </div>
          <Button
            onClick={handleNew}
            className="bg-[var(--hp-burgundy)] text-[var(--hp-ivory)] hover:bg-[var(--hp-wine)] rounded-none text-[11px] uppercase tracking-[0.2em] px-5 py-3 h-auto"
            data-testid={`${testidPrefix}-new-btn`}
          >
            <Plus className="h-4 w-4 mr-2" /> New
          </Button>
        </div>

        {loading ? (
          <p className="text-sm text-[var(--hp-muted)]">Loading…</p>
        ) : items.length === 0 ? (
          <div className="hp-card p-10 text-center">
            <p className="text-[var(--hp-muted)]">No entries yet. Hit "New" to add the first one.</p>
          </div>
        ) : (
          <div className="hp-card overflow-hidden">
            <table className="w-full" data-testid={`${testidPrefix}-table`}>
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-[0.18em] text-[var(--hp-muted)] border-b border-[var(--hp-line-soft)]">
                  {columns.map((c) => (
                    <th key={c.key} className="p-4 font-normal">{c.label}</th>
                  ))}
                  <th className="p-4 font-normal text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-[var(--hp-line-soft)] last:border-b-0 hover:bg-[var(--hp-blush)]/20" data-testid={`${testidPrefix}-row-${item.id}`}>
                    {columns.map((c) => (
                      <td key={c.key} className="p-4 text-sm">
                        {c.render ? c.render(item) :
                          c.type === 'image' && item[c.key] ? (
                            <img src={item[c.key]} alt="" className="h-10 w-14 object-cover" />
                          ) : c.type === 'badge' && item[c.key] ? (
                            <span className="text-[10px] uppercase tracking-[0.18em] bg-[var(--hp-blush)] text-[var(--hp-burgundy-deep)] px-2 py-1">
                              {item[c.key]}
                            </span>
                          ) : (
                            <span className="text-[var(--hp-ink-soft)]">{String(item[c.key] ?? '')}</span>
                          )}
                      </td>
                    ))}
                    <td className="p-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-[var(--hp-burgundy)] hover:text-[var(--hp-wine)] mr-3"
                        title="Edit"
                        data-testid={`${testidPrefix}-edit-${item.id}`}
                      >
                        <Pencil className="h-4 w-4 inline" />
                      </button>
                      <button
                        onClick={() => handleDelete(item)}
                        className="text-[var(--hp-hibiscus)] hover:text-[var(--hp-burgundy-deep)]"
                        title="Delete"
                        data-testid={`${testidPrefix}-delete-${item.id}`}
                      >
                        <Trash2 className="h-4 w-4 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Edit Drawer (modal) */}
        {editing && (
          <div className="fixed inset-0 z-50 flex items-stretch justify-end" data-testid={`${testidPrefix}-modal`}>
            <button
              className="absolute inset-0 bg-[var(--hp-ink)]/30"
              onClick={handleCancel}
              aria-label="Close"
            />
            <div className="relative w-full max-w-xl bg-[var(--hp-ivory)] border-l border-[var(--hp-line)] overflow-y-auto">
              <div className="sticky top-0 bg-[var(--hp-ivory)] border-b border-[var(--hp-line-soft)] px-8 py-5 flex items-center justify-between">
                <h2 className="text-2xl font-light text-[var(--hp-burgundy-deep)]">
                  {editing.__isNew ? 'New entry' : 'Edit entry'}
                </h2>
                <button onClick={handleCancel} className="text-[var(--hp-muted)] hover:text-[var(--hp-burgundy)]" data-testid={`${testidPrefix}-close-btn`}>
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="px-8 py-6 space-y-5">
                {fields.map((f) => {
                  const value = editing[f.key];
                  const displayValue = Array.isArray(value) ? value.join(', ') : (value ?? '');
                  if (f.type === 'textarea') {
                    return (
                      <div key={f.key}>
                        <label className="text-[11px] uppercase tracking-[0.18em] text-[var(--hp-muted)] mb-2 block">{f.label}</label>
                        <textarea
                          value={displayValue}
                          onChange={(e) => updateField(f.key, e.target.value)}
                          required={f.required}
                          placeholder={f.placeholder}
                          rows={f.rows || 5}
                          className="w-full bg-[var(--hp-cream)] border border-[var(--hp-line)] text-[var(--hp-ink)] rounded-none p-3 focus:border-[var(--hp-burgundy)] focus:outline-none resize-y"
                          data-testid={`${testidPrefix}-field-${f.key}`}
                        />
                      </div>
                    );
                  }
                  if (f.type === 'boolean') {
                    return (
                      <label key={f.key} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={!!value}
                          onChange={(e) => updateField(f.key, e.target.checked)}
                          className="h-4 w-4 accent-[var(--hp-burgundy)]"
                          data-testid={`${testidPrefix}-field-${f.key}`}
                        />
                        <span className="text-sm text-[var(--hp-ink-soft)]">{f.label}</span>
                      </label>
                    );
                  }
                  return (
                    <div key={f.key}>
                      <label className="text-[11px] uppercase tracking-[0.18em] text-[var(--hp-muted)] mb-2 block">
                        {f.label}{f.type === 'list' && <span className="ml-1 normal-case text-[10px] text-[var(--hp-muted)]">(comma separated)</span>}
                      </label>
                      <Input
                        type={f.type === 'image' ? 'url' : 'text'}
                        value={displayValue}
                        onChange={(e) => updateField(f.key, e.target.value)}
                        required={f.required}
                        placeholder={f.placeholder}
                        className="bg-[var(--hp-cream)] border-[var(--hp-line)] text-[var(--hp-ink)] rounded-none focus:border-[var(--hp-burgundy)] focus-visible:ring-0"
                        data-testid={`${testidPrefix}-field-${f.key}`}
                      />
                      {f.type === 'image' && value && (
                        <img src={value} alt="" className="mt-3 h-24 w-32 object-cover border border-[var(--hp-line)]" />
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="sticky bottom-0 bg-[var(--hp-ivory)] border-t border-[var(--hp-line-soft)] px-8 py-5 flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="border-[var(--hp-line)] text-[var(--hp-ink-soft)] rounded-none text-[11px] uppercase tracking-[0.18em] px-5 py-3 h-auto"
                  data-testid={`${testidPrefix}-cancel-btn`}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-[var(--hp-burgundy)] text-[var(--hp-ivory)] hover:bg-[var(--hp-wine)] rounded-none text-[11px] uppercase tracking-[0.2em] px-5 py-3 h-auto disabled:opacity-60"
                  data-testid={`${testidPrefix}-save-btn`}
                >
                  <Save className="h-4 w-4 mr-2" /> {saving ? 'Saving…' : 'Save'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminCrudPage;
