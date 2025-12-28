'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Calendar, MapPin, User, LogOut } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch('/api/bookings');
        if (res.status === 401) {
          router.push('/login');
          return;
        }
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [router]);

  const handleLogout = () => {
    // Delete cookie (simple method)
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push('/');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#0B1120]">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">My Trips</h1>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-500/10 text-red-500 rounded-lg font-bold hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>

        {loading ? (
          <p className="text-slate-500">Loading your adventures...</p>
        ) : bookings.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/10">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No Bookings Yet</h3>
            <p className="text-slate-500 mb-6">Time to start your next adventure!</p>
            <button onClick={() => router.push('/#destinations')} className="px-6 py-3 bg-brand-accent text-white rounded-xl font-bold">
              Explore Destinations
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookings.map((booking) => (
              <div key={booking._id} className="flex gap-4 p-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm">
                <div className="relative w-28 h-28 rounded-xl overflow-hidden flex-shrink-0">
                  <Image 
                    src={booking.destination?.image || 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34'} 
                    alt="Trip" 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{booking.destination?.name}</h3>
                    <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      {booking.status}
                    </span>
                  </div>
                  
                  <div className="space-y-1 mt-3">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Calendar size={14} /> {booking.date}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <User size={14} /> {booking.guests} Guests
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <MapPin size={14} /> Total: <span className="text-brand-accent font-bold">{booking.totalPrice}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
