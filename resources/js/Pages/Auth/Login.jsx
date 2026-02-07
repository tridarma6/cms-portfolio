import React, { useEffect, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AnimatedBG from '../../Components/AnimatedBG';

export default function Login() {
  const form = useForm({ email: '', password: '', remember: false });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  function submit(e) {
    e.preventDefault();
    form.post('/login');
  }

  return (
    <>
      <Head title="Admin Login" />

      <div className="min-h-screen flex items-center justify-center bg-black text-emerald-50 relative overflow-hidden">
        <AnimatedBG />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black/90 z-0" />

        {/* Login Card */}
        <div
          className={`relative z-10 w-full max-w-sm px-8 py-8 rounded-2xl 
            bg-white/5 border border-white/10 backdrop-blur-xl 
            shadow-[0_0_80px_rgba(16,185,129,0.15)]
            transition-all duration-700 ease-out
            ${mounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-heading text-3xl font-extrabold tracking-widest text-emerald-400">
              Portfolio
            </h1>
            <p className="mt-1 text-xs text-emerald-300/60 tracking-widest uppercase">
              Secure Admin Access
            </p>
          </div>


          {/* Form */}
          <form onSubmit={submit} className="space-y-6">

            {/* Email */}
            <div>
              <label className="block mb-1 text-sm text-emerald-300/70">
                Email Address
              </label>
              <input
                value={form.data.email}
                onChange={e => form.setData('email', e.target.value)}
                type="email"
                placeholder="you@domain.com"
                className="w-full px-4 py-2.5 rounded-lg bg-black/60 border border-white/10 text-emerald-200 placeholder-emerald-400/40 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/40 transition"
              />
              {form.errors.email && (
                <p className="text-red-500 text-sm mt-1">{form.errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 text-sm text-emerald-300/70">
                Password
              </label>
              <input
                value={form.data.password}
                onChange={e => form.setData('password', e.target.value)}
                type="password"
                placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-lg bg-black/60 border border-white/10 text-emerald-200 placeholder-emerald-400/40 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/40 transition"
              />
              {form.errors.password && (
                <p className="text-red-500 text-sm mt-1">{form.errors.password}</p>
              )}
            </div>

            {/* Remember + Button */}
            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 text-sm text-emerald-300/60">
                <input
                  type="checkbox"
                  checked={form.data.remember}
                  onChange={e => form.setData('remember', e.target.checked)}
                  className="h-4 w-4 rounded accent-emerald-400 bg-black border-white/10"
                />
                Remember me
              </label>

              <button
                type="submit"
                disabled={form.processing}
                className="w-full mt-4 py-3 rounded-xl bg-emerald-400 text-black font-semibold hover:bg-emerald-300 hover:shadow-[0_0_25px_rgba(16,185,129,0.6)] transition-all duration-200"
              >
                {form.processing ? 'Signing in...' : 'Sign In'}
              </button>
            </div>
          </form>


        </div>
      </div>
    </>
  );
}
