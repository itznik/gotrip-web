'use client';

import { motion } from 'framer-motion';
import { MapPin, Globe2 } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen bg-[#0B1120] flex items-center justify-center overflow-hidden pt-20">
      
      {/* 1. The Background World Map (CSS approach) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-full h-full bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-no-repeat bg-contain filter invert hue-rotate-180"></div>
      </div>

      {/* 2. Glow Effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-accent/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
        >
          <Globe2 size={16} className="text-brand-accent" />
          <span className="text-slate-300 text-sm font-medium tracking-wide">No.1 Travel App of 2024</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-8xl font-bold text-white mb-8 leading-tight tracking-tight"
        >
          Explore the World <br />
          with <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-orange-400">GoTrip.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12"
        >
          We curate the best experiences for you. From Bali's beaches to Paris's streets, find your next adventure today.
        </motion.p>

        {/* Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-5 justify-center"
        >
          <button className="btn-primary px-8 py-4 text-white rounded-full font-bold text-lg hover:scale-105 transition-transform">
            Book Now
          </button>
          <button className="px-8 py-4 bg-white/5 text-white border border-white/10 rounded-full font-bold text-lg hover:bg-white/10 backdrop-blur-sm transition-all">
            Watch Demo
          </button>
        </motion.div>
      </div>
    </section>
  );
}
