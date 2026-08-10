'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, ShieldCheck, Phone, ArrowRight, CheckCircle2, Lock } from 'lucide-react'
import Link from 'next/link'

export default function LoginClient() {
  const [role, setRole] = useState<'customer' | 'admin'>('customer')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState<'idle' | 'success'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('success')
    setTimeout(() => setStatus('idle'), 4000)
  }

  return (
    <div className="min-h-screen pt-28 pb-20 flex items-center justify-center px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-3xl bg-neutral-950/80 backdrop-blur-2xl border border-white/15 p-8 shadow-2xl space-y-6 relative overflow-hidden"
      >
        {/* Glow Orb */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full filter blur-[80px] pointer-events-none" />

        {/* Role Switcher */}
        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 relative z-10">
          <button
            onClick={() => setRole('customer')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
              role === 'customer'
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <User className="w-4 h-4" /> Customer
          </button>
          <button
            onClick={() => setRole('admin')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
              role === 'admin'
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" /> Staff / Admin
          </button>
        </div>

        {/* Title */}
        <div className="text-center space-y-1 relative z-10">
          <h1 className="text-2xl font-display font-extrabold text-white">
            {role === 'customer' ? 'Customer Sign In' : 'Staff Portal Access'}
          </h1>
          <p className="text-white/60 text-xs">
            {role === 'customer'
              ? 'Enter your mobile number to view past orders & loyalty rewards'
              : 'Enter admin credentials to manage live kitchen orders & menu'}
          </p>
        </div>

        {/* Success Message */}
        {status === 'success' && (
          <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>Authenticated successfully. Redirecting...</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          {role === 'customer' ? (
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/50">Mobile Number</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-amber-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  placeholder="+91 99999 99999"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/50">Admin Username</label>
                <div className="relative">
                  <User className="w-4 h-4 text-amber-500 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="admin@amritsari.com"
                    required
                    className="w-full bg-white/5 border border-white/15 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/50">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-amber-500 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2"
          >
            <span>{role === 'customer' ? 'Send OTP & Login' : 'Enter Admin Panel'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer */}
        <div className="text-center pt-2 border-t border-white/10 relative z-10">
          <Link href="/admin" className="text-xs text-amber-400 font-bold hover:underline">
            Quick Preview Admin Dashboard →
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
