import { motion } from 'motion/react';
import { Shield } from 'lucide-react';

interface Item {
  name: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
  description?: string;
}

interface ItemShowcaseProps {
  items: Item[];
  title?: string;
  color?: string;
}

export default function ItemShowcase({ items, title = 'Items Included', color = '#f59e0b' }: ItemShowcaseProps) {
  return (
    <div className="w-full">
      {title && (
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Shield size={20} style={{ color }} />
          {title}
        </h3>
      )}
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="group relative"
            >
              <div 
                className="p-4 rounded-lg backdrop-blur-sm border transition-all duration-300 hover:scale-105 cursor-default"
                style={{
                  borderColor: `${color}40`,
                  backgroundColor: `${color}08`,
                }}
              >
                <div className="flex flex-col items-center gap-2 text-center">
                  <div 
                    className="p-2 rounded-lg transition-all"
                    style={{
                      backgroundColor: `${color}20`,
                    }}
                  >
                    <div style={{ color: color }}>
                      <Icon size={24} />
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-gray-200 leading-tight">
                    {item.name}
                  </p>
                </div>
              </div>
              
              {/* Hover glow effect */}
              <div 
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg -z-10"
                style={{
                  backgroundColor: color,
                  opacity: '0.1',
                }}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
