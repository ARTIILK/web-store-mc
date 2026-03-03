import { X, Trash2, ShoppingBag, ArrowRight, Shield } from 'lucide-react';
import { useCartStore, useCurrencyStore } from '../store';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../utils/cn';

export default function CartSidebar() {
  const { items, isOpen, toggleCart, removeItem, updateQuantity, total } = useCartStore();
  const { formatPrice } = useCurrencyStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-mc-dark border-l border-white/10 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 glass-panel">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-mc-gold" size={24} />
                <h2 className="text-xl font-display font-bold text-white">Your Cart</h2>
              </div>
              <button
                onClick={toggleCart}
                className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-50">
                  <ShoppingBag size={64} className="text-gray-500" />
                  <p className="text-lg text-gray-400 font-medium">Your cart is empty.</p>
                  <button
                    onClick={toggleCart}
                    className="text-mc-gold hover:text-mc-orange transition-colors font-medium"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={item.id}
                    className="flex items-center gap-4 p-4 rounded-xl glass-card relative group"
                  >
                    <div className="w-16 h-16 rounded-lg bg-mc-brown/80 border border-white/10 flex items-center justify-center overflow-hidden">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-10 h-10 bg-gradient-to-br from-mc-gold to-mc-orange rounded opacity-50" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-white font-medium truncate pr-4">{item.name}</h3>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-500 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 absolute top-4 right-4"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      
                      <p className="text-mc-gold font-bold">{formatPrice(item.price)}</p>
                      
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center bg-mc-dark rounded-lg border border-white/10 overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            -
                          </button>
                          <span className="px-3 py-1 text-sm font-medium text-white border-x border-white/10">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-white/10 glass-panel space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400 font-medium">Subtotal</span>
                  <span className="text-2xl font-display font-bold text-white">{formatPrice(total)}</span>
                </div>
                
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Discount Code"
                    className="w-full bg-mc-dark border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-mc-gold/50 transition-colors"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 text-sm font-medium text-mc-gold hover:text-mc-orange transition-colors">
                    Apply
                  </button>
                </div>

                <button className="w-full py-4 rounded-xl bg-gradient-to-r from-mc-gold to-mc-orange text-mc-dark font-bold text-lg flex items-center justify-center gap-2 neon-glow-hover transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]">
                  Proceed to Checkout
                  <ArrowRight size={20} />
                </button>
                
                <p className="text-center text-xs text-gray-500 flex items-center justify-center gap-2">
                  <Shield size={12} /> Secure checkout powered by Tebex
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
