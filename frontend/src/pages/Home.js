import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Toaster } from '../components/ui/sonner';
import { toast } from 'sonner';
import { ShoppingBag, ArrowRight, Leaf, Coffee, Utensils, Sparkles } from 'lucide-react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { IMG } from '../assets/images';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
};
const stagger = { visible: { transition: { staggerChildren: 0.15 } } };

const products = [
  {
    id: 'metabo-ignite',
    name: 'Metabo Ignite',
    subtitle: 'Metabolism Support',
    ingredients: ['Hibiscus', 'Green Tea', 'Ginger', 'Cinnamon', 'Clove'],
    description: 'A precision blend that fires up metabolic rate. Catechins, ginger compounds and hibiscus anthocyanins support fat oxidation and thermogenesis.',
    image: 'https://static.prod-images.emergentagent.com/jobs/a32939dc-1aea-4860-99bb-b62686aca83e/images/bc8a711ee5074f915fe80696ea622a4ffa40d8ede2bb21500c2c86c015eb253c.png',
  },
  {
    id: 'bloom-flush',
    name: 'Bloom & Flush',
    subtitle: 'Digestive Detox',
    ingredients: ['Hibiscus', 'Dandelion', 'Fennel', 'Peppermint', 'Ginger'],
    description: 'A gentle yet powerful digestive companion. Dandelion stimulates bile, fennel soothes bloating, peppermint relaxes the GI tract.',
    image: 'https://static.prod-images.emergentagent.com/jobs/a32939dc-1aea-4860-99bb-b62686aca83e/images/1d23b7c55108024ac2a29b010ba9e3dcb206d38e881c56b8d5dd494f75dfe741.png',
  },
  {
    id: 'glucose-guard',
    name: 'Glucose Guard',
    subtitle: 'Crave Control',
    ingredients: ['Hibiscus', 'Cinnamon', 'Chicory', 'Liquorice', 'Clove'],
    description: 'Engineered for blood sugar stability. Cinnamon improves insulin sensitivity, chicory provides prebiotic inulin, liquorice satisfies cravings.',
    image: 'https://static.prod-images.emergentagent.com/jobs/a32939dc-1aea-4860-99bb-b62686aca83e/images/05553693a6931f0d2a90e1ad3563af96db340d1bdb4df1c5a66cebecb5cfb13b.png',
  }
];

const EXPLORE = [
  {
    title: 'Recipes',
    copy: 'Twelve research-backed Zobo rituals for modern wellness.',
    image: IMG.avifRedPitcher,
    to: '/recipes',
    icon: Leaf,
    testid: 'explore-recipes'
  },
  {
    title: 'Market Stalls',
    copy: 'Find us across Manchester & Bolton every weekend.',
    image: IMG.avifPouchBowl,
    to: '/markets',
    icon: Coffee,
    testid: 'explore-markets'
  },
  {
    title: 'Nigerian Breakfast',
    copy: 'Koko, akara and hot Zobo. Breakfast that hugs your soul.',
    image: IMG.breakfastPlate,
    to: '/breakfast',
    icon: Utensils,
    testid: 'explore-breakfast'
  },
  {
    title: 'Journal',
    copy: 'Stories from the steeping pot — history, science, ritual.',
    image: IMG.avifMugPetals,
    to: '/blog',
    icon: Sparkles,
    testid: 'explore-blog'
  }
];

