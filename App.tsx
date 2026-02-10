import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GUIDE_DATA } from './data';
import { NavBar } from './components/NavBar';
import { SectionView } from './components/SectionView';
import { Walkthrough } from './components/Walkthrough';
import { Sparkles, PlayCircle } from 'lucide-react';

const App: React.FC = () => {
  const [activeSectionId, setActiveSectionId] = useState<string>('welcome');
  const [isWalkthroughOpen, setIsWalkthroughOpen] = useState(false);

  const activeSection = GUIDE_DATA.find(s => s.id === activeSectionId) || GUIDE_DATA[0];

  return (
    <div className="min-h-screen bg-[#191919] text-white selection:bg-white selection:text-black pb-32 overflow-x-hidden font-sans">
        
        {/* Subtle Ambient Background - Monochrome */}
        <div className="fixed inset-0 pointer-events-none z-0">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-white/[0.02] blur-[150px] rounded-full" />
            <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] bg-white/[0.02] blur-[150px] rounded-full" />
        </div>

        {/* Floating "Walkthrough" Button */}
        <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsWalkthroughOpen(true)}
            className="fixed top-6 right-6 z-40 bg-[#252525]/80 hover:bg-[#303030] backdrop-blur-xl border border-white/5 text-gray-200 hover:text-white px-5 py-2.5 rounded-full flex items-center gap-2 shadow-lg transition-all group"
        >
            <span className="text-sm font-medium">Staff Walkthrough</span>
            <div className="bg-white text-black rounded-full p-1 group-hover:rotate-90 transition-transform duration-500">
                <PlayCircle size={14} fill="currentColor" />
            </div>
        </motion.button>


      {/* Main Layout */}
      <div className="relative z-10 pt-20 px-6 max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="flex flex-col items-center mb-16">
           <motion.div 
             initial={{ scale: 0.8, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             className="flex items-center gap-2 text-xs font-mono text-gray-500 border border-white/5 px-3 py-1 rounded-full mb-6 uppercase tracking-widest bg-[#252525]/50"
            >
             <Sparkles size={10} />
             <span>Official Staff Handbook</span>
           </motion.div>
        </header>

        {/* Content Area - Spacious Tab View */}
        <AnimatePresence mode="wait">
            <SectionView key={activeSection.id} section={activeSection} />
        </AnimatePresence>
      </div>

      {/* Navigation Bar */}
      <NavBar activeSection={activeSectionId} onNavigate={setActiveSectionId} />

      {/* Onboarding Overlay */}
      <AnimatePresence>
        {isWalkthroughOpen && (
            <Walkthrough onClose={() => setIsWalkthroughOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;