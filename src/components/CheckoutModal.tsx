import { motion, AnimatePresence } from 'motion/react';
import { X, User, Mail, Send, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { useStore } from '../context/StoreContext';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    total: number;
}

export default function CheckoutModal({ isOpen, onClose, total }: Props) {
    const { cart } = useStore();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        mcUsername: '',
        discordUsername: '',
        email: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            ...formData,
            items: cart.map(item => ({
                id: item.id,
                name: item.name,
                quantity: item.quantity,
                price: item.price_inr
            })),
            totalAmount: total,
            timestamp: new Date().toISOString()
        };

        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                setSuccess(true);
            } else {
                alert('Checkout failed. Please try again.');
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Connection error. Is the server running?');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-mc-dark border border-white/10 rounded-3xl w-full max-w-lg overflow-hidden relative shadow-2xl enchanted-glint"
                    >
                        {success ? (
                            <div className="p-12 text-center flex flex-col items-center">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', damping: 10 }}
                                    className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-6"
                                >
                                    <CheckCircle2 size={48} />
                                </motion.div>
                                <h2 className="text-3xl font-display font-black text-white mb-4 uppercase tracking-tighter">Order Placed!</h2>
                                <p className="text-gray-400 mb-8 max-w-xs mx-auto">
                                    Your request has been sent to our moderators. Please wait for the bot to verify your payment.
                                </p>
                                <button
                                    onClick={onClose}
                                    className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all"
                                >
                                    Close Window
                                </button>
                            </div>
                        ) : (
                            <div className="p-8">
                                <div className="flex justify-between items-center mb-8">
                                    <div>
                                        <h2 className="text-2xl font-display font-black text-white uppercase tracking-tighter">Finalize Checkout</h2>
                                        <p className="text-mc-gold font-bold text-xs uppercase tracking-widest mt-1">Total: ₹{total.toFixed(2)}</p>
                                    </div>
                                    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-gray-500">
                                        <X size={20} />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Minecraft Username</label>
                                        <div className="relative group">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-mc-gold transition-colors" size={18} />
                                            <input
                                                required
                                                type="text"
                                                placeholder="e.g. Dream / Notch"
                                                className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-mc-gold/50 transition-all font-bold text-white placeholder:text-gray-600"
                                                value={formData.mcUsername}
                                                onChange={(e) => setFormData({ ...formData, mcUsername: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Discord Username</label>
                                        <div className="relative group">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-mc-gold transition-colors">
                                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.956 2.419-2.157 2.419zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.946 2.419-2.157 2.419z" />
                                                </svg>
                                            </div>
                                            <input
                                                required
                                                type="text"
                                                placeholder="e.g. user#1234 / user"
                                                className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-mc-gold/50 transition-all font-bold text-white placeholder:text-gray-600"
                                                value={formData.discordUsername}
                                                onChange={(e) => setFormData({ ...formData, discordUsername: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                                        <div className="relative group">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-mc-gold transition-colors" size={18} />
                                            <input
                                                required
                                                type="email"
                                                placeholder="you@example.com"
                                                className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-mc-gold/50 transition-all font-bold text-white placeholder:text-gray-600"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-6">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full py-4 bg-gradient-to-r from-mc-gold to-mc-orange text-mc-dark font-black rounded-xl hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50 neon-glow"
                                        >
                                            {loading ? (
                                                <div className="w-6 h-6 border-4 border-mc-dark border-t-transparent rounded-full animate-spin" />
                                            ) : (
                                                <>
                                                    <Send size={20} />
                                                    Confirm & Pay
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>

                                <p className="text-center text-[9px] text-gray-600 mt-6 uppercase tracking-widest">
                                    By checking out, you agree to our Terms of Service.
                                </p>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
