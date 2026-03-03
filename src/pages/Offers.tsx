import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, Check, ShoppingCart } from 'lucide-react';
import { useCartStore } from '../store';
import { cn } from '../utils/cn';

const specialPackage = {
  id: 'special_package',
  name: 'Special Package',
  price: 200.00,
  currency: 'INR',
  warning: 'Removing In Some Time!',
  description: 'The ultimate package for dedicated players',
  image: '/src/preview/wood.png',
  items: [
    'Titan Rank (Lifetime)',
    '3000 Coins',
    'Exclusive Bonuses'
  ]
};

export default function Offers() {
  const { addItem, toggleCart } = useCartStore();
  const [selectedPackage, setSelectedPackage] = useState(false);

  const handleBuyNow = () => {
    addItem({
      id: specialPackage.id,
      name: specialPackage.name,
      price: specialPackage.price,
      type: 'offer',
      image: specialPackage.image
    });
    toggleCart();
    setSelectedPackage(false);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-display font-black text-white mb-4"
        >
          Special <span className="text-gradient">Packages</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-400 max-w-2xl mx-auto text-lg"
        >
          Exclusive bundles with incredible value. All prices in INR.
        </motion.p>
      </div>

      {/* Special Package Card */}
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -5 }}
          className="glass-card rounded-3xl overflow-hidden border border-mc-gold/50 hover:border-mc-gold transition-all duration-300 shadow-[0_0_30px_rgba(245,158,11,0.1)]"
        >
          {/* Image Container */}
          <div className="relative h-96 bg-mc-dark overflow-hidden">
            <img
              src={specialPackage.image}
              alt={specialPackage.name}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            />

            {/* Warning Badge */}
            <div className="absolute top-4 right-4 px-4 py-2 rounded-lg bg-red-500/90 text-white font-bold text-sm animate-pulse">
              {specialPackage.warning}
            </div>
          </div>

          {/* Content Container */}
          <div className="p-8 md:p-12">
            <div className="mb-8">
              <h2 className="text-4xl font-display font-black text-white mb-2">{specialPackage.name}</h2>
              <p className="text-gray-400 text-lg">{specialPackage.description}</p>
            </div>

            {/* Package Contents */}
            <div className="mb-8 p-6 bg-mc-dark/50 rounded-xl border border-white/10">
              <h3 className="text-lg font-bold text-white mb-4">Package Includes:</h3>
              <ul className="space-y-3">
                {specialPackage.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <span className="text-mc-gold text-xl">✓</span>
                    <span className="text-lg font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price and Button */}
            <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6">
              <div>
                <span className="text-gray-500 text-sm">Price</span>
                <div className="text-5xl font-black text-mc-gold">
                  ₹{specialPackage.price.toFixed(2)}
                </div>
              </div>

              <button
                onClick={() => setSelectedPackage(true)}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-mc-gold to-mc-orange text-mc-dark font-bold rounded-xl hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all duration-300 flex items-center justify-center gap-2 text-lg"
              >
                <ShoppingCart size={20} />
                More Info
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Package Details Modal */}
      <AnimatePresence>
        {selectedPackage && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPackage(false)}
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
                  onClick={() => setSelectedPackage(false)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors z-20"
                >
                  <X size={24} />
                </button>

                {/* Modal Content */}
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Left - Image */}
                  <div className="h-96 md:h-auto bg-mc-brown/50 overflow-hidden flex items-center justify-center p-6">
                    <img
                      src={specialPackage.image}
                      alt={specialPackage.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  {/* Right - Details */}
                  <div className="p-8 flex flex-col justify-between">
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-2">{specialPackage.name}</h2>
                      <p className="text-mc-orange font-bold text-lg mb-6">{specialPackage.warning}</p>
                      <p className="text-gray-400 mb-6">{specialPackage.description}</p>

                      {/* Features */}
                      <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">What You Get</h4>
                      <ul className="space-y-3 mb-8">
                        {specialPackage.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-gray-300">
                            <span className="text-mc-gold mt-1">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Price */}
                      <div className="mb-8 pt-6 border-t border-white/10">
                        <span className="text-gray-500 text-sm">Price</span>
                        <div className="text-4xl font-black text-mc-gold">
                          ₹{specialPackage.price.toFixed(2)}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <button
                        onClick={handleBuyNow}
                        className="w-full py-4 bg-gradient-to-r from-mc-gold to-mc-orange text-mc-dark font-bold rounded-lg hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all duration-300 flex items-center justify-center gap-2 text-lg"
                      >
                        <ShoppingCart size={20} />
                        Buy Now
                      </button>
                      <button
                        onClick={() => setSelectedPackage(false)}
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
