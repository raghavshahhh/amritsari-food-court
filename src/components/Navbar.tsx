'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import MobileMenu from './MobileMenu'
import QuickOrderDrawer from './QuickOrderDrawer'
import { User, ShieldCheck, ShoppingBag } from 'lucide-react'
import { useCart } from '@/context/CartContext'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'Story' },
  { href: '/contact', label: 'Contact' },
]

const MotionLink = motion.create(Link)

export default function Navbar() {
  const { totalCount, subtotal, setIsDrawerOpen, activeOrder, setIsTrackerOpen } = useCart()

  return (
    <>
      <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 pointer-events-none">
        <nav
          className="max-w-6xl mx-auto h-14 rounded-full bg-black/75 backdrop-blur-2xl border border-white/15 px-6 flex items-center justify-between shadow-2xl shadow-black/80 pointer-events-auto"
          aria-label="Main navigation"
        >
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-display font-extrabold text-white text-lg tracking-tight hover:opacity-90 transition-opacity"
            aria-label="Amritsari Food Court - Home"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50" />
            <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent">
              Amritsari Food Court
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link, i) => (
              <MotionLink
                key={link.href}
                href={link.href}
                className="text-xs uppercase tracking-widest font-bold text-white/70 hover:text-amber-400 transition-colors relative py-1"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.05 }}
              >
                {link.label}
              </MotionLink>
            ))}
          </div>

          {/* Right Action Items */}
          <div className="hidden md:flex items-center gap-2.5">
            {activeOrder && (
              <button
                onClick={() => setIsTrackerOpen(true)}
                className="py-1.5 px-3 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5 hover:bg-emerald-500/25 transition-all"
                title="Track Active Order"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Track {activeOrder.id}</span>
              </button>
            )}

            <Link
              href="/admin"
              className="p-2 rounded-full text-white/60 hover:text-amber-400 hover:bg-white/5 transition-all text-xs flex items-center gap-1 font-bold"
              title="Admin Dashboard"
            >
              <ShieldCheck className="w-4 h-4" />
              <span className="hidden xl:inline">Admin</span>
            </Link>

            <Link
              href="/login"
              className="p-2 rounded-full text-white/60 hover:text-amber-400 hover:bg-white/5 transition-all text-xs flex items-center gap-1 font-bold"
              title="Customer Login"
            >
              <User className="w-4 h-4" />
              <span className="hidden xl:inline">Login</span>
            </Link>

            {/* Cart Button with Count Badge */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="py-2 px-4 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-xs tracking-wider uppercase transition-all shadow-md shadow-amber-500/25 hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Cart</span>
              {totalCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-black text-amber-400 text-[10px] font-black">
                  {totalCount} · ₹{subtotal}
                </span>
              )}
            </button>
          </div>

          <MobileMenu />
        </nav>
      </header>

      {/* Global Quick Order Drawer */}
      <QuickOrderDrawer />
    </>
  )
}