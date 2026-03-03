import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Package, Crown, Settings, BarChart3, Users, LogOut, Menu, X, Home } from 'lucide-react';
import { useUserStore } from '../../store';
import { Link, useNavigate, Routes, Route } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import AdminKits from './AdminKits';
import AdminRanks from './AdminRanks';
import AdminOffers from './AdminOffers';
import AdminAnalytics from './AdminAnalytics';

const adminMenuItems = [
  { name: 'Dashboard', path: '/admin', icon: Home },
  { name: 'Kits', path: '/admin/kits', icon: Package },
  { name: 'Ranks', path: '/admin/ranks', icon: Crown },
  { name: 'Offers', path: '/admin/offers', icon: Settings },
  { name: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
];

export default function AdminPanel() {
  const { username, logout } = useUserStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Check if user is admin (in real app, this would check user role)
  const isAdmin = true; // Replace with actual role check

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-mc-dark">
        <div className="text-center">
          <p className="text-2xl font-bold text-white mb-4">Access Denied</p>
          <p className="text-gray-400 mb-8">You do not have permission to access the admin panel.</p>
          <Link
            to="/"
            className="px-6 py-3 bg-gradient-to-r from-mc-gold to-mc-orange text-mc-dark font-bold rounded-lg hover:scale-105 transition-transform"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mc-dark flex">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className={`fixed md:relative w-64 bg-mc-brown/50 border-r border-white/10 p-6 z-40 min-h-screen flex flex-col ${
          isOpen ? 'block' : 'hidden md:flex'
        }`}
      >
        {/* Logo */}
        <div className="mb-8 pb-6 border-b border-white/10">
          <h1 className="text-2xl font-display font-black text-white">
            WOOD<span className="text-wood-accent">MC</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1">Admin Panel</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {adminMenuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-200"
              >
                <Icon size={20} className="text-wood-accent" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="pt-6 border-t border-white/10">
          <div className="px-4 py-3 rounded-lg bg-white/5 mb-4">
            <p className="text-xs text-gray-400 uppercase tracking-wider">Logged in as</p>
            <p className="text-white font-semibold">{username}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-all duration-200"
          >
            <LogOut size={18} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-mc-brown/30 border-b border-white/10 p-4 flex items-center justify-between">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 text-gray-300"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="flex-1 text-center">
            <h2 className="text-xl font-bold text-white">Store Administration</h2>
          </div>
          <Link
            to="/"
            className="p-2 rounded-lg hover:bg-white/10 text-gray-300 transition-colors"
            title="Back to Store"
          >
            <Home size={24} />
          </Link>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6">
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/kits" element={<AdminKits />} />
            <Route path="/ranks" element={<AdminRanks />} />
            <Route path="/offers" element={<AdminOffers />} />
            <Route path="/analytics" element={<AdminAnalytics />} />
          </Routes>
        </div>
      </div>

      {/* Backdrop for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="md:hidden fixed inset-0 bg-black/50 z-30"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
