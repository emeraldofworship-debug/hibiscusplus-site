# HibiscusPlus Limited — Product Requirements Document

## Original Problem Statement
Build a comprehensive wellbeing website for **HIBISCUSPLUS LIMITED** (Company No. 17024055), a Manchester UK-based tea wellness brand. The website centres around hibiscus tea blends, including traditional Nigerian "Zobo" recipes, with research-backed health benefits.

## Business Details
- **Company Name:** HIBISCUSPLUS LIMITED
- **Company Number:** 17024055
- **Location:** Manchester, UK
- **Domain:** hibiscusplus.co.uk
- **Industry:** Food & Beverage / Wellness

## Core Requirements
1. **About Section** — Health benefits of hibiscus
2. **Tea Recipes** — Filtering, search, save, print. Includes signature Zobo recipes with beetroot
3. **Shop/Products** — Currently "Coming Soon" (pending city council registration)
4. **Blog** — Wellness articles
5. **Contact/Newsletter** — Signup form
6. **Guidance Documents** — Business setup guides, supplier docs, email templates
7. **Social Media Guide** — Platform setup guides for all major social channels

## Tech Stack
- **Frontend:** React, React Router, Axios, TailwindCSS, Shadcn UI
- **Backend:** FastAPI, Pydantic
- **Database:** MongoDB (motor async driver)

## What's Been Implemented
- Full-stack application with all core sections
- 12 tea recipes (6 general + 6 signature Zobo with research-backed benefits)
- 17 products in "Coming Soon" mode
- Blog section with articles
- Newsletter subscription
- Multiple guidance pages (LaunchChecklist, PreLaunchChecklist, CompanySetupGuide, ManufacturerDocs, EmailTemplates, Suppliers, BrandAssets, LogoGuide)
- Social Media & Email Setup Guide page
- Complete rebranding to "HibiscusPlus" (from former "Hibiscus & Beyond")

## Signature Zobo Recipes (Research-Backed)
| ID | Name | Beetroot | Key Benefit |
|----|------|----------|-------------|
| 7 | Original Hibiscus Wellness Zobo | Yes | Antioxidant, BP reduction, immunity |
| 8 | Vanilla Comfort Zobo | No | Stress relief, relaxation |
| 9 | Tropical Ginger Pineapple Zobo | Yes | Vitamin C, anti-inflammatory |
| 10 | Beetroot Lime Zobo Reviver | Yes | Heart health, nitric oxide, hydration |
| 11 | Spiced Cinnamon Vanilla Zobo | Yes | Digestive health, blood sugar |
| 12 | Citrus Lime Zing Zobo | Yes | Detox, immunity, energy |

## Upcoming Tasks (Prioritised)
- **P1:** Build Admin Panel for content management
- **P2:** Logo upload functionality
- **P2:** Activate shop with Stripe payment integration (blocked until user confirms readiness)
- **P3:** Add Nigerian Snacks category to shop

## API Endpoints
- `GET /api/recipes` — All recipes with filtering
- `GET /api/products` — All products
- `GET /api/blog` — Blog posts with pagination
- `POST /api/newsletter/subscribe` — Newsletter signup

## Key Pages & Routes
| Route | Page |
|-------|------|
| `/` | Home (all sections) |
| `/checklist` | LaunchChecklist |
| `/pre-launch` | PreLaunchChecklist |
| `/company-setup` | CompanySetupGuide |
| `/social-media` | SocialMediaGuide |
| `/brand-assets` | BrandAssets |
| `/suppliers` | Suppliers |
| `/email-templates` | EmailTemplates |
| `/logo-guide` | LogoGuide |
| `/manufacturer-docs` | ManufacturerDocs |
