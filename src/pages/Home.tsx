import { motion } from 'motion/react';
import { Shield, Zap, Sparkles, TrendingUp, CheckCircle2 } from 'lucide-react';

export default function Home() {
  const benefits = [
    { icon: Shield, title: "Budget-friendly prices", desc: "Best deals on ranks, kits, and items." },
    { icon: CheckCircle2, title: "Exclusive special package", desc: "Limited-time bundles with rewards." },
    { icon: Sparkles, title: "Amazing rewards", desc: "Unlock powerful perks and kits." },
    { icon: TrendingUp, title: "Trusted & active server", desc: "Join thousands of active players." }
  ];

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-display font-black tracking-tighter leading-none">
              🌲 Welcome to <span className="text-mc-gold">WoodMC Store!</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 font-medium">
              Where your Minecraft adventure gets stronger and better!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 text-left space-y-4">
              <div className="text-mc-gold text-2xl font-black">💎 Super Cheap Prices!</div>
              <p className="text-gray-400 leading-relaxed">
                Best deals on ranks, kits, and items — without breaking the bank!
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-mc-gold/10 border border-mc-gold/20 text-left space-y-4">
              <div className="text-mc-gold text-2xl font-black">🔥 Special Package LIVE Now!</div>
              <p className="text-gray-400 leading-relaxed">
                Limited-time bundle with exclusive rewards — grab it before it’s gone!
              </p>
            </div>
          </div>

          <div className="py-12 space-y-6 text-xl md:text-2xl font-bold text-gray-300">
            <p>⚔️ Upgrade your gameplay with powerful ranks and perks.</p>
            <p>🏹 Unlock epic kits and dominate the server.</p>
            <p>🏰 Build bigger, mine faster, and rule stronger!</p>
          </div>

          <div className="pt-16 space-y-8">
            <h2 className="text-3xl font-display font-black uppercase tracking-tight">
              🎁 Why choose WoodMC?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
              {benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                  <b.icon className="text-mc-gold shrink-0" size={20} />
                  <span className="font-bold text-gray-300">{b.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-20 space-y-4">
            <div className="inline-block px-8 py-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-sm font-black uppercase tracking-widest text-gray-500 mb-2">Join Our Community</div>
              <div className="text-xl font-bold text-white">Discord - <span className="text-mc-gold">discord.gg/woodmc</span></div>
              <div className="text-xl font-bold text-white">IP - <span className="text-mc-gold">play.woodmc.fun</span></div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
