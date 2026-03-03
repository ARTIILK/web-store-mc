import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock, Zap, Gift, ArrowRight, ShoppingCart, Crown, Check } from 'lucide-react';
import { useCartStore } from '../store';
import { cn } from '../utils/cn';

const offers = [
  {
    id: 'offer_winter',
    name: 'Winter Bundle',
    originalPrice: 49.99,
    price: 34.99,
    discount: 30,
    endTime: new Date(Date.now() + 86400000 * 3).getTime(), // 3 days from now
    color: 'from-blue-500 to-cyan-400',
    icon: Gift,
    description: 'Get the MVP rank, 5x Mythic Crates, and exclusive Winter cosmetics.',
    items: ['MVP+ Rank (Lifetime)', '5x Mythic Crates', 'Winter Aura Cosmetic', 'Snowman Pet']
  },
  {
    id: 'offer_starter',
    name: 'Starter Pack',
    originalPrice: 19.99,
    price: 9.99,
    discount: 50,
    endTime: new Date(Date.now() + 86400000 * 1).getTime(), // 1 day from now
    color: 'from-green-500 to-emerald-400',
    icon: Zap,
    description: 'Everything you need to start your journey on WinterMC.',
    items: ['VIP Rank (30 Days)', 'Starter Kit', '10,000 In-game Money', '3x Rare Crates']
  },
  {
    id: 'offer_god',
    name: 'God Tier Bundle',
    originalPrice: 99.99,
    price: 79.99,
    discount: 20,
    endTime: new Date(Date.now() + 86400000 * 7).getTime(), // 7 days from now
    color: 'from-purple-600 to-pink-500',
    icon: Crown,
    description: 'The ultimate package for the most dedicated players.',
    items: ['Legend Rank (Lifetime)', 'God Kit', '10x Mythic Crates', 'Exclusive "God" Title', 'Custom Join Message']
  }
];

export default function Offers() {
  const { addItem, toggleCart } = useCartStore();
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAddToCart = (offer: typeof offers[0]) => {
    addItem({
      id: offer.id,
      name: offer.name,
      price: offer.price,
      type: 'offer'
    });
    toggleCart();
  };

  const formatTime = (ms: number) => {
    if (ms <= 0) return 'Expired';
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mc-orange/20 border border-mc-orange/50 text-mc-orange text-sm font-bold uppercase tracking-wider mb-6 animate-pulse"
        >
          <Zap size={16} />
          Limited Time Offers
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-display font-black text-white mb-4"
        >
          Special <span className="text-gradient">Deals</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 max-w-2xl mx-auto text-lg"
        >
          Grab these exclusive bundles before they're gone! Massive discounts on ranks, crates, and cosmetics.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {offers.map((offer, index) => {
          const timeLeft = offer.endTime - now;
          const isExpired = timeLeft <= 0;
          const Icon = offer.icon;

          return (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className={cn(
                "glass-card rounded-3xl p-8 relative flex flex-col h-full border-2 transition-all duration-300 overflow-hidden group",
                isExpired ? "opacity-50 grayscale border-white/5" : "border-mc-orange/30 hover:border-mc-orange/60 shadow-[0_0_20px_rgba(234,88,12,0.1)]"
              )}
            >
              {/* Discount Badge */}
              {!isExpired && (
                <div className="absolute top-4 right-4 w-16 h-16 bg-mc-orange rounded-full flex items-center justify-center text-white font-black text-xl shadow-lg transform rotate-12 group-hover:scale-110 transition-transform">
                  -{offer.discount}%
                </div>
              )}

              {/* Background Glow */}
              <div className={cn(
                "absolute top-0 left-0 w-full h-32 opacity-20 blur-3xl rounded-full -translate-y-1/2 transition-opacity group-hover:opacity-40",
                isExpired ? "bg-gray-500" : `bg-gradient-to-r ${offer.color}`
              )} />

              <div className="relative z-10 mb-6">
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg",
                  isExpired ? "bg-gray-700" : `bg-gradient-to-br ${offer.color}`
                )}>
                  <Icon size={32} className="text-white" />
                </div>
                <h2 className="text-3xl font-display font-bold text-white mb-2">{offer.name}</h2>
                <p className="text-gray-400 text-sm">{offer.description}</p>
              </div>

              {/* Timer */}
              <div className="mb-6 bg-mc-dark/50 rounded-xl p-4 border border-white/5 flex items-center justify-center gap-3">
                <Clock size={20} className={isExpired ? "text-gray-500" : "text-mc-orange animate-pulse"} />
                <span className={cn(
                  "font-mono font-bold text-lg tracking-wider",
                  isExpired ? "text-gray-500" : "text-mc-orange"
                )}>
                  {formatTime(timeLeft)}
                </span>
              </div>

              {/* Items List */}
              <div className="flex-grow space-y-3 mb-8">
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Bundle Includes</h4>
                {offer.items.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-1 bg-white/10 rounded-full p-0.5">
                      <Check size={12} className="text-white" />
                    </div>
                    <span className="text-gray-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>

              {/* Pricing & Action */}
              <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 line-through font-medium">${offer.originalPrice.toFixed(2)}</span>
                  <span className="text-3xl font-black text-white">${offer.price.toFixed(2)}</span>
                </div>
                
                <button
                  onClick={() => !isExpired && handleAddToCart(offer)}
                  disabled={isExpired}
                  className={cn(
                    "px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all duration-300",
                    isExpired 
                      ? "bg-gray-700 text-gray-400 cursor-not-allowed" 
                      : "bg-mc-orange hover:bg-mc-orange/80 text-white shadow-lg hover:shadow-mc-orange/50 hover:scale-105"
                  )}
                >
                  <ShoppingCart size={18} />
                  {isExpired ? 'Ended' : 'Add to Cart'}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
