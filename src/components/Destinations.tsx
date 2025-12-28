'use client';

import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Star } from 'lucide-react';
import Image from 'next/image';

const destinations = [
  {
    id: 1,
    name: 'Paris, France',
    price: '$80',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2946&auto=format&fit=crop', // Eiffel Tower
    rating: '4.8',
    description: 'Experience the city of love with our exclusive evening tours.'
  },
  {
    id: 2,
    name: 'Bali, Indonesia',
    price: '$30',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2838&auto=format&fit=crop', // Bali Temple
    rating: '4.9',
    description: 'Tropical paradise awaits. Visit ancient temples and pristine beaches.'
  },
  {
    id: 3,
    name: 'Kyoto, Japan',
    price: '$60',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2940&auto=format&fit=crop', // Kyoto Pagoda
    rating: '4.9',
    description: 'Immerse yourself in history with cherry blossoms and tea ceremonies.'
  }
];

export default function Destinations() {
  return (
    <section id="destinations" className="py-12 md:py-20 bg-[#0B1120] relative">
      
      {/* Background Gradient Blob for depth */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            Featured Destinations
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto"
          >
            Handpicked locations for the most discerning travelers. 
            Experience luxury and adventure combined.
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {destinations.map((place, index) => (
            <motion.div
              key={place.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }} // Staggered animation
              whileHover={{ y: -10 }} // Lift effect on hover
              className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-brand-accent/50 transition-all duration-300 shadow-2xl shadow-black/50"
            >
              
              {/* Image Container */}
              <div className="relative h-64 w-full overflow-hidden">
                <Image 
                  src={place.image} 
                  alt={place.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-white text-sm font-bold">{place.rating}</span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-white">{place.name}</h3>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">From</span>
                    <span className="text-xl font-bold text-brand-accent">{place.price}</span>
                  </div>
                </div>

                <p className="text-slate-400 text-sm mb-6 line-clamp-2">
                  {place.description}
                </p>

                <button className="w-full py-3 bg-white/5 hover:bg-brand-accent text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2 group-hover:gap-3">
                  Explore
                  <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
              }
