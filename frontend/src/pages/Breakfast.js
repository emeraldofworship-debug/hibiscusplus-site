import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Toaster } from '../components/ui/sonner';
import { toast } from 'sonner';
import { ArrowRight, Clock, Utensils, Flame } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { IMG } from '../assets/images';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } }
};

const DISHES = [
  {
    name: 'Koko & Akara',
    tagline: 'The soul-warming classic',
    desc: 'Spiced millet porridge served with golden black-eyed bean fritters. Breakfast the way grandma taught.',
    image: IMG.breakfastPlate,
  },
  {
    name: 'Puff Puff & Hot Zobo',
    tagline: 'The Sunday ritual',
    desc: 'Pillowy fried dough paired with a steaming cup of our signature spiced hibiscus tea.',
    image: IMG.puffPuffZobo,
  },
  {
    name: 'Fresh Juice Flight',
    tagline: 'Liquid sunshine',
    desc: 'A trio of cold-pressed blends — hibiscus, tropical, and a chef\'s choice seasonal selection.',
    image: IMG.juiceTrio,
  },
];

const WHY = [
  { icon: Flame, title: 'Bold Flavours', copy: 'Every dish leans into the spice, salt, and warmth that make Nigerian food unforgettable.' },
  { icon: Utensils, title: 'Traditionally Made', copy: 'Hand-kneaded, hand-fried, hand-plated. No shortcuts — only the slow path of real cooking.' },
  { icon: Clock, title: 'Served at Sunrise', copy: 'Arrive while the kettle still sings. Our best items sell out by mid-morning.' },
];

export default function Breakfast() {
  const [email, setEmail] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/newsletter/subscribe`, { email, interest: 'nigerian_breakfast' });
      toast.success("You're on the list. We'll email you first about breakfast events.");
      setEmail('');
    } catch {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--hp-cream)] text-[var(--hp-ink)]">
      <Toaster position="top-center" />
      <div className="grain-overlay" />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 px-6 md:px-12 overflow-hidden" data-testid="breakfast-hero">
        <div className="absolute inset-0 -z-10">
          <img src={IMG.avifAmberTea} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--hp-cream)]/60 via-[var(--hp-cream)]/85 to-[var(--hp-cream)]" />
        </div>
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--hp-burgundy)] mb-4">Premium Nigerian Breakfast</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight max-w-3xl">
              Breakfast so good, <span className="italic text-[var(--hp-burgundy)]">lunch gets jealous.</span>
            </h1>
            <p className="mt-6 text-[var(--hp-ink-soft)] max-w-2xl font-light leading-relaxed">
              A curated Nigerian breakfast experience available at our weekend stalls across Manchester and Bolton.
              Traditional recipes, premium ingredients, and a side of nostalgia.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Signature Plate */}
      <section className="px-6 md:px-12 pb-16" data-testid="breakfast-signature">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="relative aspect-[4/5] overflow-hidden hp-ornament-frame">
              <img src={IMG.breakfastPlate} alt="Premium Nigerian breakfast" loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--hp-bronze)] mb-4">The Signature Plate</p>
              <h2 className="text-3xl md:text-4xl font-light mb-5 leading-tight">
                Koko, Akara, and a tall glass of <span className="italic text-[var(--hp-burgundy)]">Hot Zobo.</span>
              </h2>
              <p className="text-[var(--hp-ink-soft)] font-light leading-relaxed mb-4">
                Our signature breakfast plate starts with spiced millet porridge (koko) — simmered slowly with cloves,
                ginger and a whisper of nutmeg. We serve it alongside crispy black-eyed bean fritters (akara) and
                finish with a steaming cup of our flagship hibiscus blend.
              </p>
              <p className="text-[var(--hp-ink-soft)] font-light leading-relaxed">
                Every plate is made-to-order. No heat lamps, no shortcuts, no apologies.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Dishes grid */}
      <section className="px-6 md:px-12 py-16 bg-[var(--hp-cream-deep)]" data-testid="breakfast-dishes">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-10">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--hp-burgundy)] mb-3">The Menu</p>
            <h2 className="text-3xl md:text-4xl font-light">Three plates, <span className="italic">countless memories.</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DISHES.map((d, i) => (
              <motion.div
                key={d.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={fadeUp}
                className="hp-card overflow-hidden flex flex-col"
                data-testid={`breakfast-dish-${i}`}
              >
                <div className="aspect-[4/3] overflow-hidden bg-[var(--hp-blush)]">
                  <img src={d.image} alt={d.name} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div className="p-7 flex-1">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--hp-bronze)] mb-2">{d.tagline}</p>
                  <h3 className="text-xl text-[var(--hp-burgundy-deep)] mb-3">{d.name}</h3>
                  <p className="text-sm text-[var(--hp-ink-soft)] font-light leading-relaxed">{d.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="px-6 md:px-12 py-20" data-testid="breakfast-why">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {WHY.map((w) => (
              <motion.div
                key={w.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="p-8 border border-[var(--hp-line)] bg-[var(--hp-ivory)]"
              >
                <div className="w-10 h-10 flex items-center justify-center border border-[var(--hp-burgundy)]/30 text-[var(--hp-burgundy)] mb-5">
                  <w.icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl text-[var(--hp-burgundy-deep)] mb-3">{w.title}</h3>
                <p className="text-sm text-[var(--hp-ink-soft)] font-light leading-relaxed">{w.copy}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Signup */}
      <section className="px-6 md:px-12 pb-24" data-testid="breakfast-signup-section">
        <div className="max-w-3xl mx-auto text-center border border-[var(--hp-burgundy)]/20 bg-[var(--hp-blush)]/50 p-10 md:p-14">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--hp-burgundy)] mb-3">Register Your Interest</p>
          <h2 className="text-3xl md:text-4xl font-light mb-4">Want the full <span className="italic">breakfast experience?</span></h2>
          <p className="text-[var(--hp-ink-soft)] font-light mb-8 max-w-xl mx-auto">
            We're building something special — dedicated breakfast events and delivery. Sign up to be first in line.
          </p>
          <form onSubmit={handleSignup} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="bg-[var(--hp-ivory)] border-[var(--hp-line)] rounded-none py-5 flex-1 focus:border-[var(--hp-burgundy)] focus-visible:ring-0"
              data-testid="breakfast-email"
            />
            <Button type="submit" className="bg-[var(--hp-burgundy)] text-[var(--hp-ivory)] hover:bg-[var(--hp-wine)] rounded-none text-[11px] uppercase tracking-[0.18em] px-7 py-5" data-testid="breakfast-signup-btn">
              Count Me In <ArrowRight className="ml-2 h-3.5 w-3.5" />
            </Button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
