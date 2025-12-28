'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Plane, X, CheckCircle } from 'lucide-react';
import { AuthInput } from '@/components/ui/AuthInput'; // Ensure you created this in the previous step

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Check if user was redirected after registering
  const registered = searchParams.get('registered');

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Login failed');

      // Check role and redirect accordingly
      if (data.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/');
      }
      
      // Force a refresh so the Navbar updates to show "Logout" (if we implement it later)
      router.refresh();
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // EXPLICIT BACKGROUNDS: Light Cream | Dark Deep Ocean
    <div className="min-h-screen w-full bg-[#FDFBF7] dark:bg-[#0B1120] flex items-center justify-center p-4 transition-colors duration-300">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        // Card: White | White/5
        className="w-full max-w-md bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-8 shadow-2xl"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
            <Plane className="h-8 w-8 text-brand-accent transform group-hover:-rotate-45 transition-transform duration-300" />
            <span className="text-2xl font-bold text-slate-900 dark:text-white">GoTrip</span>
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome Back</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">Login to access your account</p>
        </div>

        {/* Success Message (from Register) */}
        {registered && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3 text-green-600 dark:text-green-400 text-sm font-medium">
            <CheckCircle size={16} />
            Account created! Please login.
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-500 text-sm font-medium">
            <X size={16} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <AuthInput 
            label="Email Address" 
            type="email" 
            placeholder="john@example.com" 
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />

          <AuthInput 
            label="Password" 
            type="password" 
            placeholder="••••••••" 
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
          
          <div className="flex justify-end">
            <Link href="#" className="text-sm text-slate-500 hover:text-brand-accent transition-colors">
              Forgot Password?
            </Link>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-brand-accent hover:bg-orange-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-brand-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-slate-500 dark:text-slate-400">
          Don't have an account?{' '}
          <Link href="/register" className="text-brand-accent font-bold hover:underline">
            Register here
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
