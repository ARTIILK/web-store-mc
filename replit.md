# WoodMC Dynamic Store Engine (V2) - Vercel Refactor

This project is a high-performance Minecraft server web store built with React 19, TypeScript, and Tailwind CSS. It has been refactored for **Vercel Serverless** deployment.

## Architecture
- **Frontend**: React 19, Vite 6, Tailwind CSS 4, Framer Motion.
- **Backend**: Vercel Serverless Functions (Node.js).
- **Data**: CSV-based inventory system (`public/data/store.csv`).
- **Notifications**: Discord Webhook integration.

## Key Changes for Vercel
1. **Removed Express**: The persistent Express server and `server/` directory were deleted.
2. **Serverless API**: Created `/api/checkout.ts` to handle POST requests and Discord alerts.
3. **Relative Paths**: Frontend now calls `/api/checkout` instead of a local port.
4. **Environment Variables**: Uses `DISCORD_WEBHOOK_URL` from the environment.

## Getting Started
1. Install dependencies: `npm install`
2. Run development: `npm run dev`
3. Build for production: `npm run build`

## Deployment
Deploy to Vercel and ensure `DISCORD_WEBHOOK_URL` is set in the Project Settings.
