# WoodMC Dynamic Store Engine (V2)

A high-performance, data-driven Minecraft storefront designed for the WoodMC Network. This store features a "Zero-Code" philosophy where inventory and pricing are managed via a central CSV file, with a specialized interface for custom currency purchases.

## 🚀 Key Features

- **Custom Coin Engine**: Users can purchase specific amounts of WoodCoins at a fixed rate (20 Coins = ₹1 INR) using an interactive slider and preset system.
- **Category-Based Routing**: Clean separation between Homepage, Ranks, and Coins using React Router.
- **Performance Optimized**: 
  - Minimal Three.js overhead for low-end device compatibility.
  - Reduced visual effects (removed heavy tints and blurs) for a sharp, readable UI.
  - Grayscale and low-opacity 3D background to ensure zero color interference.
- **Advanced Checkout**: 
  - Dual-pane checkout modal with real-time order summary.
  - Manual payment mode with a "Copy Bill" feature for Discord-based verification.
  - Discord Webhook integration for instant order notifications.
- **Responsive Design**: Fully compatible with desktop, tablet, and mobile devices.

## 🛠 Tech Stack

- **Frontend**: React 19, TypeScript, Vite 6, Tailwind CSS 4, Framer Motion.
- **Backend**: Express.js (Node.js).
- **Icons**: Lucide React.
- **Data Source**: CSV-based inventory system (`public/data/store.csv`).

## 📂 Project Structure

- `src/pages/`: Contains the main views (Home, Ranks, Coins).
- `src/components/`: Reusable UI components like the Navbar, ProductCards, and Modals.
- `src/context/`: Global state management for the shopping cart.
- `server/`: Backend logic for handling checkout requests and Discord notifications.
- `public/data/store.csv`: The primary data source for rank listings.

## ⚙️ Setup & Configuration

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Create a `.env` file based on `.env.example`:
   - `PORT`: Backend server port (default: 3001).
   - `DISCORD_WEBHOOK_URL`: Your Discord channel webhook for orders.

3. **Development**:
   - Start Frontend: `npm run dev` (Runs on port 5000).
   - Start Backend: `npm run server` (Runs on port 3001).

## 🛡 Disclaimer

WoodMC is not affiliated with Mojang AB or Microsoft. All purchases go towards supporting the WoodMC Network development and maintenance.

---
Developed for WoodMC Network.
