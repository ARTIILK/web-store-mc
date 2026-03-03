import { motion } from 'motion/react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { useState } from 'react';
import { StoreItem } from '../utils/csvParser';

export default function Ranks() {
  const { products, loading, addToCart } = useStore();
  const [selectedProduct, setSelectedProduct] = useState<StoreItem | null>(null);

  const rankProducts = products.filter(p => p.category.toLowerCase() === 'ranks');

  if (loading) return null;

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="mb-16">
        <h1 className="text-5xl md:text-6xl font-display font-black uppercase tracking-tighter">
          SERVER <span className="text-mc-gold">RANKS</span>
        </h1>
        <p className="text-gray-500 mt-4 max-w-xl">
          Choose a rank that fits your playstyle and unlock permanent perks across the network.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {rankProducts.map((product) => (
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
