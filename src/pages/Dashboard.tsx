import { useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Crown, Package, Clock, Shield, Zap } from 'lucide-react';
import { useUserStore } from '../store';
import { cn } from '../utils/cn';

export default function Dashboard() {
  const { username, logout } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!username) {
      navigate('/login');
    }
  }, [username, navigate]);

  if (!username) return null;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row items-start gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-80 flex-shrink-0 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-panel rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden text-center"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-mc-gold/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10">
              <div className="w-24 h-24 mx-auto rounded-2xl bg-mc-brown border-2 border-mc-gold/30 flex items-center justify-center mb-6 shadow-lg overflow-hidden">
                <img src={`https://minotar.net/helm/${username}/96.png`} alt={username} className="w-full h-full object-cover" />
              </div>
              <h2 className="text-2xl font-display font-black text-white mb-1">{username}</h2>
              <p className="text-mc-gold text-sm font-medium mb-6">Verified Player</p>
              
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="w-full py-3 rounded-xl bg-white/5 hover:bg-red-500/20 text-gray-300 hover:text-red-400 font-medium flex items-center justify-center gap-2 transition-all duration-300"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-panel rounded-3xl p-6 border border-white/10 shadow-lg"
          >
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Shield size={18} className="text-mc-gold" />
              Account Status
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Status</span>
                <span className="text-green-400 text-sm font-bold flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> Active</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Joined</span>
                <span className="text-white text-sm font-medium">Oct 12, 2023</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Playtime</span>
                <span className="text-white text-sm font-medium">420h 15m</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {/* Active Ranks */}
            <div className="glass-card rounded-2xl p-6 border border-mc-gold/30 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-mc-gold/10 rounded-full blur-2xl -mr-8 -mt-8 transition-all duration-500 group-hover:bg-mc-gold/20" />
              <div className="flex items-center gap-4 mb-4 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-mc-gold to-mc-orange flex items-center justify-center shadow-lg">
                  <Crown size={24} className="text-mc-dark" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Active Rank</h3>
                  <p className="text-mc-gold font-medium">MVP+</p>
                </div>
              </div>
              <div className="text-sm text-gray-400 flex items-center gap-2 relative z-10">
                <Clock size={14} /> Lifetime Access
              </div>
            </div>

            {/* Available Kits */}
            <div className="glass-card rounded-2xl p-6 border border-blue-500/30 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl -mr-8 -mt-8 transition-all duration-500 group-hover:bg-blue-500/20" />
              <div className="flex items-center gap-4 mb-4 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center shadow-lg">
                  <Package size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Available Kits</h3>
                  <p className="text-blue-400 font-medium">Starter, VIP, MVP</p>
                </div>
              </div>
              <div className="text-sm text-gray-400 flex items-center gap-2 relative z-10">
                <Zap size={14} /> Ready to claim
              </div>
            </div>
          </motion.div>

          {/* Purchase History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel rounded-3xl p-8 border border-white/10 shadow-lg"
          >
            <h2 className="text-2xl font-display font-bold text-white mb-6">Recent Purchases</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="pb-4 text-sm font-bold text-gray-400 uppercase tracking-wider">Item</th>
                    <th className="pb-4 text-sm font-bold text-gray-400 uppercase tracking-wider">Date</th>
                    <th className="pb-4 text-sm font-bold text-gray-400 uppercase tracking-wider">Amount</th>
                    <th className="pb-4 text-sm font-bold text-gray-400 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    { item: 'MVP+ Rank Upgrade', date: 'Oct 15, 2023', amount: '$15.00', status: 'Completed' },
                    { item: 'Limited Bundle', date: 'Dec 01, 2023', amount: '$34.99', status: 'Completed' },
                    { item: '5x Mythic Crates', date: 'Jan 10, 2024', amount: '$9.99', status: 'Completed' },
                  ].map((purchase, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 text-white font-medium">{purchase.item}</td>
                      <td className="py-4 text-gray-400 text-sm">{purchase.date}</td>
                      <td className="py-4 text-mc-gold font-bold">{purchase.amount}</td>
                      <td className="py-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold">
                          {purchase.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
