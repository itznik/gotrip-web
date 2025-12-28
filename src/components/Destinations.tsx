'use client';
import { motion } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const destinations = [
  { id: 1, name: 'Paris, France', price: '$80', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2946&auto=format&fit=crop', rating: '4.8' },
  { id: 2, name: 'Bali, Indonesia', price: '$30', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2838&auto=format&fit=crop', rating: '4.9' },
  { id: 3, name: 'Kyoto, Japan', price: '$60', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2940&auto=format&fit=crop', rating: '4.9' }
];

export default function Destinations() {
  return (
    <section id="destinations" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">Featured Destinations</h2>
          <p className="opacity-70 max-w-2xl mx-auto text-slate-600 dark:text-slate-400">Handpicked locations for the most discerning travelers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {destinations.map((place, index) => (
            <motion.div
              key={place.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              // Explicit Colors: bg-white for Light, bg-white/5 for Dark
              className="group rounded-3xl overflow-hidden bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-lg"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image src={place.image} alt={place.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-white text-sm font-bold">{place.rating}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{place.name}</h3>
                  <div className="text-right">
                    <span className="text-xs opacity-60 block text-slate-500 dark:text-slate-400">From</span>
                    <span className="text-xl font-bold text-brand-accent">{place.price}</span>
                  </div>
                </div>
                <p className="opacity-60 text-sm mb-6 text-slate-600 dark:text-slate-300">Experience the magic of {place.name.split(',')[0]} with our exclusive tours.</p>
                <button className="w-full py-3 bg-slate-100 dark:bg-white/10 hover:bg-brand-accent hover:text-white dark:hover:bg-brand-accent rounded-xl font-medium transition-all flex items-center justify-center gap-2 text-slate-900 dark:text-white">
                  Explore <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
