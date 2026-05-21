import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Toaster } from '../components/ui/sonner';
import { toast } from 'sonner';
import { Star, Send, MapPin, Calendar, MessageSquare, Package } from 'lucide-react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLogo } from '../hooks/useLogo';

const API_URL = process.env.REACT_APP_BACKEND_URL;
const FEEDBACK_URL = typeof window !== 'undefined' ? `${window.location.origin}/feedback` : '';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } }
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

// 3 modes: general (default), product, event
const MODES = {
  general: {
    eyebrow: 'Tell Us What You Think',
    title: 'How was your',
    titleAccent: 'HibiscusPlus experience?',
    blurb:
      "Your honest feedback shapes every blend, every snack and every event. Whether you've ordered online, eaten at a market stall, or just want to share an idea — we'd love to hear it.",
    icon: MessageSquare,
    sideTitle: 'Scan to Share Feedback',
    sideBlurb: 'Point your phone camera at this QR code to leave feedback from anywhere.',
  },
  product: {
    eyebrow: 'Product Feedback',
    title: 'Tell us about',
    titleAccent: 'your favourite picks.',
    blurb:
      "Loved it? Tweak something? Let us know exactly what worked and what we can improve. Your input goes straight to our kitchen and product team.",
    icon: Package,
    sideTitle: 'Scan to Share Feedback',
    sideBlurb: "We'll use what you share to refine recipes, packaging and pricing.",
  },
  event: {
    eyebrow: 'Tea Tasting Event',
    title: 'Chester',
    titleAccent: 'Experience',
    blurb: '',
    icon: Star,
    sideTitle: 'Scan to Share Feedback',
    sideBlurb: 'Point your phone camera at this QR code to leave feedback after the tasting.',
  },
};

