import { motion } from 'motion/react';

interface Props {
    count: number;
}

export default function CoinStackLight({ count }: Props) {
    // Determine number of layers to show (visual representation)
    const layers = Math.min(Math.floor(count / 100), 40);

    return (
        <div className="w-full h-80 flex items-center justify-center perspective-1000">
            <div className="relative w-48 h-48 preserve-3d rotate-x-60 animate-slow-spin">
                {Array.from({ length: layers }).map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: -i * 2 }}
                        className="absolute inset-0 rounded-full border-2 border-mc-gold/40 bg-gradient-to-tr from-mc-orange via-mc-gold to-mc-orange shadow-inner"
                        style={{
                            backfaceVisibility: 'hidden',
                            boxShadow: '0 0 15px rgba(251, 191, 36, 0.2)',
                            zIndex: i
                        }}
                    >
                        {/* Coin Inner Detail */}
                        <div className="absolute inset-2 rounded-full border border-mc-dark/20 flex items-center justify-center">
                            <div className="w-2/3 h-2/3 rounded-full border border-mc-dark/10 bg-white/10" />
                        </div>
                    </motion.div>
                ))}

                {layers === 0 && (
                    <div className="absolute inset-0 rounded-full border-2 border-mc-gold/10 bg-white/5 animate-pulse" />
                )}
            </div>

            <style>{`
                .perspective-1000 { perspective: 1000px; }
                .preserve-3d { transform-style: preserve-3d; }
                .rotate-x-60 { transform: rotateX(60deg) rotateZ(0deg); }
                @keyframes slow-spin {
                    from { transform: rotateX(60deg) rotateZ(0deg); }
                    to { transform: rotateX(60deg) rotateZ(360deg); }
                }
                .animate-slow-spin {
                    animation: slow-spin 10s linear infinite;
                }
            `}</style>
        </div>
    );
}
