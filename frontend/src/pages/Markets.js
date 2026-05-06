import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { ArrowRight, MapPin, Clock, Instagram } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { IMG } from '../assets/images';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } }
};

const LOCATIONS = [
  {
    name: 'Northern Quarter Sunday Market',
    address: 'Oak Street, Manchester M4 5JD',
    when: 'Every 2nd Sunday · 11:00 – 17:00',
    highlight: true,
  },
  {
    name: 'Bolton Makers Market',
    address: 'Newport Street, Bolton',
    when: 'Check socials for confirmed dates',
    highlight: true,
  },
  {
    name: 'Levenshulme Market',
    address: 'Stockport Road, Manchester',
    when: 'Selected Saturdays',
  },
  {
    name: 'Media City Quayside',
    address: 'Salford, Greater Manchester',
    when: 'Seasonal pop-ups',
  },
  {
    name: 'Ancoats General Store',
    address: 'Cutting Room Square, Manchester',
    when: 'Check socials',
  },
];

const MENU = [
  { name: 'Zobo', desc: 'Our signature hibiscus drink — hot or iced', fire: true },
  { name: 'Koko', desc: 'Spiced millet porridge that hugs your soul' },
  { name: 'Puff Puff', desc: 'Golden clouds of fried perfection' },
  { name: 'Akara', desc: 'Black-eyed bean fritters, grandma-approved' },
  { name: 'Samosa', desc: 'Crispy, spiced, dangerously moreish' },
  { name: 'Spring Rolls', desc: 'Crunchy, fresh, gone in seconds' },
];

const JUICE_FRUITS = ['Hibiscus', 'Pineapple', 'Watermelon', 'Mango', 'Carrots', 'Plum', 'Ginger', 'Sweet Melon'];

