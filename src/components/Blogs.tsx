'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

// Define what a Blog looks like
interface BlogType {
  _id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
}

export default function Blogs() {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/blogs');
        const data = await res.json();
        
        if (data.length > 0) {
          setBlogs(data);
        } else {
          // Fallback Data (If DB is empty)
          setBlogs([
            { _id: '1', title: 'Solo Travel Guide 2024', excerpt: 'Discover how to navigate foreign cities...', image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop', date: 'Oct 12' },
            { _id: '2', title: 'Hidden Gems in Bali', excerpt: 'Explore the lush jungles, ancient temples...', image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=2070&auto=format&fit=crop', date: 'Sep 28' },
            { _id: '3', title: 'Eco-Friendly Resorts', excerpt: 'Sustainable luxury is the new trend...', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop', date: 'Sep 15' }
          ]);
        }
      } catch (error) {
        console.error("Failed to fetch blogs");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="py-20 text-center text-slate-500">Loading Articles...</div>;

  return (
    <section id="blogs" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-2 text-slate-900 dark:text-white">Latest Travel Blogs</h2>
            <p className="text-slate-600 dark:text-slate-400">Tips, tricks, and stories from our community.</p>
          </div>
          <button className="text-brand-accent font-medium hover:opacity-80 flex items-center gap-2">
            View All Posts <ArrowUpRight size={18} />
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <motion.article 
              key={blog._id} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: index * 0.1 }} 
              className="group cursor-pointer"
            >
              <div className="relative h-64 w-full overflow-hidden rounded-2xl mb-5">
                <Image 
                  src={blog.image} 
                  alt={blog.title} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                
                {/* Date Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-900">
                  {blog.date}
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white group-hover:text-brand-accent transition-colors">
                {blog.title}
              </h3>
              
              <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2">
                {blog.excerpt || `Read more about ${blog.title} and explore the details.`}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
