import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Palette, Lock } from 'lucide-react';
import { ARMOR_SKINS } from './ArmorSkinSelector';

type ArmorSkin = 'iron' | 'diamond' | 'netherite' | 'gold' | 'copper' | 'custom';

interface AdminArmorManagerProps {
  kitId: string;
  currentSkin?: ArmorSkin;
  customColor?: string;
  onSkinAssign: (kitId: string, skin: ArmorSkin, color: string) => void;
  isAdmin: boolean;
}

export default function AdminArmorManager({
  kitId,
  currentSkin = 'iron',
  customColor,
  onSkinAssign,
  isAdmin
}: AdminArmorManagerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const currentSkinData = ARMOR_SKINS.find((s) => s.id === currentSkin);

  if (!isAdmin) {
    return (
      <div className="px-4 py-3 rounded-lg bg-mc-dark/50 border border-white/10 text-gray-400 text-sm flex items-center gap-2">
        <Lock size={14} />
        Texture: {currentSkinData?.name || currentSkin}
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-2 rounded-lg bg-mc-dark border border-yellow-600/50 hover:border-yellow-600 transition-all duration-200 text-white text-sm"
        whileHover={{ borderColor: 'rgb(202, 138, 4)' }}
      >
        <div className="flex items-center gap-2">
          <Palette size={16} className="text-yellow-500" />
          <div className="text-left">
            <div className="text-xs text-yellow-600 uppercase">Admin: Armor Texture</div>
            <div className="font-semibold text-white">{currentSkinData?.name}</div>
          </div>
        </div>
        <ChevronDown 
          size={14} 
          className={`transition-transform duration-200 text-yellow-500 ${isOpen ? 'rotate-180' : ''}`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 bg-yellow-900/20 border border-yellow-600/50 rounded-lg shadow-xl z-40 overflow-hidden backdrop-blur-sm"
          >
            {ARMOR_SKINS.map((skin) => (
              <motion.button
                key={skin.id}
                onClick={() => {
                  onSkinAssign(kitId, skin.id as ArmorSkin, skin.color);
                  setIsOpen(false);
                }}
                className={`w-full px-3 py-2 text-left text-xs transition-all duration-200 flex items-center gap-2 ${
                  currentSkin === skin.id
                    ? 'bg-yellow-600/30 border-l-2 border-yellow-500'
                    : 'hover:bg-yellow-600/20 border-l-2 border-transparent'
                }`}
                whileHover={{ paddingLeft: '0.75rem' }}
              >
                <div 
                  className="w-4 h-4 rounded border border-white/20"
                  style={{ backgroundColor: skin.color }}
                />
                <div className="flex-1">
                  <div className="font-semibold text-yellow-100">{skin.name}</div>
                  <div className="text-xs text-yellow-300/70">{skin.description}</div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {isAdmin && (
        <div className="mt-2 p-2 bg-yellow-900/20 border border-yellow-600/30 rounded text-xs text-yellow-200">
          <strong>💡 Admin Only:</strong> This texture assignment will be visible to all users viewing this kit.
        </div>
      )}
    </div>
  );
}
