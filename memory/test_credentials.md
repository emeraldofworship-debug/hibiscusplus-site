# HibiscusPlus — Test Credentials

> **Note:** These credentials are for local testing only. For production, change `ADMIN_PASSWORD` in `/app/backend/.env` (it is auto-applied on next backend restart via the idempotent admin seed in `server.py`).

## Admin Panel

- **URL:** `/admin/login` (e.g. `https://tea-wellness-guide.preview.emergentagent.com/admin/login`)
- **Email:** `emeraldofworship@hibiscusplus.co.uk`
- **Password:** `Hibiscus2025!`
- **Role:** `admin`

## Auth Endpoints (backend)

- `POST /api/admin/login` — body `{email, password}` → `{access_token, token_type, user}`
- `GET /api/admin/me` — requires `Authorization: Bearer <token>`
- `GET /api/admin/stats` — auth required

## Admin CRUD Endpoints (all require Bearer token)

- `POST/PUT/DELETE /api/admin/recipes[/:id]`
- `POST/PUT/DELETE /api/admin/products[/:id]`
- `POST/PUT/DELETE /api/admin/blog[/:id]`

## Token storage (frontend)

JWT is stored in `localStorage` under key `hp_admin_token`. Cleared on logout, on 401 from the API, or by clearing browser storage.

## Brute-force protection

5 failed login attempts from the same IP+email within 15 minutes triggers a 15-minute lockout (HTTP 429).
