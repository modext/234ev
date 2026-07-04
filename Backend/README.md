# 234ev — Backend API

Express + Prisma + PostgreSQL API serving charging stations, maintenance shops,
tips, and crowdsourced submissions.

## 1. Local setup

```bash
npm install
cp .env.example .env
# Edit .env with a local Postgres connection string, e.g.:
# postgresql://postgres:postgres@localhost:5432/234ev?schema=public

npx prisma migrate dev --name init
npm run prisma:seed
npm run dev
```

API runs at `http://localhost:3001` (frontend uses 3000). Test it:

```bash
curl http://localhost:3001/health
curl "http://localhost:3001/api/stations?lat=6.5244&lng=3.3792&radiusKm=50"
```

## 2. Deploy to Railway

1. Repo is at `modext/234ev` — in Railway: **New Project → Deploy from GitHub repo**.
2. Set **Root Directory** to `Backend` in service Settings.
3. **Add a PostgreSQL plugin** to the project (Railway auto-injects `DATABASE_URL`).
4. `railway.toml` sets the start command to run migrations then start the server.
5. After first deploy, run the seed once via Railway shell: `npm run prisma:seed`
6. Grab your Railway URL in **Settings → Networking**.

## 3. API reference (v0)

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/stations?lat=&lng=&radiusKm=&city=&type=` | List/search stations |
| GET | `/api/stations/:id` | Station detail + recent reports |
| POST | `/api/stations/:id/report` | `{ working: bool, note? }` — quick status ping |
| GET | `/api/shops?lat=&lng=&radiusKm=&city=` | List/search shops |
| GET | `/api/shops/:id` | Shop detail + reviews |
| POST | `/api/shops/:id/reviews` | `{ rating, comment?, authorName? }` |
| GET | `/api/tips?category=` | List tips |
| POST | `/api/submissions` | Crowdsource a new station/shop/correction |
| GET | `/api/submissions?status=` | List submissions (build an admin screen around this) |
| POST | `/api/submissions/:id/approve` | Promote a submission into the live tables |

**Important before real launch:** the approve/reject submission endpoints have
no auth on them yet — that's fine for local testing, but lock them down (simple
API key or admin login) before deploying publicly, or anyone could approve junk data.

## 4. What to build next (in priority order)

1. Lock down `/api/submissions/:id/approve` and `/reject` behind admin auth.
2. Add image upload for stations/shops (Railway + S3-compatible storage like
   Cloudflare R2, or start simple with just a URL field).
3. Add a lightweight admin web page (even a simple HTML page hitting the
   submissions API) so you're not approving entries via curl.
4. Swap the Haversine-based "nearby" queries for PostGIS once your dataset
   grows past a few hundred rows — not needed yet at MVP scale.
