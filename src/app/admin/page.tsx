export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Dashboard Overview</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl">
          <h3 className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider">Total Visitors</h3>
          <p className="text-4xl font-extrabold text-slate-900 dark:text-white mt-2">12,450</p>
        </div>
        <div className="p-6 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl">
          <h3 className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider">Active Bookings</h3>
          <p className="text-4xl font-extrabold text-brand-accent mt-2">48</p>
        </div>
        <div className="p-6 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl">
          <h3 className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider">Total Revenue</h3>
          <p className="text-4xl font-extrabold text-green-500 mt-2">$84,320</p>
        </div>
      </div>
    </div>
  );
}
