'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Plane, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';

const navLinks = [ { name: 'Destinations', href: '#destinations' }, { name: 'Blogs', href: '#blogs' }, { name: 'Testimonials', href: '#testimonials' } ];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  
  // Wait for mount to avoid hydration mismatch
  useEffect(() => setMounted(true), []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-[var(--background)]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <Plane className="h-8 w-8 text-brand-accent transform group-hover:-rotate-45 transition-transform duration-300" />
            <span className="text-2xl font-bold tracking-tight text-[var(--foreground)]">GoTrip</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="text-[var(--foreground)] hover:text-brand-accent transition-colors text-sm font-medium opacity-80 hover:opacity-100">{link.name}</Link>
            ))}
            
            {mounted && (
              <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-all text-[var(--foreground)]">
                {theme === 'dark' ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-600" />}
              </button>
            )}
            
            <div className="h-6 w-px bg-slate-300 dark:bg-white/20 mx-2"></div>
            <button className="font-medium hover:text-brand-accent transition-colors text-[var(--foreground)]">Login</button>
            <button className="bg-brand-accent text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-brand-accent/20 hover:opacity-90 transition-all">Register</button>
          </div>

          <div className="md:hidden flex items-center gap-4">
             {mounted && (
              <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                {theme === 'dark' ? <Sun size={24} className="text-yellow-400" /> : <Moon size={24} className="text-slate-600" />}
              </button>
            )}
            <button onClick={() => setIsOpen(!isOpen)} className="text-[var(--foreground)]">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-[var(--background)] border-b border-slate-200 dark:border-white/10 overflow-hidden">
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-medium text-[var(--foreground)] hover:bg-black/5 dark:hover:bg-white/5 rounded-md">{link.name}</Link>
              ))}
              <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-200 dark:border-white/10">
                <button className="py-3 border border-slate-300 dark:border-white/20 rounded-lg font-bold text-[var(--foreground)]">Login</button>
                <button className="py-3 bg-brand-accent text-white rounded-lg font-bold">Register</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
