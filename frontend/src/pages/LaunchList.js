import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Toaster } from '../components/ui/sonner';
import { toast } from 'sonner';
import { Star, Bell, MessageCircle, Check, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { IMG } from '../assets/images';

const API_URL = process.env.REACT_APP_BACKEND_URL;
const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

export default function LaunchList() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [submittingNL, setSubmittingNL] = useState(false);

  const [review, setReview] = useState({ name: '', email: '', blend: '', rating: 0, taste: '', comments: '' });
  const [hoveredStar, setHoveredStar] = useState(0);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [submittingReview, setSubmittingReview] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setSubmittingNL(true);
    try {
      await axios.post(`${API_URL}/api/newsletter/subscribe`, {
        email: email.trim(),
        interest: 'tea_blend_launch',
        source: 'westminster_80yr_2026',
      });
      setSubscribed(true);
      toast.success("You're on the list.");
    } catch (err) {
      const detail = err?.response?.data?.detail || 'Something went wrong.';
      toast.error(typeof detail === 'string' ? detail : 'Please try again.');
    } finally {
      setSubmittingNL(false);
    }
  };

  const handleReview = async (e) => {
    e.preventDefault();
    setSubmittingReview(true);
    try {
      await axios.post(`${API_URL}/api/feedback`, {
        ...review,
        source: 'westminster_80yr_2026',
        wouldBuy: review.rating >= 4 ? 'Likely' : (review.rating >= 3 ? 'Maybe' : 'Not now'),
      });
      setReviewSubmitted(true);
      toast.success('Thank you for the review!');
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setSubmittingReview(false);
    }
  };

  const inputCls = "bg-[var(--hp-ivory)] border-[var(--hp-line)] text-[var(--hp-ink)] rounded-none py-5 focus:border-[var(--hp-burgundy)] focus-visible:ring-0";

  return (
    <div className="min-h-screen bg-[var(--hp-cream)] text-[var(--hp-ink)]">
      <Toaster position="top-center" />
      <div className="grain-overlay" />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 md:pt-40 pb-12 px-6 md:px-12 overflow-hidden" data-testid="launch-hero">
        <div className="absolute inset-0 -z-10">
          <img src={IMG.avifAmberTea} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--hp-cream)]/60 via-[var(--hp-cream)]/85 to-[var(--hp-cream)]" />
        </div>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <p className="text-[11px] uppercase tracking-[0.32em] text-[var(--hp-burgundy)] mb-4">
              Westminster Park · 80 Years Anniversary
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight mb-5">
              You tasted it. <br />
              <span className="italic text-[var(--hp-burgundy)]">Now keep it close.</span>
            </h1>
            <p className="text-[var(--hp-ink-soft)] font-light leading-relaxed max-w-xl mx-auto">
              Two things. Both take 30 seconds.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Two CTAs */}
      <section className="px-6 md:px-12 pb-24 md:pb-32">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* CARD 1 — Newsletter */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="hp-card p-8 md:p-10 flex flex-col" data-testid="signup-card">
            <div className="w-10 h-10 flex items-center justify-center border border-[var(--hp-burgundy)]/30 text-[var(--hp-burgundy)] mb-5">
              <Bell className="h-4 w-4" />
            </div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--hp-bronze)] mb-2">Be first to know</p>
            <h2 className="text-2xl md:text-3xl font-light text-[var(--hp-burgundy-deep)] mb-3 leading-tight">
              When the blends drop, <span className="italic">you'll know first.</span>
            </h2>
            <p className="text-sm text-[var(--hp-ink-soft)] font-light leading-relaxed mb-6">
              We're working on getting our three signature blends into stores and onto shelves across the UK. Join the launch list and we'll email you the moment they're available to order.
            </p>

            {subscribed ? (
              <div className="mt-auto pt-2 border-t border-[var(--hp-line-soft)] flex items-center gap-3" data-testid="signup-success">
                <Check className="h-5 w-5 text-[var(--hp-burgundy)]" />
                <p className="text-sm text-[var(--hp-burgundy-deep)]">You're on the list. Watch your inbox.</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-auto space-y-3" data-testid="signup-form">
                <Input
                  type="email"
                  required
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputCls}
                  data-testid="launch-signup-email"
                />
                <Button
                  type="submit"
                  disabled={submittingNL}
                  className="w-full bg-[var(--hp-burgundy)] text-[var(--hp-ivory)] hover:bg-[var(--hp-wine)] rounded-none text-[11px] uppercase tracking-[0.2em] py-5 disabled:opacity-60"
                  data-testid="launch-signup-submit"
                >
                  {submittingNL ? 'Adding you…' : 'Add me to the list'}
                </Button>
                <p className="text-[10px] text-[var(--hp-muted)] text-center">No spam. Unsubscribe anytime.</p>
              </form>
            )}
          </motion.div>

          {/* CARD 2 — Quick Review */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="hp-card p-8 md:p-10 flex flex-col" data-testid="review-card">
            <div className="w-10 h-10 flex items-center justify-center border border-[var(--hp-burgundy)]/30 text-[var(--hp-burgundy)] mb-5">
              <MessageCircle className="h-4 w-4" />
            </div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--hp-bronze)] mb-2">Share your experience</p>
            <h2 className="text-2xl md:text-3xl font-light text-[var(--hp-burgundy-deep)] mb-3 leading-tight">
              Tell us what <span className="italic">you thought</span> of the tasting.
            </h2>
            <p className="text-sm text-[var(--hp-ink-soft)] font-light leading-relaxed mb-6">
              A few words from you helps us refine every blend. Your honest opinion goes straight to our founder.
            </p>

            {reviewSubmitted ? (
              <div className="mt-auto pt-2 border-t border-[var(--hp-line-soft)] flex items-center gap-3" data-testid="review-success">
                <Sparkles className="h-5 w-5 text-[var(--hp-burgundy)]" />
                <p className="text-sm text-[var(--hp-burgundy-deep)]">You're a star. Thank you for the review.</p>
              </div>
            ) : (
              <form onSubmit={handleReview} className="mt-auto space-y-3" data-testid="review-form">
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="text"
                    required
                    placeholder="Your name"
                    value={review.name}
                    onChange={(e) => setReview({ ...review, name: e.target.value })}
                    className={inputCls}
                    data-testid="launch-review-name"
                  />
                  <Input
                    type="email"
                    required
                    placeholder="Your email"
                    value={review.email}
                    onChange={(e) => setReview({ ...review, email: e.target.value })}
                    className={inputCls}
                    data-testid="launch-review-email"
                  />
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {['Metabo Ignite', 'Bloom & Flush', 'Glucose Guard'].map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setReview({ ...review, blend: b })}
                      className={`text-[10px] uppercase tracking-[0.18em] px-3 py-2 border transition-all ${
                        review.blend === b
                          ? 'bg-[var(--hp-burgundy)] text-[var(--hp-ivory)] border-[var(--hp-burgundy)]'
                          : 'bg-transparent text-[var(--hp-ink-soft)] border-[var(--hp-line)] hover:border-[var(--hp-burgundy)]'
                      }`}
                      data-testid={`launch-review-blend-${b.replace(/\s+|&/g, '-').toLowerCase()}`}
                    >
                      {b}
                    </button>
                  ))}
                </div>

                <div className="flex gap-1.5 pt-1" data-testid="launch-review-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                      onClick={() => setReview({ ...review, rating: star })}
                      data-testid={`launch-star-${star}`}
                    >
                      <Star className={`h-7 w-7 transition-colors ${
                        star <= (hoveredStar || review.rating)
                          ? 'text-[var(--hp-burgundy)] fill-[var(--hp-burgundy)]'
                          : 'text-[var(--hp-line)]'
                      }`} />
                    </button>
                  ))}
                </div>

                <textarea
                  value={review.comments}
                  onChange={(e) => setReview({ ...review, comments: e.target.value })}
                  placeholder="A few words about your tasting…"
                  rows={3}
                  className="w-full bg-[var(--hp-ivory)] border border-[var(--hp-line)] text-[var(--hp-ink)] rounded-none p-3 text-sm focus:border-[var(--hp-burgundy)] focus:outline-none resize-none"
                  data-testid="launch-review-comments"
                />

                <Button
                  type="submit"
                  disabled={submittingReview || review.rating === 0}
                  className="w-full bg-[var(--hp-burgundy)] text-[var(--hp-ivory)] hover:bg-[var(--hp-wine)] rounded-none text-[11px] uppercase tracking-[0.2em] py-5 disabled:opacity-60"
                  data-testid="launch-review-submit"
                >
                  {submittingReview ? 'Sending…' : 'Send Review'}
                </Button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Subtle "explore" link */}
        <div className="mt-12 text-center">
          <Link to="/" className="text-[11px] uppercase tracking-[0.28em] text-[var(--hp-bronze)] hover:text-[var(--hp-burgundy)] transition-colors" data-testid="launch-back-home">
            Explore the full HibiscusPlus →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
