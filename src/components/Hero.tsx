'use client';

import { motion } from 'framer-motion';
import { Globe2, ArrowRight, PlayCircle } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full pt-32 pb-12 md:pt-40 md:pb-20 overflow-hidden flex flex-col items-center justify-center text-center px-4">
      
      {/* 1. Dynamic Background Map (Fixed scaling) */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-20 pointer-events-none transition-opacity duration-500">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] max-w-[1200px] aspect-[2/1] bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-no-repeat bg-contain dark:filter dark:invert dark:hue-rotate-180"></div>
      </div>

      {/* 2. Glow Effects */}
      <div className="absolute top-0 right-0 w-[200px] h-[200px] md:w-[500px] md:h-[500px] bg-blue-500/20 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[200px] h-[200px] md:w-[500px] md:h-[500px] bg-brand-accent/10 rounded-full blur-[80px] md:blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-200/50 dark:bg-white/5 border border-slate-300 dark:border-white/10 backdrop-blur-md mb-6 md:mb-8"
        >
          <Globe2 size={14} className="text-brand-accent" />
          <span className="text-slate-700 dark:text-slate-300 text-xs uppercase tracking-widest font-bold">No.1 Travel App</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold mb-6 leading-[1.1] tracking-tight text-slate-900 dark:text-white"
        >
          Explore the World <br className="hidden md:block" />
          with <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-orange-500">GoTrip.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-xl mx-auto mb-8 md:mb-10 px-4 leading-relaxed"
        >
          Curated experiences for the modern traveler. From Bali's beaches to Paris's streets, find your adventure.
        </motion.p>

        {/* Buttons - Fully Responsive Stack */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row w-full sm:w-auto gap-4 px-4"
        >
          <button className="w-full sm:w-auto px-8 py-4 bg-brand-accent text-white rounded-full font-bold text-lg hover:bg-orange-600 transition-all flex items-center justify-center gap-2 shadow-xl shadow-brand-accent/20">
            Book Now <ArrowRight size={20} />
          </button>
          <button className="w-full sm:w-auto px-8 py-4 bg-slate-200 dark:bg-white/5 text-slate-900 dark:text-white border border-transparent dark:border-white/10 rounded-full font-bold text-lg hover:bg-slate-300 dark:hover:bg-white/10 backdrop-blur-sm transition-all flex items-center justify-center gap-2">
            <PlayCircle size={20} /> Watch Demo
          </button>
        </motion.div>
      </div>
    </section>
  );
}
