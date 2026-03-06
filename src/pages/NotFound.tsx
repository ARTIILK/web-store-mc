import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Home, ShoppingBag, Coins, AlertCircle } from 'lucide-react';

export default function NotFound() {
  const links = [
    { name: 'Homepage', href: '/', icon: Home, desc: 'Return to the main store' },
    { name: 'Ranks', href: '/ranks', icon: ShoppingBag, desc: 'Browse our premium ranks' },
    { name: 'Coins', href: '/coins', icon: Coins, desc: 'Purchase WoodCoins' }
  ];

  return (
    <div className="pt-40 pb-20 px-6 min-h-[80vh] flex items-center justify-center">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500/10 rounded-3xl text-red-500 mb-6 border border-red-500/20">
            <AlertCircle size={40} />
          </div>
          <h1 className="text-6xl font-display font-black tracking-tighter mb-4">404 - LOST IN THE <span className="text-mc-gold">WOODS</span></h1>
          <p className="text-gray-500 text-lg">The page you're looking for doesn't exist or has been moved.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {links.map((link, i) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={link.href}
                className="group block p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-mc-gold/30 hover:bg-white/[0.04] transition-all text-left h-full"
              >
                <div className="p-3 bg-mc-gold/10 rounded-xl text-mc-gold w-fit mb-4 group-hover:scale-110 transition-transform">
                  <link.icon size={20} />
                </div>
                <h3 className="font-black text-white uppercase tracking-tighter mb-1">{link.name}</h3>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-tight">{link.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
