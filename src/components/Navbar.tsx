'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Plane } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Destinations', href: '#destinations' },
  { name: 'Blogs', href: '#blogs' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'About', href: '#about' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-brand-dark/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Plane className="h-8 w-8 text-brand-accent transform group-hover:-rotate-45 transition-transform duration-300" />
            <span className="text-2xl font-bold text-white tracking-tight">
              GoTrip
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-brand-accent transition-colors text-sm font-medium"
              >
                {link.name}
              </Link>
            ))}
            <button className="bg-brand-accent hover:bg-orange-600 text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-lg shadow-brand-accent/20 hover:shadow-brand-accent/40">
              Book Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-brand-accent transition-colors"
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
            className="md:hidden bg-brand-dark border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-3 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-md"
                >
                  {link.name}
                </Link>
              ))}
              <button className="w-full mt-4 bg-brand-accent text-white py-3 rounded-lg font-bold">
                Book Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
