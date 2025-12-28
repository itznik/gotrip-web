'use client';
import Link from 'next/link';
import { LayoutDashboard, Plane, FileText, Users, LogOut } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#FDFBF7] dark:bg-[#0B1120] transition-colors duration-300">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-white/5 border-r border-slate-200 dark:border-white/10 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-200 dark:border-white/10">
          <span className="text-2xl font-bold text-brand-accent">GoTrip Admin</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-all font-medium">
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link href="/admin/destinations" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-all font-medium">
            <Plane size={20} /> Destinations
          </Link>
          <Link href="/admin/blogs" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-all font-medium">
            <FileText size={20} /> Blogs
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-all font-medium">
            <Users size={20} /> Users
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-white/10">
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all font-medium">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}
