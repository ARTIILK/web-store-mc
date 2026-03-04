import { motion, AnimatePresence } from "motion/react";
import { X, User, Mail, Send, Copy, CheckCircle2, ShoppingBag, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useStore } from "../context/StoreContext";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    total: number;
    mode?: "form" | "manual";
}

export default function CheckoutModal({
    isOpen,
    onClose,
    total,
    mode = "manual",
}: Props) {
    const { cart } = useStore();
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        mcUsername: "",
        discordUsername: "",
        email: "",
    });

    const generateBill = () => {
        return `🧾 NEW PURCHASE REQUEST\n\nMinecraft Username: ${formData.mcUsername || "Not Provided"}\nDiscord Username: ${formData.discordUsername || "Not Provided"}\nEmail: ${formData.email || "Not Provided"}\n\nItems:\n${cart.map((item) => `• ${item.name} x${item.quantity} - ₹${item.price_inr}`).join("\n")}\n\nTotal Amount: ₹${total.toFixed(2)}\n\nPlease verify payment.`;
    };

    const handleCopy = async () => {
        await navigator.clipboard.writeText(generateBill());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, items: cart, totalAmount: total }),
            });
            if (response.ok) setSuccess(true);
        } catch (err) {
            alert("Checkout failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-mc-dark border border-white/10 rounded-[2rem] w-full max-w-4xl overflow-hidden shadow-2xl"
                    >
                        <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
                            {/* Left: Order Summary */}
                            <div className="md:w-5/12 p-8 bg-white/[0.02] border-r border-white/10 overflow-y-auto">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="p-3 bg-mc-gold/10 rounded-2xl text-mc-gold">
                                        <ShoppingBag size={24} />
                                    </div>
                                    <h3 className="text-xl font-black uppercase tracking-tighter">Order Summary</h3>
                                </div>

                                <div className="space-y-4 mb-8">
                                    {cart.map((item) => (
                                        <div key={item.id} className="flex justify-between items-start gap-4 p-4 rounded-2xl bg-black/40 border border-white/5">
                                            <div className="flex-grow">
                                                <p className="font-bold text-white text-sm">{item.name}</p>
                                                <p className="text-[10px] text-gray-500 uppercase font-black">Quantity: {item.quantity}</p>
                                            </div>
                                            <p className="font-black text-mc-gold text-sm">₹{item.price_inr * item.quantity}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-6 border-t border-white/5 space-y-2">
                                    <div className="flex justify-between text-gray-500 text-xs font-bold uppercase tracking-widest">
                                        <span>Subtotal</span>
                                        <span>₹{total.toFixed(0)}</span>
                                    </div>
                                    <div className="flex justify-between text-white text-xl font-black uppercase tracking-tighter pt-2">
                                        <span>Total</span>
                                        <span className="text-mc-gold">₹{total.toFixed(0)}</span>
                                    </div>
                                </div>

                                <div className="mt-8 p-4 rounded-2xl bg-mc-gold/5 border border-mc-gold/10 flex gap-3">
                                    <ShieldCheck className="text-mc-gold shrink-0" size={20} />
                                    <p className="text-[10px] text-gray-400 leading-relaxed font-medium">
                                        Your purchase helps support WoodMC. Ranks and coins are delivered automatically after verification.
                                    </p>
                                </div>
                            </div>

                            {/* Right: Checkout Actions */}
                            <div className="md:w-7/12 p-8 relative overflow-y-auto">
                                <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-white/5 rounded-full text-gray-500 transition-colors">
                                    <X size={20} />
                                </button>

                                <div className="max-w-md mx-auto">
                                    <div className="mb-8">
                                        <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                                            {mode === "manual" ? "Manual Payment" : "Complete Purchase"}
                                        </h2>
                                        <p className="text-gray-500 text-sm mt-1">Please provide your details to continue.</p>
                                    </div>

                                    {mode === "form" && !success && (
                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Minecraft Name</label>
                                                <div className="relative">
                                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                                    <input required type="text" placeholder="Username" className="w-full bg-black/60 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-mc-gold/50 outline-none transition-all" value={formData.mcUsername} onChange={(e) => setFormData({ ...formData, mcUsername: e.target.value })} />
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Discord</label>
                                                <input required type="text" placeholder="User#1234" className="w-full bg-black/60 border border-white/10 rounded-xl py-4 px-4 text-white focus:border-mc-gold/50 outline-none transition-all" value={formData.discordUsername} onChange={(e) => setFormData({ ...formData, discordUsername: e.target.value })} />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Email</label>
                                                <div className="relative">
                                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                                    <input required type="email" placeholder="Email" className="w-full bg-black/60 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-mc-gold/50 outline-none transition-all" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                                </div>
                                            </div>
                                            <button type="submit" disabled={loading} className="w-full py-5 bg-mc-gold text-mc-dark font-black rounded-2xl mt-4 hover:brightness-110 transition-all disabled:opacity-50">
                                                {loading ? "Processing..." : `Pay ₹${total.toFixed(0)}`}
                                            </button>
                                        </form>
                                    )}

                                    {mode === "manual" && (
                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Billing Information</p>
                                                <textarea readOnly value={generateBill()} className="w-full bg-black/60 border border-white/10 rounded-2xl p-4 text-white text-sm h-48 focus:outline-none custom-scrollbar" />
                                            </div>
                                            <button onClick={handleCopy} className="w-full py-5 bg-mc-gold text-mc-dark font-black rounded-2xl flex justify-center items-center gap-3 hover:brightness-110 transition-all">
                                                <Copy size={20} />
                                                {copied ? "Copied!" : "Copy Details"}
                                            </button>
                                            <div className="text-center space-y-4">
                                                <p className="text-xs text-gray-500">
                                                    Send this to <span className="text-white font-bold">adhrav</span> on Discord via ticket.
                                                </p>
                                                <div className="flex justify-center gap-4 text-[10px] font-black uppercase text-gray-600 tracking-widest">
                                                    <span>Verified</span>
                                                    <span>•</span>
                                                    <span>Secure</span>
                                                    <span>•</span>
                                                    <span>24/7 Support</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {success && (
                                        <div className="text-center py-12 animate-in fade-in zoom-in">
                                            <CheckCircle2 className="mx-auto text-mc-gold mb-6" size={64} />
                                            <h3 className="text-2xl font-black text-white uppercase mb-2">Order Received!</h3>
                                            <p className="text-gray-500 text-sm">We've received your request and will process it shortly.</p>
                                            <button onClick={onClose} className="mt-8 px-8 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-colors">Close</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
