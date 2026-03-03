import { ShoppingCart } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { motion } from 'motion/react';

export default function Navbar() {
  const { cart, setCartOpen } = useStore();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="fixed top-0 w-full z-50 glass-panel border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src="/src/logo/woodmc.png" alt="Logo" className="h-10 w-auto" />
          <span className="text-2xl font-display font-black tracking-tighter">
            WOOD<span className="text-mc-gold">MC</span>
          </span>
        </div>

        <button
          onClick={() => setCartOpen(true)}
          className="relative p-2 hover:bg-white/5 rounded-full transition-colors group"
        >
          <ShoppingCart className="text-gray-300 group-hover:text-mc-gold" />
          {cartCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 bg-mc-orange text-[10px] font-bold px-1.5 py-0.5 rounded-full neon-glow"
            >
              {cartCount}
            </motion.span>
          )}
        </button>
      </div>
    </nav>
  );
}
