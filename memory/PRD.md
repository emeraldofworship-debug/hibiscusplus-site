# HibiscusPlus Limited — Product Requirements Document

## Original Problem Statement
Build a comprehensive premium wellbeing website for **HIBISCUSPLUS LIMITED** (Company No. 17024055), a Manchester UK-based luxury artisanal tea wellness brand targeting the premium 1% upper-class audience.

## Business Details
- **Company Name:** HIBISCUSPLUS LIMITED
- **Company Number:** 17024055
- **Location:** Manchester, UK
- **Domain:** hibiscusplus.co.uk (registered via IONOS)
- **Shopify:** https://admin.shopify.com/store/hibiscusplus-limited
- **Instagram:** @hibiscusplus_ltd
- **TikTok:** @hibiscusplus
- **Email:** emeraldofworship@hibiscusplus.co.uk
- **Phone:** 07508597742
- **Tagline:** Boldly Spiced. Beautifully Balanced.

## Hosting & Deployment
- **Platform:** Vercel (connected via GitHub) for frontend, Emergent preview backend for now
- **vercel.json** at root (hardened 2026-02): build via `cd frontend && yarn install --frozen-lockfile && yarn build`, output `frontend/build`, immutable cache for `/static/*`, SPA rewrites that exclude static assets
- **Vercel project setup:** Root Directory = `./` (NOT `frontend`), Framework Preset = Other, Node 20.x
- **Required Vercel env vars:** `REACT_APP_BACKEND_URL`, `WDS_SOCKET_PORT=443`, `ENABLE_HEALTH_CHECK=false`
- **Custom domain:** hibiscusplus.co.uk via IONOS DNS (A → 76.76.21.21, CNAME www → cname.vercel-dns.com)
- **Deploy guide:** see `/app/DEPLOY.md` for full step-by-step including troubleshooting + future Railway/Render migration for the backend
- **Last verified build:** 25.6s, 213KB JS + 14KB CSS gzipped

## Design System (Updated 2026-02 — Light Premium Pivot)
- **Theme:** Light Premium — warm cream + burgundy + bronze, inspired by the logo
- **Fonts:** Cormorant Garamond (headings), Manrope (body)
- **Colours (CSS vars in `index.css`):**
  - `--hp-cream: #FAF5EE` (background)
  - `--hp-cream-deep: #F4EADB` (alt section)
  - `--hp-blush: #F7E7DF` (accent surface)
  - `--hp-ivory: #FFFBF5` (cards)
  - `--hp-burgundy: #6B1D3A` (primary)
  - `--hp-wine: #8B2A4A` (hover)
  - `--hp-hibiscus: #C41E3A`
  - `--hp-bronze: #A67C3E`
  - `--hp-bronze-light: #C9A96E`
  - `--hp-ink: #2A1418` (text)
  - `--hp-ink-soft: #4A2D33`
  - `--hp-muted: #7A6257`
- **Target:** Premium 1% upper-class men, women, families, businesses
- **Style:** Fortnum & Mason / Harrods food hall aesthetic — now in daylight

## Signature Products (Ready for Production)
| Product | Subtitle | Ingredients | Image |
|---------|----------|-------------|-------|
| Metabo Ignite | Metabolism Support | Hibiscus, Green Tea, Ginger, Cinnamon, Clove | AI-generated mockup |
| Bloom & Flush | Digestive Detox | Hibiscus, Dandelion Leaf, Fennel Seeds, Peppermint, Ginger | AI-generated mockup |
| Glucose Guard | Crave Control | Hibiscus Petal, Cinnamon Bark, Chicory Root, Liquorice, Clove | AI-generated mockup |

## Events
- **Chester Tea Tasting:** Saturday, 9th May 2025
- **Feedback:** QR code on /feedback page links directly to feedback form

