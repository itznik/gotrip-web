import Link from 'next/link';
import { Plane } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#0B1120] flex flex-col items-center justify-center p-4 text-center">
      <Plane className="w-24 h-24 text-slate-300 dark:text-white/10 mb-8 transform rotate-12" />
      <h1 className="text-6xl font-extrabold text-brand-accent mb-4">404</h1>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Destination Not Found</h2>
      <p className="text-slate-500 dark:text-slate-400 max-w-md mb-8">
        It looks like you've ventured into uncharted territory. This page doesn't exist on our map.
      </p>
      <Link 
        href="/"
        className="px-8 py-3 bg-brand-accent text-white font-bold rounded-full hover:bg-orange-600 transition-all shadow-lg shadow-brand-accent/20"
      >
        Return Home
      </Link>
    </div>
  );
}
