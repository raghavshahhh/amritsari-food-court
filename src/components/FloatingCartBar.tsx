'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ShoppingBag } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation'

export default function FloatingCartBar() {
  const router = useRouter()
  const { totalCount, subtotal, setIsDrawerOpen } = useCart()

  if (totalCount === 0) return null

  return (
    <AnimatePresence>
      <div className="fixed bottom-6 left-0 right-0 z-40 px-4 flex justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          className="pointer-events-auto max-w-lg w-full rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-black p-2 sm:p-2.5 sm:px-4 shadow-2xl shadow-amber-500/40 border border-amber-300/50 backdrop-blur-xl flex items-center justify-between gap-3"
        >
          {/* Left Pill Count & Total */}
          <div className="flex items-center gap-3">
            {/* Dark Circle Badge */}
            <div className="w-10 h-10 rounded-full bg-black text-amber-400 font-display font-black text-sm flex items-center justify-center shadow-inner shrink-0">
              {totalCount}
            </div>

            <div className="text-left">
              <p className="text-[10px] font-black uppercase tracking-widest text-black/60 leading-none">
                Your Order Cart
              </p>
              <p className="text-lg font-display font-black text-black leading-tight">
                ₹{subtotal}
              </p>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="py-2.5 px-3.5 rounded-full bg-black/10 hover:bg-black/20 text-black font-extrabold text-xs uppercase tracking-wider transition-all hidden sm:inline-flex items-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Cart</span>
            </button>

            <button
              onClick={() => router.push('/checkout')}
              className="py-2.5 px-5 rounded-full bg-black text-amber-400 hover:bg-neutral-900 font-black text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-lg shadow-black/30 hover:scale-105 active:scale-95"
            >
              <span>View Cart</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
