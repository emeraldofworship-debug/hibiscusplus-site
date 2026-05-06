import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { ShoppingBag, Menu, X } from 'lucide-react';

const LOGO_URL = "https://customer-assets.emergentagent.com/job_a32939dc-1aea-4860-99bb-b62686aca83e/artifacts/eei6kk0o_HibiscuPlus_20260227_093727_0000%20%283%29%20%281%29.png";

const NAV_LINKS = [
  { label: 'Shop', to: '/#shop' },
  { label: 'Recipes', to: '/recipes' },
  { label: 'Markets', to: '/markets' },
  { label: 'Breakfast', to: '/breakfast' },
  { label: 'Blog', to: '/blog' },
  { label: 'About', to: '/#about' },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[var(--hp-cream)]/90 backdrop-blur-xl border-b border-[var(--hp-line-soft)]' : 'bg-transparent'
      }`}
      data-testid="main-nav"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-3 md:py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center shrink-0" data-testid="nav-logo-link">
          <img src={LOGO_URL} alt="HibiscusPlus" className="h-11 md:h-12 w-auto" data-testid="header-logo" />
        </Link>

        <div className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map(link => (
            link.to.startsWith('/#') ? (
              <a
                key={link.label}
                href={link.to}
                className="text-[11px] uppercase tracking-[0.22em] text-[var(--hp-ink-soft)] hover:text-[var(--hp-burgundy)] transition-colors duration-300"
                data-testid={`nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </a>
            ) : (
              <NavLink
                key={link.label}
                to={link.to}
                className={({ isActive }) =>
                  `text-[11px] uppercase tracking-[0.22em] transition-colors duration-300 ${
                    isActive ? 'text-[var(--hp-burgundy)]' : 'text-[var(--hp-ink-soft)] hover:text-[var(--hp-burgundy)]'
                  }`
                }
                data-testid={`nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </NavLink>
            )
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://admin.shopify.com/store/hibiscusplus-limited"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex"
          >
            <Button
              className="bg-[var(--hp-burgundy)] text-[var(--hp-ivory)] hover:bg-[var(--hp-wine)] text-[11px] uppercase tracking-[0.18em] rounded-none px-5 py-2 h-auto"
              data-testid="shop-now-btn"
            >
              <ShoppingBag className="h-3.5 w-3.5 mr-2" />
              Shop
            </Button>
          </a>
          <button
            className="lg:hidden p-2 text-[var(--hp-burgundy)]"
            onClick={() => setOpen(v => !v)}
            aria-label="Toggle menu"
            data-testid="mobile-menu-toggle"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-[var(--hp-ivory)] border-t border-[var(--hp-line-soft)] px-6 py-6 flex flex-col gap-4" data-testid="mobile-menu">
          {NAV_LINKS.map(link => (
            link.to.startsWith('/#') ? (
              <a key={link.label} href={link.to} className="text-sm uppercase tracking-[0.18em] text-[var(--hp-ink-soft)]">{link.label}</a>
            ) : (
              <Link key={link.label} to={link.to} className="text-sm uppercase tracking-[0.18em] text-[var(--hp-ink-soft)]">{link.label}</Link>
            )
          ))}
          <Link to="/feedback" className="text-sm uppercase tracking-[0.18em] text-[var(--hp-burgundy)]">Events & Feedback</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
