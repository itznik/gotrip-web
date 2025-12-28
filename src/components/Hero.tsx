'use client';
import { motion } from 'framer-motion';
import { Globe2, ArrowRight, PlayCircle } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full pt-32 pb-16 md:pt-48 md:pb-32 flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      
      {/* Background Map */}
      <div className="absolute inset-0 w-full h-full opacity-10 dark:opacity-20 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] md:w-[1200px] aspect-[2/1] bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-no-repeat bg-contain dark:filter dark:invert dark:hue-rotate-180"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-200/50 dark:bg-white/5 border border-slate-300 dark:border-white/10 backdrop-blur-md mb-6">
          <Globe2 size={14} className="text-brand-accent" />
          <span className="text-xs uppercase tracking-widest font-bold opacity-80 text-slate-700 dark:text-slate-300">No.1 Travel App</span>
        </motion.div>

        {/* EXPLICIT COLORS: text-slate-900 for Light, text-white for Dark */}
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-[1.1] tracking-tight text-slate-900 dark:text-white">
          Explore the World <br className="hidden md:block" />
          with <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-orange-500">GoTrip.</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-base sm:text-lg md:text-xl opacity-70 max-w-2xl mx-auto mb-10 leading-relaxed px-2 text-slate-600 dark:text-slate-300">
          Curated experiences for the modern traveler. From Bali's beaches to Paris's streets, find your adventure today.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-col sm:flex-row w-full sm:w-auto gap-4 px-4">
          <button className="w-full sm:w-auto px-8 py-4 bg-brand-accent text-white rounded-full font-bold text-lg hover:bg-orange-600 transition-all flex items-center justify-center gap-2 shadow-xl shadow-brand-accent/20">Book Now <ArrowRight size={20} /></button>
          <button className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full font-bold text-lg hover:bg-slate-50 dark:hover:bg-white/10 backdrop-blur-sm transition-all flex items-center justify-center gap-2 text-slate-900 dark:text-white"><PlayCircle size={20} /> Watch Demo</button>
        </motion.div>
      </div>
    </section>
  );
}
