import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Palette } from 'lucide-react';

export type ArmorSkin = 'iron' | 'diamond' | 'netherite' | 'gold' | 'copper' | 'custom';

interface ArmorSkinOption {
  id: ArmorSkin;
  name: string;
  color: string;
  description: string;
}

const ARMOR_SKINS: ArmorSkinOption[] = [
  { id: 'iron', name: 'Iron', color: '#a8a8a8', description: 'Classic gray iron armor' },
  { id: 'diamond', name: 'Diamond', color: '#33ebcb', description: 'Powerful cyan diamond' },
  { id: 'netherite', name: 'Netherite', color: '#443a3b', description: 'Dark netherite gear' },
  { id: 'gold', name: 'Golden', color: '#ffd700', description: 'Shiny gold armor' },
  { id: 'copper', name: 'Copper', color: '#b87333', description: 'Warm copper tones' },
];

interface ArmorSkinSelectorProps {
  onSkinChange: (skin: ArmorSkin, color: string) => void;
  currentSkin?: ArmorSkin;
}

export default function ArmorSkinSelector({ onSkinChange, currentSkin = 'iron' }: ArmorSkinSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const currentSkinData = ARMOR_SKINS.find((s) => s.id === currentSkin);

  return (
    <div className="relative w-full">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-mc-dark border border-white/10 hover:border-white/20 transition-all duration-200 text-white"
        whileHover={{ borderColor: 'rgba(255, 255, 255, 0.3)' }}
      >
        <div className="flex items-center gap-3">
          <Palette size={18} className="text-mc-gold" />
          <div className="text-left">
            <div className="text-xs text-gray-400 uppercase tracking-wider">Armor Skin</div>
            <div className="font-semibold">{currentSkinData?.name}</div>
          </div>
        </div>
        <ChevronDown 
          size={16} 
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
            className="absolute top-full left-0 right-0 mt-2 bg-mc-dark border border-white/10 rounded-lg shadow-xl z-40 overflow-hidden"
          >
            {ARMOR_SKINS.map((skin) => (
              <motion.button
                key={skin.id}
                onClick={() => {
                  onSkinChange(skin.id, skin.color);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 text-left transition-all duration-200 flex items-center gap-3 ${
                  currentSkin === skin.id
                    ? 'bg-white/10 border-l-2 border-mc-gold'
                    : 'hover:bg-white/5 border-l-2 border-transparent'
                }`}
                whileHover={{ paddingLeft: '1.25rem' }}
              >
                <div 
                  className="w-6 h-6 rounded-md border border-white/20 shadow-lg"
                  style={{ backgroundColor: skin.color }}
                />
                <div className="flex-1">
                  <div className="font-semibold text-white">{skin.name}</div>
                  <div className="text-xs text-gray-400">{skin.description}</div>
                </div>
                {currentSkin === skin.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2 h-2 rounded-full bg-mc-gold"
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

export { ARMOR_SKINS };
