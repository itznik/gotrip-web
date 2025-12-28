'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Plane, Check, X } from 'lucide-react';
import { AuthInput } from '@/components/ui/AuthInput';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Password Strength Logic
  const validations = [
    { label: 'At least 8 characters', valid: formData.password.length >= 8 },
    { label: 'Contains a number', valid: /\d/.test(formData.password) },
    { label: 'Contains special character', valid: /[!@#$%^&*]/.test(formData.password) },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');
    
    // Basic Client Validation
    if (formData.password !== formData.confirmPassword) {
      setServerError("Passwords don't match");
      return;
    }
    if (!validations.every(v => v.valid)) {
      setServerError("Password is not strong enough");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Registration failed');
      
      // Redirect to login on success
      router.push('/login?registered=true');
      
    } catch (err: any) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#0B1120] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-8 shadow-2xl"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
            <Plane className="h-8 w-8 text-brand-accent transform group-hover:-rotate-45 transition-transform duration-300" />
            <span className="text-2xl font-bold text-slate-900 dark:text-white">GoTrip</span>
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Create Account</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">Join us and start your journey</p>
        </div>

        {/* Error Message */}
        {serverError && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-500 text-sm font-medium">
            <X size={16} />
            {serverError}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <AuthInput 
            label="Username" 
            placeholder="johndoe"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            required
          />
          
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

          {/* Password Strength Meter */}
          <div className="grid grid-cols-1 gap-2 pl-1">
            {validations.map((v, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center ${v.valid ? 'bg-green-500 text-white' : 'bg-slate-200 dark:bg-white/10 text-slate-400'}`}>
                  {v.valid && <Check size={10} />}
                </div>
                <span className={v.valid ? 'text-green-600 dark:text-green-400' : 'text-slate-500'}>
                  {v.label}
                </span>
              </div>
            ))}
          </div>

          <AuthInput 
            label="Confirm Password" 
            type="password" 
            placeholder="••••••••" 
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            required
          />

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-brand-accent hover:bg-orange-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-brand-accent/20 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-slate-500">
          Already have an account?{' '}
          <Link href="/login" className="text-brand-accent font-bold hover:underline">
            Login here
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
