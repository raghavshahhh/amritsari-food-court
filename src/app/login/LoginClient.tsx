'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, ShieldCheck, Phone, ArrowRight, CheckCircle2, Lock } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'

export default function LoginClient() {
  const router = useRouter()
  const { showToast } = useCart()
  const [role, setRole] = useState<'customer' | 'admin'>('customer')
  const [phone, setPhone] = useState('')
  const [username, setUsername] = useState('admin@amritsari.com')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState<'idle' | 'success'>('idle')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const payload =
        role === 'customer'
          ? { action: 'send_otp', phone }
          : { action: 'admin_login', username, password }

      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()

      if (data.success) {
        setStatus('success')
        showToast(role === 'customer' ? 'OTP sent! Logging in...' : 'Admin authenticated successfully')
        setTimeout(() => {
          if (role === 'admin') {
            router.push('/admin')
          } else {
            router.push('/menu')
          }
        }, 1200)
      } else {
        showToast(data.error || 'Authentication failed', 'error')
      }
    } catch {
      showToast('Network error during login', 'error')
    } finally {
      setIsSubmitting(false)
    }
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
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
            disabled={isSubmitting}
            className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2"
          >
            <span>{isSubmitting ? 'Verifying...' : role === 'customer' ? 'Send OTP & Login' : 'Enter Admin Panel'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Customer Google Login Option */}
        {role === 'customer' && (
          <div className="space-y-4 relative z-10 pt-2">
            <div className="relative flex items-center justify-center">
              <div className="border-t border-white/10 w-full" />
              <span className="bg-neutral-950 px-3 text-[10px] uppercase font-black tracking-widest text-white/40 absolute">
                OR
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                showToast('Google Sign-In initialized...')
                setTimeout(() => {
                  router.push('/menu')
                }, 800)
              }}
              className="w-full py-3.5 px-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-extrabold text-xs uppercase tracking-wider transition-all border border-white/15 flex items-center justify-center gap-3 hover:border-amber-500/40"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.6 14.8c-.3-.8-.4-1.8-.4-2.8s.1-2 .4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>
        )}

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
