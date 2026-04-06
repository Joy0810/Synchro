import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'admin'>('student');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register({ name, email, password, role });
      navigate('/login');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary/30 min-h-screen flex flex-col text-left">
      {/* Top Bar Navigation */}
      <header className="fixed top-0 w-full z-50 flex items-center justify-between px-10 py-6 bg-background/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-3xl">api</span>
          <span className="text-2xl font-black tracking-tighter text-on-background font-headline">SYNCHRO</span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a className="text-sm font-label uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors" href="#">System Status</a>
          <a className="text-sm font-label uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors" href="#">Documentation</a>
        </nav>
      </header>

      {/* Main Registration Area */}
      <main className="flex-grow flex items-center justify-center py-20 px-4 mt-16">
        <div className="w-full max-w-[520px]">
          <div className="bg-surface-container border border-outline-variant/50 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)] rounded-xl p-12 relative overflow-hidden">
            {/* Subtle UI Accent */}
            <div className="absolute top-0 right-0 w-32 h-1 bg-primary/20"></div>

            <header className="mb-10 text-center">
              {/* FIXED: 'text-on-surface' -> 'text-white' as per prompt instructions */}
              <h1 className="font-headline text-4xl font-bold tracking-tight text-white mb-3">Create your account</h1>
              <p className="font-body text-on-surface-variant text-lg leading-relaxed">Join the high-performance productivity ecosystem.</p>
            </header>

            <form className="space-y-8" onSubmit={handleRegister}>
              {/* Error Message */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Inputs */}
              <div className="space-y-6">
                <div className="group">
                  <label className="block font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant mb-2 group-focus-within:text-primary transition-colors font-bold">Full Name</label>
                  <input
                    className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] focus:border-primary focus:bg-[rgba(255,255,255,0.05)] focus:ring-1 focus:ring-primary px-5 py-4 text-white font-body rounded-lg outline-none transition-all"
                    placeholder="Enter your name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="group">
                  <label className="block font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant mb-2 group-focus-within:text-primary transition-colors font-bold">Email Address</label>
                  <input
                    className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] focus:border-primary focus:bg-[rgba(255,255,255,0.05)] focus:ring-1 focus:ring-primary px-5 py-4 text-white font-body rounded-lg outline-none transition-all"
                    placeholder="name@university.edu"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="group">
                  <label className="block font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant mb-2 group-focus-within:text-primary transition-colors font-bold">Password</label>
                  <input
                    className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] focus:border-primary focus:bg-[rgba(255,255,255,0.05)] focus:ring-1 focus:ring-primary px-5 py-4 text-white font-body rounded-lg outline-none transition-all"
                    placeholder="••••••••"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Role Selection */}
              <div className="space-y-3">
                <label className="block font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold">I am a</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    className={`flex items-center justify-center gap-3 py-4 px-4 rounded-lg border-2 font-bold text-sm transition-all ${role === 'student'
                      ? 'border-primary text-primary bg-primary/5'
                      : 'border-outline text-on-surface-variant bg-transparent hover:border-on-surface-variant'
                      }`}
                    type="button"
                    onClick={() => setRole('student')}
                    disabled={loading}
                  >
                    <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: role === 'student' ? "'FILL' 1" : "'FILL' 0" }}>school</span>
                    STUDENT
                  </button>
                  <button
                    className={`flex items-center justify-center gap-3 py-4 px-4 rounded-lg border-2 font-bold text-sm transition-all ${role === 'admin'
                      ? 'border-primary text-primary bg-primary/5'
                      : 'border-outline text-on-surface-variant bg-transparent hover:border-on-surface-variant'
                      }`}
                    type="button"
                    onClick={() => setRole('admin')}
                    disabled={loading}
                  >
                    <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: role === 'admin' ? "'FILL' 1" : "'FILL' 0" }}>admin_panel_settings</span>
                    ADMIN
                  </button>
                </div>
              </div>

              {/* Action */}
              <div className="pt-4">
                <button
                  className="w-full bg-primary hover:bg-primary/90 text-on-primary py-5 rounded-lg font-headline font-black text-lg uppercase tracking-widest transition-all hover:shadow-[0_0_20px_rgba(0,188,212,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Registering...' : 'Register'}
                </button>
              </div>
            </form>

            {/* Auth Footer */}
            <div className="mt-10 pt-8 border-t border-outline-variant flex justify-center">
              <p className="font-body text-on-surface-variant">
                Already have an account?
                <Link to="/login" className="text-primary font-bold hover:underline ml-2">Sign In</Link>
              </p>
            </div>
          </div>

          {/* Page Footer Branding */}
          <div className="mt-16 flex justify-between items-center px-2 opacity-20">
            <span className="font-headline text-[10px] tracking-[0.5em] font-light uppercase text-center">Academic Precision</span>
            <div className="h-px flex-grow mx-8 bg-on-surface"></div>
            <span className="font-headline text-[10px] tracking-[0.5em] font-light uppercase text-center">System V.2.0</span>
          </div>
        </div>
      </main>

      {/* Desktop Minimal Footer */}
      <footer className="p-10 flex justify-between text-[10px] font-label uppercase tracking-widest text-on-surface-variant/50">
        <p>© 2024 SYNCHRO OS. All rights reserved.</p>
        <div className="flex gap-6">
          <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
          <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
};
