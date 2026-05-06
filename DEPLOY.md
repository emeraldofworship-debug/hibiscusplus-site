# HibiscusPlus — Deploy to Vercel

## TL;DR
Push to GitHub via the **"Save to Github"** button in the Emergent chat input → Vercel auto-deploys → live at your domain in ~2 min.

If Vercel shows a blank page or a 404, the fix is almost always one of three settings below.

---

## 1. One-time Vercel project settings

Open your project on **vercel.com → Settings**:

### Build & Development Settings
| Setting | Value |
|---|---|
| Framework Preset | **Other** (we configured manually via `vercel.json`) |
| Root Directory | **`./`** (leave blank, NOT `frontend`) |
| Build Command | (leave default — `vercel.json` controls it) |
| Output Directory | (leave default — `vercel.json` controls it) |
| Install Command | (leave default) |
| Node.js Version | **20.x** |

> The `vercel.json` at the repo root tells Vercel to `cd frontend && yarn build` and serve `frontend/build`. Do **not** also set Root Directory to `frontend` — that double-applies the path and breaks the build.

### Environment Variables
Add these under **Settings → Environment Variables** for **Production, Preview, and Development**:

| Key | Value |
|---|---|
| `REACT_APP_BACKEND_URL` | `https://tea-wellness-guide.preview.emergentagent.com` |
| `WDS_SOCKET_PORT` | `443` |
| `ENABLE_HEALTH_CHECK` | `false` |

> `REACT_APP_BACKEND_URL` is the most important one — without it the site loads but recipes/blog/newsletter calls fail.

After saving env vars, click **Deployments → ⋯ → Redeploy** on the latest deployment so they take effect.

---

## 2. Custom Domain (hibiscusplus.co.uk)

1. **Vercel → Domains → Add `hibiscusplus.co.uk`** (and `www.hibiscusplus.co.uk`)
2. Vercel shows the DNS records to add. Sign into **IONOS → Domains → hibiscusplus.co.uk → DNS**.
3. Add the records Vercel gave you. Typically:
   - `A` record `@` → `76.76.21.21`
   - `CNAME` record `www` → `cname.vercel-dns.com`
4. Wait 1–10 min for DNS to propagate. Vercel will issue the SSL automatically.

---

## 3. Backend (FastAPI) hosting

The frontend on Vercel calls `REACT_APP_BACKEND_URL`, which currently points at the Emergent preview backend. **The site works as-is** because the Emergent backend is publicly reachable.

When you're ready to fully own the backend (recommended for production), the easiest paths are:

### Option A — Railway (recommended, free tier)
1. Sign up at railway.app and connect your GitHub.
2. New project → Deploy from GitHub repo → pick this repo.
3. Add a **Root Directory** override of `backend`.
4. Set environment variables: `MONGO_URL`, `DB_NAME` (use MongoDB Atlas free tier).
5. Railway gives you a URL like `https://hibiscusplus-api.up.railway.app`.
6. Update Vercel's `REACT_APP_BACKEND_URL` to that URL → redeploy.

### Option B — Render (free tier)
1. render.com → New Web Service → Connect repo.
2. Root Directory: `backend`. Build: `pip install -r requirements.txt`. Start: `uvicorn server:app --host 0.0.0.0 --port $PORT`.
3. Add `MONGO_URL`, `DB_NAME`. Done.

### MongoDB
Use MongoDB Atlas free tier (cloud.mongodb.com). Create a cluster, add your Railway/Render IP (or `0.0.0.0/0` for simplicity), copy the connection string into `MONGO_URL`.

---

## 4. Common deployment failures & fixes

| Symptom | Fix |
|---|---|
| Blank white page | Root Directory is wrong — set it to `./` (blank), not `frontend` |
| 404 on `/recipes` direct visit | Missing rewrites — already handled in `vercel.json`, redeploy |
| Recipes/Blog show empty | `REACT_APP_BACKEND_URL` env var missing on Vercel — add it and redeploy |
| Build fails on `yarn install` | Bump Node version to 20.x in Vercel settings |
| CORS errors in browser console | Backend needs to allow your Vercel domain — update `CORS_ORIGINS` in `/app/backend/server.py` |

---

## 5. Local production build test

Run before deploying if you want to be paranoid:

```bash
cd /app/frontend
yarn build
npx serve -s build
# open http://localhost:3000
```

Last verified: ✅ build compiles in ~32s, 213KB JS + 14KB CSS gzipped.
