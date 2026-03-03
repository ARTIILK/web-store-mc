import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useState } from 'react';
import CheckoutModal from './CheckoutModal';

export default function CartPanel() {
    const { cart, isCartOpen, setCartOpen, removeFromCart, updateQuantity, addToCart } = useStore();
    const [isCheckoutOpen, setCheckoutOpen] = useState(false);

    const total = cart.reduce((acc, item) => acc + (item.price_inr * item.quantity), 0);

    return (
        <>
            <AnimatePresence>
                {isCartOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setCartOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110]"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 h-full w-full max-w-md bg-mc-dark border-l border-white/10 z-[120] shadow-2xl flex flex-col"
                        >
                            <div className="p-6 border-b border-white/10 flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <ShoppingBag className="text-mc-gold" />
                                    <h2 className="text-xl font-display font-bold uppercase tracking-tighter">Your Bag</h2>
                                </div>
                                <button
                                    onClick={() => setCartOpen(false)}
                                    className="p-2 hover:bg-white/5 rounded-full transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="flex-grow overflow-y-auto p-6 space-y-6">
                                {cart.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4">
                                            <ShoppingBag size={32} />
                                        </div>
                                        <p className="font-bold uppercase tracking-widest text-xs">Your bag is empty</p>
                                        <p className="text-sm">Explore our ranks to fill it up!</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">{cart.length} Items</span>
                                            <button
                                                onClick={() => {
                                                    cart.forEach(item => removeFromCart(item.id));
                                                }}
                                                className="text-[10px] font-black uppercase text-red-500/60 hover:text-red-500 transition-colors"
                                            >
                                                Clear All
                                            </button>
                                        </div>
                                        {cart.map((item) => (
                                            <div key={item.id} className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 group transition-all hover:border-white/10">
                                                <img
                                                    src={`/preview/${item.image}`}
                                                    alt={item.name}
                                                    className="w-20 h-20 object-contain bg-black/20 rounded-lg p-1"
                                                />
                                                <div className="flex-grow">
                                                    <div className="flex justify-between mb-1">
                                                        <h4 className="font-bold text-white group-hover:text-mc-gold transition-colors">{item.name}</h4>
                                                        <button
                                                            onClick={() => removeFromCart(item.id)}
                                                            className="text-gray-600 hover:text-red-400 transition-colors"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                    <p className="text-mc-gold font-black mb-4">₹{item.price_inr}</p>

                                                    <div className="flex justify-between items-center">
                                                        <div className="flex items-center bg-black/40 rounded-lg p-1 border border-white/5">
                                                            <button
                                                                onClick={() => updateQuantity(item.id, -1)}
                                                                className="p-1 hover:text-mc-gold transition-colors"
                                                            >
                                                                <Minus size={14} />
                                                            </button>
                                                            <span className="w-8 text-center text-sm font-bold text-white">{item.quantity}</span>
                                                            <button
                                                                onClick={() => updateQuantity(item.id, 1)}
                                                                className="p-1 hover:text-mc-gold transition-colors"
                                                            >
                                                                <Plus size={14} />
                                                            </button>
                                                        </div>
                                                        <span className="text-xs font-bold text-white/30">
                                                            ₹{(item.price_inr * item.quantity).toFixed(2)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>

                            {cart.length > 0 && (
                                <div className="p-8 bg-black/40 backdrop-blur-md border-t border-white/10">
                                    {/* Inline Round Off Tip */}
                                    {total % 100 !== 0 && (
                                        <div className="px-4 py-3 bg-mc-gold/10 border border-mc-gold/20 rounded-xl mb-6 flex items-center justify-between group cursor-pointer hover:bg-mc-gold/20 transition-all"
                                            onClick={() => {
                                                const diff = 100 - (total % 100);
                                                const coins = Math.round(diff / (50 / 1000));
                                                addToCart({
                                                    id: 'round-off-coins',
                                                    name: 'WoodCoins (Round Off)',
                                                    category: 'Currency',
                                                    price_inr: diff,
                                                    description: `Rounding off your order with bonus WoodCoins.`,
                                                    image: 'wood.png',
                                                    limited: false,
                                                    features: ['Instant delivery', 'Value pack']
                                                });
                                            }}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-mc-gold rounded-lg text-mc-dark">
                                                    <Plus size={14} />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black uppercase text-mc-gold">Round your balance?</p>
                                                    <p className="text-[9px] text-gray-400">Add {Math.round((100 - (total % 100)) / (50 / 1000))} WoodCoins for ₹{100 - (total % 100)}</p>
                                                </div>
                                            </div>
                                            <ArrowRight size={14} className="text-mc-gold opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" />
                                        </div>
                                    )}

                                    <div className="flex justify-between mb-6">
                                        <div className="flex flex-col">
                                            <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Subtotal Amount</span>
                                            <span className="text-2xl font-black text-white">₹{total.toFixed(2)}</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Currency</span>
                                            <span className="block text-mc-gold font-bold">INR</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setCheckoutOpen(true)}
                                        className="w-full py-4 bg-gradient-to-r from-mc-gold to-mc-orange text-mc-dark font-black rounded-xl hover:shadow-[0_0_30px_#fbbf2466] transition-all flex items-center justify-center gap-2 group enchanted-glint neon-glow"
                                    >
                                        Proceed to Checkout
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                    <p className="text-center text-[10px] text-gray-500 mt-6 uppercase tracking-widest font-bold">
                                        Support Team: discord.gg/woodmc
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <CheckoutModal
                isOpen={isCheckoutOpen}
                onClose={() => setCheckoutOpen(false)}
                total={total}
            />
        </>
    );
}