export default function Markets() {
  return (
    <div className="min-h-screen bg-[var(--hp-cream)] text-[var(--hp-ink)]">
      <div className="grain-overlay" />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 px-6 md:px-12 overflow-hidden" data-testid="markets-hero">
        <div className="absolute inset-0 -z-10">
          <img src={IMG.avifPouchBowl} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--hp-cream)]/60 via-[var(--hp-cream)]/85 to-[var(--hp-cream)]" />
        </div>
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--hp-burgundy)] mb-4">Weekly Market Stalls</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight max-w-3xl">
              Street Food. <span className="italic text-[var(--hp-burgundy)]">Soul Food.</span>
            </h1>
            <p className="mt-6 text-[var(--hp-ink-soft)] max-w-2xl font-light leading-relaxed">
              Every weekend we set up around Manchester & Bolton and serve food that makes strangers
              become friends. If the aroma doesn't pull you in, the queue will.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Platter Hero */}
      <section className="px-6 md:px-12 pb-16" data-testid="markets-platter">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="relative aspect-[21/9] overflow-hidden border border-[var(--hp-line)]">
            <img src={IMG.streetFoodPlatter} alt="HibiscusPlus street food platter" loading="lazy" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--hp-ink)]/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-[var(--hp-ivory)]">
              <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--hp-bronze-light)] mb-2">The Full Spread</p>
              <p className="text-xl md:text-2xl font-light">Puff Puff · Akara · Samosa · Spring Rolls</p>
              <p className="text-sm italic mt-1 opacity-85">"One bite and you'll rearrange your weekend plans."</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Locations */}
      <section className="px-6 md:px-12 pb-20" data-testid="markets-locations">
        <div className="max-w-7xl mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-3xl md:text-4xl font-light mb-10">
            Where to <span className="italic text-[var(--hp-burgundy)]">find us</span>.
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {LOCATIONS.map((loc, i) => (
              <motion.div
                key={loc.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={fadeUp}
                className={`hp-card p-7 flex flex-col gap-3 ${loc.highlight ? 'border-[var(--hp-burgundy)]/40' : ''}`}
                data-testid={`market-location-${i}`}
              >
                {loc.highlight && (
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--hp-burgundy)] self-start">Regular</span>
                )}
                <h3 className="text-xl text-[var(--hp-burgundy-deep)] leading-tight">{loc.name}</h3>
                <p className="text-sm text-[var(--hp-ink-soft)] font-light flex items-start gap-2">
                  <MapPin className="h-3.5 w-3.5 text-[var(--hp-bronze)] mt-1 shrink-0" />
                  <span>{loc.address}</span>
                </p>
                <p className="text-sm text-[var(--hp-muted)] font-light flex items-start gap-2">
                  <Clock className="h-3.5 w-3.5 text-[var(--hp-bronze)] mt-1 shrink-0" />
                  <span>{loc.when}</span>
                </p>
              </motion.div>
            ))}
          </div>

          <p className="mt-8 text-xs text-[var(--hp-muted)]">
            Markets partner: <a href="https://www.themakersmarket.co.uk" target="_blank" rel="noopener noreferrer" className="text-[var(--hp-burgundy)] hover:underline">The Makers Market →</a>
          </p>
        </div>
      </section>

      {/* Menu */}
      <section className="px-6 md:px-12 pb-20 bg-[var(--hp-cream-deep)]" data-testid="markets-menu">
        <div className="max-w-7xl mx-auto py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--hp-burgundy)] mb-4">Stall Menu</p>
              <h2 className="text-3xl md:text-4xl font-light mb-3">Six items. <span className="italic">Zero compromise.</span></h2>
              <p className="text-sm text-[var(--hp-muted)] italic mb-8">"We don't do boring. Every item is a conversation starter."</p>
              <div className="divide-y divide-[var(--hp-line-soft)]">
                {MENU.map(item => (
                  <div key={item.name} className="flex justify-between items-baseline gap-4 py-3">
                    <span className="text-lg text-[var(--hp-burgundy-deep)]">{item.name}{item.fire && <span className="ml-2 text-[var(--hp-hibiscus)]">♥</span>}</span>
                    <span className="text-xs text-[var(--hp-muted)] text-right max-w-[60%]">{item.desc}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="relative aspect-[4/5] overflow-hidden hp-ornament-frame">
              <img src={IMG.puffPuffZobo} alt="Puff Puff & Hot Zobo" loading="lazy" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Juices */}
      <section className="px-6 md:px-12 py-20" data-testid="markets-juices">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-10">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--hp-burgundy)] mb-4">Made to Order</p>
            <h2 className="text-3xl md:text-4xl font-light">Freshly <span className="italic">Juiced Fruits.</span></h2>
            <p className="mt-3 text-sm text-[var(--hp-muted)] italic">"Because your body deserves better than a vending machine."</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="relative aspect-[16/10] overflow-hidden border border-[var(--hp-line)]">
              <img src={IMG.juiceTrio} alt="HibiscusPlus juice trio" loading="lazy" className="w-full h-full object-cover" />
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="hp-card p-8 flex flex-col justify-between">
              <div>
                <p className="text-sm text-[var(--hp-ink-soft)] font-light leading-relaxed mb-6">
                  Cold-pressed, custom mixes, delivered collectively on a set day each week — announced every Sunday on our socials.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {JUICE_FRUITS.map(f => (
                    <span key={f} className="text-[11px] px-3 py-1 bg-[var(--hp-blush)] text-[var(--hp-burgundy-deep)] border border-[var(--hp-line-soft)]">{f}</span>
                  ))}
                </div>
                <p className="text-xs text-[var(--hp-muted)]">Seasonal availability · Mix to your taste · Manchester & Bolton</p>
              </div>
              <div className="mt-6 pt-5 border-t border-[var(--hp-line-soft)]">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--hp-burgundy)] mb-3">Follow weekly announcements</p>
                <a href="https://www.instagram.com/hibiscusplus_ltd" target="_blank" rel="noopener noreferrer"
                  className="text-sm text-[var(--hp-ink-soft)] hover:text-[var(--hp-burgundy)] flex items-center gap-2">
                  <Instagram className="h-4 w-4" /> @hibiscusplus_ltd
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Christmas Teaser */}
      <section className="px-6 md:px-12 py-20 bg-gradient-to-b from-[var(--hp-blush)] to-[var(--hp-cream)]" data-testid="markets-xmas">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--hp-burgundy)] mb-3">Coming This Winter</p>
          <h2 className="text-3xl md:text-4xl font-light mb-4">Manchester <span className="italic">Christmas Markets</span> 2025</h2>
          <p className="text-[var(--hp-ink-soft)] font-light max-w-xl mx-auto mb-2">
            Hot Zobo under the fairy lights. Puff Puff in your mittens. Nigerian spice warming your soul while Mariah plays for the 47th time. We're coming.
          </p>
          <p className="text-xs text-[var(--hp-muted)] mb-8">7th November – 22nd December 2025 · Albert Square, Cathedral Gardens & more</p>
          <a href="https://www.instagram.com/hibiscusplus_ltd" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="border-[var(--hp-burgundy)]/40 text-[var(--hp-burgundy)] hover:bg-[var(--hp-burgundy)]/5 rounded-none text-[11px] uppercase tracking-[0.18em] px-7 py-5" data-testid="xmas-follow-btn">
              Follow for Updates <ArrowRight className="ml-2 h-3.5 w-3.5" />
            </Button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
