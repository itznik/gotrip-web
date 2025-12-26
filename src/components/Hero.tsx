'use client';

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen bg-brand-dark flex items-center justify-center overflow-hidden pt-20">
      
      {/* Background Glow Effects (Simulating the Globe Atmosphere) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-secondary/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        
        {/* Animated Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
          </span>
          <span className="text-gray-300 text-sm font-medium">Top Rated Travel Agency</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight"
        >
          Explore the World with <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-orange-400">GoTrip.</span>
          <br />
          <span className="text-gray-400 font-light">Your Journey Starts Here.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg text-gray-400 max-w-2xl mx-auto mb-10"
        >
          Discover exotic destinations, book premium flights, and create memories that last a lifetime with our AI-powered travel planner.
        </motion.p>

        {/* Floating Destination Pins (Decoration) */}
        <div className="hidden md:block absolute top-1/3 left-10 animate-bounce duration-[3000ms]">
          <MapPin className="text-brand-accent w-8 h-8 drop-shadow-[0_0_15px_rgba(255,126,103,0.5)]" />
        </div>
        <div className="hidden md:block absolute bottom-1/3 right-20 animate-bounce duration-[4000ms]">
          <MapPin className="text-blue-400 w-6 h-6 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]" />
        </div>

        {/* Call to Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button className="px-8 py-4 bg-brand-accent text-white rounded-full font-bold text-lg shadow-[0_0_20px_rgba(255,126,103,0.4)] hover:shadow-[0_0_30px_rgba(255,126,103,0.6)] hover:-translate-y-1 transition-all">
            Plan a Trip
          </button>
          <button className="px-8 py-4 bg-white/10 text-white border border-white/20 rounded-full font-bold text-lg hover:bg-white/20 hover:-translate-y-1 transition-all backdrop-blur-sm">
            View Destinations
          </button>
        </motion.div>
      </div>

      {/* Map Grid Overlay (Simulating the map texture) */}
      <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-no-repeat bg-center bg-contain opacity-5 mix-blend-overlay pointer-events-none" style={{ backgroundSize: '80%' }}></div>
    </section>
  );
}