export default function Home() {
  const [email, setEmail] = useState('');
  const [recipeCount, setRecipeCount] = useState(0);

  useEffect(() => {
    axios.get(`${API_URL}/api/recipes`)
      .then(res => setRecipeCount((res.data.data || []).length))
      .catch(err => console.error('Error fetching recipes:', err));
  }, []);

  const handleNewsletter = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/newsletter/subscribe`, { email });
      toast.success('Welcome to the HibiscusPlus circle.');
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
      <section className="relative min-h-[92vh] flex items-center overflow-hidden px-6 md:px-12" data-testid="hero-section">
        <div className="absolute inset-0 -z-10">
          <img src={IMG.avifTeaByWindow} alt="" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--hp-cream)] via-[var(--hp-cream)]/80 to-[var(--hp-blush)]/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--hp-cream)]" />
        </div>

        <div className="relative max-w-7xl mx-auto w-full pt-24 md:pt-28 pb-12 flex flex-col items-center">
          {/* Hero brand logo — first thing visitors see */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="w-full flex justify-center mb-10 md:mb-14"
            data-testid="hero-brand-logo-wrap"
          >
            <img
              src={IMG.logo}
              alt="HibiscusPlus Limited — Boldly Spiced, Beautifully Balanced"
              className="h-48 sm:h-64 md:h-80 lg:h-[22rem] w-auto object-contain drop-shadow-[0_18px_40px_rgba(99,30,45,0.35)]"
              data-testid="hero-brand-logo"
            />
          </motion.div>

          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <motion.div className="lg:col-span-7" initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeUp} className="text-[11px] uppercase tracking-[0.32em] text-[var(--hp-burgundy)] mb-5">
              Artisanal Wellness · Manchester, UK
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light leading-[0.95]">
              Boldly Spiced.
              <br />
              <span className="italic text-[var(--hp-burgundy)]">Beautifully Balanced.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-8 text-base md:text-lg text-[var(--hp-ink-soft)] max-w-2xl leading-relaxed font-light">
              Hand-crafted hibiscus tea blends and authentic Nigerian street food,
              formulated with precision for those who know life's too short for average flavours.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10 flex flex-col sm:flex-row gap-4">
              <a href="#shop">
                <Button className="bg-[var(--hp-burgundy)] text-[var(--hp-ivory)] hover:bg-[var(--hp-wine)] rounded-none px-10 py-6 text-sm uppercase tracking-[0.18em] font-medium" data-testid="hero-shop-btn">
                  Explore Tea Blends <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <Link to="/shop">
                <Button variant="outline" className="border-[var(--hp-burgundy)]/40 text-[var(--hp-burgundy)] hover:bg-[var(--hp-burgundy)]/5 rounded-none px-10 py-6 text-sm uppercase tracking-[0.18em] font-medium" data-testid="hero-recipes-btn">
                  Order Snacks
                </Button>
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-14 flex flex-wrap gap-x-10 gap-y-5 text-xs uppercase tracking-[0.22em] text-[var(--hp-muted)]">
              <span>Three signature blends</span>
              <span className="hidden sm:inline">·</span>
              <span>{recipeCount > 0 ? `${recipeCount} recipes` : 'Research-backed recipes'}</span>
              <span className="hidden sm:inline">·</span>
              <span>Weekly market stalls</span>
            </motion.div>
          </motion.div>

          <motion.div
            className="hidden lg:block lg:col-span-5"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="relative hp-ornament-frame aspect-[4/5] overflow-hidden">
              <img src={IMG.avifMugPetals} alt="HibiscusPlus mug with petals" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-px h-14 bg-gradient-to-b from-[var(--hp-burgundy)] to-transparent" />
        </motion.div>
      </section>

      {/* Shop */}
      <section id="shop" className="py-24 md:py-32 px-6 md:px-12" data-testid="shop-section">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={stagger} className="mb-14">
            <motion.p variants={fadeUp} className="text-[11px] uppercase tracking-[0.3em] text-[var(--hp-burgundy)] mb-4">The Collection</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-light">
              Three Blends. <span className="italic">One Purpose.</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
            {products.map((product, idx) => (
              <motion.div
                key={product.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className={`group relative overflow-hidden hp-card ${
                  idx === 0 ? 'md:col-span-7 md:row-span-2' : 'md:col-span-5'
                }`}
                data-testid={`product-card-${product.id}`}
              >
                <div className={`relative ${idx === 0 ? 'aspect-[4/5] md:aspect-auto md:h-full' : 'aspect-[4/3]'} overflow-hidden bg-[var(--hp-blush)]`}>
                  <img src={product.image} alt={product.name} loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--hp-ink)]/85 via-[var(--hp-ink)]/30 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-[var(--hp-ivory)]">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--hp-bronze-light)] mb-2">{product.subtitle}</p>
                  <h3 className="text-2xl md:text-3xl font-light mb-3">{product.name}</h3>
                  <p className="text-sm opacity-85 leading-relaxed mb-4 max-w-md font-light">{product.description}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {product.ingredients.map(ing => (
                      <span key={ing} className="text-[11px] px-3 py-1 border border-[var(--hp-ivory)]/30 text-[var(--hp-ivory)]/90">{ing}</span>
                    ))}
                  </div>
                  <Link to="/shop">
                    <Button className="bg-[var(--hp-bronze-light)] text-[var(--hp-ink)] hover:bg-[var(--hp-bronze)] hover:text-[var(--hp-ivory)] rounded-none text-[11px] uppercase tracking-[0.18em] px-5 py-3" data-testid={`buy-${product.id}`}>
                      Order Now <ArrowRight className="ml-2 h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 md:py-32 px-6 md:px-12 border-t border-[var(--hp-line-soft)] bg-[var(--hp-cream-deep)]" data-testid="about-section">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-[11px] uppercase tracking-[0.3em] text-[var(--hp-burgundy)] mb-6">Our Story</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-light mb-8 leading-tight">
              Rooted in Heritage.
              <br />
              <span className="italic">Refined for Modern Wellness.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[var(--hp-ink-soft)] leading-relaxed mb-5 font-light">
              HibiscusPlus started with a simple truth: the best things come from home.
              Nigerian Zobo — a centuries-old hibiscus preparation — has been nourishing families for generations.
              We took grandma's recipe and gave it a lab coat.
            </motion.p>
            <motion.p variants={fadeUp} className="text-[var(--hp-ink-soft)] leading-relaxed mb-8 font-light">
              Every blend is meticulously formulated in Manchester, combining premium botanicals with peer-reviewed
              nutritional science. Teas that taste like a warm hug but work like a personal trainer.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link to="/feedback">
                <Button variant="outline" className="border-[var(--hp-burgundy)]/40 text-[var(--hp-burgundy)] hover:bg-[var(--hp-burgundy)]/5 rounded-none text-[11px] uppercase tracking-[0.18em] px-7 py-5" data-testid="about-event-btn">
                  Join Our Chester Tea Tasting <ArrowRight className="ml-2 h-3.5 w-3.5" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/5] overflow-hidden hp-ornament-frame"
          >
            <img src={IMG.teaIngredients} alt="HibiscusPlus tea ingredients" loading="lazy" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </section>

      {/* Explore — cards linking to new pages */}
      <section className="py-24 md:py-32 px-6 md:px-12" data-testid="explore-section">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-14">
            <motion.p variants={fadeUp} className="text-[11px] uppercase tracking-[0.3em] text-[var(--hp-burgundy)] mb-4">Explore HibiscusPlus</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-light">
              More than a cup. <span className="italic">A whole world.</span>
            </motion.h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {EXPLORE.map((tile) => (
              <motion.div
                key={tile.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={fadeUp}
              >
                <Link to={tile.to} className="group block hp-card overflow-hidden" data-testid={tile.testid}>
                  <div className="relative aspect-[4/5] overflow-hidden bg-[var(--hp-blush)]">
                    <img src={tile.image} alt={tile.title} loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--hp-ink)]/70 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-[var(--hp-ivory)]">
                      <tile.icon className="h-5 w-5 text-[var(--hp-bronze-light)] mb-3" />
                      <h3 className="text-2xl font-light mb-2">{tile.title}</h3>
                      <p className="text-sm font-light opacity-90 leading-relaxed">{tile.copy}</p>
                      <div className="mt-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[var(--hp-bronze-light)]">
                        <span>Open</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Event */}
      <section className="py-16 md:py-24 px-6 md:px-12 border-y border-[var(--hp-line-soft)] bg-[var(--hp-blush)]/40" data-testid="event-banner">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div variants={fadeUp} className="order-2 md:order-1">
              <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--hp-burgundy)] mb-4">Live This Saturday · Africa Day</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-5">
                Find us at <span className="italic text-[var(--hp-burgundy)]">Africa Day</span>, Manchester.
              </h2>
              <p className="text-[var(--hp-ink-soft)] mb-6 font-light leading-relaxed">
                Bridgeford Street, Manchester · This Saturday. Pull up to our stall for hand-fried
                Nigerian street food — bold flavours, served warm, made the way grandma did it.
              </p>
              <div className="mb-8" data-testid="event-menu">
                <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--hp-ink)] mb-3">On the menu</p>
                <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-[var(--hp-ink)] font-light">
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[var(--hp-burgundy)]" /> Puff-Puff
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[var(--hp-burgundy)]" /> Akara
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[var(--hp-burgundy)]" /> Samosas
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[var(--hp-burgundy)]" /> Koko
                  </li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://maps.google.com/?q=Bridgeford+Street+Manchester"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-[var(--hp-burgundy)] text-[var(--hp-ivory)] hover:bg-[var(--hp-wine)] rounded-none text-sm uppercase tracking-[0.18em] px-8 py-6" data-testid="event-directions-btn">
                    Get Directions <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <Link to="/shop">
                  <Button variant="outline" className="border-[var(--hp-burgundy)]/40 text-[var(--hp-burgundy)] hover:bg-[var(--hp-burgundy)]/5 rounded-none text-sm uppercase tracking-[0.18em] px-8 py-6" data-testid="event-preorder-btn">
                    Pre-Order Online
                  </Button>
                </Link>
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="order-1 md:order-2">
              <img
                src="https://customer-assets.emergentagent.com/job_a32939dc-1aea-4860-99bb-b62686aca83e/artifacts/aklc0lb7_1000289598.png"
                alt="Nigerian Street Food menu — Puff-Puff, Akara, Samosas, Koko"
                className="w-full h-auto rounded-sm shadow-[0_18px_50px_rgba(99,30,45,0.18)]"
                data-testid="event-menu-image"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 md:py-32 px-6 md:px-12" data-testid="newsletter-section">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-[11px] uppercase tracking-[0.3em] text-[var(--hp-burgundy)] mb-4">Stay Informed</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-light mb-4">Join the <span className="italic">Inner Circle</span></motion.h2>
            <motion.p variants={fadeUp} className="text-[var(--hp-ink-soft)] mb-10 font-light">
              New blends, secret market dates, and first dibs on events. Zero spam. We promise.
            </motion.p>
            <motion.form variants={fadeUp} onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-[var(--hp-ivory)] border-[var(--hp-line)] rounded-none flex-1 py-6 focus:border-[var(--hp-burgundy)] focus-visible:ring-0"
                data-testid="newsletter-email"
              />
              <Button type="submit" className="bg-[var(--hp-burgundy)] text-[var(--hp-ivory)] hover:bg-[var(--hp-wine)] rounded-none text-[11px] uppercase tracking-[0.18em] px-8 py-6" data-testid="newsletter-submit">
                Subscribe
              </Button>
            </motion.form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
