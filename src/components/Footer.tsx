'use client';

import { Plane, Facebook, Twitter, Instagram, Youtube, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    // BG: Light Grey (Light Mode) | Deep Black (Dark Mode)
    // Border: Slate-200 (Light Mode) | White/5 (Dark Mode)
    <footer className="bg-slate-50 dark:bg-[#050a14] border-t border-slate-200 dark:border-white/5 pt-20 pb-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Plane className="h-8 w-8 text-brand-accent transform -rotate-45" />
              <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">GoTrip</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              We make your travel dreams a reality. Explore the world with confidence and luxury at affordable prices.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-200 dark:bg-white/5 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-brand-accent hover:text-white dark:hover:bg-brand-accent dark:hover:text-white transition-all duration-300">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-bold mb-6 text-slate-900 dark:text-white">Company</h4>
            <ul className="space-y-4">
              {['About Us', 'Careers', 'Blog', 'Press'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-slate-600 dark:text-slate-400 hover:text-brand-accent transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h4 className="font-bold mb-6 text-slate-900 dark:text-white">Support</h4>
            <ul className="space-y-4">
              {['Contact Us', 'Terms of Service', 'Privacy Policy', 'FAQ'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-slate-600 dark:text-slate-400 hover:text-brand-accent transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="font-bold mb-6 text-slate-900 dark:text-white">Newsletter</h4>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <form className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                // Input: White bg (Light) | White/5 bg (Dark)
                className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-brand-accent/50 transition-colors"
              />
              <button className="w-full bg-brand-accent hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-brand-accent/20">
                Subscribe
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-200 dark:border-white/5 pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 dark:text-slate-500 text-sm">
            © 2024 GoTrip Inc. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-500 dark:text-slate-500">
            <Link href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Terms</Link>
            <Link href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
