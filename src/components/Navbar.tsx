import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, Crown, Zap, Home, Settings } from 'lucide-react';
import { useState } from 'react';
import { useCartStore, useUserStore } from '../store';
import { cn } from '../utils/cn';
import { motion, AnimatePresence } from 'motion/react';
import CurrencyToggle from './CurrencyToggle';

const navLinks = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Ranks', path: '/ranks', icon: Crown },
  { name: 'Special Packages', path: '/offers', icon: Zap },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { items, toggleCart } = useCartStore();
  const { username } = useUserStore();

  const cartItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="fixed top-0 w-full z-50 glass-panel border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src="/src/logo/woodmc.png" 
              alt="WoodMC Logo" 
              className="h-10 w-auto transition-all duration-300 group-hover:scale-110"
            />
            <span className="hidden sm:block font-display font-bold text-lg tracking-wider text-white group-hover:text-wood-light transition-colors">
              WOOD<span className="text-wood-accent">MC</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    "flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:text-mc-gold",
                    isActive ? "text-mc-gold" : "text-gray-300"
                  )}
                >
                  <Icon size={16} className={isActive ? "text-mc-gold" : "text-gray-400"} />
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <CurrencyToggle />
            
            {username ? (
              <>
                <Link to="/admin" className="p-2 text-gray-300 hover:text-yellow-500 transition-colors" title="Admin Panel">
                  <Settings size={20} />
                </Link>
                <Link to="/dashboard" className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors">
                  <div className="w-8 h-8 rounded-full bg-mc-brown border border-mc-gold/30 flex items-center justify-center overflow-hidden">
                    <img src={`https://minotar.net/helm/${username}/32.png`} alt={username} className="w-full h-full object-cover" />
                  </div>
                  {username}
                </Link>
              </>
            ) : (
              <Link to="/login" className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors">
                <User size={18} />
                Login
              </Link>
            )}

            <button
              onClick={toggleCart}
              className="relative p-2 text-gray-300 hover:text-mc-gold transition-colors"
            >
              <ShoppingCart size={24} />
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-5 w-5 items-center justify-center rounded-full bg-mc-orange text-[10px] font-bold text-white shadow-[0_0_10px_rgba(234,88,12,0.5)]">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleCart}
              className="relative p-2 text-gray-300 hover:text-mc-gold"
            >
              <ShoppingCart size={24} />
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-5 w-5 items-center justify-center rounded-full bg-mc-orange text-[10px] font-bold text-white">
                  {cartItemsCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel border-t border-white/10"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium transition-colors",
                      isActive ? "bg-mc-brown/50 text-mc-gold" : "text-gray-300 hover:bg-mc-brown/30 hover:text-white"
                    )}
                  >
                    <Icon size={20} className={isActive ? "text-mc-gold" : "text-gray-400"} />
                    {link.name}
                  </Link>
                );
              })}
              
              <div className="pt-4 mt-4 border-t border-white/10">
                {username ? (
                  <Link
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium text-gray-300 hover:bg-mc-brown/30 hover:text-white transition-colors"
                  >
                    <img src={`https://minotar.net/helm/${username}/32.png`} alt={username} className="w-6 h-6 rounded" />
                    Dashboard ({username})
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium text-gray-300 hover:bg-mc-brown/30 hover:text-white transition-colors"
                  >
                    <User size={20} className="text-gray-400" />
                    Login with Minecraft
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
