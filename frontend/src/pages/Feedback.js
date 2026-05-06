import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Toaster } from '../components/ui/sonner';
import { toast } from 'sonner';
import { Star, Send, MapPin, Calendar } from 'lucide-react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const API_URL = process.env.REACT_APP_BACKEND_URL;
const FEEDBACK_URL = typeof window !== 'undefined' ? `${window.location.origin}/feedback` : '';
const LOGO_URL = "https://customer-assets.emergentagent.com/job_a32939dc-1aea-4860-99bb-b62686aca83e/artifacts/eei6kk0o_HibiscuPlus_20260227_093727_0000%20%283%29%20%281%29.png";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } }
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

export default function Feedback() {
  const [formData, setFormData] = useState({
    name: '', email: '', blend: '', rating: 0, taste: '', wouldBuy: '', comments: ''
  });
  const [hoveredStar, setHoveredStar] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/feedback`, formData);
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
              <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--hp-burgundy)] mb-4">Tea Tasting Event</p>
              <h1 className="text-4xl md:text-6xl font-light mb-6">
                Chester <span className="italic text-[var(--hp-burgundy)]">Experience</span>
              </h1>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-[var(--hp-ink-soft)]">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-[var(--hp-bronze)]" /> Saturday, 9th May 2025
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[var(--hp-bronze)]" /> Chester, UK
                </span>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
              <motion.div variants={fadeUp} className="lg:col-span-2">
                <div className="hp-card p-8 md:p-10 text-center lg:sticky lg:top-28" data-testid="qr-section">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--hp-burgundy)] mb-6">Scan to Share Feedback</p>
                  <div className="bg-[var(--hp-ivory)] p-5 inline-block mb-6 border border-[var(--hp-line-soft)]" data-testid="qr-code">
                    <QRCodeSVG
                      value={FEEDBACK_URL || 'https://hibiscusplus.co.uk/feedback'}
                      size={200}
                      bgColor="#FFFBF5"
                      fgColor="#2A1418"
                      level="H"
                      imageSettings={{ src: LOGO_URL, height: 40, width: 40, excavate: true }}
                    />
                  </div>
                  <p className="text-sm text-[var(--hp-ink-soft)] font-light">
                    Point your phone camera at this QR code to leave your feedback after tasting our blends.
                  </p>
                  <div className="mt-8 pt-6 border-t border-[var(--hp-line-soft)]">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--hp-muted)] mb-3">Blends Available for Tasting</p>
                    <div className="space-y-1.5 text-sm text-[var(--hp-burgundy-deep)]">
                      <p>Metabo Ignite</p>
                      <p>Bloom &amp; Flush</p>
                      <p>Glucose Guard</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="lg:col-span-3">
                <div className="hp-card p-8 md:p-12" data-testid="feedback-form-section">
                  <h3 className="text-2xl font-medium text-[var(--hp-burgundy-deep)] mb-2">Share Your Experience</h3>
                  <p className="text-sm text-[var(--hp-muted)] mb-8 font-light">Your honest feedback shapes our blends.</p>

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
                      <label className="text-[11px] uppercase tracking-[0.18em] text-[var(--hp-muted)] mb-3 block">Which blend did you try?</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {['Metabo Ignite', 'Bloom & Flush', 'Glucose Guard'].map(blend => (
                          <button key={blend} type="button" onClick={() => setFormData({...formData, blend})}
                            className={`p-3 border text-sm transition-all duration-300 ${
                              formData.blend === blend
                                ? 'border-[var(--hp-burgundy)] bg-[var(--hp-burgundy)]/10 text-[var(--hp-burgundy)]'
                                : 'border-[var(--hp-line)] text-[var(--hp-ink-soft)] hover:border-[var(--hp-burgundy)]/50'
                            }`}
                            data-testid={`blend-${blend.replace(/\s+/g, '-').toLowerCase()}`}>
                            {blend}
                          </button>
                        ))}
                      </div>
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
                      <label className="text-[11px] uppercase tracking-[0.18em] text-[var(--hp-muted)] mb-2 block">How would you describe the taste?</label>
                      <textarea value={formData.taste} onChange={(e) => setFormData({...formData, taste: e.target.value})}
                        className={`${textareaCls} min-h-[80px]`} placeholder="Bold, refreshing, spicy, smooth..." data-testid="feedback-taste" />
                    </div>

                    <div>
                      <label className="text-[11px] uppercase tracking-[0.18em] text-[var(--hp-muted)] mb-3 block">Would you purchase this blend?</label>
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
                        className={`${textareaCls} min-h-[100px]`} placeholder="Anything else you'd like us to know..." data-testid="feedback-comments" />
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
