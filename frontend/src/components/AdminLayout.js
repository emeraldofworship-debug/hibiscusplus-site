import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, Leaf, ShoppingBag, BookOpen, ExternalLink, Mail, MessageSquare, KeyRound, Image as ImageIcon, Receipt, Bell } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLogo } from '../hooks/useLogo';

const NAV = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/recipes', label: 'Recipes', icon: Leaf },
  { to: '/admin/products', label: 'Products', icon: ShoppingBag },
  { to: '/admin/blog', label: 'Blog', icon: BookOpen },
  { to: '/admin/orders', label: 'Orders', icon: Receipt },
  { to: '/admin/notifications', label: 'Activity', icon: Bell },
  { to: '/admin/subscribers', label: 'Subscribers', icon: Mail },
  { to: '/admin/feedback', label: 'Feedback', icon: MessageSquare },
  { to: '/admin/branding', label: 'Branding', icon: ImageIcon },
];

export const AdminLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const logo = useLogo();

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-[var(--hp-cream)] text-[var(--hp-ink)] flex" data-testid="admin-layout">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[var(--hp-line-soft)] bg-[var(--hp-ivory)] flex flex-col" data-testid="admin-sidebar">
        <div className="p-6 border-b border-[var(--hp-line-soft)]">
          <Link to="/admin" className="flex items-center gap-3" data-testid="admin-logo">
            <img src={logo} alt="HibiscusPlus" className="h-10 w-auto" />
            <span className="text-[11px] uppercase tracking-[0.22em] text-[var(--hp-burgundy)]">Admin</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              data-testid={`admin-nav-${label.toLowerCase()}`}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 text-sm transition-colors duration-200 ${
                  isActive
                    ? 'bg-[var(--hp-burgundy)] text-[var(--hp-ivory)]'
                    : 'text-[var(--hp-ink-soft)] hover:bg-[var(--hp-blush)] hover:text-[var(--hp-burgundy)]'
                }`
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-[var(--hp-line-soft)] space-y-3">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--hp-muted)] hover:text-[var(--hp-burgundy)] transition-colors"
            data-testid="admin-view-site"
          >
            <ExternalLink className="h-3.5 w-3.5" /> View Site
          </Link>
          <div className="pt-3 border-t border-[var(--hp-line-soft)]">
            <p className="text-[11px] text-[var(--hp-muted)] mb-2 break-all">{user?.email}</p>
            <Link
              to="/admin/change-password"
              className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--hp-ink-soft)] hover:text-[var(--hp-burgundy)] transition-colors mb-2"
              data-testid="admin-change-password-link"
            >
              <KeyRound className="h-3.5 w-3.5" /> Change Password
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--hp-burgundy)] hover:text-[var(--hp-wine)] transition-colors"
              data-testid="admin-logout-btn"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto" data-testid="admin-main">
        <div className="max-w-6xl mx-auto px-8 py-10">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
