import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Instagram, MapPin } from 'lucide-react';
import { useLogo } from '../hooks/useLogo';

export const Footer = () => {
  const logo = useLogo();
  return (
  <footer className="border-t border-[var(--hp-line-soft)] bg-[var(--hp-cream-deep)] pt-16 md:pt-24 pb-10 px-6 md:px-12" data-testid="footer">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-14">
        <div className="md:col-span-2">
          <img src={logo} alt="HibiscusPlus" className="h-16 w-auto mb-6" data-testid="footer-logo" />
          <p className="text-sm text-[var(--hp-muted)] leading-relaxed max-w-sm font-light">
            Premium artisanal hibiscus tea blends and authentic Nigerian street food,
            hand-crafted in Manchester for those who demand excellence in every cup.
          </p>
          <p className="mt-5 text-[11px] uppercase tracking-[0.24em] text-[var(--hp-bronze)] italic">
            Boldly Spiced &middot; Beautifully Balanced
          </p>
        </div>

        <div>
          <h4 className="text-[11px] uppercase tracking-[0.24em] text-[var(--hp-burgundy)] mb-5">Contact</h4>
          <ul className="space-y-3 text-sm text-[var(--hp-ink-soft)]">
            <li className="flex items-start gap-2">
              <Mail className="h-3.5 w-3.5 text-[var(--hp-bronze)] mt-1 shrink-0" />
              <a href="mailto:emeraldofworship@hibiscusplus.co.uk" className="hover:text-[var(--hp-burgundy)] transition-colors break-all">
                emeraldofworship@hibiscusplus.co.uk
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-[var(--hp-bronze)]" />
              <a href="tel:07508597742" className="hover:text-[var(--hp-burgundy)] transition-colors">07508 597742</a>
            </li>
            <li className="flex items-center gap-2">
              <Instagram className="h-3.5 w-3.5 text-[var(--hp-bronze)]" />
              <a href="https://www.instagram.com/hibiscusplus_ltd" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--hp-burgundy)] transition-colors">@hibiscusplus_ltd</a>
            </li>
            <li className="flex items-center gap-2">
              <svg className="h-3.5 w-3.5 text-[var(--hp-bronze)]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
              <a href="https://www.tiktok.com/@hibiscusplus" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--hp-burgundy)] transition-colors">@hibiscusplus</a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="h-3.5 w-3.5 text-[var(--hp-bronze)] mt-1" />
              <span>Manchester, UK</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] uppercase tracking-[0.24em] text-[var(--hp-burgundy)] mb-5">Navigate</h4>
          <ul className="space-y-3 text-sm text-[var(--hp-ink-soft)]">
            <li><Link to="/" className="hover:text-[var(--hp-burgundy)] transition-colors">Home</Link></li>
            <li><Link to="/recipes" className="hover:text-[var(--hp-burgundy)] transition-colors">Recipes</Link></li>
            <li><Link to="/markets" className="hover:text-[var(--hp-burgundy)] transition-colors">Market Stalls</Link></li>
            <li><Link to="/breakfast" className="hover:text-[var(--hp-burgundy)] transition-colors">Breakfast Menu</Link></li>
            <li><Link to="/blog" className="hover:text-[var(--hp-burgundy)] transition-colors">Blog</Link></li>
            <li><Link to="/feedback" className="hover:text-[var(--hp-burgundy)] transition-colors">Events & Feedback</Link></li>
          </ul>
        </div>
      </div>

      <div className="pt-6 border-t border-[var(--hp-line-soft)] flex flex-col md:flex-row justify-between items-center gap-3">
        <p className="text-[11px] text-[var(--hp-muted)]">
          &copy; 2025 HIBISCUSPLUS LIMITED. All rights reserved. Company No. 17024055
        </p>
        <p className="text-[11px] text-[var(--hp-muted)] italic tracking-wide">
          Handcrafted in Manchester
        </p>
      </div>
    </div>
  </footer>
  );
};

export default Footer;
