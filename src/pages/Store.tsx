import { useState } from 'react';
import { motion } from 'motion/react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { StoreItem } from '../utils/csvParser';
import { Star } from 'lucide-react';

export default function Store() {
    const { products, categories, loading, addToCart } = useStore();
    const [selectedProduct, setSelectedProduct] = useState<StoreItem | null>(null);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-mc-gold border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
            {/* Hero Header */}
            <section className="text-center mb-20">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-mc-gold/10 border border-mc-gold/20 rounded-full text-mc-gold text-xs font-bold uppercase tracking-widest mb-6"
                >
                    <Star size={14} className="animate-pulse" />
                    Officially Live for 2026
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-6xl md:text-8xl font-display font-black mb-6 tracking-tighter"
                >
                    WOODMC <span className="text-gradient">STORE</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-400 text-lg max-w-2xl mx-auto"
                >
                    Elevate your survival experience with exclusive ranks, kits, and special bundles.
                    All purchases directly support the continuous development of WoodMC.
                </motion.p>
            </section>

            {/* Dynamic Sections by Category */}
            <div className="space-y-32">
                {categories.map((category, idx) => (
                    <section key={category}>
                        <div className="flex items-center gap-6 mb-12">
                            <h2 className="text-4xl font-display font-black uppercase tracking-tighter">
                                {category} <span className="text-mc-gold">Collections</span>
                            </h2>
                            <div className="flex-grow h-[1px] bg-white/10" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {products
                                .filter(p => p.category === category)
                                .map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        onSelect={setSelectedProduct}
                                    />
                                ))}
                        </div>
                    </section>
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
