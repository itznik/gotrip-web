'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Plane, Sun, Moon, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';

const navLinks = [
  { name: 'Destinations', href: '#destinations' },
  { name: 'Blogs', href: '#blogs' },
  { name: 'Testimonials', href: '#testimonials' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-brand-light/80 dark:bg-brand-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Plane className="h-8 w-8 text-brand-accent transform group-hover:-rotate-45 transition-transform duration-300" />
            <span className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              GoTrip
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-slate-600 dark:text-slate-300 hover:text-brand-accent dark:hover:text-brand-accent transition-colors text-sm font-medium"
              >
                {link.name}
              </Link>
            ))}
            
            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-full bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-yellow-400 hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            )}

            {/* Auth Buttons */}
            <div className="flex items-center gap-4 pl-4 border-l border-slate-200 dark:border-white/10">
              <button className="text-slate-900 dark:text-white font-medium hover:text-brand-accent transition-colors">
                Login
              </button>
              <button className="bg-brand-accent hover:bg-orange-600 text-white px-5 py-2.5 rounded-full font-medium transition-all shadow-lg shadow-brand-accent/20">
                Register
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
             {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 text-slate-700 dark:text-yellow-400"
              >
                {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-900 dark:text-white hover:text-brand-accent transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-light dark:bg-brand-dark border-b border-slate-200 dark:border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-3 text-base font-medium text-slate-600 dark:text-slate-300 hover:text-brand-accent dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 rounded-md"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 mt-4 border-t border-slate-200 dark:border-white/10 grid grid-cols-2 gap-4">
                 <button className="w-full py-3 text-slate-900 dark:text-white font-bold border border-slate-200 dark:border-white/10 rounded-lg">
                  Login
                </button>
                <button className="w-full bg-brand-accent text-white py-3 rounded-lg font-bold">
                  Register
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
