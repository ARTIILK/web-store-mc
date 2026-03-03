import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, ShoppingCart } from 'lucide-react';
import { useCartStore, useCurrencyStore } from '../store';
import { cn } from '../utils/cn';

const kits = [
  {
    id: 'kit_hero',
    name: 'Hero Rank',
    price: 50.00,
    currency: 'INR',
    description: 'Start your journey as a Hero',
    image: '/src/preview/kit-preview-1.png',
    features: [
      'Protection 3 Armor',
      'Sharpness 4 Sword And Axe',
      'Efficiency 4 Pickaxe'
    ]
  },
  {
    id: 'kit_jerry',
    name: 'Jerry',
    price: 100.00,
    currency: 'INR',
    description: 'Unlock Jerry tier powers',
    image: '/src/preview/kit-preview-1.png',
    features: [
      'Protection 4 Armor',
      'Sharpness 4 Sword And Axe',
      'Efficiency 4 Pickaxe'
    ]
  },
  {
    id: 'kit_lion',
    name: 'Lion',
    price: 150.00,
    currency: 'INR',
    description: 'Roar with Lion rank power',
    image: '/src/preview/kit-preview-2.png',
    features: [
      'Protection 4 Armor',
      'Blast Protection 4 Armor',
      'Sharpness 5 Sword And Axe',
      'Efficiency 5 Pickaxe'
    ]
  },
  {
    id: 'kit_titan',
    name: 'Titan',
    price: 200.00,
    currency: 'INR',
    description: 'Become an unstoppable Titan',
    image: '/src/preview/kit-preview-2.png',
    features: [
      'Protection 4 Armor',
      'Blast Protection 4 Armor',
      'Sharpness 5 Sword And Axe',
      'Efficiency 5 Pickaxe'
    ]
  },
  {
    id: 'kit_woodplus',
    name: 'Wood+',
    price: 250.00,
    currency: 'INR',
    description: 'The ultimate Wood tier',
    image: '/src/preview/kit-preview-1.png',
    features: [
      'All Protection 4 On Armor',
      'Sharpness 5 And Smite 5 Sword',
      'Efficiency 5 Axe And Pickaxe',
      'Free 1000 Coins With Shogun + Rank'
    ]
  }
];

export default function Ranks() {
  const { addItem, toggleCart } = useCartStore();
  const { currency } = useCurrencyStore();
  const [selectedKit, setSelectedKit] = useState<typeof kits[0] | null>(null);

  const handleBuyNow = (kit: typeof kits[0]) => {
    addItem({
      id: kit.id,
      name: kit.name,
      price: kit.price,
      type: 'rank',
      image: kit.image
    });
    toggleCart();
    setSelectedKit(null);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-display font-black text-white mb-4"
        >
          Purchase <span className="text-gradient">Ranks Here</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-400 max-w-2xl mx-auto text-lg"
        >
          Unlock exclusive perks and abilities. All prices in INR.
        </motion.p>
      </div>

      {/* Kits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
        {kits.map((kit, index) => (
          <motion.div
            key={kit.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-mc-gold/50 transition-all duration-300 flex flex-col h-full"
          >
            {/* Kit Image */}
            <div className="w-full h-48 overflow-hidden bg-mc-dark">
              <img 
                src={kit.image} 
                alt={kit.name}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>

            {/* Kit Info */}
            <div className="p-6 flex-grow flex flex-col">
              <h3 className="text-2xl font-bold text-white mb-2">{kit.name}</h3>
              <p className="text-gray-400 text-sm mb-4 flex-grow">{kit.description}</p>
              
              {/* Price */}
              <div className="mb-6 pt-4 border-t border-white/10">
                <span className="text-3xl font-black text-mc-gold">
                  ₹{kit.price.toFixed(2)}
                </span>
                <span className="text-gray-500 text-sm ml-2">INR</span>
              </div>

              {/* More Info Button */}
              <button
                onClick={() => setSelectedKit(kit)}
                className="w-full py-3 bg-mc-gold/20 hover:bg-mc-gold/30 text-mc-gold font-bold rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                More Info
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Kit Details Modal */}
      <AnimatePresence>
        {selectedKit && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedKit(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-mc-dark border border-white/10 rounded-3xl max-w-2xl w-full shadow-2xl relative overflow-hidden"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedKit(null)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors z-20"
                >
                  <X size={24} />
                </button>

                {/* Modal Content */}
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Left - Image */}
                  <div className="h-96 md:h-auto bg-mc-brown/50 overflow-hidden flex items-center justify-center p-6">
                    <img 
                      src={selectedKit.image}
                      alt={selectedKit.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  {/* Right - Details */}
                  <div className="p-8 flex flex-col justify-between">
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-4">{selectedKit.name}</h2>
                      <p className="text-gray-400 mb-6">{selectedKit.description}</p>

                      {/* Features */}
                      <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Package Contents</h4>
                      <ul className="space-y-2 mb-8">
                        {selectedKit.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3 text-gray-300">
                            <span className="text-mc-gold mt-1">✓</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Price */}
                      <div className="mb-8 pt-6 border-t border-white/10">
                        <span className="text-gray-500 text-sm">Price</span>
                        <div className="text-4xl font-black text-mc-gold">
                          ₹{selectedKit.price.toFixed(2)}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <button
                        onClick={() => handleBuyNow(selectedKit)}
                        className="w-full py-4 bg-gradient-to-r from-mc-gold to-mc-orange text-mc-dark font-bold rounded-lg hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all duration-300 flex items-center justify-center gap-2 text-lg"
                      >
                        <ShoppingCart size={20} />
                        Buy Now
                      </button>
                      <button
                        onClick={() => setSelectedKit(null)}
                        className="w-full py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors"
                      >
                        Close
                      </button>
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
