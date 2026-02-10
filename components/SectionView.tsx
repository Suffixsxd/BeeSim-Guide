import React from 'react';
import { motion } from 'framer-motion';
import { Command, ContentSection, Punishment } from '../types';
import { Terminal, ShieldAlert } from 'lucide-react';

interface SectionViewProps {
  section: ContentSection;
}

export const SectionView: React.FC<SectionViewProps> = ({ section }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="max-w-4xl mx-auto pb-40"
    >
      <header className="mb-12 border-b border-white/5 pb-8">
        <div className="flex items-center gap-4 mb-4 text-white">
            <section.icon size={32} strokeWidth={1.5} />
            <h2 className="text-4xl font-bold text-white tracking-tight">{section.title}</h2>
        </div>
        {section.description && (
            <p className="text-xl text-gray-400 font-light">{section.description}</p>
        )}
      </header>

      <div className="space-y-16">
        {section.content && (
          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-2xl font-light leading-relaxed text-gray-200">
              {section.content}
            </p>
          </div>
        )}

        {section.subSections?.map((sub, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: idx * 0.1 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
                <span className="w-1.5 h-6 bg-white rounded-full block" />
                <h3 className="text-2xl font-semibold text-white">{sub.title}</h3>
            </div>
            
            {sub.content && (
                <p className="text-gray-300 text-lg leading-relaxed pl-5 border-l border-white/10">
                    {sub.content}
                </p>
            )}

            {/* Render List */}
            {sub.list && (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {sub.list.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 bg-[#252525]/50 hover:bg-[#303030]/50 p-4 rounded-xl border border-white/5 transition-colors">
                    <div className="mt-2 w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Render Commands */}
            {sub.commands && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {sub.commands.map((cmd: Command, i) => (
                  <div key={i} className="group relative bg-[#202020] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all shadow-sm">
                    <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-100 transition-opacity text-white">
                        <Terminal size={18} />
                    </div>
                    <code className="text-white font-mono text-sm block mb-3 bg-white/5 w-fit px-3 py-1 rounded-md border border-white/5">
                        {cmd.name}
                    </code>
                    <p className="text-gray-200 font-medium mb-2 text-lg">{cmd.description}</p>
                    <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
                        <span className="w-1 h-1 rounded-full bg-gray-600" />
                        <span className="italic">{cmd.usage}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Render Table (Punishments) */}
            {sub.table && (
              <div className="overflow-hidden rounded-2xl border border-white/5 mt-6 bg-[#202020]/50">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-white/5 text-gray-400 uppercase text-xs tracking-wider">
                    <tr>
                      <th className="px-6 py-5 font-semibold">Offense</th>
                      <th className="px-6 py-5 font-semibold">Description</th>
                      <th className="px-6 py-5 font-semibold hidden md:table-cell">Examples</th>
                      <th className="px-6 py-5 font-semibold">Punishment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {sub.table.map((row: Punishment, i) => (
                      <tr key={i} className="group hover:bg-white/5 transition-colors">
                        <td className="px-6 py-5 font-medium text-white group-hover:text-gray-200 transition-colors">{row.offense}</td>
                        <td className="px-6 py-5 text-gray-400">{row.description}</td>
                        <td className="px-6 py-5 text-gray-500 hidden md:table-cell font-mono text-xs">{row.examples}</td>
                        <td className="px-6 py-5">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-white/5 text-gray-300 border border-white/10">
                            {row.punishment}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        ))}

        {section.id === 'welcome' && (
           <motion.div 
             initial={{ scale: 0.95, opacity: 0 }}
             whileInView={{ scale: 1, opacity: 1 }}
             transition={{ delay: 0.2 }}
             className="mt-12 p-8 bg-[#202020] rounded-3xl border border-white/5 relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-white/5 blur-3xl rounded-full" />
               <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                   <div className="p-4 bg-white/5 rounded-full text-white shrink-0 border border-white/5">
                       <ShieldAlert size={32} strokeWidth={1.5} />
                   </div>
                   <div>
                        <h4 className="text-2xl font-bold text-white mb-2">The Golden Rule</h4>
                        <p className="text-lg text-gray-400 italic leading-relaxed">
                            "As a staff member, you don't just enforce rules; you cultivate the community atmosphere. Your actions echo louder than your commands."
                        </p>
                   </div>
               </div>
           </motion.div>
        )}
      </div>
    </motion.div>
  );
};