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
- **2026-02 Light Premium Pivot:** Replaced dark luxury (#0A0507) theme with warm cream + burgundy palette derived from the logo. Updated `index.css`, all pages, and shared `Navbar`/`Footer` components.
- **Multi-page architecture:** Extracted Recipes, Blog, Markets, and Breakfast into dedicated pages. Home is now a leaner overview with CTA tiles linking out.
- **5 new AVIF lifestyle images integrated:** Mug with petals (hero + blog), tea by window (blog hero), pouch/bowl (markets hero), red pitcher (recipes hero), amber tea (breakfast hero). Centralised in `/app/frontend/src/assets/images.js`.
- Shared `Navbar.js` (sticky, scroll-aware, mobile menu) and `Footer.js` reused across all public pages.
- `ScrollManager` in `App.js` resets scroll on route change and supports anchor links (e.g. `/#shop`).
- Recipes page: live search, category filters, beetroot badge, benefits chips (handles both array and CSV string from API).
- Blog page: featured-first layout, category filter, search, newsletter signup.
- Markets page: locations grid, full menu, juices section, Christmas teaser.
- Breakfast page: signature plate spotlight, dishes grid, value props, signup.
- Hero section with cinematic typography (logo-derived burgundy on cream)
- Product showcase with AI-generated luxury matte black pouch mockups
- Feedback page with QR code for Chester event (9th May) + star rating + blend selection (relit to new theme)
- Research-backed recipe collection (12 recipes, 6 signature Zobo with beetroot)
- Newsletter subscription
- Shopify shop integration (external link)
- Full branding consistency
- Contact info: emeraldofworship@hibiscusplus.co.uk, 07508597742, @hibiscusplus_ltd
- Internal guidance pages hidden from public navigation
- A4 letterhead PDF (downloadable via /api/download/letterhead)

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
