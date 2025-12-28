'use client';
import { useState, useEffect } from 'react';
import { Check, X, Clock, User, Calendar, MapPin } from 'lucide-react';
import Image from 'next/image';

interface Booking {
  _id: string;
  user: { username: string; email: string };
  destination: { name: string; image: string };
  date: string;
  guests: number;
  totalPrice: string;
  status: string;
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/bookings');
      const data = await res.json();
      setBookings(data);
    } catch (error) {
      console.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    await fetch(`/api/bookings/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    fetchBookings(); // Refresh UI
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Manage Bookings</h1>

      <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading bookings...</div>
        ) : bookings.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No active bookings found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-400 text-xs uppercase font-bold">
                <tr>
                  <th className="p-4">Destination</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Details</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {bookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                          <Image 
                            src={booking.destination?.image || 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34'} 
                            alt="Dest" 
                            fill 
                            className="object-cover" 
                          />
                        </div>
                        <span className="font-bold text-slate-900 dark:text-white">
                          {booking.destination?.name || 'Unknown'}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 dark:text-white text-sm">{booking.user?.username}</span>
                        <span className="text-xs text-slate-500">{booking.user?.email}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-slate-600 dark:text-slate-400 space-y-1">
                      <div className="flex items-center gap-2"><Calendar size={12} /> {booking.date}</div>
                      <div className="flex items-center gap-2"><User size={12} /> {booking.guests} Guests</div>
                      <div className="flex items-center gap-2 font-bold text-brand-accent">{booking.totalPrice}</div>
                    </td>
                    <td className="p-4">
                      <StatusBadge status={booking.status} />
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        {booking.status !== 'Confirmed' && (
                          <button 
                            onClick={() => updateStatus(booking._id, 'Confirmed')}
                            className="p-2 bg-green-50 dark:bg-green-500/10 text-green-600 rounded-lg hover:bg-green-100 dark:hover:bg-green-500/20 transition-colors"
                            title="Confirm"
                          >
                            <Check size={16} />
                          </button>
                        )}
                        {booking.status !== 'Cancelled' && (
                          <button 
                            onClick={() => updateStatus(booking._id, 'Cancelled')}
                            className="p-2 bg-red-50 dark:bg-red-500/10 text-red-600 rounded-lg hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors"
                            title="Cancel"
                          >
                            <X size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles = {
    Confirmed: 'bg-green-100 text-green-700 border-green-200',
    Pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    Cancelled: 'bg-red-100 text-red-700 border-red-200',
  };
  
  const icons = {
    Confirmed: <Check size={12} />,
    Pending: <Clock size={12} />,
    Cancelled: <X size={12} />,
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${styles[status as keyof typeof styles]}`}>
      {icons[status as keyof typeof icons]}
      {status}
    </span>
  );
}
