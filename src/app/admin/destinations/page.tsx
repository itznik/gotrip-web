'use client';
import { useState, useEffect } from 'react';
import { Trash2, Plus, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface Destination {
  _id: string;
  name: string;
  price: string;
  rating: string;
  image: string;
}

export default function ManageDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    rating: '4.8',
    image: ''
  });

  // Fetch Data
  const fetchDestinations = async () => {
    try {
      const res = await fetch('/api/destinations');
      const data = await res.json();
      setDestinations(data);
    } catch (error) {
      console.error("Failed to load destinations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDestinations(); }, []);

  // Handle Add
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.image) return;

    await fetch('/api/destinations', {
      method: 'POST',
      body: JSON.stringify(formData)
    });
    
    setFormData({ name: '', price: '', rating: '4.8', image: '' }); // Reset form
    fetchDestinations(); // Refresh list
  };

  // Handle Delete
  const handleDelete = async (id: string) => {
    if(!confirm('Are you sure you want to delete this destination?')) return;
    await fetch(`/api/destinations/${id}`, { method: 'DELETE' });
    fetchDestinations();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Manage Destinations</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ADD FORM */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-6 rounded-2xl shadow-sm sticky top-6">
            <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Add New Place</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase text-slate-500 mb-1 block">Location Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Rome, Italy"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 outline-none focus:border-brand-accent text-slate-900 dark:text-white"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase text-slate-500 mb-1 block">Price</label>
                  <input 
                    type="text" 
                    placeholder="$150"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 outline-none focus:border-brand-accent text-slate-900 dark:text-white"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-slate-500 mb-1 block">Rating</label>
                  <input 
                    type="text" 
                    placeholder="4.8"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 outline-none focus:border-brand-accent text-slate-900 dark:text-white"
                    value={formData.rating}
                    onChange={(e) => setFormData({...formData, rating: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-slate-500 mb-1 block">Image URL</label>
                <div className="relative">
                  <ImageIcon size={18} className="absolute left-3 top-3.5 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="https://..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 outline-none focus:border-brand-accent text-slate-900 dark:text-white"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    required
                  />
                </div>
              </div>

              <button className="w-full bg-brand-accent text-white font-bold py-3 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2">
                <Plus size={20} /> Add Destination
              </button>
            </form>
          </div>
        </div>

        {/* LIST VIEW */}
        <div className="lg:col-span-2 space-y-4">
          {loading ? (
            <p className="text-slate-500 text-center py-10">Loading...</p>
          ) : destinations.length === 0 ? (
            <div className="text-center py-10 text-slate-500 bg-white dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10">
              No destinations yet. Add one on the left!
            </div>
          ) : (
            destinations.map((item) => (
              <div key={item._id} className="group flex items-center gap-4 p-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl hover:border-brand-accent transition-colors">
                <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100 dark:bg-white/5">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{item.name}</h3>
                  <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                    <span className="text-brand-accent font-bold">{item.price}</span>
                    <span>•</span>
                    <span>⭐ {item.rating}</span>
                  </div>
                </div>

                <button 
                  onClick={() => handleDelete(item._id)}
                  className="p-3 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
                  title="Delete Destination"
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
