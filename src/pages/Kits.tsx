import { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { ShoppingCart, Package, Shield, Sword, Pickaxe, ArrowRight, Zap } from 'lucide-react';
import { useCartStore } from '../store';
import { cn } from '../utils/cn';
import ArmorPreview from '../components/ArmorPreview';

const kits = [
  {
    id: 'kit_starter',
    name: 'Starter Kit',
    price: 4.99,
    color: '#a3e635', // lime
    enchanted: false,
    description: 'A basic set of iron armor and tools to get you started.',
    items: [
      { name: 'Iron Helmet', icon: Shield },
      { name: 'Iron Chestplate', icon: Shield },
      { name: 'Iron Leggings', icon: Shield },
      { name: 'Iron Boots', icon: Shield },
      { name: 'Iron Sword', icon: Sword },
      { name: 'Iron Pickaxe', icon: Pickaxe },
      { name: '32x Steak', icon: Package },
    ]
  },
  {
    id: 'kit_pro',
    name: 'Pro Kit',
    price: 14.99,
    color: '#38bdf8', // sky blue
    enchanted: false,
    description: 'Full diamond gear with basic enchantments.',
    items: [
      { name: 'Diamond Helmet (Prot I)', icon: Shield },
      { name: 'Diamond Chestplate (Prot I)', icon: Shield },
      { name: 'Diamond Leggings (Prot I)', icon: Shield },
      { name: 'Diamond Boots (Prot I)', icon: Shield },
      { name: 'Diamond Sword (Sharp I)', icon: Sword },
      { name: 'Diamond Pickaxe (Eff II)', icon: Pickaxe },
      { name: '64x Golden Carrots', icon: Package },
    ]
  },
  {
    id: 'kit_god',
    name: 'God Kit',
    price: 29.99,
    color: '#c084fc', // purple
    enchanted: true,
    description: 'The ultimate set of fully enchanted netherite gear.',
    items: [
      { name: 'Netherite Helmet (Prot IV, Unb III)', icon: Shield },
      { name: 'Netherite Chestplate (Prot IV, Unb III)', icon: Shield },
      { name: 'Netherite Leggings (Prot IV, Unb III)', icon: Shield },
      { name: 'Netherite Boots (Prot IV, Unb III)', icon: Shield },
      { name: 'Netherite Sword (Sharp V, Fire II)', icon: Sword },
      { name: 'Netherite Pickaxe (Eff V, Fort III)', icon: Pickaxe },
      { name: '16x Enchanted Golden Apples', icon: Package },
    ]
  }
];

export default function Kits() {
  const { addItem, toggleCart } = useCartStore();
  const [selectedKit, setSelectedKit] = useState(kits[1]); // Default to Pro Kit

  const handleAddToCart = (kit: typeof kits[0]) => {
    addItem({
      id: kit.id,
      name: kit.name,
      price: kit.price,
      type: 'kit'
    });
    toggleCart();
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-display font-black text-white mb-4"
        >
          Exclusive <span className="text-gradient">Kits</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-400 max-w-2xl mx-auto text-lg"
        >
          Get a head start with our premium kits. Each kit contains a carefully curated selection of gear and items.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side - Kit Selection */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-2">
            <Package className="text-mc-gold" />
            Select a Kit
          </h2>
          
          {kits.map((kit, index) => (
            <motion.div
              key={kit.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedKit(kit)}
              className={cn(
                "glass-card rounded-2xl p-6 cursor-pointer transition-all duration-300 border-2",
                selectedKit.id === kit.id 
                  ? "border-mc-gold bg-mc-brown/60 shadow-[0_0_20px_rgba(245,158,11,0.2)]" 
                  : "border-white/5 hover:border-white/20"
              )}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-mc-dark flex items-center justify-center" style={{ borderBottom: `2px solid ${kit.color}` }}>
                    {kit.enchanted ? <Zap size={20} className="text-purple-400" /> : <Shield size={20} style={{ color: kit.color }} />}
                  </div>
                  <h3 className="text-xl font-bold text-white">{kit.name}</h3>
                </div>
                <span className="text-xl font-bold text-mc-gold">${kit.price}</span>
              </div>
              <p className="text-gray-400 text-sm ml-13">{kit.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Right Side - 3D Preview & Details */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedKit.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="glass-panel rounded-3xl overflow-hidden border border-white/10 h-full flex flex-col"
            >
              {/* 3D Canvas Area */}
              <div className="h-[400px] w-full relative bg-gradient-to-b from-mc-dark to-mc-brown/50">
                <div className="absolute inset-0 z-10 pointer-events-none shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]" />
                
                {selectedKit.enchanted && (
                  <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/50 text-purple-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1 animate-pulse">
                    <Zap size={12} /> Enchanted
                  </div>
                )}
                
                <div className="absolute bottom-4 left-4 z-20 text-xs text-gray-500 font-medium">
                  Drag to rotate • Scroll to zoom
                </div>

                <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                  <Suspense fallback={null}>
                    <ArmorPreview color={selectedKit.color} enchanted={selectedKit.enchanted} />
                    <OrbitControls 
                      enablePan={false} 
                      minDistance={3} 
                      maxDistance={8}
                      autoRotate
                      autoRotateSpeed={1}
                    />
                  </Suspense>
                </Canvas>
              </div>

              {/* Kit Details */}
              <div className="p-8 bg-mc-brown/30 flex-grow flex flex-col">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <h2 className="text-3xl font-display font-black text-white mb-1">{selectedKit.name}</h2>
                    <p className="text-gray-400">{selectedKit.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-500 block">Price</span>
                    <span className="text-3xl font-black text-mc-gold">${selectedKit.price}</span>
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Included Items</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedKit.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 bg-mc-dark/50 rounded-lg p-3 border border-white/5">
                        <item.icon size={16} className={selectedKit.enchanted ? "text-purple-400" : "text-gray-400"} />
                        <span className="text-sm text-gray-300 font-medium">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleAddToCart(selectedKit)}
                  className="mt-auto w-full py-4 rounded-xl bg-gradient-to-r from-mc-gold to-mc-orange text-mc-dark font-bold text-lg flex items-center justify-center gap-2 neon-glow-hover transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
