'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    name: 'Ellan V.',
    role: 'Travel Vlogger',
    image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1000&auto=format&fit=crop',
    quote: "The best planning system I've ever used. GoTrip made my Japan tour completely stress-free and magical."
  },
  {
    id: 2,
    name: 'Altrina M.',
    role: 'Digital Nomad',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop',
    quote: "I found hidden gems in Bali that weren't listed on any other site. The local guides were fantastic!"
  },
  {
    id: 3,
    name: 'Alex T.',
    role: 'Photographer',
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop',
    quote: "Customer support is top-notch. They helped me reschedule my flight in minutes when I missed my connection."
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-[#0B1120] relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">What Travelers Say</h2>
          <p className="text-slate-400">Real stories from our global community.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative p-8 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
            >
              <Quote className="absolute top-8 right-8 text-brand-accent/20 w-10 h-10" />
              
              <p className="text-slate-300 mb-8 relative z-10 italic">
                "{item.quote}"
              </p>

              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-brand-accent">
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-white font-bold">{item.name}</h4>
                  <p className="text-slate-500 text-sm">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
