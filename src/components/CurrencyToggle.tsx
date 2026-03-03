import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DollarSign, ChevronDown } from 'lucide-react';
import { useCurrencyStore, Currency } from '../store';

const currencies: { code: Currency; name: string; symbol: string }[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'DRM', name: 'Dram', symbol: 'Ð' },
];

export default function CurrencyToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const { currency, setCurrency } = useCurrencyStore();

  const currentCurrency = currencies.find((c) => c.code === currency);

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-wood-dark/60 border border-wood-accent/30 hover:border-wood-accent/60 transition-all duration-200 text-wood-light text-sm font-medium"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <DollarSign size={16} />
        <span className="min-w-[50px] text-center">{currentCurrency?.code}</span>
        <ChevronDown 
          size={14} 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-2 w-48 bg-wood-dark border border-wood-accent/30 rounded-lg shadow-xl z-50 overflow-hidden"
          >
            {currencies.map((curr) => (
              <motion.button
                key={curr.code}
                onClick={() => {
                  setCurrency(curr.code);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 text-left text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  currency === curr.code
                    ? 'bg-wood-accent/20 text-wood-accent border-r-2 border-wood-accent'
                    : 'text-wood-light hover:bg-wood-accent/10 hover:text-wood-accent'
                }`}
                whileHover={{ paddingLeft: '1.25rem' }}
              >
                <span className="text-lg w-6 text-center">{curr.symbol}</span>
                <div className="flex-1">
                  <div className="font-semibold">{curr.code}</div>
                  <div className="text-xs opacity-70">{curr.name}</div>
                </div>
                {currency === curr.code && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2 h-2 rounded-full bg-wood-accent"
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
