import { motion, AnimatePresence } from 'motion/react';
import { StoreItem } from '../utils/csvParser';
import { X, ShoppingCart, Check, Zap } from 'lucide-react';

interface Props {
    product: StoreItem | null;
    onClose: () => void;
    onAddToCart: (product: StoreItem) => void;
}

export default function ProductModal({ product, onClose, onAddToCart }: Props) {
    if (!product) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="bg-mc-dark border border-white/10 rounded-3xl w-full max-w-2xl overflow-hidden relative shadow-2xl"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors z-10"
                    >
                        <X size={20} />
                    </button>

                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/2 h-64 md:h-auto bg-black/40 relative">
                            <img
                                src={`/preview/${product.image}`}
                                alt={product.name}
                                className="w-full h-full object-contain p-8"
                            />
                            {product.limited && (
                                <div className="absolute bottom-4 left-4 bg-red-500 px-4 py-2 rounded-lg text-xs font-black uppercase animate-pulse">
                                    Limited Time Offer
                                </div>
                            )}
                        </div>

                        <div className="md:w-1/2 p-8">
                            <h2 className="text-3xl font-display font-black text-white mb-2">{product.name}</h2>
                            <p className="text-gray-400 mb-6">{product.description}</p>

                            <div className="space-y-4 mb-8">
                                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Everything Included:</h4>
                                <ul className="grid gap-2">
                                    {product.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                                            <Check size={14} className="text-mc-gold flex-shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {product.coins && (
                                <div className="bg-mc-gold/10 border border-mc-gold/20 p-4 rounded-xl mb-8 flex items-center gap-3">
                                    <div className="p-2 bg-mc-gold text-mc-dark rounded-lg">
                                        <Zap size={20} />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-mc-gold uppercase">Special Bonus</div>
                                        <div className="text-white font-black">+{product.coins} Bonus Store Coins</div>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <div className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-2">
                                        Total Price
                                        {product.original_price && (
                                            <span className="line-through text-gray-600">₹{product.original_price}</span>
                                        )}
                                    </div>
                                    <div className="text-4xl font-black text-mc-gold">₹{product.price_inr}</div>
                                </div>
                                <button
                                    onClick={() => {
                                        onAddToCart(product);
                                        onClose();
                                    }}
                                    className="flex-grow py-4 bg-mc-gold text-mc-dark font-black rounded-xl transition-colors flex items-center justify-center gap-2"
                                >
                                    <ShoppingCart size={20} />
                                    Claim Package
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
