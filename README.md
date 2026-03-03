# 🌲 WoodMC Dynamic Store Engine (V2)

A completely rebuilt, data-driven Minecraft store frontend. This version is powered by a central CSV architecture, allowing for instantaneous updates without code modification.

## 🎯 The "Zero-Code" Philosophy
This storefront is designed so that store administrators can manage the entire inventory using only a spreadsheet. 
- **Change a Price**: Edit `store.csv` → Site updates.
- **Add a Rank**: New row in `store.csv` → Appears instantly.
- **Create a Sale**: Update `badge` or `limited` column → UI reacts.

## ✨ Core Features
- **📊 CSV Engine**: Integrated `PapaParse` for high-performance data hydration.
- **🏷️ Dynamic Categorization**: Automatically groups products into "Ranks", "Special", etc.
- **🛒 Context Cart**: Custom state management for a fluid shopping experience.
- **💎 Premium Minecraft UI**: Dark theme, gold gradients, and motion-enhanced cards.
- **📱 Responsive Layout**: Pixel-perfect on mobile, tablet, and desktop.

## 🛠️ Data Structure (`store.csv`)
| Column | Description |
| :--- | :--- |
| `id` | Unique identifier |
| `category` | Controls which section the item appears in |
| `name` | Product title |
| `price_inr` | Cost in ₹ (INR) |
| `coins` | Bonus store coins (if applicable) |
| `description` | Short marketing text |
| `image` | Filename in `src/preview/` |
| `badge` | e.g., "HOT", "SALE" (Optional) |
| `limited` | Set "true" to show "Removing Soon" warning |
| `features` | Semi-colon separated list (e.g., "Sharp IV;Unb III") |

## 🚀 Technical Implementation
- **Vite 6** & **React 19**
- **Tailwind CSS 4** (Utility-first styling)
- **Framer Motion** (Fluid animations)
- **Lucide React** (Consistent iconography)
- **PapaParse** (CSV Parsing)

## 📁 Updated Structure
```text
src/
├── components/     # Navbar, Cart, Product Cards, Modals
├── context/        # StoreContext (Global State & Cart Logic)
├── data/           # store.csv (The ONLY data source)
├── pages/          # Layout and Sections
├── utils/          # CSV utility functions
└── index.css       # Premium Design Tokens
```

---
Developed by Antigravity for WoodMC Network.
