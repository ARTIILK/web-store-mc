import { useState, useEffect, Suspense } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Copy, Check, Star, Zap, Shield, Crown } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { cn } from '../utils/cn';
import { useCurrencyStore } from '../store';
import ArmorPreview from '../components/ArmorPreview';

export default function Home() {
  const [copied, setCopied] = useState(false);
  const { formatPrice } = useCurrencyStore();
  const serverIp = "play.woodmc.net";

  const handleCopyIp = () => {
    navigator.clipboard.writeText(serverIp);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-wood-dark/80 border border-wood-accent/30 text-wood-light text-sm font-medium mb-8"
            >
              <Star size={16} className="text-wood-accent" />
              <span>WoodMC Season 2026 is LIVE!</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-white mb-6 tracking-tight"
            >
              OFFICIAL <br />
              <span className="text-gradient">SERVER STORE</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Enhance your WoodMC experience with premium ranks, exclusive kits, and special crates. Join thousands of players in the ultimate survival adventure.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                to="/ranks"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-mc-gold to-mc-orange text-mc-dark font-bold text-lg flex items-center justify-center gap-2 neon-glow-hover transition-all duration-300 transform hover:scale-105"
              >
                <Crown size={20} />
                View Ranks
              </Link>
              <Link
                to="/offers"
                className="w-full sm:w-auto px-8 py-4 rounded-xl glass-panel text-white font-bold text-lg flex items-center justify-center gap-2 hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
              >
                <Zap size={20} className="text-mc-orange" />
                Special Offers
              </Link>
            </motion.div>

            {/* Server IP Copy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 flex justify-center"
            >
              <button
                onClick={handleCopyIp}
                className="group flex items-center gap-4 px-6 py-3 rounded-2xl glass-card"
              >
                <div className="flex flex-col items-start">
                  <span className="text-xs text-gray-400 uppercase tracking-wider font-bold">Server IP</span>
                  <span className="text-lg font-mono font-bold text-white group-hover:text-mc-gold transition-colors">{serverIp}</span>
                </div>
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300",
                  copied ? "bg-green-500/20 text-green-400" : "bg-white/5 text-gray-400 group-hover:bg-mc-gold/20 group-hover:text-mc-gold"
                )}>
                  {copied ? <Check size={20} /> : <Copy size={20} />}
                </div>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Armor Showcase Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-display font-bold text-white mb-4"
            >
              Premium <span className="text-gradient">Gear Showcase</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 max-w-2xl mx-auto"
            >
              Explore the incredible armor sets and weapons available in our exclusive kits
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Iron Kit', type: 'iron', color: '#a8a8a8', enchanted: false, price: 4.99 },
              { name: 'Diamond Kit', type: 'diamond', color: '#33ebcb', enchanted: false, price: 14.99 },
              { name: 'God Kit', type: 'netherite', color: '#443a3b', enchanted: true, price: 29.99 }
            ].map((kit, idx) => (
              <motion.div
                key={kit.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300 group"
              >
                {/* 3D Preview */}
                <div className="h-64 w-full bg-gradient-to-b from-mc-dark to-mc-brown/50 relative">
                  <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                    <Suspense fallback={null}>
                      <ArmorPreview 
                        color={kit.color} 
                        enchanted={kit.enchanted}
                        armorType={kit.type as any}
                      />
                      <OrbitControls 
                        enablePan={false} 
                        minDistance={3} 
                        maxDistance={8}
                        autoRotate
                        autoRotateSpeed={2}
                      />
                    </Suspense>
                  </Canvas>
                  
                  {kit.enchanted && (
                    <div className="absolute top-4 right-4 px-2 py-1 rounded-full bg-purple-500/20 border border-purple-500/50 text-purple-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                      <Zap size={10} /> Enchanted
                    </div>
                  )}
                </div>

                {/* Kit Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text" style={{
                    backgroundImage: kit.enchanted ? 'none' : `linear-gradient(to right, ${kit.color}, ${kit.color})`,
                  }}>
                    {kit.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {kit.enchanted ? 'Fully enchanted netherite gear' : 'Premium armor and tools'}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold" style={{ color: kit.color }}>
                      {formatPrice(kit.price)}
                    </span>
                    <Link
                      to="/kits"
                      className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-all duration-300"
                    >
                      View Kit
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">Featured Items</h2>
              <p className="text-gray-400">Our most popular packages this week</p>
            </div>
            <Link to="/ranks" className="hidden sm:flex items-center gap-2 text-mc-gold hover:text-mc-orange transition-colors font-medium">
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Featured Card 1 */}
            <motion.div
              whileHover={{ y: -10 }}
              className="glass-card rounded-2xl p-6 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-mc-gold/10 rounded-full blur-3xl -mr-10 -mt-10 transition-all duration-500 group-hover:bg-mc-gold/20" />
              
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-mc-gold to-mc-orange flex items-center justify-center mb-6 shadow-lg">
                <Crown size={32} className="text-mc-dark" />
              </div>
              
              <h3 className="text-2xl font-display font-bold text-white mb-2">MVP+ Rank</h3>
              <p className="text-gray-400 mb-6 line-clamp-2">The ultimate rank for dedicated players. Includes fly, custom tags, and daily rewards.</p>
              
              <div className="flex items-center justify-between mt-auto">
                <span className="text-2xl font-bold text-mc-gold">$29.99</span>
                <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-mc-gold hover:text-mc-dark text-white font-medium transition-all duration-300">
                  View Details
                </button>
              </div>
            </motion.div>

            {/* Featured Card 2 */}
            <motion.div
              whileHover={{ y: -10 }}
              className="glass-card rounded-2xl p-6 relative overflow-hidden group border-mc-gold/30"
            >
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-mc-orange text-white text-xs font-bold uppercase tracking-wider animate-pulse">
                Hot Deal
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-mc-orange/10 rounded-full blur-3xl -mr-10 -mt-10 transition-all duration-500 group-hover:bg-mc-orange/20" />
              
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6 shadow-lg">
                <Zap size={32} className="text-white" />
              </div>
              
              <h3 className="text-2xl font-display font-bold text-white mb-2">Winter Bundle</h3>
              <p className="text-gray-400 mb-6 line-clamp-2">Get the MVP rank, 5x Mythic Crates, and exclusive Winter cosmetics.</p>
              
              <div className="flex items-center justify-between mt-auto">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 line-through">$49.99</span>
                  <span className="text-2xl font-bold text-mc-orange">$34.99</span>
                </div>
                <button className="px-4 py-2 rounded-lg bg-mc-orange hover:bg-mc-orange/80 text-white font-medium transition-all duration-300">
                  View Details
                </button>
              </div>
            </motion.div>

            {/* Featured Card 3 */}
            <motion.div
              whileHover={{ y: -10 }}
              className="glass-card rounded-2xl p-6 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-all duration-500 group-hover:bg-blue-500/20" />
              
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center mb-6 shadow-lg">
                <Shield size={32} className="text-white" />
              </div>
              
              <h3 className="text-2xl font-display font-bold text-white mb-2">God Kit</h3>
              <p className="text-gray-400 mb-6 line-clamp-2">Start your journey with the most powerful enchanted diamond armor and weapons.</p>
              
              <div className="flex items-center justify-between mt-auto">
                <span className="text-2xl font-bold text-blue-400">$14.99</span>
                <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-blue-500 hover:text-white text-white font-medium transition-all duration-300">
                  View Details
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Top Donators Section */}
      <section className="py-20 relative z-10 bg-mc-brown/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Top Supporters</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">A huge thank you to our top supporters this month. Your contributions keep the server running!</p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {[
              { name: "Notch", amount: "$150.00", place: 1 },
              { name: "Jeb_", amount: "$95.00", place: 2 },
              { name: "Dinnerbone", amount: "$75.00", place: 3 },
              { name: "Technoblade", amount: "$50.00", place: 4 },
              { name: "Dream", amount: "$30.00", place: 5 },
            ].map((donator, idx) => (
              <motion.div
                key={donator.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card rounded-2xl p-4 flex items-center gap-4 min-w-[250px]"
              >
                <div className="relative">
                  <img src={`https://minotar.net/helm/${donator.name}/48.png`} alt={donator.name} className="w-12 h-12 rounded-lg" />
                  {donator.place <= 3 && (
                    <div className={cn(
                      "absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-lg",
                      donator.place === 1 ? "bg-yellow-400 text-yellow-900" :
                      donator.place === 2 ? "bg-gray-300 text-gray-800" :
                      "bg-amber-600 text-amber-100"
                    )}>
                      #{donator.place}
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="text-white font-bold">{donator.name}</h4>
                  <p className="text-mc-gold text-sm font-medium">{donator.amount}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
