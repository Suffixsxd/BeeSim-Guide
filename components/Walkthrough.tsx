import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GUIDE_DATA } from '../data';
import { ContentSection } from '../types';
import { 
  ArrowRight, 
  Check, 
  ChevronRight, 
  X, 
  Shield, 
  Zap, 
  Star,
  LucideIcon
} from 'lucide-react';

interface WalkthroughProps {
  onClose: () => void;
}

type StaffRank = 'Helper' | 'Junior Moderator' | 'Moderator';

interface Slide {
  title: string;
  subtitle: string;
  content: React.ReactNode;
  icon?: LucideIcon;
  isLast?: boolean;
}

export const Walkthrough: React.FC<WalkthroughProps> = ({ onClose }) => {
  const [step, setStep] = useState<'rank-select' | 'presentation'>('rank-select');
  const [selectedRank, setSelectedRank] = useState<StaffRank | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);

  const ranks: { id: StaffRank; icon: LucideIcon; description: string }[] = [
    { id: 'Helper', icon: Star, description: 'The first line of defense. Helping players and keeping chat clean.' },
    { id: 'Junior Moderator', icon: Zap, description: 'Taking on more responsibility with advanced moderation tools.' },
    { id: 'Moderator', icon: Shield, description: 'Leading the team and handling complex server situations.' },
  ];

  const handleRankSelect = (rank: StaffRank) => {
    setSelectedRank(rank);
    setStep('presentation');
    setSlideIndex(0);
  };

  const getSlides = (): Slide[] => {
    if (!selectedRank) return [];

    const welcomeSlide: Slide = {
        title: `Welcome, ${selectedRank}!`,
        subtitle: "Let's get you up to speed with your new responsibilities.",
        content: "You are now part of the BeeSim Staff Team. This guide will walk you through the essentials of your role.",
        icon: Star
    };

    const guidelinesSection = GUIDE_DATA.find(s => s.id === 'guidelines');
    const guidelinesSlide: Slide = {
        title: "Core Values",
        subtitle: "What we expect from you.",
        content: (
            <ul className="space-y-4 text-left">
                <li className="flex items-center gap-3 text-gray-300"><Check className="text-white" size={18} /> Be professional and patient.</li>
                <li className="flex items-center gap-3 text-gray-300"><Check className="text-white" size={18} /> Communicate clearly.</li>
                <li className="flex items-center gap-3 text-gray-300"><Check className="text-white" size={18} /> Be fair and unbiased.</li>
            </ul>
        ),
        icon: guidelinesSection?.icon
    };

    const rolesSection = GUIDE_DATA.find(s => s.id === 'roles');
    const myRole = rolesSection?.subSections?.find(sub => sub.title === selectedRank || (selectedRank === 'Junior Moderator' && sub.title === 'Junior Moderator'));
    const roleSlide: Slide = {
        title: "Your Responsibilities",
        subtitle: `What does a ${selectedRank} do?`,
        content: (
            <ul className="grid grid-cols-1 gap-3 text-left">
                {myRole?.list?.slice(0, 4).map((item, i) => (
                    <li key={i} className="bg-white/5 p-3 rounded-lg text-sm border border-white/5 text-gray-300">{item}</li>
                ))}
            </ul>
        ),
        icon: Shield
    };

    const commandsSection = GUIDE_DATA.find(s => s.id === 'commands');
    const commandTitleMap: Record<string, string> = {
        'Helper': 'Helper Commands',
        'Junior Moderator': 'Jr. Mod Commands',
        'Moderator': 'Moderator Commands'
    };
    const myCommands = commandsSection?.subSections?.find(sub => sub.title === commandTitleMap[selectedRank]);
    const commandsSlide: Slide = {
        title: "Your Toolkit",
        subtitle: "Key commands you will use daily.",
        content: (
             <div className="grid grid-cols-1 gap-2 text-left max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {myCommands?.commands?.map((cmd, i) => (
                    <div key={i} className="flex flex-col bg-[#252525] p-3 rounded border border-white/5">
                        <code className="text-white text-sm font-bold mb-1">{cmd.name.split(' ')[0]}</code>
                        <span className="text-xs text-gray-400">{cmd.description}</span>
                    </div>
                ))}
            </div>
        ),
        icon: Zap
    };

    const outroSlide: Slide = {
        title: "You're Ready!",
        subtitle: "Go make BeeSim an amazing place.",
        content: "Remember, the staff guide is always available here if you need to double-check anything.",
        isLast: true,
        icon: Star
    };

    return [welcomeSlide, guidelinesSlide, roleSlide, commandsSlide, outroSlide];
  };

  const slides = getSlides();
  const currentSlide = slides[slideIndex];

  const nextSlide = () => {
    if (slideIndex < slides.length - 1) {
        setSlideIndex(prev => prev + 1);
    } else {
        onClose();
    }
  };

  const prevSlide = () => {
      if (slideIndex > 0) setSlideIndex(prev => prev - 1);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowRight' && step === 'presentation') nextSlide();
        if (e.key === 'ArrowLeft' && step === 'presentation') prevSlide();
        if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [step, slideIndex, slides.length]);


  return (
    <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-[#191919]/90 backdrop-blur-xl flex flex-col items-center justify-center p-6"
    >
        {/* Close Button */}
        <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
        >
            <X size={24} />
        </button>

        {step === 'rank-select' ? (
            <div className="max-w-5xl w-full text-center space-y-12">
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2 className="text-5xl font-bold text-white mb-4">Welcome to the Team.</h2>
                    <p className="text-xl text-gray-400">Select your rank to begin your personalized onboarding.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {ranks.map((rank, idx) => (
                        <motion.button
                            key={rank.id}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 + (idx * 0.1) }}
                            onClick={() => handleRankSelect(rank.id)}
                            className="group relative bg-[#202020] hover:bg-[#252525] border border-white/5 hover:border-white/10 rounded-3xl p-8 text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col h-full"
                        >
                            <div className={`p-4 rounded-2xl bg-white/5 w-fit mb-6 text-white group-hover:scale-110 transition-transform duration-300`}>
                                <rank.icon size={32} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">{rank.id}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{rank.description}</p>
                            
                            <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                                <ArrowRight className="text-white" />
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>
        ) : (
            <div className="max-w-2xl w-full relative">
                 {/* Progress Bar */}
                <div className="absolute -top-12 left-0 w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                        className="h-full bg-white"
                        initial={{ width: 0 }}
                        animate={{ width: `${((slideIndex + 1) / slides.length) * 100}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>

                <AnimatePresence mode='wait'>
                    <motion.div
                        key={slideIndex}
                        initial={{ opacity: 0, x: 50, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -50, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="bg-[#202020] border border-white/5 rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden min-h-[500px] flex flex-col justify-between"
                    >
                         {/* Background Blob */}
                         <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 blur-[80px] rounded-full pointer-events-none" />

                        <div className="relative z-10">
                            <div className="mb-6 inline-flex items-center justify-center p-3 rounded-2xl bg-white/5 text-white border border-white/5">
                                {currentSlide.icon && <currentSlide.icon size={28} strokeWidth={1.5} />}
                            </div>
                            
                            <motion.h2 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight"
                            >
                                {currentSlide.title}
                            </motion.h2>
                            
                            <motion.p 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-xl text-gray-400 mb-8 font-light"
                            >
                                {currentSlide.subtitle}
                            </motion.p>
                            
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-gray-300 text-lg leading-relaxed"
                            >
                                {currentSlide.content}
                            </motion.div>
                        </div>

                        <div className="flex items-center justify-between mt-12 relative z-10">
                            <button 
                                onClick={prevSlide}
                                disabled={slideIndex === 0}
                                className={`text-sm font-medium text-gray-500 hover:text-white transition-colors ${slideIndex === 0 ? 'opacity-0 cursor-default' : 'opacity-100'}`}
                            >
                                Back
                            </button>

                            <button
                                onClick={nextSlide}
                                className="group flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition-all active:scale-95"
                            >
                                {currentSlide.isLast ? "Finish" : "Next"}
                                {!currentSlide.isLast && <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        )}
    </motion.div>
  );
};