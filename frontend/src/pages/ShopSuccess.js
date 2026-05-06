import React, { useEffect, useState, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Check, Loader2, AlertCircle, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../contexts/CartContext';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const POLL_INTERVAL_MS = 2000;
const MAX_ATTEMPTS = 10;

export default function ShopSuccess() {
  const [params] = useSearchParams();
  const sessionId = params.get('session_id');
  const { clear } = useCart();

  const [state, setState] = useState({ status: 'polling', data: null, error: null });
  const attemptsRef = useRef(0);
  const cartCleared = useRef(false);

  useEffect(() => {
    if (!sessionId) {
      setState({ status: 'error', error: 'Missing session id', data: null });
      return;
    }

    let cancelled = false;
    let timeoutId = null;

    const poll = async () => {
      if (cancelled) return;
      attemptsRef.current += 1;
      try {
        const { data } = await axios.get(`${API_URL}/api/checkout/status/${sessionId}`);
        if (data.payment_status === 'paid') {
          if (!cartCleared.current) { clear(); cartCleared.current = true; }
          setState({ status: 'success', data, error: null });
          return;
        }
        if (data.status === 'expired' || data.payment_status === 'expired' || data.payment_status === 'failed') {
          setState({ status: 'failed', data, error: data.payment_status });
          return;
        }
        if (attemptsRef.current >= MAX_ATTEMPTS) {
          setState({ status: 'pending', data, error: null });
          return;
        }
        timeoutId = setTimeout(poll, POLL_INTERVAL_MS);
      } catch (err) {
        setState({ status: 'error', error: err?.response?.data?.detail || err.message, data: null });
      }
    };

    poll();

    return () => {
      cancelled = true;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [sessionId, clear]);

  return (
    <div className="min-h-screen bg-[var(--hp-cream)] text-[var(--hp-ink)]">
      <div className="grain-overlay" />
      <Navbar />

      <main className="pt-32 md:pt-40 pb-24 px-6 md:px-12">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {state.status === 'polling' && (
              <div data-testid="success-polling">
                <Loader2 className="h-12 w-12 mx-auto text-[var(--hp-burgundy)] animate-spin mb-6" />
                <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--hp-burgundy)] mb-4">Confirming Payment</p>
                <h1 className="text-3xl md:text-4xl font-light mb-3">Just a moment…</h1>
                <p className="text-[var(--hp-ink-soft)] font-light">We're verifying your payment with Stripe. This usually takes a few seconds.</p>
              </div>
            )}

            {state.status === 'success' && (
              <div data-testid="success-confirmed">
                <div className="w-20 h-20 mx-auto mb-8 border border-[var(--hp-burgundy)] rounded-full flex items-center justify-center bg-[var(--hp-blush)]/40">
                  <Check className="h-9 w-9 text-[var(--hp-burgundy)]" strokeWidth={1.5} />
                </div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--hp-burgundy)] mb-4">Payment Received</p>
                <h1 className="text-3xl md:text-5xl font-light mb-4">Thank you, friend.</h1>
                <p className="text-[var(--hp-ink-soft)] font-light mb-8 max-w-md mx-auto">
                  Your order is in. We'll email you with collection details for the next market day.
                </p>

                {state.data?.items?.length > 0 && (
                  <div className="hp-card p-6 text-left mb-8" data-testid="success-order-summary">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--hp-burgundy)] mb-4">Order summary</p>
                    <div className="space-y-2">
                      {state.data.items.map((it, i) => (
                        <div key={i} className="flex justify-between text-sm border-b border-[var(--hp-line-soft)] pb-2 last:border-b-0">
                          <span className="text-[var(--hp-ink)]">{it.qty}× {it.name}</span>
                          <span className="text-[var(--hp-burgundy)]">£{(it.qty * it.unit_price).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-4 pt-3 border-t border-[var(--hp-line)]">
                      <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--hp-muted)]">Total paid</span>
                      <span className="text-lg text-[var(--hp-burgundy)]">£{((state.data.amount_total || 0) / 100).toFixed(2)}</span>
                    </div>
                  </div>
                )}

                <Link to="/">
                  <Button className="bg-[var(--hp-burgundy)] text-[var(--hp-ivory)] hover:bg-[var(--hp-wine)] rounded-none text-[11px] uppercase tracking-[0.18em] px-7 py-5" data-testid="success-home-btn">
                    Back to Home <ArrowRight className="ml-2 h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            )}

            {state.status === 'pending' && (
              <div data-testid="success-pending">
                <Loader2 className="h-10 w-10 mx-auto text-[var(--hp-bronze)] mb-6" />
                <h1 className="text-3xl font-light mb-3">Still processing…</h1>
                <p className="text-[var(--hp-ink-soft)] font-light mb-6">
                  Stripe is taking a little longer than usual. You'll receive an email confirmation as soon as it clears — no need to refresh.
                </p>
                <Link to="/">
                  <Button variant="outline" className="border-[var(--hp-line)] text-[var(--hp-ink-soft)] rounded-none text-[11px] uppercase tracking-[0.18em] px-7 py-5">
                    Back to Home
                  </Button>
                </Link>
              </div>
            )}

            {(state.status === 'failed' || state.status === 'error') && (
              <div data-testid="success-error">
                <AlertCircle className="h-12 w-12 mx-auto text-[var(--hp-hibiscus)] mb-6" />
                <h1 className="text-3xl font-light mb-3">Payment couldn't be confirmed</h1>
                <p className="text-[var(--hp-ink-soft)] font-light mb-6">{state.error || 'Please try again or contact us if you were charged.'}</p>
                <Link to="/shop">
                  <Button className="bg-[var(--hp-burgundy)] text-[var(--hp-ivory)] hover:bg-[var(--hp-wine)] rounded-none text-[11px] uppercase tracking-[0.18em] px-7 py-5">
                    Back to Shop
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
