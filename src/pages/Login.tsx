import { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, ArrowRight, Shield } from 'lucide-react';
import { useUserStore } from '../store';
import { cn } from '../utils/cn';

export default function Login() {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const login = useUserStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Please enter your Minecraft username.');
      return;
    }

    setIsLoading(true);

    // Simulate API call to verify Minecraft username
    try {
      // In a real app, you would verify the username against Mojang API or your server
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Basic validation (just checking if it's not empty and alphanumeric)
      if (!/^[a-zA-Z0-9_]{3,16}$/.test(username)) {
        throw new Error('Invalid Minecraft username format.');
      }

      login(username);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to verify username. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-20 flex flex-col justify-center min-h-[calc(100vh-80px)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden"
      >
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-mc-gold/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center mb-8 relative z-10">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-mc-gold to-mc-orange flex items-center justify-center mb-6 shadow-lg">
            <User size={32} className="text-mc-dark" />
          </div>
          <h1 className="text-3xl font-display font-black text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400">Enter your Minecraft username to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
              Minecraft Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User size={20} className="text-gray-500" />
              </div>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={cn(
                  "w-full bg-mc-dark/50 border rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300",
                  error ? "border-red-500/50 focus:ring-red-500/50 focus:border-red-500" : "border-white/10 focus:ring-mc-gold/50 focus:border-mc-gold/50"
                )}
                placeholder="e.g. Notch"
                disabled={isLoading}
              />
            </div>
            {error && (
              <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-2 text-sm text-red-400">
                {error}
              </motion.p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-mc-gold to-mc-orange text-mc-dark font-bold text-lg flex items-center justify-center gap-2 neon-glow-hover transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-mc-dark border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                Continue
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center relative z-10">
          <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
            <Shield size={14} /> Secure login. We never ask for your password.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
