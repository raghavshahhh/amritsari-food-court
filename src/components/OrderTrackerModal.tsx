'use client'

import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/context/CartContext'
import { X, Clock, CheckCircle2, Utensils, Bike, RefreshCw } from 'lucide-react'

const STEPS = [
  { key: 'Pending', label: 'Order Received', icon: Clock },
  { key: 'Preparing', label: 'Chef Cooking Live', icon: Utensils },
  { key: 'Out for Delivery', label: 'On The Way', icon: Bike },
  { key: 'Completed', label: 'Delivered & Served', icon: CheckCircle2 },
]

export default function OrderTrackerModal() {
  const { activeOrder, isTrackerOpen, setIsTrackerOpen, fetchOrderStatus } = useCart()

  // Poll status every 3 seconds if tracker is open
  useEffect(() => {
    if (!isTrackerOpen || !activeOrder?.id) return
    const interval = setInterval(() => {
      fetchOrderStatus(activeOrder.id)
    }, 3000)
    return () => clearInterval(interval)
  }, [isTrackerOpen, activeOrder?.id, fetchOrderStatus])

  if (!isTrackerOpen || !activeOrder) return null

  const getStepIndex = (status: string) => {
    switch (status) {
      case 'Pending':
        return 0
      case 'Preparing':
        return 1
      case 'Out for Delivery':
        return 2
      case 'Completed':
        return 3
      default:
        return 0
    }
  }

  const currentStep = getStepIndex(activeOrder.status)

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative max-w-lg w-full rounded-3xl bg-neutral-950 border border-amber-500/30 p-6 sm:p-8 shadow-2xl space-y-6 overflow-hidden"
        >
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full filter blur-[80px] pointer-events-none" />

          {/* Close button */}
          <button
            onClick={() => setIsTrackerOpen(false)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-black uppercase tracking-widest text-amber-400">
                Live Kitchen Order Tracker
              </span>
            </div>
            <h2 className="text-2xl font-display font-extrabold text-white">
              Order {activeOrder.id}
            </h2>
            <p className="text-white/60 text-xs">
              {activeOrder.type} · {activeOrder.customerName} ({activeOrder.tableOrAddress})
            </p>
          </div>

          {/* Progress Tracker */}
          <div className="py-4 space-y-6">
            <div className="relative flex items-center justify-between">
              {/* Progress Line */}
              <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1 bg-white/10 z-0" />
              <div
                className="absolute top-1/2 left-0 -translate-y-1/2 h-1 bg-amber-500 transition-all duration-700 z-0"
                style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
              />

              {STEPS.map((step, idx) => {
                const Icon = step.icon
                const isPassed = idx <= currentStep
                const isCurrent = idx === currentStep

                return (
                  <div key={step.key} className="relative z-10 flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        isPassed
                          ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/30'
                          : 'bg-neutral-900 border border-white/20 text-white/40'
                      } ${isCurrent ? 'ring-4 ring-amber-500/30 scale-110' : ''}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-[10px] font-bold mt-2 text-center max-w-[70px] ${
                        isPassed ? 'text-amber-400' : 'text-white/40'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Order Details Summary */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs">
            <div className="flex justify-between font-bold text-white border-b border-white/10 pb-2">
              <span>Items Ordered</span>
              <span>Qty</span>
            </div>
            {activeOrder.items.map((item) => (
              <div key={item.id} className="flex justify-between text-white/70">
                <span>{item.name}</span>
                <span className="font-bold">x{item.quantity}</span>
              </div>
            ))}
            <div className="pt-2 border-t border-white/10 flex justify-between font-extrabold text-amber-400 text-sm">
              <span>Total Paid</span>
              <span>₹{activeOrder.total}</span>
            </div>
          </div>

          {/* Refresh Status button */}
          <button
            onClick={() => fetchOrderStatus(activeOrder.id)}
            className="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 border border-white/15"
          >
            <RefreshCw className="w-4 h-4 text-amber-400" />
            <span>Refresh Live Status</span>
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