export default function Feedback() {
  const [params] = useSearchParams();
  const logo = useLogo();
  const productParam = params.get('product') || '';
  const contextParam = params.get('context') || (productParam ? 'product' : 'general');
  const mode = MODES[contextParam] || MODES.general;
  const Icon = mode.icon;

  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    product: productParam,
    rating: 0,
    taste: '',
    wouldBuy: '',
    comments: '',
    context: contextParam,
  });
  const [hoveredStar, setHoveredStar] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/products`)
      .then((res) => setProducts(res.data.data || []))
      .catch(() => { /* graceful: form still usable */ });
  }, []);

  // For the optional product selector — show purchasable + coming-soon items.
  const productOptions = useMemo(() => {
    const names = products
      .filter((p) => ['tea', 'snack', 'event'].includes(p.type) || p.category === 'tea' || p.category === 'Tea Blends')
      .map((p) => p.name);
    // Always include the URL-provided product even if not in DB
    if (productParam && !names.includes(productParam)) names.unshift(productParam);
    return Array.from(new Set(names));
  }, [products, productParam]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Backend route accepts the blend field for backwards compatibility.
      const payload = { ...formData, blend: formData.product };
      await axios.post(`${API_URL}/api/feedback`, payload);
      setSubmitted(true);
      toast.success('Thank you for your feedback!');
    } catch {
      toast.error('Submission failed. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[var(--hp-cream)] text-[var(--hp-ink)] flex items-center justify-center px-6">
        <Toaster position="top-center" />
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-8 border border-[var(--hp-burgundy)]/40 rounded-full flex items-center justify-center">
            <Star className="h-8 w-8 text-[var(--hp-burgundy)] fill-[var(--hp-burgundy)]" />
          </div>
          <h2 className="text-3xl font-light mb-4">Thank You</h2>
          <p className="text-[var(--hp-ink-soft)] mb-8 font-light">
            Your feedback helps us craft the perfect blend. We appreciate you being part of the HibiscusPlus journey.
          </p>
          <Link to="/">
            <Button className="bg-[var(--hp-burgundy)] text-[var(--hp-ivory)] hover:bg-[var(--hp-wine)] rounded-none text-xs uppercase tracking-[0.18em] px-8 py-5" data-testid="back-home-btn">
              Back to Home
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  const inputCls = "bg-[var(--hp-ivory)] border-[var(--hp-line)] text-[var(--hp-ink)] rounded-none focus:border-[var(--hp-burgundy)] focus-visible:ring-0";
  const textareaCls = "w-full bg-[var(--hp-ivory)] border border-[var(--hp-line)] text-[var(--hp-ink)] rounded-none p-3 focus:border-[var(--hp-burgundy)] focus:outline-none resize-none";

  return (
    <div className="min-h-screen bg-[var(--hp-cream)] text-[var(--hp-ink)]">
      <Toaster position="top-center" />
      <div className="grain-overlay" />
      <Navbar />

      <main className="pt-32 md:pt-40 pb-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--hp-burgundy)] mb-4">{mode.eyebrow}</p>
              <h1 className="text-4xl md:text-6xl font-light mb-6">
                {mode.title} <span className="italic text-[var(--hp-burgundy)]">{mode.titleAccent}</span>
              </h1>
              {contextParam === 'event' && (
                <div className="flex flex-wrap justify-center gap-6 text-sm text-[var(--hp-ink-soft)]">
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[var(--hp-bronze)]" /> Saturday, 9th May 2025
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[var(--hp-bronze)]" /> Chester, UK
                  </span>
                </div>
              )}
              {mode.blurb && (
                <p className="mt-4 max-w-2xl mx-auto text-[var(--hp-ink-soft)] font-light leading-relaxed">
                  {mode.blurb}
                </p>
              )}
              {productParam && (
                <p className="mt-6 inline-block text-[11px] uppercase tracking-[0.22em] text-[var(--hp-burgundy)] border border-[var(--hp-burgundy)]/30 px-4 py-2" data-testid="product-context-badge">
                  Feedback for: {productParam}
                </p>
              )}
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
              <motion.div variants={fadeUp} className="lg:col-span-2">
                <div className="hp-card p-8 md:p-10 text-center lg:sticky lg:top-28" data-testid="qr-section">
                  <Icon className="h-7 w-7 text-[var(--hp-burgundy)] mx-auto mb-4" />
                  <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--hp-burgundy)] mb-6">{mode.sideTitle}</p>
                  <div className="bg-[var(--hp-ivory)] p-5 inline-block mb-6 border border-[var(--hp-line-soft)]" data-testid="qr-code">
                    <QRCodeSVG
                      value={FEEDBACK_URL || 'https://hibiscusplus.co.uk/feedback'}
                      size={200}
                      bgColor="#FFFBF5"
                      fgColor="#2A1418"
                      level="H"
                      imageSettings={{ src: logo, height: 40, width: 40, excavate: true }}
                    />
                  </div>
                  <p className="text-sm text-[var(--hp-ink-soft)] font-light">{mode.sideBlurb}</p>
                  <div className="mt-8 pt-6 border-t border-[var(--hp-line-soft)]">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--hp-muted)] mb-3">Prefer Email?</p>
                    <a
                      href="mailto:hello@hibiscusplus.co.uk"
                      className="text-sm text-[var(--hp-burgundy-deep)] hover:text-[var(--hp-burgundy)] transition-colors"
                      data-testid="feedback-email-link"
                    >
                      hello@hibiscusplus.co.uk
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="lg:col-span-3">
                <div className="hp-card p-8 md:p-12" data-testid="feedback-form-section">
                  <h3 className="text-2xl font-medium text-[var(--hp-burgundy-deep)] mb-2">Share Your Experience</h3>
                  <p className="text-sm text-[var(--hp-muted)] mb-8 font-light">Your honest feedback shapes our blends, snacks and events.</p>

                  <form onSubmit={handleSubmit} className="space-y-6" data-testid="feedback-form">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] uppercase tracking-[0.18em] text-[var(--hp-muted)] mb-2 block">Name</label>
                        <Input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className={inputCls} placeholder="Your name" required data-testid="feedback-name" />
                      </div>
                      <div>
                        <label className="text-[11px] uppercase tracking-[0.18em] text-[var(--hp-muted)] mb-2 block">Email</label>
                        <Input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className={inputCls} placeholder="Your email" required data-testid="feedback-email" />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] uppercase tracking-[0.18em] text-[var(--hp-muted)] mb-3 block">
                        {contextParam === 'general' ? 'About a specific product? (Optional)' : 'Which product?'}
                      </label>
                      <select
                        value={formData.product}
                        onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                        className={`${inputCls} w-full px-3 py-2 h-10`}
                        data-testid="feedback-product-select"
                      >
                        <option value="">{contextParam === 'general' ? 'General feedback — not product-specific' : 'Select a product'}</option>
                        {productOptions.map((name) => (
                          <option key={name} value={name}>{name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] uppercase tracking-[0.18em] text-[var(--hp-muted)] mb-3 block">Overall Rating</label>
                      <div className="flex gap-2" data-testid="star-rating">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button key={star} type="button"
                            onMouseEnter={() => setHoveredStar(star)}
                            onMouseLeave={() => setHoveredStar(0)}
                            onClick={() => setFormData({...formData, rating: star})}
                            className="transition-transform hover:scale-110" data-testid={`star-${star}`}>
                            <Star className={`h-8 w-8 transition-colors ${
                              star <= (hoveredStar || formData.rating)
                                ? 'text-[var(--hp-burgundy)] fill-[var(--hp-burgundy)]'
                                : 'text-[var(--hp-line)]'
                            }`} />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] uppercase tracking-[0.18em] text-[var(--hp-muted)] mb-2 block">
                        {contextParam === 'product' || formData.product ? 'How would you describe it?' : 'What stood out (good or bad)?'}
                      </label>
                      <textarea value={formData.taste} onChange={(e) => setFormData({...formData, taste: e.target.value})}
                        className={`${textareaCls} min-h-[80px]`}
                        placeholder={contextParam === 'product' || formData.product ? 'Taste, packaging, presentation…' : 'Service, ordering, communication, value…'}
                        data-testid="feedback-taste" />
                    </div>

                    <div>
                      <label className="text-[11px] uppercase tracking-[0.18em] text-[var(--hp-muted)] mb-3 block">
                        {contextParam === 'product' || formData.product ? 'Would you buy this again?' : 'Would you recommend HibiscusPlus?'}
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {['Absolutely', 'Maybe', 'Not for me'].map(option => (
                          <button key={option} type="button" onClick={() => setFormData({...formData, wouldBuy: option})}
                            className={`px-5 py-2 border text-sm transition-all duration-300 ${
                              formData.wouldBuy === option
                                ? 'border-[var(--hp-burgundy)] bg-[var(--hp-burgundy)]/10 text-[var(--hp-burgundy)]'
                                : 'border-[var(--hp-line)] text-[var(--hp-ink-soft)] hover:border-[var(--hp-burgundy)]/50'
                            }`}
                            data-testid={`would-buy-${option.replace(/\s+/g, '-').toLowerCase()}`}>
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] uppercase tracking-[0.18em] text-[var(--hp-muted)] mb-2 block">Additional Comments</label>
                      <textarea value={formData.comments} onChange={(e) => setFormData({...formData, comments: e.target.value})}
                        className={`${textareaCls} min-h-[100px]`} placeholder="Anything else you'd like us to know…" data-testid="feedback-comments" />
                    </div>

                    <Button type="submit"
                      className="w-full bg-[var(--hp-burgundy)] text-[var(--hp-ivory)] hover:bg-[var(--hp-wine)] rounded-none text-sm uppercase tracking-[0.18em] py-6"
                      data-testid="feedback-submit">
                      <Send className="mr-2 h-4 w-4" /> Submit Feedback
                    </Button>
                  </form>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
