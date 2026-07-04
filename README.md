# 234ev

Monorepo for the 234ev app.

- `Frontend/` — Next.js web app (port 3000)
- `Backend/` — Express + Prisma + PostgreSQL API (port 3001)

## Local development

### 1. Start PostgreSQL

```bash
docker run -d --name 234ev-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=234ev \
  -p 5432:5432 \
  postgres:16-alpine
```

If the container already exists: `docker start 234ev-postgres`

### 2. Backend

```bash
cd Backend
npm install
cp .env.example .env
npx prisma migrate dev --name init
npm run prisma:seed
npm run dev
```

API: `http://localhost:3001/health`

### 3. Frontend

```bash
cd Frontend
npm install
cp .env.example .env.local
npm run dev
```

App: `http://localhost:3000`

## Deploy

### Backend → Railway

1. Go to [railway.app](https://railway.app) → **New Project → Deploy from GitHub repo** → select `modext/234ev`.
2. In the service **Settings → Source**, set **Root Directory** to `Backend`.
3. **Add PostgreSQL** to the project (Railway injects `DATABASE_URL` automatically).
4. Deploy uses `Backend/railway.toml` — migrations run on each deploy.
5. After first deploy, open the Railway shell and run once: `npm run prisma:seed`
6. Copy the public URL (e.g. `https://234ev-production.up.railway.app`).

### Frontend → Vercel

1. Go to [vercel.com](https://vercel.com) → **New Project → Import** `modext/234ev`.
2. Set **Root Directory** to `Frontend`.
3. Add environment variable:
   ```
   NEXT_PUBLIC_API_BASE_URL=https://your-railway-backend-url.up.railway.app
   ```
4. Deploy. Your app will be live at the Vercel URL.
