import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Toaster } from '../components/ui/sonner';
import { toast } from 'sonner';
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../contexts/CartContext';

const API_URL = process.env.REACT_APP_BACKEND_URL;
const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

export default function Shop() {
  const { items, addItem, removeItem, setQuantity, clear, total, count } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkingOut, setCheckingOut] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  // Delivery state
  const hasSnacks = useMemo(() => items.some((i) => i.category === 'snack'), [items]);
  const allEvents = useMemo(() => items.length > 0 && items.every((i) => i.category === 'event'), [items]);
  const canShip = useMemo(() => items.length > 0 && !hasSnacks && !allEvents, [items, hasSnacks, allEvents]);
  const defaultMethod = allEvents ? 'ticket' : 'pickup';
  const [method, setMethod] = useState(defaultMethod);
  useEffect(() => {
    // If cart contents change such that shipping is no longer possible, fall back.
    if (method === 'ship' && !canShip) setMethod(allEvents ? 'ticket' : 'pickup');
    if (method === 'ticket' && !allEvents) setMethod('pickup');
  }, [method, canShip, allEvents]);

  const [address, setAddress] = useState({ name: '', email: '', phone: '', line1: '', line2: '', city: '', postcode: '' });

  const SHIP_FREE_THRESHOLD = 40;
  const SHIP_FLAT = 4.5;
  const shipping = method === 'ship' ? (total >= SHIP_FREE_THRESHOLD ? 0 : SHIP_FLAT) : 0;
  const grandTotal = total + shipping;

  useEffect(() => {
    axios.get(`${API_URL}/api/products`)
      .then((res) => setProducts(res.data.data || []))
      .catch(() => toast.error('Failed to load shop.'))
      .finally(() => setLoading(false));
  }, []);

  const purchasable = useMemo(
    () => products.filter((p) => !p.comingSoon && ['tea', 'snack', 'event'].includes(p.type)),
    [products]
  );
  const categories = useMemo(() => {
    const set = new Set(purchasable.map((p) => p.category).filter(Boolean));
    return ['All', ...Array.from(set)];
  }, [purchasable]);

  const filtered = activeCategory === 'All' ? purchasable : purchasable.filter((p) => p.category === activeCategory);

  const handleCheckout = async () => {
    if (items.length === 0) return;
    if (method === 'ship') {
      const required = ['name', 'email', 'line1', 'city', 'postcode'];
      for (const k of required) {
        if (!address[k]?.trim()) {
          toast.error(`Please complete your ${k.replace('line1', 'address').replace('postcode', 'postcode')}.`);
          return;
        }
      }
    }
    setCheckingOut(true);
    try {
      const { data } = await axios.post(`${API_URL}/api/checkout/session`, {
        items: items.map((i) => ({ product_id: i.id, quantity: i.quantity })),
        origin_url: window.location.origin,
        delivery: { method, address: method === 'ship' ? address : {} },
      });
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (err) {
      const detail = err?.response?.data?.detail || err.message || 'Checkout failed';
      toast.error(typeof detail === 'string' ? detail : 'Checkout failed');
      setCheckingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--hp-cream)] text-[var(--hp-ink)]">
      <Toaster position="top-center" />
      <div className="grain-overlay" />
      <Navbar />

      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-12 px-6 md:px-12" data-testid="shop-hero">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--hp-burgundy)] mb-4">The Shop</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight max-w-3xl">
              Snacks, Platters &amp; <span className="italic text-[var(--hp-burgundy)]">Tasting Tickets.</span>
            </h1>
            <p className="mt-6 text-[var(--hp-ink-soft)] max-w-2xl font-light leading-relaxed">
              The full HibiscusPlus collection — three signature tea blends, weekend market snacks, and tasting tickets.
              Order ahead, collect on market days, or have it shipped (tea blends only).
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="px-6 md:px-12 pb-10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-3 border-y border-[var(--hp-line-soft)] py-5">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              data-testid={`shop-filter-${c.toLowerCase()}`}
              className={`text-[11px] uppercase tracking-[0.18em] px-4 py-2 border transition-all ${
                activeCategory === c
                  ? 'bg-[var(--hp-burgundy)] text-[var(--hp-ivory)] border-[var(--hp-burgundy)]'
                  : 'bg-transparent text-[var(--hp-ink-soft)] border-[var(--hp-line)] hover:border-[var(--hp-burgundy)]'
              }`}
            >
              {c}
            </button>
          ))}
          <span className="ml-auto text-[11px] uppercase tracking-[0.22em] text-[var(--hp-muted)]">
            {filtered.length} items · GBP
          </span>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Products */}
          <div className="lg:col-span-2">
            {loading ? (
              <p className="text-[var(--hp-muted)]">Loading…</p>
            ) : filtered.length === 0 ? (
              <div className="hp-card p-10 text-center text-[var(--hp-muted)]" data-testid="shop-empty">
                No items in this category yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5" data-testid="shop-grid">
                {filtered.map((p) => (
                  <motion.div
                    key={p.id}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                    variants={fadeUp}
                    className="hp-card overflow-hidden flex flex-col"
                    data-testid={`shop-product-${p.id}`}
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-[var(--hp-blush)]">
                      {p.image && <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-cover" />}
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--hp-bronze)] mb-1">{p.category}</p>
                      <h3 className="text-lg text-[var(--hp-burgundy-deep)] mb-2 leading-tight">{p.name}</h3>
                      {p.description && (
                        <p className="text-xs text-[var(--hp-ink-soft)] font-light leading-relaxed mb-4 line-clamp-3">{p.description}</p>
                      )}
                      <div className="mt-auto flex items-center justify-between gap-3">
                        <span className="text-xl text-[var(--hp-burgundy)] font-medium">£{Number(String(p.price).replace(/[£$,]/g, '')).toFixed(2)}</span>
                        <Button
                          onClick={() => { addItem(p); toast.success(`${p.name} added`); }}
                          className="bg-[var(--hp-burgundy)] text-[var(--hp-ivory)] hover:bg-[var(--hp-wine)] rounded-none text-[10px] uppercase tracking-[0.2em] px-4 py-2 h-auto"
                          data-testid={`shop-add-${p.id}`}
                        >
                          <Plus className="h-3 w-3 mr-1.5" /> Add
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Cart */}
          <aside className="lg:sticky lg:top-28 hp-card p-6" data-testid="shop-cart">
            <div className="flex items-center gap-2 mb-5">
              <ShoppingCart className="h-4 w-4 text-[var(--hp-burgundy)]" />
              <h2 className="text-lg uppercase tracking-[0.18em] text-[var(--hp-burgundy)]">Cart ({count})</h2>
            </div>

            {items.length === 0 ? (
              <p className="text-sm text-[var(--hp-muted)] font-light italic" data-testid="cart-empty">
                Your cart is empty. Add a platter or two — your future self will thank you.
              </p>
            ) : (
              <>
                <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1 -mr-1 mb-5">
                  {items.map((it) => (
                    <div key={it.id} className="flex gap-3 pb-4 border-b border-[var(--hp-line-soft)] last:border-b-0" data-testid={`cart-item-${it.id}`}>
                      <div className="w-16 h-16 bg-[var(--hp-blush)] overflow-hidden shrink-0">
                        {it.image && <img src={it.image} alt="" className="w-full h-full object-cover" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[var(--hp-burgundy-deep)] leading-tight mb-1">{it.name}</p>
                        <div className="flex items-center justify-between mt-1">
                          <div className="flex items-center border border-[var(--hp-line)]">
                            <button onClick={() => setQuantity(it.id, it.quantity - 1)} className="px-2 py-1 text-[var(--hp-burgundy)]" data-testid={`cart-dec-${it.id}`}>
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-3 text-sm">{it.quantity}</span>
                            <button onClick={() => setQuantity(it.id, it.quantity + 1)} className="px-2 py-1 text-[var(--hp-burgundy)]" data-testid={`cart-inc-${it.id}`}>
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <span className="text-sm text-[var(--hp-burgundy)]">£{(it.price * it.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                      <button onClick={() => removeItem(it.id)} className="text-[var(--hp-muted)] hover:text-[var(--hp-hibiscus)] self-start" data-testid={`cart-remove-${it.id}`}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[var(--hp-line-soft)] pt-4 space-y-3">
                  {/* Delivery method */}
                  <div className="space-y-2 mb-3" data-testid="cart-delivery">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--hp-bronze)]">Delivery</p>
                    <label className={`flex items-center gap-2 text-sm cursor-pointer ${method==='pickup'?'text-[var(--hp-burgundy)]':'text-[var(--hp-ink-soft)]'}`}>
                      <input type="radio" name="method" value="pickup" checked={method==='pickup'} onChange={() => setMethod('pickup')} className="accent-[var(--hp-burgundy)]" data-testid="delivery-pickup" disabled={allEvents} />
                      Collection at market <span className="text-[var(--hp-muted)] ml-auto">Free</span>
                    </label>
                    <label className={`flex items-center gap-2 text-sm cursor-pointer ${!canShip?'opacity-40':''} ${method==='ship'?'text-[var(--hp-burgundy)]':'text-[var(--hp-ink-soft)]'}`}>
                      <input type="radio" name="method" value="ship" checked={method==='ship'} onChange={() => setMethod('ship')} className="accent-[var(--hp-burgundy)]" data-testid="delivery-ship" disabled={!canShip} />
                      UK shipping (Royal Mail) <span className="text-[var(--hp-muted)] ml-auto">{total>=SHIP_FREE_THRESHOLD?'Free':`£${SHIP_FLAT.toFixed(2)}`}</span>
                    </label>
                    {hasSnacks && <p className="text-[10px] text-[var(--hp-muted)] italic">Snacks are collection-only (made fresh).</p>}
                    {!hasSnacks && total < SHIP_FREE_THRESHOLD && method === 'ship' && (
                      <p className="text-[10px] text-[var(--hp-bronze)]">Add £{(SHIP_FREE_THRESHOLD-total).toFixed(2)} more for free UK shipping.</p>
                    )}
                  </div>

                  {/* Shipping address fields */}
                  {method === 'ship' && (
                    <div className="space-y-2 pt-2 border-t border-[var(--hp-line-soft)]" data-testid="cart-address">
                      <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--hp-bronze)]">Shipping address</p>
                      {[
                        { k: 'name', ph: 'Full name', testid: 'addr-name' },
                        { k: 'email', ph: 'Email', testid: 'addr-email' },
                        { k: 'phone', ph: 'Phone (optional)', testid: 'addr-phone' },
                        { k: 'line1', ph: 'Address line 1', testid: 'addr-line1' },
                        { k: 'line2', ph: 'Address line 2 (optional)', testid: 'addr-line2' },
                        { k: 'city', ph: 'City', testid: 'addr-city' },
                        { k: 'postcode', ph: 'Postcode', testid: 'addr-postcode' },
                      ].map(f => (
                        <input
                          key={f.k}
                          type={f.k==='email'?'email':'text'}
                          placeholder={f.ph}
                          value={address[f.k]}
                          onChange={(e) => setAddress(a => ({ ...a, [f.k]: e.target.value }))}
                          className="w-full bg-[var(--hp-ivory)] border border-[var(--hp-line)] rounded-none px-3 py-2 text-sm focus:border-[var(--hp-burgundy)] focus:outline-none"
                          data-testid={f.testid}
                        />
                      ))}
                    </div>
                  )}

                  <div className="flex justify-between text-sm pt-2">
                    <span className="text-[var(--hp-muted)] uppercase tracking-[0.18em] text-[10px]">Subtotal</span>
                    <span className="text-[var(--hp-ink)]" data-testid="cart-subtotal">£{total.toFixed(2)}</span>
                  </div>
                  {method === 'ship' && (
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--hp-muted)] uppercase tracking-[0.18em] text-[10px]">Shipping</span>
                      <span className="text-[var(--hp-ink)]" data-testid="cart-shipping">{shipping===0?'FREE':`£${shipping.toFixed(2)}`}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-[var(--hp-line-soft)] pt-2">
                    <span className="text-[var(--hp-muted)] uppercase tracking-[0.18em] text-[10px]">Total</span>
                    <span className="text-[var(--hp-burgundy)] text-lg" data-testid="cart-total">£{grandTotal.toFixed(2)}</span>
                  </div>
                  <Button
                    onClick={handleCheckout}
                    disabled={checkingOut}
                    className="w-full bg-[var(--hp-burgundy)] text-[var(--hp-ivory)] hover:bg-[var(--hp-wine)] rounded-none text-[11px] uppercase tracking-[0.2em] py-5 disabled:opacity-60"
                    data-testid="cart-checkout-btn"
                  >
                    {checkingOut ? 'Redirecting…' : (<><span>Pay with Stripe</span><ArrowRight className="ml-2 h-3.5 w-3.5" /></>)}
                  </Button>
                  <button
                    onClick={clear}
                    className="w-full text-[10px] uppercase tracking-[0.22em] text-[var(--hp-muted)] hover:text-[var(--hp-burgundy)] py-2"
                    data-testid="cart-clear-btn"
                  >
                    Clear cart
                  </button>
                  <p className="text-[10px] text-[var(--hp-muted)] text-center mt-2">Secure payment via Stripe · GBP · No card details stored.</p>
                </div>
              </>
            )}
          </aside>
        </div>
      </section>

      <Footer />
    </div>
  );
}
