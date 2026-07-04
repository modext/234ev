# EV Naija — Web App

Next.js web companion: same data as the mobile app (map, shops, tips, submissions),
built for desktop/browser use and SEO discoverability.

## 1. Local setup

```bash
npm install
```

Create `.env.local`:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

(Once your backend is deployed to Railway, change this to your Railway URL or
`https://api.yourapp.com` once the domain is attached.)

Run it:

```bash
npm run dev
```

Visit `http://localhost:3001` (or whatever port it picks if 3000 is taken by
your backend — run backend and web app side by side on different ports).

## 2. Design notes

- **Palette:** warm off-white background, deep green primary (`#0B7A4B`),
  amber accent (`#F2A93B`) — reflects the app's actual job (charging = green,
  spark/energy = amber) rather than a generic SaaS blue.
- **Type:** Space Grotesk (headings) + Inter (body) + IBM Plex Mono (data —
  distances, coordinates, categories) — the mono type is deliberate: it signals
  "this is live infrastructure data" rather than marketing copy.
- **Signature element:** the plug/socket logo mark, and the pulsing radar ring
  on the user's own location dot on the map — ties the visual identity to the
  literal action the app helps with (finding a connection point).
- Map uses **Leaflet + OpenStreetMap** tiles (free, no API key needed) — no
  Google Maps billing setup required for the web version.

## 3. Deploy to Vercel

1. Push this folder to a GitHub repo (can be the same repo as the backend,
   in a subfolder, or a separate repo — either works).
2. In Vercel: **New Project → Import Git Repository**.
3. Set the environment variable `NEXT_PUBLIC_API_BASE_URL` in
   **Project Settings → Environment Variables** to your live Railway API URL.
4. Deploy. Then attach your domain: **Settings → Domains → Add** →
   `yourapp.com`, and add the DNS record Vercel gives you in Cloudflare.

## 4. What to build next

1. Add server-side rendering for the shops/stations lists (currently client-fetched)
   if SEO on individual listings matters to you — Next.js supports this per-page.
2. Add a shop/station detail page (`/shops/[id]`, `/stations/[id]`) with reviews.
3. Add basic form validation feedback beyond the browser's native `required`.
4. Consider a shared `types`/`schema` file between backend, mobile, and web so
   all three stay in sync as your data model grows.
