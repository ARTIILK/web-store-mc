import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Edit2, Trash2, Eye } from 'lucide-react';

const initialRanks = [
  {
    id: 'rank_starter',
    name: 'Starter',
    price: 9.99,
    color: 'Emerald',
    features: 5,
    status: 'Active'
  },
  {
    id: 'rank_vip',
    name: 'VIP',
    price: 19.99,
    color: 'Blue',
    features: 7,
    status: 'Active',
    popular: true
  },
  {
    id: 'rank_mvp',
    name: 'MVP+',
    price: 34.99,
    color: 'Gold',
    features: 10,
    status: 'Active'
  },
];

export default function AdminRanks() {
  const [ranks] = useState(initialRanks);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-black text-white">Manage Ranks</h1>
          <p className="text-gray-400 mt-1">Create, edit, and delete membership ranks</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-mc-gold to-mc-orange text-mc-dark font-bold rounded-lg hover:shadow-lg transition-all"
        >
          <Plus size={20} />
          Add New Rank
        </motion.button>
      </div>

      {/* Add Rank Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-mc-brown/50 border border-white/10 rounded-2xl p-6"
        >
          <h2 className="text-xl font-bold text-white mb-6">Create New Rank</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Rank Name"
                className="px-4 py-3 rounded-lg bg-mc-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-mc-gold"
              />
              <input
                type="number"
                placeholder="Price (USD)"
                className="px-4 py-3 rounded-lg bg-mc-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-mc-gold"
                step="0.01"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select className="px-4 py-3 rounded-lg bg-mc-dark border border-white/10 text-white focus:outline-none focus:border-mc-gold">
                <option>Select Color</option>
                <option>Emerald</option>
                <option>Blue</option>
                <option>Gold</option>
                <option>Purple</option>
                <option>Red</option>
              </select>
              <label className="flex items-center gap-3 px-4 py-3 rounded-lg bg-mc-dark border border-white/10 cursor-pointer hover:border-mc-gold transition-colors">
                <input type="checkbox" className="w-4 h-4 rounded" />
                <span className="text-white font-medium">Mark as Popular</span>
              </label>
            </div>
            <textarea
              placeholder="Rank Description"
              className="w-full px-4 py-3 rounded-lg bg-mc-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-mc-gold resize-none"
              rows={3}
            />
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-mc-gold to-mc-orange text-mc-dark font-bold hover:shadow-lg transition-all"
              >
                Create Rank
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Ranks Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-mc-brown/50 border border-white/10 rounded-2xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-mc-dark/50 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Rank Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Price</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Color</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Features</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Popular</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Status</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ranks.map((rank) => (
                <motion.tr
                  key={rank.id}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                >
                  <td className="px-6 py-4 text-sm text-white font-semibold">{rank.name}</td>
                  <td className="px-6 py-4 text-sm text-wood-accent font-bold">${rank.price}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{rank.color}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{rank.features}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      rank.popular
                        ? 'bg-mc-gold/20 text-mc-gold'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {rank.popular ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-2 py-1 rounded text-xs font-semibold bg-green-500/20 text-green-400">
                      {rank.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button className="p-2 rounded-lg hover:bg-white/10 text-blue-400 transition-colors">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-white/10 text-yellow-400 transition-colors">
                        <Edit2 size={18} />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-white/10 text-red-400 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