## What's Been Implemented
- **2026-02 Phase B — UK Shipping & Collection:** Delivery method radio on cart (Collection at market = free, UK Royal Mail shipping = £4.50, free over £40). Snacks are collection-only (perishable). Tea blends ship UK-wide. Events are tickets only. Server-side validation + 7-field UK address form. Total = subtotal + shipping. Stripe metadata includes delivery method, customer name & email, items summary.
- **2026-02 Phase C — Pluggable Notifications:** `notifications.py` module + `/api/admin/notifications` endpoint + `/admin/notifications` page (sidebar "Activity"). Wired to: order paid (customer + admin email), feedback submission, newsletter subscription. Falls back to MongoDB-only logging when RESEND_API_KEY is absent — completely non-blocking. Admin sees activity feed + warning banner about email not yet configured. User can add Resend key any time via .env to enable real emails.
- **2026-02 Phase 4 — Shop activation (LIVE-READY):** Stripe Checkout integration via emergentintegrations, cart context with localStorage persistence, /shop public page, /shop/success polling page with idempotent status, /api/checkout/session + /api/checkout/status + /api/webhook/stripe + /api/admin/orders, payment_transactions collection. GBP only, server-side pricing authority.
- **2026-02 Phase 5 — Snacks & Tea catalogue:** 9 typed products in DB (3 tea blends + 5 snacks + 1 breakfast event). /shop filters auto-derive from category.
- **2026-02 Phase 3 — Logo upload (admin):** Admin paste-URL flow at /admin/branding, settings collection in DB, useLogo() hook updates Navbar/Footer/AdminLayout in real time.
- **2026-02 SEO basics:** robots.txt, sitemap.xml, proper title + meta description + Open Graph + Twitter cards in index.html.
- **2026-02 Light Premium Pivot + Multi-page Architecture:** All recipes/blog/markets/breakfast on dedicated routes with shared Navbar/Footer.
- **2026-02 Admin Panel Phase 2 + 2.5:** JWT auth, brute-force lockout, CRUD for recipes/products/blog, subscribers viewer + CSV export, feedback viewer with star ratings, change password flow, orders viewer with revenue.
- A4 letterhead PDF download
- Newsletter subscriptions, feedback form with QR code + 5-star ratings
- Dynamic admin-controlled logo across the entire site

## Tech Stack
- **Frontend:** React, Framer Motion, TailwindCSS, Shadcn UI, qrcode.react
- **Backend:** FastAPI, Pydantic
- **Database:** MongoDB (motor async driver)
- **Hosting Plan:** Vercel (user's choice)
- **E-commerce:** Shopify (external)

## API Endpoints
- `GET /api/recipes` — All recipes
- `GET /api/products` — All products
- `GET /api/blog` — Blog posts
- `POST /api/newsletter/subscribe` — Newsletter signup
- `POST /api/feedback` — Submit event feedback
- `GET /api/feedback` — Retrieve all feedback
- `GET /api/download/letterhead` — Download letterhead PDF

## Pages & Routes
| Route | Page | Public Nav |
|-------|------|------------|
| `/` | Home (premium light) | Yes |
| `/recipes` | Recipes (search + filters) | Yes |
| `/blog` | Blog (featured + filters) | Yes |
| `/markets` | Market Stalls + Juices | Yes |
| `/breakfast` | Premium Nigerian Breakfast | Yes |
| `/feedback` | Event Feedback + QR | Yes |
| `/brand-assets` | Brand Assets (both logos) | Yes (footer) |
| `/checklist` | LaunchChecklist | Hidden |
| `/suppliers` | Suppliers | Hidden |
| `/email-templates` | EmailTemplates | Hidden |
| `/logo-guide` | LogoGuide | Hidden |
| `/pre-launch` | PreLaunchChecklist | Hidden |
| `/manufacturer-docs` | ManufacturerDocs | Hidden |
| `/company-setup` | CompanySetupGuide | Hidden |
| `/social-media` | SocialMediaGuide | Hidden |

## Upcoming Tasks
- **P1:** Deploy to Vercel via GitHub (frontend ready; backend serverless setup needed)
- **P1:** Build Admin Panel for content management (recipes/products/blogs CRUD)
- **P2:** Logo upload feature (allow user to update logo via UI)
- **P2:** Activate shop functionality (Stripe payment gateway, Shopify deeper integration)
- **P3:** Nigerian Snacks shop expansion

## Logos
- **Logo 1 (Light):** Website, tea packaging, digital — customer-assets URL
- **Logo 2 (Dark):** Market stalls, signage, physical branding — customer-assets URL
