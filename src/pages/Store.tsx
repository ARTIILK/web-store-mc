import { useState } from 'react';
import { motion } from 'motion/react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { StoreItem } from '../utils/csvParser';
import { Star, ChevronDown, Check, Zap, Shield, TrendingUp, Sparkles } from 'lucide-react';
import CoinPurchase from '../components/CoinPurchase';

export default function Store() {
    const { products, categories, loading, addToCart } = useStore();
    const [selectedProduct, setSelectedProduct] = useState<StoreItem | null>(null);

    const benefits = [
        { icon: Shield, title: "More Storage & Homes", desc: "Gain more /homes and auction listings." },
        { icon: Zap, title: "Exclusive Kits", desc: "Access high-tier kits instantly." },
        { icon: Sparkles, title: "Premium Identity", desc: "Stand out with custom chat prefixes." },
        { icon: TrendingUp, title: "Competitive Edge", desc: "Unlock power-user commands." }
    ];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-mc-dark">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-white/5 rounded-full" />
                    <div className="absolute top-0 left-0 w-16 h-16 border-4 border-mc-gold border-t-transparent rounded-full animate-spin" />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-mc-dark">
            {/* Hero Section */}
            <section className="relative pt-40 pb-32 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-mc-gold/10 border border-mc-gold/20 rounded-full text-mc-gold text-[10px] font-black uppercase tracking-widest mb-8"
                    >
                        <Star size={12} className="animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                        WoodMC Season 2026 Live
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-9xl font-display font-black mb-8 tracking-tighter leading-none"
                    >
                        THE OFFICIAL <br />
                        <span className="text-gradient">SERVER STORE</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-12"
                    >
                        Enhance your WoodMC adventure with premium ranks, exclusive gear, and seasonal packages.
                        All items are delivered instantly upon purchase.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex justify-center"
                    >
                        <div className="animate-bounce p-2 rounded-full border border-white/10 text-gray-500">
                            <ChevronDown size={20} />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Dynamic Sections by Category */}
            <div className="pb-32 px-6 max-w-7xl mx-auto space-y-40">
                {categories.map((category, idx) => (
                    <section key={category} id={category.toLowerCase()} className="scroll-mt-32">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 px-2">
                            <div>
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="text-mc-gold font-black text-xs uppercase tracking-[0.2em] mb-4"
                                >
                                    Premium Collection
                                </motion.div>
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="text-5xl md:text-6xl font-display font-black uppercase tracking-tighter"
                                >
                                    {category} <span className="text-mc-gold">Catalogue</span>
                                </motion.h2>
                            </div>
                            <div className="hidden lg:block h-[2px] flex-grow mx-12 bg-gradient-to-r from-white/10 to-transparent" />
                            <div className="text-gray-500 font-bold text-sm uppercase tracking-widest">
                                {products.filter(p => p.category === category).length} Packages Available
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
                            {products
                                .filter(p => p.category === category)
                                .map((product, pIdx) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        onSelect={setSelectedProduct}
                                    />
                                ))}
                        </div>
                    </section>
                ))}

                <CoinPurchase />

                {/* Why Upgrade Section */}
                <section className="pt-20 border-t border-white/5">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter mb-4">
                            Why Upgrade on <span className="text-mc-gold">WoodMC?</span>
                        </h2>
                        <p className="text-gray-500 max-w-xl mx-auto">
                            Join the ranks of our most dedicated players and unlock the full potential of your survival journey.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((b, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-mc-gold/20 transition-all group enchanted-glint"
                            >
                                <div className="w-12 h-12 bg-mc-gold/10 rounded-2xl flex items-center justify-center text-mc-gold mb-6 group-hover:scale-110 transition-transform">
                                    <b.icon size={24} />
                                </div>
                                <h4 className="text-lg font-bold text-white mb-2">{b.title}</h4>
                                <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>

            <ProductModal
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}
                onAddToCart={addToCart}
            />
        </div>
    );
}
