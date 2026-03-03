import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { useState } from 'react';
import { StoreItem } from '../utils/csvParser';

export default function Coins() {
  const { products, loading, addToCart } = useStore();
  const [selectedProduct, setSelectedProduct] = useState<StoreItem | null>(null);

  // Filter ONLY for coins category
  const coinProducts = products.filter(p => p.category.toLowerCase() === 'coins' || p.category.toLowerCase() === 'currency');

  if (loading) return null;

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="mb-16">
        <h1 className="text-5xl md:text-6xl font-display font-black uppercase tracking-tighter">
          WOOD<span className="text-mc-gold">COINS</span>
        </h1>
        <p className="text-gray-500 mt-4 max-w-xl">
          Purchase coins to unlock exclusive cosmetics, boosters, and items in-game.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
