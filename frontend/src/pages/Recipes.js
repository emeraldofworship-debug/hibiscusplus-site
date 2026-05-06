import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ArrowRight, Clock, Leaf, Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { IMG } from '../assets/images';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } }
};

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/recipes`);
        setRecipes(res.data.data || []);
      } catch (err) {
        console.error('Error fetching recipes:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const categories = useMemo(() => {
    const set = new Set(recipes.map(r => r.category).filter(Boolean));
    return ['All', ...Array.from(set)];
  }, [recipes]);

  const filtered = useMemo(() => {
    return recipes.filter(r => {
      const matchesCat = activeCategory === 'All' || r.category === activeCategory;
      const q = query.trim().toLowerCase();
      const matchesQ = !q ||
        (r.name || '').toLowerCase().includes(q) ||
        (r.category || '').toLowerCase().includes(q) ||
        (r.ingredients || []).join(' ').toLowerCase().includes(q);
      return matchesCat && matchesQ;
    });
  }, [recipes, activeCategory, query]);

  return (
    <div className="min-h-screen bg-[var(--hp-cream)] text-[var(--hp-ink)]">
      <div className="grain-overlay" />
      <Navbar />

      {/* Page Hero */}
      <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 px-6 md:px-12 overflow-hidden" data-testid="recipes-hero">
        <div className="absolute inset-0 -z-10">
          <img src={IMG.avifRedPitcher} alt="" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--hp-cream)]/60 via-[var(--hp-cream)]/85 to-[var(--hp-cream)]" />
        </div>
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--hp-burgundy)] mb-4">
              The Recipe Journal
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight max-w-3xl">
              Research-backed <span className="italic text-[var(--hp-burgundy)]">Zobo &amp; Hibiscus</span> rituals for modern wellness.
            </h1>
            <p className="mt-6 text-[var(--hp-ink-soft)] max-w-2xl font-light leading-relaxed">
              Twelve hand-crafted recipes rooted in Nigerian heritage and tuned with peer-reviewed nutrition science.
              Every pour is a ritual, every sip a small act of self-care.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="px-6 md:px-12 pb-10" data-testid="recipes-filters">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10 border-y border-[var(--hp-line-soft)] py-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--hp-muted)]" />
              <Input
                type="text"
                placeholder="Search recipes, ingredients, benefits…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 bg-[var(--hp-ivory)] border-[var(--hp-line)] rounded-none py-5 text-sm focus-visible:ring-0 focus:border-[var(--hp-burgundy)]"
                data-testid="recipes-search"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  data-testid={`recipes-filter-${cat.replace(/\s+/g, '-').toLowerCase()}`}
                  className={`text-[11px] uppercase tracking-[0.18em] px-4 py-2 border transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-[var(--hp-burgundy)] text-[var(--hp-ivory)] border-[var(--hp-burgundy)]'
                      : 'bg-transparent text-[var(--hp-ink-soft)] border-[var(--hp-line)] hover:border-[var(--hp-burgundy)]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recipe Grid */}
      <section className="px-6 md:px-12 pb-24 md:pb-32" data-testid="recipes-grid-section">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <p className="text-center text-[var(--hp-muted)] py-12">Brewing the list…</p>
          ) : filtered.length === 0 ? (
            <p className="text-center text-[var(--hp-muted)] py-12" data-testid="recipes-empty">
              No recipes match that search. Try a different keyword.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((recipe, idx) => (
                <motion.article
                  key={recipe.id || idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  variants={fadeUp}
                  className="hp-card group overflow-hidden flex flex-col"
                  data-testid={`recipe-card-${recipe.id}`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[var(--hp-blush)]">
                    <img
                      src={recipe.image || IMG.avifAmberTea}
                      alt={recipe.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {recipe.beetroot_included && (
                      <span className="absolute top-3 left-3 text-[10px] uppercase tracking-[0.18em] bg-[var(--hp-burgundy)] text-[var(--hp-ivory)] px-2 py-1">
                        + Beetroot
                      </span>
                    )}
                    <span className="absolute top-3 right-3 text-[10px] uppercase tracking-[0.18em] bg-[var(--hp-ivory)]/90 text-[var(--hp-burgundy)] px-2 py-1 border border-[var(--hp-line)]">
                      {recipe.category}
                    </span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl md:text-2xl font-medium text-[var(--hp-burgundy-deep)] mb-2 leading-tight">
                      {recipe.name}
                    </h3>
                    {recipe.prep_time && (
                      <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--hp-bronze)] flex items-center gap-2 mb-4">
                        <Clock className="h-3 w-3" /> {recipe.prep_time}
                      </p>
                    )}
                    {recipe.ingredients && recipe.ingredients.length > 0 && (
                      <div className="mb-4">
                        <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--hp-muted)] mb-2">Key Ingredients</p>
                        <ul className="space-y-1">
                          {recipe.ingredients.slice(0, 4).map((ing, i) => (
                            <li key={i} className="text-sm text-[var(--hp-ink-soft)] font-light flex gap-2">
                              <Leaf className="h-3 w-3 mt-1 text-[var(--hp-bronze)] shrink-0" />
                              <span>{ing}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {(() => {
                      const raw = recipe.benefits;
                      const list = Array.isArray(raw)
                        ? raw
                        : typeof raw === 'string' ? raw.split(',').map(s => s.trim()).filter(Boolean) : [];
                      if (list.length === 0) return null;
                      return (
                        <div className="mt-auto pt-4 border-t border-[var(--hp-line-soft)]">
                          <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--hp-burgundy)] mb-2">Benefits</p>
                          <div className="flex flex-wrap gap-1.5">
                            {list.slice(0, 3).map((b, i) => (
                              <span key={i} className="text-[11px] px-2 py-0.5 bg-[var(--hp-blush)] text-[var(--hp-burgundy-deep)]">
                                {b}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 pb-24">
        <div className="max-w-4xl mx-auto text-center border border-[var(--hp-burgundy)]/20 bg-[var(--hp-blush)]/50 p-10 md:p-16">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--hp-burgundy)] mb-4">Want the Blends?</p>
          <h2 className="text-3xl md:text-4xl font-light mb-4">
            Skip the kitchen. <span className="italic">Steep the HibiscusPlus way.</span>
          </h2>
          <p className="text-[var(--hp-ink-soft)] font-light mb-8 max-w-xl mx-auto">
            Our three signature blends arrive pre-measured, vacuum-fresh, and ready for your kettle.
          </p>
          <Link to="/#shop">
            <Button className="bg-[var(--hp-burgundy)] text-[var(--hp-ivory)] hover:bg-[var(--hp-wine)] rounded-none text-xs uppercase tracking-[0.18em] px-8 py-5" data-testid="recipes-shop-cta">
              Explore the Collection <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
