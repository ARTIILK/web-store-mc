import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Edit2, Trash2, Eye, Clock } from 'lucide-react';

const initialOffers = [
  {
    id: 'offer_lucky',
    name: 'Lucky Crate',
    price: 9.99,
    items: 12,
    discount: '20%',
    status: 'Active',
    expiresIn: '5 days'
  },
  {
    id: 'offer_bundle',
    name: 'Starter Bundle',
    price: 14.99,
    items: 25,
    discount: '15%',
    status: 'Active',
    expiresIn: '3 days'
  },
  {
    id: 'offer_mega',
    name: 'Mega Pack',
    price: 49.99,
    items: 50,
    discount: '30%',
    status: 'Draft',
    expiresIn: '10 days'
  },
];

export default function AdminOffers() {
  const [offers] = useState(initialOffers);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-black text-white">Manage Offers</h1>
          <p className="text-gray-400 mt-1">Create and manage special offers and crates</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-mc-gold to-mc-orange text-mc-dark font-bold rounded-lg hover:shadow-lg transition-all"
        >
          <Plus size={20} />
          Add New Offer
        </motion.button>
      </div>

      {/* Add Offer Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-mc-brown/50 border border-white/10 rounded-2xl p-6"
        >
          <h2 className="text-xl font-bold text-white mb-6">Create New Offer</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Offer Name"
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
              <input
                type="number"
                placeholder="Number of Items"
                className="px-4 py-3 rounded-lg bg-mc-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-mc-gold"
              />
              <input
                type="number"
                placeholder="Discount %"
                className="px-4 py-3 rounded-lg bg-mc-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-mc-gold"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="datetime-local"
                placeholder="Expires At"
                className="px-4 py-3 rounded-lg bg-mc-dark border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-mc-gold"
              />
              <select className="px-4 py-3 rounded-lg bg-mc-dark border border-white/10 text-white focus:outline-none focus:border-mc-gold">
                <option>Status: Active</option>
                <option>Status: Draft</option>
                <option>Status: Archived</option>
              </select>
            </div>
            <textarea
              placeholder="Offer Description"
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
                Create Offer
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Offers Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-mc-brown/50 border border-white/10 rounded-2xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-mc-dark/50 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Offer Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Price</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Items</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Discount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Expires</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer) => (
                <motion.tr
                  key={offer.id}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                >
                  <td className="px-6 py-4 text-sm text-white font-semibold">{offer.name}</td>
                  <td className="px-6 py-4 text-sm text-wood-accent font-bold">${offer.price}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{offer.items}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-2 py-1 rounded text-xs font-semibold bg-green-500/20 text-green-400">
                      -{offer.discount}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      offer.status === 'Active'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {offer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300 flex items-center gap-1">
                    <Clock size={14} className="text-orange-400" />
                    {offer.expiresIn}
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
