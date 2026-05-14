# HibiscusPlus — Product Requirements Document

## Original Problem Statement
Premium wellbeing website for HIBISCUSPLUS LIMITED. The site sells artisanal hibiscus tea blends and authentic Nigerian street food. Features include About, Tea Recipes, Shop/Products, Blog, Contact, Guidance documents, weekly market stalls, a Nigerian breakfast menu, custom PDF generation, premium branding, full Admin Panel, Stripe shop with UK shipping logic, event QR code generation, and production-stable backend hosting for live event use.

## Production Architecture (as of May 2026)
```
hibiscusplus.co.uk (Vercel — React frontend)
         ↓ REACT_APP_BACKEND_URL
hibiscusplus-backend-production.up.railway.app (Railway — FastAPI backend)
         ↓ MONGO_URL
cluster0.iwa2cni.mongodb.net (MongoDB Atlas — production DB "hibiscusplus")
```

## Tech Stack
- **Frontend**: React (CRA), React Router, TailwindCSS, Shadcn/UI components
- **Backend**: FastAPI, Motor (async MongoDB driver), PyJWT, bcrypt, emergentintegrations (Stripe)
- **DB**: MongoDB Atlas (production), MongoDB local (preview)
- **Hosting**: Vercel (frontend, custom domain via IONOS DNS), Railway (backend Dockerfile build)
- **Integrations**: Stripe (test mode), Resend (mocked until API key provided)

## Key Files
- `/app/Dockerfile` — Railway build (python:3.11-slim, no apt-get)
- `/app/railway.json` — Railway config (DOCKERFILE builder, /api/recipes healthcheck)
- `/app/vercel.json` — SPA routing fallback `/((?!api).*) → /index.html`
- `/app/backend/server.py` — FastAPI app with /api prefix, admin auth, Stripe, notifications
- `/app/backend/seed_all.py` — Atlas one-shot seeder (recipes + tea + snacks + admin)
- `/app/backend/notifications.py` — Resend-based notifications (logs to DB until key provided)

## Implemented Features
- Multi-page light-premium theme (burgundy/cream/rose-gold)
- Pages: Home, Shop, Recipes, Blog, Markets, Breakfast, About, Contact, LaunchList (QR), EventQR
- Full Admin Panel with JWT auth: Dashboard, CRUD for Recipes/Products/Blog/Orders/Newsletter/Feedback/Branding
- Stripe Checkout with UK shipping flat-rate (£4.50, free over £40) + collection option
- Newsletter signup + admin export
- Feedback collection + admin review
- Event QR code generation (`/launch-list`)
- Custom logo/branding upload via admin
- Production-stable backend on Railway (no cold starts)

## Data Model
- `recipes`, `products`, `blog_posts`, `newsletter_subscriptions`, `feedbacks`
- `admin_users`: `{email, password_hash, name, role, created_at}`
- `orders`: `{session_id, amount_total, currency, status, customer_details, line_items, created_at}`
- `notifications`: `{id, event_type, status, subject, message, created_at}`
- `settings`: `{logo_url, updated_at}`

## Roadmap (Prioritised)
### P1 — Next Up
- Switch Stripe to LIVE mode (user provides live secret key → set in Railway env `STRIPE_API_KEY`)
- Activate Resend email notifications (user creates Resend account, provides API key → set in Railway env `RESEND_API_KEY`)

### P2 — Backlog
- "Scanned at Event" attribution tracking on `/launch-list` (capture `?event=` param into subscriber/feedback records → surface in admin dashboard)
- Expand Nigerian Snacks inventory from full catalogue

### P3 — Future
- Shopify Lite (optional) for shipping label printing
- Speed Insights + Web Analytics on Vercel

## Resolved Issues (May 2026 session)
- ✅ Railway build failures: switched from Nixpacks → Dockerfile (`python:3.11-slim`)
- ✅ MongoDB Atlas TLS errors: added `0.0.0.0/0` to IP whitelist
- ✅ Startup KeyError on missing `password_hash`: added defensive `existing.get()` in `seed_admin_user`
- ✅ Admin doc field mismatch: repaired Atlas data (`hashed_password` → `password_hash`)
- ✅ Vercel SPA routing 404s on `/shop`, `/admin/login`, etc: removed `cleanUrls: true`, simplified rewrite to `/((?!api).*) → /index.html`
- ✅ 3 junk Railway services (`thorough-sparkle`, `hibiscusplus-frontend`, `hibiscusplus-site`) — user to delete

## Credentials & Endpoints
See `/app/memory/test_credentials.md`

## Last Verified Production State (May 14, 2026)
- All 7 frontend routes return HTTP 200
- API `/api/products` returns 15 items, `/api/recipes` returns 6 items
- Admin login issues valid JWT
- CORS preflight from `hibiscusplus.co.uk` passes
- Response time ~300ms (no cold start)
