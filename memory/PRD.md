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
- **Email:** emeraldofworship@hibiscusplus.co.uk
- **Phone:** 07508597742
- **Tagline:** Boldly Spiced. Beautifully Balanced.

## Design System
- **Theme:** Dark Moody Luxury
- **Fonts:** Cormorant Garamond (headings), Manrope (body)
- **Colours:** #0A0507 (background), #C9A96E (gold), #F7F0E3 (cream), #C41E3A (crimson), #6B1D3A (burgundy)
- **Target:** Premium 1% upper-class men, women, families, businesses
- **Style:** Fortnum & Mason / Harrods food hall aesthetic

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
- Premium dark luxury redesign (complete frontend overhaul)
- Hero section with cinematic typography and moody imagery
- Product showcase with AI-generated luxury matte black pouch mockups
- Feedback page with QR code for Chester event + star rating + blend selection
- Research-backed recipe collection (12 recipes, 6 signature Zobo with beetroot)
- Newsletter subscription
- Shopify shop integration (external link)
- Full branding consistency (no old "Hibiscus & Beyond" references)
- Contact info updated across site
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
| `/` | Home (premium) | Yes |
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
- **P1:** Build Admin Panel for content management
- **P1:** Deploy to Vercel via GitHub
- **P2:** Full Recipes page (dedicated page showing all 12 recipes with filters)
- **P2:** Full Blog page (dedicated page for articles)
- **P3:** Nigerian Snacks expansion

## Logos
- **Logo 1 (Light):** Website, tea packaging, digital — customer-assets URL
- **Logo 2 (Dark):** Market stalls, signage, physical branding — customer-assets URL
