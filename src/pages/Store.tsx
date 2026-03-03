import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { StoreItem } from '../utils/csvParser';
import { Star, ChevronDown, Check, Zap, Shield, TrendingUp, Sparkles, ArrowUp } from 'lucide-react';
import CoinPurchase from '../components/CoinPurchase';

export default function Store() {
    const { products, categories, loading, addToCart } = useStore();
    const [selectedProduct, setSelectedProduct] = useState<StoreItem | null>(null);
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 800);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
                    <img src="/logo/woodmc.png" alt="Loading" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-auto opacity-50" />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-mc-dark">
            {/* Hero Section */}
            <section className="relative pt-48 pb-32 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#fbbf2410,transparent_70%)]" />

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
                        Join thousands of players in the ultimate survival experience.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex justify-center"
                    >
                        <div className="animate-bounce p-3 rounded-full border border-white/10 text-gray-500 hover:text-mc-gold hover:border-mc-gold/30 transition-colors cursor-pointer"
                            onClick={() => document.getElementById(categories[0]?.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}>
                            <ChevronDown size={24} />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
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
                                    Collection / {idx + 1}
                                </motion.div>
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="text-5xl md:text-6xl font-display font-black uppercase tracking-tighter"
                                >
                                    {category} <span className="text-mc-gold border-b-4 border-mc-gold/20 pb-1">Catalogue</span>
                                </motion.h2>
                            </div>
                            <div className="hidden lg:block h-[2px] flex-grow mx-12 bg-gradient-to-r from-white/10 to-transparent" />
                            <div className="text-gray-500 font-bold text-sm uppercase tracking-widest flex items-center gap-3">
                                <span className="w-10 h-[1px] bg-white/10" />
                                {products.filter(p => p.category === category).length} Available
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
                            Join the ranks of our most dedicated players and unlock the full potential of your survival journey with these permanent perks.
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
                                className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-mc-gold/20 transition-all group overflow-hidden relative"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-mc-gold/5 blur-[50px] rounded-full translate-x-1/2 -translate-y-1/2" />
                                <div className="w-14 h-14 bg-mc-gold/10 rounded-2xl flex items-center justify-center text-mc-gold mb-8 group-hover:scale-110 transition-transform relative z-10">
                                    <b.icon size={28} />
                                </div>
                                <h4 className="text-xl font-bold text-white mb-3 relative z-10">{b.title}</h4>
                                <p className="text-gray-500 text-sm leading-relaxed relative z-10">{b.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Footer Section */}
                <footer className="pt-20 pb-10 border-t border-white/5 text-center">
                    <img src="/logo/woodmc.png" alt="WoodMC" className="h-12 w-auto mx-auto mb-8 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer" />
                    <div className="flex justify-center gap-8 mb-8 text-xs font-black uppercase tracking-widest text-gray-500">
                        <a href="#" className="hover:text-white transition-colors">Discord</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Apply for Team</a>
                    </div>
                    <p className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">
                        &copy; 2026 WoodMC Network. All Rights Reserved. <br />
                        Not an official Minecraft product. Not approved by or associated with Mojang or Microsoft.
                    </p>
                </footer>
            </div>

            <ProductModal
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}
                onAddToCart={addToCart}
            />

            {/* Scroll to Top */}
            <AnimatePresence>
                {showScrollTop && (
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="fixed bottom-8 left-8 z-[100] p-4 bg-mc-gold text-mc-dark rounded-2xl shadow-[0_0_30px_#fbbf2444] hover:scale-110 transition-transform active:scale-95"
                    >
                        <ArrowUp size={24} />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}
