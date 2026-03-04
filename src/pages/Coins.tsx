import { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { motion } from 'motion/react';
import { Coins, Zap, Shield, Star, Plus, Minus, ShoppingCart } from 'lucide-react';

export default function CoinsPage() {
  const { addToCart } = useStore();
  const [amount, setAmount] = useState(1000);
  
  // Rate: 20 coins for 1 INR
  const COIN_RATE = 1 / 20; 
  const price = Math.ceil(amount * COIN_RATE);

  const presets = [1000, 5000, 10000, 20000];

  const handleAddToCart = () => {
    addToCart({
      id: `custom-coins-${amount}-${Date.now()}`,
      category: 'Coins',
      name: `${amount.toLocaleString()} WoodCoins`,
      price_inr: price,
      description: `Premium currency bundle of ${amount.toLocaleString()} WoodCoins.`,
      image: 'wood.png',
      limited: false,
      features: [
        `Total: ${amount.toLocaleString()} WoodCoins`,
        "Instant delivery to your account",
        "Usable for all in-game cosmetics",
        "24/7 Support included"
      ]
    });
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="relative mb-12 p-8 md:p-12 rounded-[2rem] bg-gradient-to-br from-mc-gold/10 to-transparent border border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Coins size={120} className="text-mc-gold" />
        </div>
        
        <div className="relative z-10 max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 mb-4"
          >
            <div className="h-[2px] w-8 bg-mc-gold" />
            <span className="text-mc-gold text-xs font-black uppercase tracking-[0.3em]">Custom Bundle</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter mb-6 leading-none">
            GET <span className="text-mc-gold">COINS</span>
          </h1>
          
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            Select exactly how many WoodCoins you need. Our current rate is <span className="text-white font-bold">20 Coins per ₹1 INR</span>.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: Zap, text: "Instant Credit" },
              { icon: Shield, text: "Secure Payment" },
              { icon: Star, text: "Premium Value" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
                <item.icon size={14} className="text-mc-gold" />
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Control Side */}
            <div className="space-y-8">
              <div>
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-6 ml-1">Select Amount</label>
                <div className="flex items-center gap-4 mb-8">
                  <button 
                    onClick={() => setAmount(Math.max(100, amount - 100))}
                    className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl text-white transition-colors border border-white/5"
                  >
                    <Minus size={24} />
                  </button>
                  <div className="flex-grow text-center">
                    <div className="text-4xl font-black text-white mb-1">{amount.toLocaleString()}</div>
                    <div className="text-[10px] font-bold text-mc-gold uppercase tracking-widest">WoodCoins</div>
                  </div>
                  <button 
                    onClick={() => setAmount(amount + 100)}
                    className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl text-white transition-colors border border-white/5"
                  >
                    <Plus size={24} />
                  </button>
                </div>

                <input 
                  type="range"
                  min="100"
                  max="100000"
                  step="100"
                  value={amount}
                  onChange={(e) => setAmount(parseInt(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-mc-gold mb-8"
                />

                <div className="grid grid-cols-4 gap-2">
                  {presets.map(p => (
                    <button 
                      key={p}
                      onClick={() => setAmount(p)}
                      className={`py-2 text-[10px] font-black rounded-lg border transition-all ${amount === p ? 'bg-mc-gold border-mc-gold text-mc-dark' : 'bg-white/5 border-white/10 text-gray-400 hover:border-mc-gold/50'}`}
                    >
                      {p >= 1000 ? `${p/1000}K` : p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Price Side */}
            <div className="p-8 rounded-3xl bg-mc-gold/5 border border-mc-gold/10 text-center space-y-6">
              <div>
                <p className="text-[10px] font-black text-mc-gold uppercase tracking-[0.2em] mb-2">Total Price</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-5xl font-black text-white">₹{price}</span>
                  <span className="text-sm font-bold text-gray-500 uppercase">INR</span>
                </div>
              </div>

              <div className="space-y-3 py-6 border-y border-mc-gold/10 text-left">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Star size={14} className="text-mc-gold" />
                  <span>Rate: 20 Coins = ₹1</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Zap size={14} className="text-mc-gold" />
                  <span>Instant delivery after payment</span>
                </div>
              </div>

              <button 
                onClick={handleAddToCart}
                className="w-full py-5 bg-mc-gold text-mc-dark font-black rounded-2xl flex items-center justify-center gap-3 hover:brightness-110 transition-all active:scale-95 shadow-[0_10px_30px_-10px_rgba(251,191,36,0.3)]"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
