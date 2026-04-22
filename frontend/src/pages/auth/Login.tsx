import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const newErrors: Record<string, string> = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await login({ email, password });
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      navigate(user.role === 'admin' ? '/admin/dashboard' : '/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary/30 min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Branding Header */}
      <header className="absolute top-0 left-0 w-full p-10 z-50">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-3xl">api</span>
          <h1 className="text-3xl font-black tracking-tighter text-white font-headline">SYNCHRO</h1>
        </div>
      </header>

      {/* Background Grid Decoration */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      {/* Login Card */}
      <div className="w-[480px] z-10 text-left">
        <div className="bg-surface-container rounded-xl p-12 relative overflow-hidden border border-outline-variant shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
          {/* Cyan accent line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-bold font-headline tracking-tight text-white mb-2">Welcome back</h2>
            <p className="text-on-surface-variant font-body">Sign in to your account</p>
          </div>

          <form className="space-y-8" onSubmit={handleLogin}>
            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-[11px] font-label uppercase tracking-[0.2em] text-on-surface-variant font-bold" htmlFor="email">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline">
                  <span className="material-symbols-outlined text-sm">mail</span>
                </div>
                <input 
                   className={`w-full pl-12 pr-4 py-4 text-white font-body rounded-lg bg-[#121212] border ${errors.email ? 'border-red-500/50' : 'border-outline-variant'} focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all`} 
                   id="email" 
                   placeholder="name@university.edu" 
                   type="email"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   disabled={loading}
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-label uppercase tracking-[0.2em] text-on-surface-variant font-bold" htmlFor="password">Password</label>
                <a className="text-[11px] font-label uppercase tracking-widest text-primary hover:text-primary/80 transition-colors" href="#">Forgot?</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline">
                  <span className="material-symbols-outlined text-sm">lock</span>
                </div>
                <input 
                   className={`w-full pl-12 pr-4 py-4 text-white font-body rounded-lg bg-[#121212] border ${errors.password ? 'border-red-500/50' : 'border-outline-variant'} focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all`} 
                   id="password" 
                   placeholder="••••••••" 
                   type="password"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   disabled={loading}
                />
                {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
              </div>
            </div>

            {/* Sign In Button */}
            <button 
              className="w-full bg-primary text-black font-bold font-headline py-5 rounded-lg hover:brightness-110 active:scale-[0.99] transition-all duration-200 shadow-[0_0_20px_rgba(129,236,255,0.3)] flex items-center justify-center gap-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed" 
              type="submit"
              disabled={loading}
            >
              <span>{loading ? 'SIGNING IN...' : 'SIGN IN'}</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-12 text-center border-t border-outline-variant pt-8">
            <p className="text-on-surface-variant font-body text-sm">
              Don't have an account? 
              <Link to="/register" className="text-primary font-bold ml-2 hover:underline underline-offset-4">Register</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -z-10"></div>

      {/* Footer Copyright */}
      <footer className="absolute bottom-10 w-full text-center z-10">
        <p className="text-[10px] font-label uppercase tracking-[0.3em] text-outline opacity-40">
          © 2024 SYNCHRO LEDGER • ARCHITECTURAL PRECISION SYSTEM
        </p>
      </footer>
    </div>
  );
};
