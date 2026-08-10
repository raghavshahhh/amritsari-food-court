'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/context/CartContext'
import { AlertCircle, ShoppingBag } from 'lucide-react'

export default function ToastContainer() {
  const { toasts, removeToast } = useCart()

  return (
    <div className="fixed bottom-6 right-6 z-[120] flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            onClick={() => removeToast(toast.id)}
            className="pointer-events-auto cursor-pointer rounded-2xl bg-neutral-900/90 backdrop-blur-xl border border-amber-500/40 p-4 shadow-2xl flex items-center gap-3 text-white"
          >
            <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 text-amber-400">
              {toast.type === 'error' ? (
                <AlertCircle className="w-4 h-4 text-rose-400" />
              ) : (
                <ShoppingBag className="w-4 h-4 text-amber-400" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-white leading-tight">{toast.message}</p>
              <p className="text-[10px] text-white/50 font-medium">Tap to dismiss</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
