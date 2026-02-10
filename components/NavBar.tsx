import React from 'react';
import { motion } from 'framer-motion';
import { GUIDE_DATA } from '../data';

interface NavBarProps {
  activeSection: string | null;
  onNavigate: (id: string) => void;
}

export const NavBar: React.FC<NavBarProps> = ({ activeSection, onNavigate }) => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-[90%] md:max-w-fit">
      <motion.div 
        className="bg-[#202020]/90 backdrop-blur-xl border border-white/5 rounded-full p-2 flex items-center gap-2 shadow-2xl overflow-x-auto no-scrollbar"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring' }}
      >
        {GUIDE_DATA.map((section) => {
          const isActive = activeSection === section.id;
          const Icon = section.icon;

          return (
            <button
              key={section.id}
              onClick={() => onNavigate(section.id)}
              className={`relative flex items-center justify-center p-3 rounded-full transition-all duration-300 group shrink-0 ${isActive ? 'bg-white text-black px-6' : 'hover:bg-white/5 text-gray-400'}`}
            >
              <Icon size={20} className={isActive ? 'mr-2' : ''} />
              {isActive && (
                <motion.span 
                    initial={{ opacity: 0, width: 0 }} 
                    animate={{ opacity: 1, width: 'auto' }}
                    className="font-medium whitespace-nowrap text-sm"
                >
                    {section.title}
                </motion.span>
              )}
              {/* Tooltip for non-active items */}
              {!isActive && (
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#303030] text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/5">
                    {section.title}
                </div>
              )}
            </button>
          );
        })}
      </motion.div>
    </div>
  );
};