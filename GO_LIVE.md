# HibiscusPlus — Go-Live Checklist (hibiscusplus.co.uk)

> **Status: ready to push.** Frontend tested 100%, backend tested 100% (iteration_7).
> Last build verified: 25s, 218KB JS / 14KB CSS gzipped.

## 0. Final pre-flight (5 min)

- [ ] Save to GitHub via the chat input button → Vercel auto-builds
- [ ] Confirm Vercel build is green (Deployments tab → green check)
- [ ] Verify `REACT_APP_BACKEND_URL` is set in Vercel env vars (you've already done this)

---

## 1. Connect hibiscusplus.co.uk → Vercel via IONOS DNS (15 min)

### Step 1 — Add domain to Vercel
1. Vercel project → **Settings → Domains**
2. Type: `hibiscusplus.co.uk` → **Add**
3. Repeat for `www.hibiscusplus.co.uk`
4. Vercel will display the DNS records you need. **Keep this tab open.**

### Step 2 — Update IONOS DNS

Sign in to **ionos.co.uk → Domains & SSL → hibiscusplus.co.uk → DNS**.

You'll see a list of existing records. **Delete or modify** the existing `A` record for `@` and the existing `CNAME` for `www`. Then add these:

| Type | Host name | Points to | TTL |
|---|---|---|---|
| `A` | `@` | `76.76.21.21` | 1 hour |
| `CNAME` | `www` | `cname.vercel-dns.com` | 1 hour |

> **DO NOT** leave the IONOS "default" parking page A record. Vercel must own the A record at the root.

### Step 3 — Wait & verify
- DNS propagation typically takes 5–30 min (worst case 24 hours).
- Refresh the Vercel **Domains** tab — both domains should show a green checkmark.
- Vercel auto-issues a free Let's Encrypt SSL certificate (no action needed from you).
- Test in browser: `https://hibiscusplus.co.uk` should load your light premium homepage.

### Step 4 — Set the canonical domain
1. In Vercel **Domains**, pick the version you want as the primary (recommend `hibiscusplus.co.uk` without www).
2. Click the ⋯ next to the other variant → **Redirect to** → pick the primary.
3. Result: anyone visiting `www.hibiscusplus.co.uk` gets 308-redirected to `hibiscusplus.co.uk`. Better for SEO.

### Common IONOS gotchas
- IONOS sometimes hides DNS settings under "DNS Settings" or "Manage DNS records" — it varies. Look for any link saying *"DNS"*.
- If IONOS won't let you delete the default A record, just **edit** it and replace the IP with `76.76.21.21`.
- If you have email hosted at IONOS (`@hibiscusplus.co.uk`), **do not touch** the `MX` records — only A + CNAME.
- If the domain shows "DNSSEC enabled" you may need to disable it temporarily for the DNS change to propagate cleanly.

---

## 2. Shopify integration — current status

**Q:** Have you integrated/redirected Shopify to hibiscusplus.co.uk?

**A:** No, and that's deliberate. Here's the current setup:

| Product | Where it sells | Payment processor |
|---|---|---|
| Tea blends (Metabo Ignite, Bloom & Flush, Glucose Guard) | `/shop` on hibiscusplus.co.uk | **Stripe** |
| Snacks (Puff Puff, Akara, Samosa, Spring Rolls, Platter) | `/shop` on hibiscusplus.co.uk | **Stripe** |
| Tasting events (Breakfast, Chester) | `/shop` on hibiscusplus.co.uk | **Stripe** |

Everything goes through your single Vercel-hosted shop with Stripe checkout. You don't currently need Shopify — Stripe handles the GBP card payments, and you get the orders dashboard at `/admin/orders`.

### If you want to ALSO use Shopify (e.g. for fulfilment / shipping logistics)

Three options:

1. **Don't (recommended for tonight's launch):** Stripe + your own admin handles 100% of orders. Add Shopify later when volume justifies it.

2. **Subdomain split:** Point `shop.hibiscusplus.co.uk` at Shopify, keep main domain on Vercel.
   - In IONOS: add CNAME `shop` → `shops.myshopify.com` (Shopify will give you the exact target).
   - In Shopify admin → Settings → Domains → Connect existing domain → enter `shop.hibiscusplus.co.uk`.
   - Update your "Order Now" buttons to link to `https://shop.hibiscusplus.co.uk` for the products you want sold there.

3. **Full Shopify takeover:** Replace Stripe checkout entirely. Not recommended — you'd lose the bespoke premium UX and pay Shopify monthly fees on top of payment fees.

> If you want option 2, just say "**connect Shopify subdomain**" and I'll update the Order Now buttons + give you the exact Shopify config steps.

---

## 3. What's been bundled with this release

### Public site (`hibiscusplus.co.uk`)
- Light premium theme (cream + burgundy)
- Multi-page architecture: Home / Shop / Recipes / Markets / Breakfast / Blog / Feedback
- Stripe-powered shop with cart, GBP checkout, order success page
- 9 products live: 3 tea blends + 5 snacks + 1 breakfast event
- SEO: `<title>`, meta description, Open Graph + Twitter cards, `robots.txt`, `sitemap.xml`
- Dynamic admin-controlled logo (no redeploys needed to swap logos)

### Admin panel (`/admin/login`)
- 8 sections: Dashboard / Recipes / Products / Blog / Orders / Subscribers / Feedback / Branding
- CRUD for content, CSV export for newsletter subscribers
- Orders viewer with revenue total
- Self-service password change
- Brute-force lockout (5 wrong attempts → 15 min)

### Backend (FastAPI + MongoDB)
- 30+ tested endpoints
- JWT bearer auth (24h tokens)
- Stripe Checkout via emergentintegrations
- Idempotent payment status polling
- Settings doc for live brand updates

---

## 4. Known limitations (post-launch backlog)

- Backend still on Emergent preview URL (totally fine for launch — handles many concurrent users). Migrate to Railway/Render when you outgrow it (DEPLOY.md has steps).
- Cart is browser-local (not synced across devices). Standard pattern; upgrade later if needed.
- No email notifications on order yet (admin viewer only). Add Resend when ready.
- Tea blend products in `/shop` are basic; future improvement is adding Stripe Tax + shipping address collection at checkout.
