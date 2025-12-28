'use client';

import { Quote } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
  { id: 1, name: 'Ellan V.', role: 'Travel Vlogger', image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1000&auto=format&fit=crop', quote: "The best planning system I've ever used. GoTrip made my Japan tour completely stress-free." },
  { id: 2, name: 'Altrina M.', role: 'Digital Nomad', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop', quote: "I found hidden gems in Bali that weren't listed on any other site. Fantastic!" },
  { id: 3, name: 'Alex T.', role: 'Photographer', image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop', quote: "Customer support is top-notch. Rescheduled my flight in minutes." },
  { id: 4, name: 'Sarah J.', role: 'Food Critic', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop', quote: "The food recommendations were spot on. Every restaurant was a 10/10 experience." },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-brand-light dark:bg-[#0B1120] relative overflow-hidden transition-colors duration-300">
      
      <div className="text-center mb-12 px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">What Travelers Say</h2>
        <p className="text-slate-500 dark:text-slate-400">Real stories from our global community.</p>
      </div>

      {/* Marquee Container */}
      <div className="relative flex overflow-x-hidden group">
        
        {/* Gradient Masks for fading edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-brand-light dark:from-brand-dark to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-brand-light dark:from-brand-dark to-transparent" />

        {/* Moving Track (Duplicated for seamless loop) */}
        <div className="flex animate-marquee whitespace-nowrap gap-6 py-4">
          {[...testimonials, ...testimonials, ...testimonials].map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="relative w-[300px] md:w-[400px] flex-shrink-0 p-8 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 shadow-xl dark:shadow-none whitespace-normal flex flex-col justify-between h-[280px]" 
            >
              {/* Note: h-[280px] fixes the auto-height issue */}
              
              <div>
                <Quote className="text-brand-accent/20 w-10 h-10 mb-4" />
                <p className="text-slate-600 dark:text-slate-300 mb-6 italic text-lg leading-relaxed line-clamp-3">
                  "{item.quote}"
                </p>
              </div>

              <div className="flex items-center gap-4 mt-auto">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-brand-accent">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="text-slate-900 dark:text-white font-bold">{item.name}</h4>
                  <p className="text-slate-500 text-sm">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
