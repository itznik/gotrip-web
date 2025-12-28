'use client';

import { motion } from 'framer-motion';
import { Calendar, User, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

const blogs = [
  {
    id: 1,
    title: 'The Ultimate Guide to Solo Travel in 2024',
    excerpt: 'Discover how to navigate foreign cities, meet new people, and stay safe while traveling alone.',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop',
    date: 'Oct 12, 2024',
    author: 'Sarah Jenkins'
  },
  {
    id: 2,
    title: 'Hidden Gems in Bali: Beyond the Beaches',
    excerpt: 'Explore the lush jungles, ancient temples, and local markets that most tourists miss.',
    image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=2070&auto=format&fit=crop',
    date: 'Sep 28, 2024',
    author: 'Mike Roberts'
  },
  {
    id: 3,
    title: 'Top 5 Eco-Friendly Resorts in Europe',
    excerpt: 'Sustainable luxury is the new trend. Here are the best places to stay green.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop',
    date: 'Sep 15, 2024',
    author: 'Emma Watson'
  }
];

export default function Blogs() {
  return (
    <section id="blogs" className="py-24 bg-[#0B1120] relative">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-white mb-2"
            >
              Latest Travel Blogs
            </motion.h2>
            <p className="text-slate-400">Tips, tricks, and stories from our community.</p>
          </div>
          
          <button className="text-brand-accent font-medium hover:text-white transition-colors flex items-center gap-2">
            View All Posts <ArrowUpRight size={18} />
          </button>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <motion.article
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group cursor-pointer"
            >
              {/* Image with zoom effect */}
              <div className="relative h-56 w-full overflow-hidden rounded-2xl mb-5">
                <Image 
                  src={blog.image} 
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              </div>

              {/* Meta Data */}
              <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                <div className="flex items-center gap-1">
                  <Calendar size={12} />
                  <span>{blog.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User size={12} />
                  <span>{blog.author}</span>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-accent transition-colors">
                {blog.title}
              </h3>
              <p className="text-slate-400 text-sm line-clamp-2">
                {blog.excerpt}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
