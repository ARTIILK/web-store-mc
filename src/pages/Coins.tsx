import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { useState, useMemo } from 'react';
import { StoreItem } from '../utils/csvParser';
import { motion } from 'motion/react';
import { Coins, Zap, Shield, Star } from 'lucide-react';

export default function CoinsPage() {
  const { products, loading, addToCart } = useStore();
  const [selectedProduct, setSelectedProduct] = useState<StoreItem | null>(null);

  const coinProducts = useMemo(() => 
    products.filter(p => p.category.toLowerCase() === 'coins' || p.category.toLowerCase() === 'currency'),
    [products]
  );

  if (loading) return null;

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      {/* Unique Header Section */}
      <div className="relative mb-20 p-8 md:p-12 rounded-[2rem] bg-gradient-to-br from-mc-gold/10 to-transparent border border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Coins size={120} className="text-mc-gold" />
        </div>
        
        <div className="relative z-10 max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 mb-4"
          >
            <div className="h-[2px] w-8 bg-mc-gold" />
            <span className="text-mc-gold text-xs font-black uppercase tracking-[0.3em]">Premium Currency</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter mb-6 leading-none">
            WOOD<span className="text-mc-gold">COINS</span>
          </h1>
          
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            Elevate your gameplay with WoodCoins. Unlock exclusive cosmetics, powerful boosters, and premium crate keys instantly across the network.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: Zap, text: "Instant Delivery" },
              { icon: Shield, text: "Secure Payment" },
              { icon: Star, text: "Premium Perks" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
                <item.icon size={14} className="text-mc-gold" />
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {coinProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelect={setSelectedProduct}
          />
        ))}
      </div>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />
    </div>
  );
}
