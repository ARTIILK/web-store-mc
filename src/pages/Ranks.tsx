import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, Crown, ArrowRight, Shield, Zap } from 'lucide-react';
import { useCartStore } from '../store';
import { cn } from '../utils/cn';

const ranks = [
  {
    id: 'rank_starter',
    name: 'Starter',
    price: 9.99,
    color: 'from-green-400 to-emerald-600',
    textColor: 'text-emerald-400',
    icon: Shield,
    features: [
      'Green chat prefix',
      'Access to /kit starter',
      '3 Sethomes',
      'Keep XP on death',
      'Join full server'
    ],
    notIncluded: ['Fly mode', 'Custom tags', 'Nicknames', 'Daily rewards']
  },
  {
    id: 'rank_vip',
    name: 'VIP',
    price: 19.99,
    color: 'from-blue-400 to-indigo-600',
    textColor: 'text-blue-400',
    icon: Zap,
    popular: true,
    features: [
      'Blue chat prefix',
      'Access to /kit vip',
      '5 Sethomes',
      'Keep Inventory on death',
      'Join full server',
      'Custom tags (3)',
      'Daily rewards (Tier 1)'
    ],
    notIncluded: ['Fly mode', 'Nicknames']
  },
  {
    id: 'rank_mvp',
    name: 'MVP+',
    price: 34.99,
    color: 'from-mc-gold to-mc-orange',
    textColor: 'text-mc-gold',
    icon: Crown,
    features: [
      'Gold chat prefix',
      'Access to /kit mvp',
      'Unlimited Sethomes',
      'Keep Inventory & XP',
      'Join full server',
      'Custom tags (Unlimited)',
      'Daily rewards (Tier 3)',
      'Fly mode in hub & survival',
      'Custom Nicknames',
      'Priority Support'
    ],
    notIncluded: []
  }
];

export default function Ranks() {
  const { addItem, toggleCart } = useCartStore();
  const [selectedRank, setSelectedRank] = useState<typeof ranks[0] | null>(null);

  const handleAddToCart = (rank: typeof ranks[0]) => {
    addItem({
      id: rank.id,
      name: `${rank.name} Rank`,
      price: rank.price,
      type: 'rank'
    });
    toggleCart();
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-display font-black text-white mb-4"
        >
          Premium <span className="text-gradient">Ranks</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-400 max-w-2xl mx-auto text-lg"
        >
          Support the server and unlock exclusive perks, commands, and cosmetics. Ranks are lifetime purchases.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {ranks.map((rank, index) => {
          const Icon = rank.icon;
          return (
            <motion.div
              key={rank.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className={cn(
                "glass-card rounded-3xl p-8 relative flex flex-col h-full border-2 transition-all duration-300",
                rank.popular ? "border-mc-gold/50 shadow-[0_0_30px_rgba(245,158,11,0.15)]" : "border-white/5"
              )}
            >
              {rank.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-mc-gold to-mc-orange text-mc-dark text-xs font-bold uppercase tracking-wider shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="mb-8 text-center">
                <div className={cn(
                  "w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br flex items-center justify-center mb-6 shadow-lg",
                  rank.color
                )}>
                  <Icon size={40} className="text-white" />
                </div>
                <h2 className="text-3xl font-display font-bold text-white mb-2">{rank.name}</h2>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-2xl font-bold text-gray-400">$</span>
                  <span className={cn("text-5xl font-black", rank.textColor)}>{rank.price}</span>
                  <span className="text-gray-500 font-medium">/lifetime</span>
                </div>
              </div>

              <div className="flex-grow space-y-4 mb-8">
                {rank.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-1 bg-green-500/20 rounded-full p-0.5">
                      <Check size={14} className="text-green-400" />
                    </div>
                    <span className="text-gray-300 font-medium">{feature}</span>
                  </div>
                ))}
                {rank.notIncluded.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 opacity-50">
                    <div className="mt-1 bg-red-500/20 rounded-full p-0.5">
                      <X size={14} className="text-red-400" />
                    </div>
                    <span className="text-gray-400 line-through">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setSelectedRank(rank)}
                className={cn(
                  "w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300",
                  rank.popular 
                    ? "bg-gradient-to-r from-mc-gold to-mc-orange text-mc-dark hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]" 
                    : "bg-white/10 text-white hover:bg-white/20"
                )}
              >
                View Details
                <ArrowRight size={20} />
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Rank Details Modal */}
      <AnimatePresence>
        {selectedRank && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedRank(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-mc-dark border border-white/10 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
              >
                <button
                  onClick={() => setSelectedRank(null)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors z-10"
                >
                  <X size={24} />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                  {/* Left Side - Visual/3D Area */}
                  <div className={cn(
                    "p-12 flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br",
                    selectedRank.color.replace('from-', 'from-').replace('to-', 'to-').concat('/10')
                  )}>
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
                    
                    <div className="relative z-10 text-center">
                      <div className={cn(
                        "w-32 h-32 mx-auto rounded-3xl bg-gradient-to-br flex items-center justify-center mb-8 shadow-2xl transform rotate-3",
                        selectedRank.color
                      )}>
                        <selectedRank.icon size={64} className="text-white" />
                      </div>
                      <h2 className="text-5xl font-display font-black text-white mb-2">{selectedRank.name}</h2>
                      <p className={cn("text-2xl font-bold mb-8", selectedRank.textColor)}>${selectedRank.price}</p>
                      
                      <button
                        onClick={() => {
                          handleAddToCart(selectedRank);
                          setSelectedRank(null);
                        }}
                        className={cn(
                          "px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 mx-auto transition-all duration-300 shadow-lg hover:scale-105",
                          selectedRank.popular 
                            ? "bg-gradient-to-r from-mc-gold to-mc-orange text-mc-dark" 
                            : "bg-white text-mc-dark"
                        )}
                      >
                        Add to Cart
                        <ArrowRight size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Right Side - Perks List */}
                  <div className="p-8 md:p-12 bg-mc-brown/30">
                    <h3 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-3">
                      <Crown className="text-mc-gold" />
                      Full Perk Breakdown
                    </h3>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-bold text-gray-300 mb-3 border-b border-white/10 pb-2">General Perks</h4>
                        <ul className="space-y-3">
                          {selectedRank.features.slice(0, 4).map((feature, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <Check size={18} className="text-green-400 shrink-0 mt-0.5" />
                              <span className="text-gray-400">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {selectedRank.features.length > 4 && (
                        <div>
                          <h4 className="text-lg font-bold text-gray-300 mb-3 border-b border-white/10 pb-2">Exclusive Commands</h4>
                          <ul className="space-y-3">
                            {selectedRank.features.slice(4).map((feature, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <Check size={18} className="text-green-400 shrink-0 mt-0.5" />
                                <span className="text-gray-400">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
