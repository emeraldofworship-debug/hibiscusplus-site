import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Toaster } from '../../components/ui/sonner';
import { toast } from 'sonner';
import { LogIn, Lock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { IMG } from '../../assets/images';

export default function AdminLogin() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // If already authenticated, bounce to dashboard (or the original target).
  useEffect(() => {
    if (user) {
      const dest = location.state?.from?.pathname || '/admin';
      navigate(dest, { replace: true });
    }
  }, [user, navigate, location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    const result = await login(email.trim(), password);
    setSubmitting(false);
    if (result.ok) {
      toast.success('Welcome back.');
      const dest = location.state?.from?.pathname || '/admin';
      navigate(dest, { replace: true });
    } else {
      setError(result.error || 'Login failed.');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--hp-cream)] text-[var(--hp-ink)] flex items-center justify-center px-6 py-12">
      <Toaster position="top-center" />
      <div className="grain-overlay" />

      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center mb-8" data-testid="admin-login-logo">
          <img src={IMG.logo} alt="HibiscusPlus" className="h-14 w-auto" />
        </Link>

        <div className="hp-card p-8 md:p-10" data-testid="admin-login-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 flex items-center justify-center border border-[var(--hp-burgundy)]/30 text-[var(--hp-burgundy)]">
              <Lock className="h-4 w-4" />
            </div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--hp-burgundy)]">Admin Access</p>
          </div>
          <h1 className="text-3xl md:text-4xl font-light mb-2 leading-tight">
            Sign in to your <span className="italic text-[var(--hp-burgundy)]">workspace.</span>
          </h1>
          <p className="text-sm text-[var(--hp-muted)] mb-8 font-light">
            Manage recipes, products, and blog posts for HibiscusPlus.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5" data-testid="admin-login-form">
            <div>
              <label className="text-[11px] uppercase tracking-[0.18em] text-[var(--hp-muted)] mb-2 block">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="admin@hibiscusplus.co.uk"
                className="bg-[var(--hp-ivory)] border-[var(--hp-line)] text-[var(--hp-ink)] rounded-none py-5 focus:border-[var(--hp-burgundy)] focus-visible:ring-0"
                data-testid="admin-login-email"
              />
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-[0.18em] text-[var(--hp-muted)] mb-2 block">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="bg-[var(--hp-ivory)] border-[var(--hp-line)] text-[var(--hp-ink)] rounded-none py-5 focus:border-[var(--hp-burgundy)] focus-visible:ring-0"
                data-testid="admin-login-password"
              />
            </div>

            {error && (
              <div className="text-sm text-[var(--hp-hibiscus)] border border-[var(--hp-hibiscus)]/30 bg-[var(--hp-blush)]/40 px-3 py-2" data-testid="admin-login-error">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-[var(--hp-burgundy)] text-[var(--hp-ivory)] hover:bg-[var(--hp-wine)] rounded-none text-[11px] uppercase tracking-[0.22em] py-6 disabled:opacity-60"
              data-testid="admin-login-submit"
            >
              <LogIn className="h-4 w-4 mr-2" />
              {submitting ? 'Signing in…' : 'Sign In'}
            </Button>
          </form>
        </div>

        <p className="text-center mt-6 text-[11px] text-[var(--hp-muted)] uppercase tracking-[0.22em]">
          <Link to="/" className="hover:text-[var(--hp-burgundy)] transition-colors">← Back to site</Link>
        </p>
      </div>
    </div>
  );
}
