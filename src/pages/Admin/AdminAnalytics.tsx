import { motion } from 'motion/react';
import { TrendingUp, Users, ShoppingCart, DollarSign } from 'lucide-react';

export default function AdminAnalytics() {
  const metrics = [
    {
      label: 'Total Revenue',
      value: '$12,450.00',
      change: '+15.3%',
      icon: DollarSign,
      color: 'from-green-500 to-green-600'
    },
    {
      label: 'Total Orders',
      value: '247',
      change: '+8.2%',
      icon: ShoppingCart,
      color: 'from-blue-500 to-blue-600'
    },
    {
      label: 'Active Users',
      value: '1,234',
      change: '+12.5%',
      icon: Users,
      color: 'from-purple-500 to-purple-600'
    },
    {
      label: 'Conversion Rate',
      value: '3.45%',
      change: '+2.1%',
      icon: TrendingUp,
      color: 'from-orange-500 to-orange-600'
    },
  ];

  const topProducts = [
    { name: 'God Kit', sales: 145, revenue: '$4,353.55', trend: 'up' },
    { name: 'MVP+ Rank', sales: 89, revenue: '$3,114.11', trend: 'up' },
    { name: 'Diamond Kit', sales: 78, revenue: '$1,169.22', trend: 'down' },
    { name: 'Pro Kit', sales: 62, revenue: '$929.38', trend: 'up' },
    { name: 'Starter Kit', sales: 45, revenue: '$224.55', trend: 'flat' },
  ];

  const chartData = [
    { label: 'Mon', value: 45 },
    { label: 'Tue', value: 52 },
    { label: 'Wed', value: 48 },
    { label: 'Thu', value: 61 },
    { label: 'Fri', value: 55 },
    { label: 'Sat', value: 67 },
    { label: 'Sun', value: 58 },
  ];

  const maxValue = Math.max(...chartData.map(d => d.value));

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-display font-black text-white">Analytics & Reports</h1>
        <p className="text-gray-400 mt-1">Track sales, revenue, and user engagement</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-mc-brown/50 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${metric.color} flex items-center justify-center`}>
                  <Icon size={24} className="text-white" />
                </div>
                <span className="text-sm font-semibold text-green-400">{metric.change}</span>
              </div>
              <p className="text-gray-400 text-sm font-medium mb-1">{metric.label}</p>
              <p className="text-3xl font-display font-black text-white">{metric.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-mc-brown/50 border border-white/10 rounded-2xl p-6"
        >
          <h3 className="text-xl font-bold text-white mb-6">Weekly Sales</h3>
          <div className="flex items-end justify-between h-48 gap-2">
            {chartData.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ height: 0 }}
                animate={{ height: `${(item.value / maxValue) * 100}%` }}
                transition={{ delay: idx * 0.1 }}
                className="flex-1 bg-gradient-to-t from-mc-gold to-mc-orange rounded-t-lg hover:opacity-80 transition-opacity group"
              >
                <div className="absolute -top-8 left-0 right-0 text-center text-xs text-gray-400 opacity-0 group-hover:opacity-100">
                  {item.value}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
            {chartData.map((item) => (
              <span key={item.label} className="text-xs text-gray-400 font-medium">{item.label}</span>
            ))}
          </div>
        </motion.div>

        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-mc-brown/50 border border-white/10 rounded-2xl p-6"
        >
          <h3 className="text-xl font-bold text-white mb-6">Top Products</h3>
          <div className="space-y-3">
            {topProducts.map((product, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-mc-dark/30 hover:bg-mc-dark/50 transition-colors">
                <div>
                  <p className="text-sm font-semibold text-white">{product.name}</p>
                  <p className="text-xs text-gray-400">{product.sales} sales</p>
                </div>
                <span className={`text-xs font-bold ${product.trend === 'up' ? 'text-green-400' : product.trend === 'down' ? 'text-red-400' : 'text-gray-400'}`}>
                  {product.revenue}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Revenue Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-mc-brown/50 border border-white/10 rounded-2xl p-6"
      >
        <h3 className="text-xl font-bold text-white mb-6">Revenue by Category</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { category: 'Kits', amount: '$5,240.50', percentage: 42 },
            { category: 'Ranks', amount: '$4,890.30', percentage: 39 },
            { category: 'Offers', amount: '$2,319.20', percentage: 19 },
          ].map((item, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-white">{item.category}</span>
                <span className="text-sm font-bold text-wood-accent">{item.amount}</span>
              </div>
              <div className="w-full bg-mc-dark/50 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.percentage}%` }}
                  transition={{ delay: idx * 0.1 }}
                  className="h-full bg-gradient-to-r from-mc-gold to-mc-orange"
                />
              </div>
              <span className="text-xs text-gray-400">{item.percentage}% of total</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
