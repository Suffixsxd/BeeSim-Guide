import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LucideIcon, ChevronDown } from 'lucide-react';

interface DynamicCardProps {
  id: string;
  title: string;
  description?: string;
  icon: LucideIcon;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export const DynamicCard: React.FC<DynamicCardProps> = ({
  id,
  title,
  description,
  icon: Icon,
  isOpen,
  onToggle,
  children
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll to center when opened
  useEffect(() => {
    if (isOpen && containerRef.current) {
        setTimeout(() => {
            containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    }
  }, [isOpen]);

  return (
    <motion.div
      ref={containerRef}
      layout
      onClick={!isOpen ? onToggle : undefined}
      className={`relative group cursor-pointer ${isOpen ? 'cursor-default' : 'hover:bg-white/5'} transition-colors duration-300`}
      initial={{ borderRadius: 24 }}
      animate={{ 
        borderRadius: isOpen ? 24 : 50,
        backgroundColor: isOpen ? 'rgba(20, 20, 22, 1)' : 'rgba(10, 10, 10, 0.6)',
        borderColor: isOpen ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
      }}
      style={{
        borderWidth: 1,
        borderStyle: 'solid',
        overflow: 'hidden'
      }}
    >
        {/* Glow effect behind */}
        <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-xl opacity-0 transition-opacity duration-700 ${isOpen ? 'opacity-100' : 'group-hover:opacity-30'}`} />

      <motion.div layout className="relative p-6 z-10">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
            <motion.div 
                layout="position"
                className={`p-3 rounded-full ${isOpen ? 'bg-white text-black' : 'bg-white/10 text-white'}`}
            >
                <Icon size={24} />
            </motion.div>
            
            <motion.div layout="position" className="flex flex-col">
                <motion.h2 
                    layout="position" 
                    className={`font-bold text-lg ${isOpen ? 'text-2xl mb-1' : 'text-lg'}`}
                >
                {title}
                </motion.h2>
                {(!isOpen || isOpen) && (
                    <motion.p 
                        layout="position"
                        className="text-sm text-gray-400"
                        animate={{ opacity: isOpen ? 1 : 0.7 }}
                    >
                        {description}
                    </motion.p>
                )}
            </motion.div>
            </div>

            <motion.button
                layout="position"
                onClick={(e) => {
                    e.stopPropagation();
                    onToggle();
                }}
                className={`p-2 rounded-full hover:bg-white/10 transition-colors ${isOpen ? 'rotate-180' : ''}`}
            >
                <ChevronDown className="text-gray-400" />
            </motion.button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="mt-6 border-t border-white/5 pt-6"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};