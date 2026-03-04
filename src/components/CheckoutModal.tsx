import { motion, AnimatePresence } from "motion/react";
import { X, User, Mail, Send, Copy, CheckCircle2 } from "lucide-react";
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

    // ------------------------
    // Generate Bill Text
    // ------------------------

    const generateBill = () => {
        return `
🧾 NEW PURCHASE REQUEST

Minecraft Username: ${formData.mcUsername || "Not Provided"}
Discord Username: ${formData.discordUsername || "Not Provided"}
Email: ${formData.email || "Not Provided"}

Items:
${cart
    .map((item) => `• ${item.name} x${item.quantity} - ₹${item.price_inr}`)
    .join("\n")}

Total Amount: ₹${total.toFixed(2)}

Please verify payment.
        `;
    };

    const handleCopy = async () => {
        await navigator.clipboard.writeText(generateBill());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // ------------------------
    // Normal Form Submit
    // ------------------------

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    items: cart,
                    totalAmount: total,
                }),
            });

            if (response.ok) {
                setSuccess(true);
            }
        } catch (err) {
            alert("Checkout failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/95">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="bg-mc-dark border border-white/10 rounded-3xl w-full max-w-lg overflow-hidden"
                    >
                        <div className="p-8">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-black text-white uppercase">
                                    {mode === "manual"
                                        ? "Manual Checkout"
                                        : "Finalize Checkout"}
                                </h2>
                                <button onClick={onClose}>
                                    <X size={20} />
                                </button>
                            </div>

                            {/* TOTAL */}
                            <p className="text-mc-gold font-bold mb-6">
                                Total: ₹{total.toFixed(2)}
                            </p>

                            {/* ============================= */}
                            {/* NORMAL FORM MODE */}
                            {/* ============================= */}

                            {mode === "form" && !success && (
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-4"
                                >
                                    <input
                                        required
                                        type="text"
                                        placeholder="Minecraft Username"
                                        className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white"
                                        value={formData.mcUsername}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                mcUsername: e.target.value,
                                            })
                                        }
                                    />

                                    <input
                                        required
                                        type="text"
                                        placeholder="Discord Username"
                                        className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white"
                                        value={formData.discordUsername}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                discordUsername: e.target.value,
                                            })
                                        }
                                    />

                                    <input
                                        required
                                        type="email"
                                        placeholder="Email Address"
                                        className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white"
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                email: e.target.value,
                                            })
                                        }
                                    />

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-4 bg-mc-gold text-mc-dark font-black rounded-xl"
                                    >
                                        {loading
                                            ? "Processing..."
                                            : "Confirm & Pay"}
                                    </button>
                                </form>
                            )}

                            {mode === "form" && success && (
                                <div className="text-center py-10">
                                    <CheckCircle2
                                        className="mx-auto text-green-400 mb-4"
                                        size={40}
                                    />
                                    <p className="text-white">
                                        Order placed successfully.
                                    </p>
                                </div>
                            )}

                            {/* ============================= */}
                            {/* MANUAL MODE */}
                            {/* ============================= */}

                            {mode === "manual" && (
                                <div className="space-y-4">
                                    <textarea
                                        readOnly
                                        value={generateBill()}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white h-64"
                                    />

                                    <button
                                        onClick={handleCopy}
                                        className="w-full py-4 bg-mc-gold text-mc-dark font-black rounded-xl flex justify-center gap-2"
                                    >
                                        <Copy size={18} />
                                        {copied ? "Copied!" : "Copy Bill"}
                                    </button>

                                    <p className="text-xs text-gray-500 text-center">
                                        Paste this inside a Discord ticket or DM
                                        to <b>adhrav</b>
                                    </p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
