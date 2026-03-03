import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Coins, Plus, Minus, ShoppingCart, Zap, TrendingUp } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import CoinStackLight from './CoinStackLight';

export default function CoinPurchase() {
    const { cart, addToCart } = useStore();
    const [amount, setAmount] = useState(1000);
    const COIN_RATE = 50 / 1000; // 50 INR for 1000 coins

    const cartTotal = cart.reduce((acc, item) => acc + (item.price_inr * item.quantity), 0);
    const roundOffDiff = 100 - (cartTotal % 100);
    const roundOffCoins = Math.round(roundOffDiff / COIN_RATE);

    const price = Math.round(amount * COIN_RATE);

    const presets = [1000, 2500, 5000, 10000];

    const handleAddToCart = () => {
        addToCart({
            id: `coins-${amount}`,
            category: 'Currency',
            name: `${amount} WoodCoins`,
            price_inr: price,
            description: `A bundle of ${amount} premium store coins for WoodMC perks.`,
            image: 'wood.png', // Generic icon
            limited: false,
            features: [
                `Total of ${amount} WoodCoins`,
                "Instantly added to your balance",
                "Non-refundable premium currency",
                "Valid across all WoodMC sub-servers"
            ]
        });
    };

    return (
        <section id="coins" className="py-32 scroll-mt-24">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-16">
                    {/* 3D Coin Stack View */}
                    <div className="w-full md:w-1/2 relative group">
                        <div className="absolute inset-0 bg-mc-gold/20 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        <CoinStackLight count={amount} />

                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-3 bg-mc-dark/80 backdrop-blur-xl border border-white/10 rounded-2xl">
                            <TrendingUp className="text-mc-gold" size={18} />
                            <span className="text-sm font-bold text-white uppercase tracking-widest leading-none">
                                {amount.toLocaleString()} <span className="text-mc-gold">Coins</span>
                            </span>
                        </div>
                    </div>

                    {/* Controls & Purchase Logic */}
                    <div className="w-full md:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-mc-gold/10 border border-mc-gold/20 rounded-lg text-mc-gold text-[10px] font-black uppercase tracking-widest mb-6">
                                <Zap size={12} />
                                Instant Balance Delivery
                            </div>

                            <h2 className="text-5xl font-display font-black text-white uppercase tracking-tighter mb-4">
                                GET <span className="text-mc-gold">WOODCOINS</span>
                            </h2>
                            <p className="text-gray-400 mb-10 leading-relaxed">
                                Purchase premium currency to unlock special cosmetics, temporary boosters, and unique crate keys in-game.
                                <span className="text-mc-gold font-bold"> 1000 Coins = ₹50 INR</span>
                            </p>

                            <div className="space-y-8">
                                {cart.length > 0 && cartTotal % 100 !== 0 && (
                                    <div className="flex flex-col gap-3 p-6 bg-mc-gold/5 border border-mc-gold/20 rounded-2xl mb-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px] font-black uppercase text-mc-gold">Smart Round Off</span>
                                            <span className="text-white font-bold text-sm">₹{roundOffDiff} INR</span>
                                        </div>
                                        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">
                                            Top up {roundOffCoins} coins to round your checkout to the next ₹100
                                        </p>
                                        <button
                                            onClick={() => setAmount(roundOffCoins)}
                                            className="w-full py-2 bg-mc-gold/20 hover:bg-mc-gold/40 text-mc-gold text-[10px] font-black rounded-lg transition-all uppercase"
                                        >
                                            Apply Round Off
                                        </button>
                                    </div>
                                )}

                                {/* Presets */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    {presets.map((p) => (
                                        <button
                                            key={p}
                                            onClick={() => setAmount(p)}
                                            className={`py-4 rounded-xl border font-black transition-all ${amount === p
                                                ? 'bg-mc-gold border-mc-gold text-mc-dark shadow-[0_0_20px_#fbbf2455]'
                                                : 'bg-white/5 border-white/10 text-white hover:border-mc-gold/50'
                                                }`}
                                        >
                                            {p / 1000}K
                                        </button>
                                    ))}
                                </div>

                                {/* Custom Input Range */}
                                <div className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl">
                                    <div className="flex justify-between items-center mb-6">
                                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest font-display">Amount Selector</span>
                                        <span className="text-mc-gold font-black">₹{price} <span className="text-[10px] text-gray-500 uppercase font-bold ml-1">INR</span></span>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <button
                                            onClick={() => setAmount(Math.max(100, amount - 100))}
                                            className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-white transition-colors"
                                        >
                                            <Minus size={20} />
                                        </button>

                                        <div className="flex-grow">
                                            <input
                                                type="range"
                                                min="100"
                                                max="50000"
                                                step="100"
                                                value={amount}
                                                onChange={(e) => setAmount(parseInt(e.target.value))}
                                                className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-mc-gold"
                                            />
                                        </div>

                                        <button
                                            onClick={() => setAmount(amount + 100)}
                                            className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-white transition-colors"
                                        >
                                            <Plus size={20} />
                                        </button>
                                    </div>
                                </div>

                                <button
                                    onClick={handleAddToCart}
                                    className="w-full py-5 bg-gradient-to-r from-mc-gold to-mc-orange text-mc-dark font-black rounded-2xl hover:shadow-[0_0_30px_#fbbf2466] transition-all flex items-center justify-center gap-3 group enchanted-glint neon-glow"
                                >
                                    <ShoppingCart size={22} className="group-hover:scale-110 transition-transform" />
                                    Purhcase WoodCoins
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
