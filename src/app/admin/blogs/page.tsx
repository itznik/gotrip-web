'use client';
import { useState, useEffect } from 'react';
import { Trash2, Plus, ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
}

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop', // Default placeholder
    author: 'Admin'
  });

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      setBlogs(data);
    } catch (error) {
      console.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBlogs(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/blogs', {
      method: 'POST',
      body: JSON.stringify(formData)
    });
    // Reset form mostly, keep image for convenience
    setFormData(prev => ({ 
      ...prev, 
      title: '', 
      excerpt: '' 
    }));
    fetchBlogs();
  };

  const handleDelete = async (id: string) => {
    if(!confirm('Delete this article?')) return;
    await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
    fetchBlogs();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Manage Blogs</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ADD FORM */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-6 rounded-2xl shadow-sm sticky top-6">
            <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Write Article</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase text-slate-500 mb-1 block">Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Top 10 Hidden Gems"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 outline-none focus:border-brand-accent text-slate-900 dark:text-white"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <label className="text-xs font-bold uppercase text-slate-500 mb-1 block">Short Summary</label>
                <textarea 
                  rows={3}
                  placeholder="A brief description..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 outline-none focus:border-brand-accent text-slate-900 dark:text-white resize-none"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-slate-500 mb-1 block">Image URL</label>
                <div className="relative">
                  <ImageIcon size={18} className="absolute left-3 top-3.5 text-slate-400" />
                  <input 
                    type="text" 
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 outline-none focus:border-brand-accent text-slate-900 dark:text-white"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    required
                  />
                </div>
              </div>

              <button className="w-full bg-brand-accent text-white font-bold py-3 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2">
                <Plus size={20} /> Publish Blog
              </button>
            </form>
          </div>
        </div>

        {/* LIST VIEW */}
        <div className="lg:col-span-2 space-y-4">
          {loading ? (
            <p className="text-slate-500 text-center py-10">Loading...</p>
          ) : blogs.length === 0 ? (
            <div className="text-center py-10 text-slate-500 bg-white dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10">
              No blogs posted yet. Write one!
            </div>
          ) : (
            blogs.map((item) => (
              <div key={item._id} className="flex items-start gap-4 p-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 mt-1 bg-slate-100 dark:bg-white/5">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-1">{item.title}</h3>
                  <p className="text-sm text-slate-500 line-clamp-2 mt-1">{item.excerpt}</p>
                  <span className="text-xs font-bold text-brand-accent mt-2 block">{item.date}</span>
                </div>

                <button 
                  onClick={() => handleDelete(item._id)}
                  className="p-3 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
                  title="Delete Blog"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
