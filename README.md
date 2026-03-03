# 🌲 WoodMC Official Web Store

![WoodMC Banner](/src/logo/woodmc.png)

A premium, high-performance Minecraft web store built with modern web technologies. Designed for seamless user experience, stunning visuals, and powerful administrative control.

## ✨ Features

- **🛡️ 3D Armor Previews**: Interactive 3D models for kits using Three.js and React Three Fiber.
- **💎 Premium Ranks System**: Multi-tier rank system (Hero, Jerry, Lion, Titan, Wood+) with detailed perk displays.
- **🎁 Special Packages**: Limited-time offers and bundled deals with countdown/warning indicators.
- **📊 Admin Panel**: Comprehensive dashboard for analytics, managing kits, ranks, and monitoring orders.
- **👤 Player Dashboard**: Personalized profile area showing active ranks, playtime, and purchase history.
- **🛒 Shopping Cart**: Fluid, side-panel cart implementation with real-time updates and multi-currency support.
- **⚡ High Performance**: Built with Vite and React 19 for instantaneous page loads and smooth animations.
- **🎨 Premium Aesthetics**: Glassmorphism, animated gradients, and custom Minecraft-themed UI components.

## 🚀 Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Animations**: [Motion](https://motion.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **3D Rendering**: [Three.js](https://threejs.org/) & [React Three Fiber](https://r3f.docs.pmnd.rs/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: [Zustand](https://docs.pmnd.rs/zustand/)
- **Routing**: [React Router 7](https://reactrouter.com/)

## 📁 Project Structure

```text
src/
├── components/     # Reusable UI components (Cart, Navbar, 3D Previews)
├── pages/          # Application views (Home, Ranks, Kits, Dashboard)
│   └── Admin/      # Admin Panel pages (Analytics, Management)
├── store/          # Zustand state stores (Cart, User, Currency)
├── logo/           # Branding and logo assets
├── preview/        # Rank and item preview images
├── utils/          # Helper functions and utilities
└── App.tsx         # Main application entry and routing
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## 📝 Configuration

- **Environment**: Copy `.env.example` to `.env` and configure your API endpoints/keys.
- **Pricing**: Manage item pricing and descriptions in `src/pages/Ranks.tsx` and `src/pages/Kits.tsx`.

---

Developed with ❤️ for the WoodMC Community.
