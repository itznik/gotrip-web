'use client';
import { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { Users, Map, FileText, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/stats');
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Failed to load stats");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="p-8 text-slate-500">Loading Dashboard...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Dashboard Overview</h1>
      
      {/* 1. STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Visitors" 
          value={stats?.totalVisitors || 0} 
          icon={<TrendingUp size={24} className="text-blue-500" />} 
          trend="+12%"
        />
        <StatCard 
          title="Users" 
          value={stats?.totalUsers || 0} 
          icon={<Users size={24} className="text-brand-accent" />} 
        />
        <StatCard 
          title="Destinations" 
          value={stats?.totalDestinations || 0} 
          icon={<Map size={24} className="text-green-500" />} 
        />
        <StatCard 
          title="Blogs Published" 
          value={stats?.totalBlogs || 0} 
          icon={<FileText size={24} className="text-purple-500" />} 
        />
        <StatCard 
  title="Active Bookings" 
  value={stats?.totalBookings || 0}  // <--- Updated
  icon={<Map size={24} className="text-green-500" />} 
/>
      </div>

      {/* 2. ANALYTICS CHART */}
      <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-6 rounded-2xl shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Visitor Traffic (Last 7 Days)</h3>
        
        <div className="h-[300px] w-full">
          {stats?.chartData?.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.chartData}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
                <XAxis 
                  dataKey="name" 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  allowDecimals={false}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: 'none', borderRadius: '8px', color: '#fff' }}
                  cursor={{ fill: 'transparent' }}
                />
                <Bar 
                  dataKey="visitors" 
                  fill="#FF6B6B" 
                  radius={[4, 4, 0, 0]} 
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-400">
              Not enough data for chart yet. Visit the homepage!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Reusable Small Component for Cards
function StatCard({ title, value, icon, trend }: any) {
  return (
    <div className="p-6 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-slate-50 dark:bg-white/10 rounded-xl">
          {icon}
        </div>
        {trend && (
          <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
            {trend}
          </span>
        )}
      </div>
      <h3 className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider">{title}</h3>
      <p className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">{value}</p>
    </div>
  );
}
