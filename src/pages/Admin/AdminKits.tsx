import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Edit2, Trash2, Eye } from 'lucide-react';

const initialKits = [
  {
    id: 'kit_starter',
    name: 'Starter Kit',
    price: 4.99,
    armorType: 'iron',
    enchanted: false,
    items: 7,
    status: 'Active'
  },
  {
    id: 'kit_pro',
    name: 'Pro Kit',
    price: 14.99,
    armorType: 'diamond',
    enchanted: false,
    items: 7,
    status: 'Active'
  },
  {
    id: 'kit_god',
    name: 'God Kit',
    price: 29.99,
    armorType: 'netherite',
    enchanted: true,
    items: 7,
    status: 'Active'
  },
];

export default function AdminKits() {
  const [kits] = useState(initialKits);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-black text-white">Manage Kits</h1>
          <p className="text-gray-400 mt-1">Create, edit, and delete product kits</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-mc-gold to-mc-orange text-mc-dark font-bold rounded-lg hover:shadow-lg transition-all"
        >
          <Plus size={20} />
          Add New Kit
        </motion.button>
      </div>

      {/* Add Kit Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-mc-brown/50 border border-white/10 rounded-2xl p-6"
        >
          <h2 className="text-xl font-bold text-white mb-6">Create New Kit</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Kit Name"
              className="px-4 py-3 rounded-lg bg-mc-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-mc-gold"
            />
            <input
              type="number"
              placeholder="Price (USD)"
              className="px-4 py-3 rounded-lg bg-mc-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-mc-gold"
              step="0.01"
            />
            <select className="px-4 py-3 rounded-lg bg-mc-dark border border-white/10 text-white focus:outline-none focus:border-mc-gold">
              <option>Select Armor Type</option>
              <option>Iron</option>
              <option>Diamond</option>
              <option>Netherite</option>
              <option>Gold</option>
              <option>Copper</option>
            </select>
            <select className="px-4 py-3 rounded-lg bg-mc-dark border border-white/10 text-white focus:outline-none focus:border-mc-gold">
              <option>Enchanted: No</option>
              <option>Enchanted: Yes</option>
            </select>
            <textarea
              placeholder="Kit Description"
              className="md:col-span-2 px-4 py-3 rounded-lg bg-mc-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-mc-gold resize-none"
              rows={3}
            />
            <div className="md:col-span-2 flex gap-3">
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
                Create Kit
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Kits Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-mc-brown/50 border border-white/10 rounded-2xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-mc-dark/50 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Kit Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Price</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Armor Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Items</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Enchanted</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Status</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {kits.map((kit) => (
                <motion.tr
                  key={kit.id}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                >
                  <td className="px-6 py-4 text-sm text-white font-semibold">{kit.name}</td>
                  <td className="px-6 py-4 text-sm text-wood-accent font-bold">${kit.price}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{kit.armorType}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{kit.items}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      kit.enchanted
                        ? 'bg-purple-500/20 text-purple-400'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {kit.enchanted ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-2 py-1 rounded text-xs font-semibold bg-green-500/20 text-green-400">
                      {kit.status}
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
