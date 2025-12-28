'use client';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

const blogs = [
  { id: 1, title: 'Solo Travel Guide 2024', image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop', date: 'Oct 12' },
  { id: 2, title: 'Hidden Gems in Bali', image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=2070&auto=format&fit=crop', date: 'Sep 28' },
  { id: 3, title: 'Eco-Friendly Resorts', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop', date: 'Sep 15' }
];

export default function Blogs() {
  return (
    <section id="blogs" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-2">Latest Travel Blogs</h2>
            <p className="opacity-70">Tips, tricks, and stories from our community.</p>
          </div>
          <button className="text-brand-accent font-medium hover:opacity-80 flex items-center gap-2">
            View All Posts <ArrowUpRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <motion.article key={blog.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.2 }} className="group cursor-pointer">
              <div className="relative h-64 w-full overflow-hidden rounded-2xl mb-5">
                <Image src={blog.image} alt={blog.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold">{blog.date}</div>
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-brand-accent transition-colors">{blog.title}</h3>
              <p className="opacity-60 text-sm line-clamp-2">Discover the best ways to enjoy your trip to {blog.title} with our expert guide.</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
