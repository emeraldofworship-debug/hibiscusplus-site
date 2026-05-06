import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Toaster } from '../components/ui/sonner';
import { toast } from 'sonner';
import { ShoppingBag, ArrowRight, Leaf, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const LOGO_URL = "https://customer-assets.emergentagent.com/job_a32939dc-1aea-4860-99bb-b62686aca83e/artifacts/5ggfxigz_HibiscuPlus%20Limited%20Dynamic%20Letterform%20Integration%20%281%29.png";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } }
};

const products = [
  {
    id: 'metabo-ignite',
    name: 'Metabo Ignite',
    subtitle: 'Metabolism Support',
    ingredients: ['Hibiscus', 'Green Tea', 'Ginger Roots', 'Cinnamon', 'Clove'],
    description: 'A precision-crafted blend designed to fire up your metabolic rate. Green tea catechins and ginger compounds work synergistically with hibiscus anthocyanins to support fat oxidation and thermogenesis.',
    image: 'https://static.prod-images.emergentagent.com/jobs/a32939dc-1aea-4860-99bb-b62686aca83e/images/bc8a711ee5074f915fe80696ea622a4ffa40d8ede2bb21500c2c86c015eb253c.png',
    accent: '#C41E3A'
  },
  {
    id: 'bloom-flush',
    name: 'Bloom & Flush',
    subtitle: 'Digestive Detox',
    ingredients: ['Hibiscus', 'Dandelion Leaf', 'Fennel Seeds', 'Peppermint Leaf', 'Ginger Root'],
    description: 'A gentle yet powerful digestive companion. Dandelion stimulates bile production, fennel soothes bloating, and peppermint relaxes the GI tract — all anchored by hibiscus\'s natural diuretic properties.',
    image: 'https://static.prod-images.emergentagent.com/jobs/a32939dc-1aea-4860-99bb-b62686aca83e/images/1d23b7c55108024ac2a29b010ba9e3dcb206d38e881c56b8d5dd494f75dfe741.png',
    accent: '#C9A96E'
  },
  {
    id: 'glucose-guard',
    name: 'Glucose Guard',
    subtitle: 'Crave Control',
    ingredients: ['Hibiscus Petal', 'Cinnamon Bark', 'Roasted Chicory Root', 'Liquorice Root', 'Clove'],
    description: 'Engineered for blood sugar stability. Cinnamon bark improves insulin sensitivity, chicory root provides prebiotic inulin fibre, and liquorice root naturally satisfies sweet cravings without glycaemic impact.',
    image: 'https://static.prod-images.emergentagent.com/jobs/a32939dc-1aea-4860-99bb-b62686aca83e/images/05553693a6931f0d2a90e1ad3563af96db340d1bdb4df1c5a66cebecb5cfb13b.png',
    accent: '#6B1D3A'
  }
];

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [email, setEmail] = useState('');
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/recipes`);
        setRecipes(res.data.data || []);
      } catch (err) {
        console.error('Error fetching recipes:', err);
      }
    };
    fetchData();
  }, []);

  const handleNewsletter = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/newsletter/subscribe`, { email });
      toast.success('Welcome to the HibiscusPlus circle.');
      setEmail('');
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0507] text-[#F7F0E3]">
      <Toaster position="top-center" theme="dark" />
      <div className="grain-overlay" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0507]/60 backdrop-blur-2xl border-b border-[#F7F0E3]/5" data-testid="main-nav">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={LOGO_URL} alt="HibiscusPlus" className="h-12 w-auto" data-testid="header-logo" />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: 'Shop', href: '#shop' },
              { label: 'Recipes', href: '#recipes' },
              { label: 'About', href: '#about' },
              { label: 'Blog', href: '#blog' },
              { label: 'Events', href: '/feedback' }
            ].map(link => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs uppercase tracking-[0.2em] text-[#CDBAB5] hover:text-[#C9A96E] transition-colors duration-500"
                data-testid={`nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href="https://admin.shopify.com/store/hibiscusplus-limited"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              className="bg-transparent border border-[#C9A96E]/40 text-[#C9A96E] hover:bg-[#C9A96E]/10 text-xs uppercase tracking-[0.15em] rounded-none px-6 py-2"
              data-testid="shop-now-btn"
            >
              <ShoppingBag className="h-3.5 w-3.5 mr-2" />
              Shop
            </Button>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" data-testid="hero-section">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A0912]/80 via-[#0A0507] to-[#0A0507]" />
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1759662510393-bb58988ebadb?w=1600&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <motion.div
          className="relative z-10 text-center max-w-4xl mx-auto px-6 pt-24"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.p variants={fadeUp} className="text-xs uppercase tracking-[0.3em] text-[#C9A96E] mb-6">
            Artisanal Wellness Tea Blends
          </motion.p>
          <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl lg:text-8xl font-light leading-[0.9] mb-8">
            Boldly Spiced.
            <br />
            <span className="italic text-[#C9A96E]">Beautifully Balanced.</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-base md:text-lg text-[#CDBAB5] max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            Hand-crafted hibiscus tea blends, formulated with precision for those who demand
            excellence in every cup. From Manchester, for the world.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#shop">
              <Button className="bg-[#C9A96E] text-[#0A0507] hover:bg-[#D4B87A] rounded-none px-10 py-6 text-sm uppercase tracking-[0.15em] font-medium" data-testid="hero-shop-btn">
                Explore Collection
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
            <Link to="/feedback">
              <Button variant="outline" className="border-[#F7F0E3]/20 text-[#F7F0E3] hover:bg-[#F7F0E3]/5 rounded-none px-10 py-6 text-sm uppercase tracking-[0.15em] font-medium" data-testid="hero-event-btn">
                Tea Tasting Event
              </Button>
            </Link>
          </motion.div>
        </motion.div>
        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-px h-16 bg-gradient-to-b from-[#C9A96E] to-transparent" />
        </motion.div>
      </section>

      {/* Shop / Products Section */}
      <section id="shop" className="py-24 md:py-32 px-6 md:px-12" data-testid="shop-section">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="mb-16 md:mb-24"
          >
            <motion.p variants={fadeUp} className="text-xs uppercase tracking-[0.3em] text-[#C9A96E] mb-4">
              The Collection
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-light">
              Three Blends. <span className="italic">One Purpose.</span>
            </motion.h2>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
            {products.map((product, idx) => (
              <motion.div
                key={product.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className={`group relative overflow-hidden border border-[#F7F0E3]/10 hover:border-[#C9A96E]/30 transition-all duration-700 ${
                  idx === 0 ? 'md:col-span-7 md:row-span-2' : 'md:col-span-5'
                }`}
                data-testid={`product-card-${product.id}`}
              >
                <div className={`relative ${idx === 0 ? 'aspect-[4/5] md:aspect-auto md:h-full' : 'aspect-[4/3]'} overflow-hidden bg-[#1A0912]`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0507] via-[#0A0507]/40 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#C9A96E] mb-2">{product.subtitle}</p>
                  <h3 className="text-2xl md:text-3xl font-light mb-3">{product.name}</h3>
                  <p className="text-sm text-[#CDBAB5] leading-relaxed mb-4 max-w-md font-light">{product.description}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {product.ingredients.map(ing => (
                      <span key={ing} className="text-xs px-3 py-1 border border-[#F7F0E3]/10 text-[#8A7670]">
                        {ing}
                      </span>
                    ))}
                  </div>
                  <a href="https://admin.shopify.com/store/hibiscusplus-limited" target="_blank" rel="noopener noreferrer">
                    <Button className="bg-[#C9A96E] text-[#0A0507] hover:bg-[#D4B87A] rounded-none text-xs uppercase tracking-[0.15em] px-6 py-3" data-testid={`buy-${product.id}`}>
                      Shop on HibiscusPlus
                      <ArrowRight className="ml-2 h-3.5 w-3.5" />
                    </Button>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 md:py-32 px-6 md:px-12 border-t border-[#F7F0E3]/5" data-testid="about-section">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="text-xs uppercase tracking-[0.3em] text-[#C9A96E] mb-6">
              Our Story
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-light mb-8 leading-tight">
              Rooted in Heritage.
              <br />
              <span className="italic">Refined for Modern Wellness.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#CDBAB5] leading-relaxed mb-6 font-light">
              HibiscusPlus draws from the rich tradition of Nigerian Zobo — a centuries-old hibiscus preparation revered for its health properties. We've taken this heritage and elevated it with modern nutritional science.
            </motion.p>
            <motion.p variants={fadeUp} className="text-[#CDBAB5] leading-relaxed mb-8 font-light">
              Every blend is meticulously formulated in Manchester, combining premium botanicals with research-backed functional ingredients. The result: teas that don't just taste extraordinary — they deliver measurable wellness benefits.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link to="/feedback">
                <Button variant="outline" className="border-[#C9A96E]/40 text-[#C9A96E] hover:bg-[#C9A96E]/10 rounded-none text-xs uppercase tracking-[0.15em] px-8 py-5" data-testid="about-event-btn">
                  Join Our Chester Tea Tasting
                  <ArrowRight className="ml-2 h-3.5 w-3.5" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/5] overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1761963139989-dbfa18ffb470?w=800&q=80"
              alt="Hibiscus flower"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 border border-[#C9A96E]/20" />
          </motion.div>
        </div>
      </section>

      {/* Recipes Section */}
      <section id="recipes" className="py-24 md:py-32 px-6 md:px-12 bg-[#1A0912]/30" data-testid="recipes-section">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mb-16"
          >
            <motion.p variants={fadeUp} className="text-xs uppercase tracking-[0.3em] text-[#C9A96E] mb-4">
              Recipes
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-light mb-4">
              The Art of <span className="italic">Preparation</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#CDBAB5] max-w-xl font-light">
              Research-backed recipes crafted for maximum health benefit. Each blend tells a story of flavour and function.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recipes.slice(0, 6).map((recipe, idx) => (
              <motion.div
                key={recipe.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group relative overflow-hidden border border-[#F7F0E3]/10 hover:border-[#C9A96E]/20 transition-all duration-500"
                data-testid={`recipe-card-${recipe.id}`}
              >
                <div className="aspect-[3/2] overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0507] via-[#0A0507]/60 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-xs uppercase tracking-[0.2em] text-[#C9A96E]">{recipe.category}</span>
                  <h4 className="text-lg font-light mt-1 mb-2">{recipe.name}</h4>
                  <p className="text-xs text-[#8A7670]">{recipe.prep_time || recipe.prepTime}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {recipes.length > 6 && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="mt-12 text-center"
            >
              <Link to="/recipes">
                <Button variant="outline" className="border-[#F7F0E3]/20 text-[#F7F0E3] hover:bg-[#F7F0E3]/5 rounded-none text-xs uppercase tracking-[0.15em] px-8 py-5" data-testid="view-all-recipes-btn">
                  View All {recipes.length} Recipes
                  <ArrowRight className="ml-2 h-3.5 w-3.5" />
                </Button>
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* Event Banner */}
      <section className="py-16 md:py-24 px-6 md:px-12 border-y border-[#C9A96E]/20 bg-[#1A0912]" data-testid="event-banner">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-xs uppercase tracking-[0.3em] text-[#C9A96E] mb-4">
              Upcoming Event
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-light mb-4">
              Tea Tasting Experience — <span className="italic">Chester</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#CDBAB5] mb-8 font-light">
              Saturday, 9th May 2025. Join us for an exclusive first taste of our three signature blends.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link to="/feedback">
                <Button className="bg-[#C9A96E] text-[#0A0507] hover:bg-[#D4B87A] rounded-none text-sm uppercase tracking-[0.15em] px-10 py-6" data-testid="event-cta-btn">
                  Share Your Feedback
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 md:py-32 px-6 md:px-12" data-testid="newsletter-section">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-xs uppercase tracking-[0.3em] text-[#C9A96E] mb-4">
              Stay Informed
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-light mb-4">
              Join the <span className="italic">Inner Circle</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#CDBAB5] mb-10 font-light">
              Be the first to know about new blends, exclusive events, and wellness insights.
            </motion.p>
            <motion.form variants={fadeUp} onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-transparent border-[#F7F0E3]/20 text-[#F7F0E3] placeholder:text-[#8A7670] rounded-none flex-1 py-6 focus:border-[#C9A96E]"
                data-testid="newsletter-email"
              />
              <Button
                type="submit"
                className="bg-[#C9A96E] text-[#0A0507] hover:bg-[#D4B87A] rounded-none text-xs uppercase tracking-[0.15em] px-8 py-6"
                data-testid="newsletter-submit"
              >
                Subscribe
              </Button>
            </motion.form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#F7F0E3]/5 py-16 md:py-24 px-6 md:px-12" data-testid="footer">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
            {/* Brand */}
            <div className="md:col-span-2">
              <img src={LOGO_URL} alt="HibiscusPlus" className="h-16 w-auto mb-6" data-testid="footer-logo" />
              <p className="text-sm text-[#8A7670] leading-relaxed max-w-sm font-light">
                Premium artisanal hibiscus tea blends, handcrafted in Manchester for those who demand excellence in every cup.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] text-[#C9A96E] mb-6">Contact</h4>
              <ul className="space-y-3 text-sm text-[#CDBAB5]">
                <li className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-[#8A7670]" />
                  <a href="mailto:emeraldofworship@hibiscusplus.co.uk" className="hover:text-[#C9A96E] transition-colors">emeraldofworship@hibiscusplus.co.uk</a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-[#8A7670]" />
                  <a href="tel:07508597742" className="hover:text-[#C9A96E] transition-colors">07508 597742</a>
                </li>
                <li className="flex items-center gap-2">
                  <Instagram className="h-3.5 w-3.5 text-[#8A7670]" />
                  <a href="https://www.instagram.com/hibiscusplus_ltd" target="_blank" rel="noopener noreferrer" className="hover:text-[#C9A96E] transition-colors">@hibiscusplus_ltd</a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="h-3.5 w-3.5 text-[#8A7670] mt-0.5" />
                  <span>Manchester, UK</span>
                </li>
              </ul>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] text-[#C9A96E] mb-6">Navigate</h4>
              <ul className="space-y-3 text-sm text-[#CDBAB5]">
                <li><a href="#shop" className="hover:text-[#C9A96E] transition-colors">Shop</a></li>
                <li><a href="#recipes" className="hover:text-[#C9A96E] transition-colors">Recipes</a></li>
                <li><a href="#about" className="hover:text-[#C9A96E] transition-colors">About</a></li>
                <li><Link to="/feedback" className="hover:text-[#C9A96E] transition-colors">Events & Feedback</Link></li>
                <li><Link to="/brand-assets" className="hover:text-[#C9A96E] transition-colors">Brand Assets</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-[#F7F0E3]/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-[#8A7670]">
              &copy; 2025 HIBISCUSPLUS LIMITED. All rights reserved. Company No. 17024055
            </p>
            <p className="text-xs text-[#8A7670] italic">
              Boldly Spiced &middot; Beautifully Balanced
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
