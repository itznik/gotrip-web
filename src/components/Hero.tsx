'use client';

import { motion } from 'framer-motion';
import { Globe2 } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen bg-[#0B1120] flex flex-col items-center justify-center overflow-hidden pt-24 pb-12 px-4">
      
      {/* 1. Background Map (Fixed for Mobile) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-[10%] left-[-20%] w-[140%] h-full bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-no-repeat bg-contain filter invert hue-rotate-180"></div>
      </div>

      {/* 2. Glow Effects */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-accent/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl text-center flex flex-col items-center">
        
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6"
        >
          <Globe2 size={14} className="text-brand-accent" />
          <span className="text-slate-300 text-xs uppercase tracking-widest font-semibold">No.1 Travel App</span>
        </motion.div>

        {/* Main Headline - Adjusted for Mobile */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight"
        >
          Explore the World <br />
          with <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-orange-400">GoTrip.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base sm:text-lg text-slate-400 max-w-lg mx-auto mb-8 px-4"
        >
          Curated experiences for the modern traveler. From Bali's beaches to Paris's streets, find your adventure.
        </motion.p>

        {/* Buttons - Fixed Stacking */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4"
        >
          <button className="w-full sm:w-auto px-8 py-4 bg-brand-accent text-white rounded-full font-bold text-lg hover:shadow-lg hover:shadow-orange-500/20 transition-all">
            Book Now
          </button>
          <button className="w-full sm:w-auto px-8 py-4 bg-white/5 text-white border border-white/10 rounded-full font-bold text-lg hover:bg-white/10 backdrop-blur-sm transition-all">
            Watch Demo
          </button>
        </motion.div>
      </div>
    </section>
  );
}
