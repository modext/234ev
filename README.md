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
