import { motion, AnimatePresence } from "motion/react";
import { X, User, Mail, Copy, ShoppingBag, ShieldCheck, QrCode, MessageSquare } from "lucide-react";
import { useState } from "react";
import { useStore } from "../context/StoreContext";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    total: number;
}

export default function CheckoutModal({
    isOpen,
    onClose,
    total,
}: Props) {
    const { cart } = useStore();
    const [copied, setCopied] = useState(false);
    const [formData, setFormData] = useState({
        mcUsername: "",
        discordUsername: "",
        email: "",
    });

    const generateBill = () => {
        return `🧾 NEW PURCHASE REQUEST\n\nMinecraft IGN: ${formData.mcUsername || "Not Provided"}\nDiscord Username: ${formData.discordUsername || "Not Provided"}\nEmail: ${formData.email || "Not Provided"}\n\nItems:\n${cart.map((item) => `• ${item.name} x${item.quantity} - ₹${item.price_inr}`).join("\n")}\n\nTotal: ₹${total.toFixed(2)}\n\nPayment Method: QR Code\n\nSteps:\n1. Scan QR and complete payment.\n2. Click 'Copy Bill'.\n3. DM the bill to the server owner on Discord.\n4. Verification takes 1-5 mins.`;
    };

    const handleCopy = async () => {
        if (!formData.mcUsername || !formData.discordUsername || !formData.email) {
            alert("Please fill in all details first.");
            return;
        }
        await navigator.clipboard.writeText(generateBill());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-[#0b0b0b] border border-white/5 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl"
                    >
                        <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
                            {/* Left: Summary & QR */}
                            <div className="md:w-5/12 p-8 bg-black/40 border-r border-white/5 overflow-y-auto">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="p-3 bg-mc-gold/10 rounded-2xl text-mc-gold">
                                        <QrCode size={24} />
                                    </div>
                                    <h3 className="text-xl font-black uppercase tracking-tighter">Payment & Order</h3>
                                </div>

                                <div className="bg-white/5 rounded-2xl p-6 mb-8 text-center border border-white/5">
                                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Scan QR to Pay</p>
                                    <img src="/QR/qr.png" alt="Payment QR" className="mx-auto w-48 h-48 rounded-xl bg-white p-2" />
                                    <div className="mt-4 flex items-center justify-center gap-2">
                                        <span className="text-mc-gold font-black text-2xl">₹{total.toFixed(0)}</span>
                                        <span className="text-gray-500 text-xs font-bold">INR</span>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-8">
                                    <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Items</h4>
                                    {cart.map((item) => (
                                        <div key={item.id} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                                            <p className="font-bold text-white text-xs truncate mr-4">{item.name} <span className="text-gray-600">x{item.quantity}</span></p>
                                            <p className="font-black text-mc-gold text-xs">₹{item.price_inr * item.quantity}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="p-4 rounded-xl bg-mc-gold/5 border border-mc-gold/10 flex gap-3">
                                    <ShieldCheck className="text-mc-gold shrink-0" size={18} />
                                    <p className="text-[9px] text-gray-400 leading-relaxed font-medium">
                                        Manual verification ensures secure delivery. Ranks appear in-game usually within 5 minutes.
                                    </p>
                                </div>
                            </div>

                            {/* Right: Checkout Actions */}
                            <div className="md:w-7/12 p-8 relative overflow-y-auto bg-[#0b0b0b]">
                                <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-white/5 rounded-full text-gray-500 transition-colors">
                                    <X size={20} />
                                </button>

                                <div className="max-w-md mx-auto h-full flex flex-col justify-center">
                                    <div className="mb-8">
                                        <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Manual Checkout</h2>
                                        <p className="text-gray-500 text-sm mt-1">Complete your payment and copy the bill.</p>
                                    </div>

                                    <div className="space-y-4 mb-8">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Minecraft Name</label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                                <input required type="text" placeholder="IGN" className="w-full bg-black/60 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-mc-gold/50 outline-none transition-all" value={formData.mcUsername} onChange={(e) => setFormData({ ...formData, mcUsername: e.target.value })} />
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Discord</label>
                                            <input required type="text" placeholder="Username#0000" className="w-full bg-black/60 border border-white/10 rounded-xl py-4 px-4 text-white focus:border-mc-gold/50 outline-none transition-all" value={formData.discordUsername} onChange={(e) => setFormData({ ...formData, discordUsername: e.target.value })} />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Email</label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                                <input required type="email" placeholder="Email Address" className="w-full bg-black/60 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-mc-gold/50 outline-none transition-all" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <button onClick={handleCopy} className="w-full py-5 bg-mc-gold text-mc-dark font-black rounded-2xl flex justify-center items-center gap-3 hover:brightness-110 transition-all">
                                            <Copy size={20} />
                                            {copied ? "Bill Copied!" : "Copy Bill Details"}
                                        </button>
                                        
                                        <a href="https://discord.gg/woodmc" target="_blank" rel="noreferrer" className="w-full py-5 bg-[#5865F2] text-white font-black rounded-2xl flex justify-center items-center gap-3 hover:brightness-110 transition-all">
                                            <MessageSquare size={20} />
                                            DM Owner on Discord
                                        </a>
                                    </div>

                                    <div className="mt-8 pt-8 border-t border-white/5 text-center">
                                        <div className="flex justify-center gap-4 text-[10px] font-black uppercase text-gray-600 tracking-widest">
                                            <span>Secure</span>
                                            <span>•</span>
                                            <span>Manual Verification</span>
                                            <span>•</span>
                                            <span>24/7 Support</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
