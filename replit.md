# WoodMC Dynamic Store Engine (V2)

A data-driven Minecraft storefront frontend for the WoodMC Network. Uses a "Zero-Code" CSV-driven inventory system.

## Architecture

- **Frontend**: React 19 + TypeScript + Vite 6 + Tailwind CSS 4 + Framer Motion + Three.js
- **Backend**: Express.js (Node.js) with Discord webhook integration
- **Data**: `public/data/store.csv` drives all store inventory and pricing

## Project Layout

```
/
├── src/              # React frontend source
│   ├── components/   # UI components (Navbar, ProductCard, Scene3D, etc.)
│   ├── context/      # StoreContext for cart state
│   ├── pages/        # Page layouts (Store.tsx)
│   └── utils/        # Helpers (csvParser, cn)
├── server/           # Express backend
│   └── index.ts      # POST /api/checkout endpoint
├── public/           # Static assets
│   └── data/
│       └── store.csv # Primary data source
├── vite.config.ts    # Vite config (port 5000, proxy /api -> localhost:3001)
└── package.json
```

## Workflows

- **Start application**: `npm run dev` — Vite frontend on port 5000 (webview)
- **Backend API**: `npm run server` — Express API on port 3001 (console)

## Environment Variables

Create a `.env` file (see `.env.example`):
- `PORT` — Backend port (default: 3001)
- `DISCORD_WEBHOOK_URL` — Discord webhook for order notifications

## Key Notes

- Frontend proxies `/api` requests to the backend at `localhost:3001`
- Store inventory is managed via `public/data/store.csv` — no code changes needed
- Discord webhook is optional; orders log to console if not configured
