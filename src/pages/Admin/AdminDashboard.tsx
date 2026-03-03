import { motion } from 'motion/react';
import { Package, Crown, ShoppingCart, Users, TrendingUp, Eye } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Kits', value: '3', icon: Package, color: 'from-blue-500 to-blue-600' },
    { label: 'Total Ranks', value: '3', icon: Crown, color: 'from-yellow-500 to-yellow-600' },
    { label: 'Total Orders', value: '247', icon: ShoppingCart, color: 'from-green-500 to-green-600' },
    { label: 'Active Users', value: '1,234', icon: Users, color: 'from-purple-500 to-purple-600' },
  ];

  const recentOrders = [
    { id: '001', user: 'Player1', item: 'Diamond Kit', price: '$14.99', status: 'Completed', date: '2 hours ago' },
    { id: '002', user: 'Player2', item: 'God Kit', price: '$29.99', status: 'Completed', date: '4 hours ago' },
    { id: '003', user: 'Player3', item: 'MVP+ Rank', price: '$34.99', status: 'Pending', date: '6 hours ago' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-mc-gold/20 to-mc-orange/20 border border-wood-accent/30 rounded-2xl p-8"
      >
        <h1 className="text-4xl font-display font-black text-white mb-2">Welcome to Admin Panel</h1>
        <p className="text-gray-300">Manage your WoodMC store, products, and orders from here.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-mc-brown/50 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                <Icon size={24} className="text-white" />
              </div>
              <p className="text-gray-400 text-sm font-medium mb-1">{stat.label}</p>
              <p className="text-3xl font-display font-black text-white">{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-mc-brown/50 border border-white/10 rounded-2xl p-6"
      >
        <h2 className="text-2xl font-display font-bold text-white mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Add New Kit', route: '/admin/kits' },
            { label: 'Add New Rank', route: '/admin/ranks' },
            { label: 'Create Offer', route: '/admin/offers' },
            { label: 'View Analytics', route: '/admin/analytics' },
          ].map((action, idx) => (
            <motion.a
              key={idx}
              href={action.route}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white font-semibold text-center transition-all duration-200"
            >
              {action.label}
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-mc-brown/50 border border-white/10 rounded-2xl p-6"
      >
        <h2 className="text-2xl font-display font-bold text-white mb-6">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-400">Order ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-400">Player</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-400">Item</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-400">Price</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-400">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-400">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 text-sm text-white font-mono">#{order.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-300">{order.user}</td>
                  <td className="px-4 py-3 text-sm text-gray-300">{order.item}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-wood-accent">{order.price}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'Completed'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-400">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* System Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {[
          { label: 'Server Status', status: 'Online', icon: '🟢' },
          { label: 'Database', status: 'Connected', icon: '🟢' },
          { label: 'Payment Gateway', status: 'Active', icon: '🟢' },
        ].map((item, idx) => (
          <div key={idx} className="bg-mc-brown/50 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 font-medium">{item.label}</span>
              <span className="text-2xl">{item.icon}</span>
            </div>
            <p className="text-green-400 text-sm font-semibold mt-2">{item.status}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
