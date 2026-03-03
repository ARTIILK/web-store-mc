import { motion } from 'motion/react';
import { StoreItem } from '../utils/csvParser';
import { Plus, Zap } from 'lucide-react';

interface Props {
    product: StoreItem;
    onSelect: (product: StoreItem) => void;
}

export default function ProductCard({ product, onSelect }: Props) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="glass-card rounded-2xl overflow-hidden flex flex-col group cursor-pointer"
            onClick={() => onSelect(product)}
        >
            <div className="relative h-48 bg-mc-brown/30 overflow-hidden">
                <img
                    src={`/src/preview/${product.image}`}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {product.badge && (
                    <div className="absolute top-3 right-3 bg-mc-orange px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest neon-glow">
                        {product.badge}
                    </div>
                )}
                {product.limited && (
                    <div className="absolute top-3 left-3 bg-red-500/90 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                        Removing Soon
                    </div>
                )}
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-mc-gold transition-colors">
                    {product.name}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {product.description}
                </p>

                {product.coins && (
                    <div className="flex items-center gap-1 text-mc-gold text-xs font-bold mb-4">
                        <Zap size={14} /> +{product.coins} Bonus Coins
                    </div>
                )}

                <div className="mt-auto flex justify-between items-center">
                    <div>
                        <span className="text-2xl font-black text-white">₹{product.price_inr}</span>
                        <span className="text-gray-500 text-xs ml-1 font-bold">INR</span>
                    </div>
                    <button
                        className="p-2 bg-mc-gold/20 hover:bg-mc-gold text-mc-gold hover:text-mc-dark rounded-lg transition-all"
                        onClick={(e) => {
                            e.stopPropagation();
                            onSelect(product);
                        }}
                    >
                        <Plus size={20} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
