import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Toaster } from '../components/ui/sonner';
import { toast } from 'sonner';
import { ArrowRight, Search, Calendar, Clock } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { IMG } from '../assets/images';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } }
};

const formatDate = (iso) => {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch { return ''; }
};

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/blog`);
        setPosts(res.data.data || []);
      } catch (err) {
        console.error('Error fetching blog:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const categories = useMemo(() => {
    const set = new Set(posts.map(p => p.category).filter(Boolean));
    return ['All', ...Array.from(set)];
  }, [posts]);

  const filtered = useMemo(() => {
    return posts.filter(p => {
      const matchesCat = category === 'All' || p.category === category;
      const q = query.trim().toLowerCase();
      const matchesQ = !q ||
        (p.title || '').toLowerCase().includes(q) ||
        (p.excerpt || p.summary || '').toLowerCase().includes(q) ||
        (p.category || '').toLowerCase().includes(q);
      return matchesCat && matchesQ;
    });
  }, [posts, category, query]);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/newsletter/subscribe`, { email, interest: 'blog' });
      toast.success('Welcome to the inner circle.');
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
      <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 px-6 md:px-12 overflow-hidden" data-testid="blog-hero">
        <div className="absolute inset-0 -z-10">
          <img src={IMG.avifTeaByWindow} alt="" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--hp-cream)]/60 via-[var(--hp-cream)]/85 to-[var(--hp-cream)]" />
        </div>
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--hp-burgundy)] mb-4">The HibiscusPlus Journal</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight max-w-3xl">
              Stories from the <span className="italic text-[var(--hp-burgundy)]">steeping pot.</span>
            </h1>
            <p className="mt-6 text-[var(--hp-ink-soft)] max-w-2xl font-light leading-relaxed">
              History, science, and ritual behind our blends. Written with care, brewed with intention.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="px-6 md:px-12 pb-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10 border-y border-[var(--hp-line-soft)] py-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--hp-muted)]" />
              <Input
                type="text"
                placeholder="Search articles…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 bg-[var(--hp-ivory)] border-[var(--hp-line)] rounded-none py-5 text-sm focus-visible:ring-0 focus:border-[var(--hp-burgundy)]"
                data-testid="blog-search"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(c => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  data-testid={`blog-filter-${c.replace(/\s+/g, '-').toLowerCase()}`}
                  className={`text-[11px] uppercase tracking-[0.18em] px-4 py-2 border transition-all duration-300 ${
                    category === c
                      ? 'bg-[var(--hp-burgundy)] text-[var(--hp-ivory)] border-[var(--hp-burgundy)]'
                      : 'bg-transparent text-[var(--hp-ink-soft)] border-[var(--hp-line)] hover:border-[var(--hp-burgundy)]'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured + Grid */}
      <section className="px-6 md:px-12 pb-20 md:pb-28" data-testid="blog-grid-section">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <p className="text-center text-[var(--hp-muted)] py-12">Turning pages…</p>
          ) : filtered.length === 0 ? (
            <p className="text-center text-[var(--hp-muted)] py-12" data-testid="blog-empty">No articles match that search yet.</p>
          ) : (
            <>
              {featured && (
                <motion.article
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="hp-card grid grid-cols-1 lg:grid-cols-2 overflow-hidden mb-10"
                  data-testid={`blog-featured-${featured.id}`}
                >
                  <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden bg-[var(--hp-blush)]">
                    <img src={featured.image || IMG.avifMugPetals} alt={featured.title} loading="lazy" className="w-full h-full object-cover" />
                    <span className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.18em] bg-[var(--hp-burgundy)] text-[var(--hp-ivory)] px-2 py-1">Featured</span>
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--hp-bronze)] mb-3">{featured.category}</p>
                    <h2 className="text-3xl md:text-4xl font-light mb-4 leading-tight text-[var(--hp-burgundy-deep)]">{featured.title}</h2>
                    <p className="text-[var(--hp-ink-soft)] font-light leading-relaxed mb-6">
                      {featured.excerpt || featured.summary}
                    </p>
                    <div className="flex items-center gap-5 text-xs text-[var(--hp-muted)] mb-6">
                      {featured.author && <span>{featured.author}</span>}
                      {featured.date && <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{formatDate(featured.date)}</span>}
                      {featured.read_time && <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{featured.read_time}</span>}
                    </div>
                  </div>
                </motion.article>
              )}

              {rest.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((post) => (
                    <motion.article
                      key={post.id}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: '-60px' }}
                      variants={fadeUp}
                      className="hp-card group overflow-hidden flex flex-col"
                      data-testid={`blog-card-${post.id}`}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--hp-blush)]">
                        <img src={post.image || IMG.avifAmberTea} alt={post.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <span className="absolute top-3 left-3 text-[10px] uppercase tracking-[0.18em] bg-[var(--hp-ivory)]/90 text-[var(--hp-burgundy)] px-2 py-1 border border-[var(--hp-line)]">
                          {post.category}
                        </span>
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-xl font-medium text-[var(--hp-burgundy-deep)] mb-3 leading-tight">{post.title}</h3>
                        <p className="text-sm text-[var(--hp-ink-soft)] font-light leading-relaxed mb-5 line-clamp-3">
                          {post.excerpt || post.summary}
                        </p>
                        <div className="mt-auto pt-4 border-t border-[var(--hp-line-soft)] flex items-center justify-between text-[11px] text-[var(--hp-muted)]">
                          <span>{formatDate(post.date)}</span>
                          {post.read_time && <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.read_time}</span>}
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="px-6 md:px-12 pb-24" data-testid="blog-newsletter">
        <div className="max-w-3xl mx-auto text-center border border-[var(--hp-burgundy)]/20 bg-[var(--hp-blush)]/50 p-10 md:p-14">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--hp-burgundy)] mb-3">Stay Informed</p>
          <h2 className="text-3xl md:text-4xl font-light mb-4">Never miss a <span className="italic">new story.</span></h2>
          <p className="text-[var(--hp-ink-soft)] font-light mb-8 max-w-xl mx-auto">
            Fresh articles, new blends, and secret market dates — straight to your inbox.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              required
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[var(--hp-ivory)] border-[var(--hp-line)] rounded-none py-5 flex-1 focus:border-[var(--hp-burgundy)] focus-visible:ring-0"
              data-testid="blog-newsletter-email"
            />
            <Button type="submit" className="bg-[var(--hp-burgundy)] text-[var(--hp-ivory)] hover:bg-[var(--hp-wine)] rounded-none text-[11px] uppercase tracking-[0.18em] px-7 py-5" data-testid="blog-newsletter-submit">
              Subscribe
            </Button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
