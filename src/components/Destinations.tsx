'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, ArrowRight, X, Calendar, Users } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface DestinationType {
  _id: string;
  name: string;
  price: string;
  image: string;
  rating: string;
}

export default function Destinations() {
  const router = useRouter();
  const [destinations, setDestinations] = useState<DestinationType[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [selectedPlace, setSelectedPlace] = useState<DestinationType | null>(null);
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/destinations');
        const data = await res.json();
        if (data.length > 0) setDestinations(data);
        else {
           // Fallback
           setDestinations([
            { _id: '1', name: 'Paris, France', price: '$80', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2946&auto=format&fit=crop', rating: '4.8' },
            { _id: '2', name: 'Bali, Indonesia', price: '$30', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2838&auto=format&fit=crop', rating: '4.9' },
            { _id: '3', name: 'Kyoto, Japan', price: '$60', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2940&auto=format&fit=crop', rating: '4.9' }
           ]);
        }
      } catch (error) { console.error("Fetch failed"); } 
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlace) return;
    setBookingLoading(true);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destinationId: selectedPlace._id,
          date,
          guests,
          totalPrice: selectedPlace.price
        })
      });

      if (res.status === 401) {
        router.push('/login'); // Redirect if not logged in
        return;
      }

      if (res.ok) {
        alert('Booking Confirmed! View it in your profile.');
        setSelectedPlace(null);
      } else {
        alert('Booking Failed.');
      }
    } catch (err) {
      alert('Something went wrong');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <div className="py-20 text-center text-slate-500">Loading Destinations...</div>;

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
              key={place._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
                <button 
                  onClick={() => setSelectedPlace(place)}
                  className="w-full py-3 bg-slate-100 dark:bg-white/10 hover:bg-brand-accent hover:text-white dark:hover:bg-brand-accent rounded-xl font-medium transition-all flex items-center justify-center gap-2 text-slate-900 dark:text-white"
                >
                  Book Now <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* BOOKING MODAL */}
        {selectedPlace && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white dark:bg-[#0B1120] w-full max-w-md rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-white/10 relative"
            >
              <button 
                onClick={() => setSelectedPlace(null)}
                className="absolute top-4 right-4 p-2 bg-slate-100 dark:bg-white/10 rounded-full text-slate-500 hover:text-red-500 transition-colors"
              >
                <X size={20} />
              </button>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Book Trip to {selectedPlace.name}</h2>
              <p className="text-sm text-slate-500 mb-6">Complete your reservation below.</p>

              <form onSubmit={handleBook} className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase text-slate-500 mb-1 block">Travel Date</label>
                  <div className="relative">
                    <Calendar size={18} className="absolute left-3 top-3.5 text-slate-400" />
                    <input 
                      type="date" 
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 outline-none focus:border-brand-accent text-slate-900 dark:text-white"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-slate-500 mb-1 block">Guests</label>
                  <div className="relative">
                    <Users size={18} className="absolute left-3 top-3.5 text-slate-400" />
                    <input 
                      type="number" 
                      min="1" 
                      max="10"
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 outline-none focus:border-brand-accent text-slate-900 dark:text-white"
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value))}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between py-4 border-t border-slate-200 dark:border-white/10 mt-4">
                  <span className="text-slate-500">Total Price</span>
                  <span className="text-2xl font-bold text-brand-accent">{selectedPlace.price}</span>
                </div>

                <button 
                  disabled={bookingLoading}
                  className="w-full py-4 bg-brand-accent hover:bg-orange-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-brand-accent/20 disabled:opacity-50"
                >
                  {bookingLoading ? 'Processing...' : 'Confirm Booking'}
                </button>
              </form>
            </motion.div>
          </div>
        )}

      </div>
    </section>
  );
}
