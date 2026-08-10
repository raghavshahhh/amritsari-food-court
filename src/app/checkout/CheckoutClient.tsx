'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ShoppingBag,
  ArrowRight,
  Plus,
  Minus,
  Trash2,
  MessageSquare,
  CreditCard,
  Banknote,
  ChevronLeft,
} from 'lucide-react'
import { useCart, CartItem } from '@/context/CartContext'

export default function CheckoutClient() {
  const router = useRouter()
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    setActiveOrder,
    setIsTrackerOpen,
    showToast,
  } = useCart()

  const [orderType, setOrderType] = useState<'takeaway' | 'dinein' | 'delivery'>('delivery')
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [tableOrAddress, setTableOrAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<'whatsapp' | 'upi' | 'cod'>('whatsapp')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const tax = Math.round(subtotal * 0.05)
  const deliveryFee = orderType === 'delivery' ? 40 : 0
  const grandTotal = subtotal + tax + deliveryFee

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    if (cart.length === 0) {
      showToast('Your cart is empty', 'error')
      return
    }
    if (!customerName || !customerPhone) {
      showToast('Please fill in your name and phone number', 'error')
      return
    }

    setIsSubmitting(true)
    try {
      const typeLabel = orderType === 'dinein' ? 'Dine In' : orderType === 'delivery' ? 'Delivery' : 'Takeaway'
      const locLabel =
        tableOrAddress ||
        (orderType === 'dinein' ? 'Table 1' : orderType === 'delivery' ? 'Mahipalpur Delhi' : 'Counter Pickup')

      const payload = {
        customerName,
        customerPhone,
        type: typeLabel,
        tableOrAddress: locLabel,
        items: cart.map((i) => ({
          id: i.id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          isVeg: i.isVeg,
        })),
        notes,
      }

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()

      if (data.success && data.order) {
        setActiveOrder(data.order)
        clearCart()

        if (paymentMethod === 'whatsapp') {
          const itemsText = data.order.items
            .map((i: CartItem) => `• ${i.name} x${i.quantity} (₹${i.price * i.quantity})`)
            .join('%0A')
          const waMessage =
            `*NEW ORDER - ${data.order.id}*%0A%0A` +
            `*Customer:* ${customerName} (${customerPhone})%0A` +
            `*Order Type:* ${typeLabel} (${locLabel})%0A%0A` +
            `*Items:*%0A${itemsText}%0A%0A` +
            `*Subtotal:* ₹${subtotal}%0A` +
            `*GST (5%):* ₹${tax}%0A` +
            (deliveryFee ? `*Delivery Fee:* ₹${deliveryFee}%0A` : '') +
            `*Grand Total:* ₹${grandTotal}%0A%0A` +
            `Please confirm my order!`

          window.open(`https://wa.me/919999999999?text=${waMessage}`, '_blank')
        }

        showToast(`Order ${data.order.id} placed successfully!`)
        setIsTrackerOpen(true)
        router.push('/')
      } else {
        showToast(data.error || 'Failed to place order', 'error')
      }
    } catch {
      showToast('Network error processing checkout', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-28 pb-20 flex items-center justify-center px-6">
        <div className="max-w-md w-full glass-card border border-white/12 p-8 rounded-3xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-white/40">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-display font-extrabold text-white">Your Cart is Empty</h1>
            <p className="text-white/60 text-xs">
              Explore our authentic Amritsari kulchas, butter chicken & lassi menu.
            </p>
          </div>
          <Link
            href="/menu"
            className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all block shadow-xl shadow-amber-500/20"
          >
            Explore Menu & Add Dishes
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-28 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div>
            <Link
              href="/menu"
              className="inline-flex items-center gap-1 text-xs text-amber-400 font-bold hover:underline mb-1"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Menu
            </Link>
            <h1 className="text-3xl md:text-4xl font-display font-black text-white">
              Luxury Checkout
            </h1>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 text-xs text-white/70">
            <ShoppingBag className="w-4 h-4 text-amber-500" />
            <span>{cart.reduce((a, b) => a + b.quantity, 0)} Items in Cart</span>
          </div>
        </div>

        {/* Main Grid */}
        <form onSubmit={handlePlaceOrder} className="grid lg:grid-cols-12 gap-8">
          {/* Left Column: Form & Details */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Order Type Selection */}
            <div className="glass-card border border-white/12 p-6 rounded-3xl space-y-4">
              <h2 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-black flex items-center justify-center text-xs">1</span>
                <span>Select Order Type</span>
              </h2>

              <div className="flex gap-2 bg-white/5 p-1 rounded-2xl border border-white/10">
                {(['delivery', 'dinein', 'takeaway'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setOrderType(type)}
                    className={`flex-1 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all ${
                      orderType === type
                        ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {type === 'dinein' ? 'Dine In' : type === 'takeaway' ? 'Takeaway' : 'Delivery'}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Customer Information & Location */}
            <div className="glass-card border border-white/12 p-6 rounded-3xl space-y-4">
              <h2 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-black flex items-center justify-center text-xs">2</span>
                <span>Contact & Delivery Details</span>
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/50">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Rahul Sharma"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-2xl px-4 py-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/50">Mobile Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-2xl px-4 py-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/50">
                  {orderType === 'dinein'
                    ? 'Table Number (e.g. Table 4)'
                    : orderType === 'delivery'
                    ? 'Full Delivery Address & Landmark *'
                    : 'Pickup Time / Instructions'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={
                    orderType === 'dinein'
                      ? 'Table 4'
                      : orderType === 'delivery'
                      ? 'House/Flat #, Sector C, Vasant Kunj, New Delhi'
                      : 'Pickup in 20 minutes'
                  }
                  value={tableOrAddress}
                  onChange={(e) => setTableOrAddress(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-2xl px-4 py-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/50">Kitchen Instructions (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Extra crisp kulcha, less butter, extra onions..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-2xl px-4 py-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* 3. Payment Method */}
            <div className="glass-card border border-white/12 p-6 rounded-3xl space-y-4">
              <h2 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-black flex items-center justify-center text-xs">3</span>
                <span>Payment Method</span>
              </h2>

              <div className="grid sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('whatsapp')}
                  className={`p-4 rounded-2xl border text-left space-y-2 transition-all ${
                    paymentMethod === 'whatsapp'
                      ? 'bg-emerald-950/80 border-emerald-500 text-white font-bold'
                      : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20'
                  }`}
                >
                  <MessageSquare className="w-5 h-5 text-emerald-400" />
                  <div>
                    <p className="text-xs font-extrabold text-white">WhatsApp Order</p>
                    <p className="text-[10px] text-white/50">Instant confirmation</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 rounded-2xl border text-left space-y-2 transition-all ${
                    paymentMethod === 'upi'
                      ? 'bg-amber-500/15 border-amber-500 text-white font-bold'
                      : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-amber-400" />
                  <div>
                    <p className="text-xs font-extrabold text-white">UPI / Online QR</p>
                    <p className="text-[10px] text-white/50">GPay, PhonePe, Paytm</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-2xl border text-left space-y-2 transition-all ${
                    paymentMethod === 'cod'
                      ? 'bg-amber-500/15 border-amber-500 text-white font-bold'
                      : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20'
                  }`}
                >
                  <Banknote className="w-5 h-5 text-amber-400" />
                  <div>
                    <p className="text-xs font-extrabold text-white">Cash / Counter</p>
                    <p className="text-[10px] text-white/50">Pay at restaurant</p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary Card */}
          <div className="lg:col-span-5">
            <div className="glass-card border border-white/15 p-6 sm:p-8 rounded-3xl space-y-6 sticky top-24">
              <h2 className="text-lg font-display font-extrabold text-white border-b border-white/10 pb-4">
                Order Summary
              </h2>

              {/* Items List */}
              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                        <p className="font-bold text-white text-xs truncate">{item.name}</p>
                      </div>
                      <p className="text-amber-400 font-extrabold text-xs mt-0.5">₹{item.price * item.quantity}</p>
                    </div>

                    <div className="flex items-center gap-2 bg-black/60 px-2.5 py-1 rounded-xl border border-white/15">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="text-white/70 hover:text-amber-400"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-black text-white w-4 text-center">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="text-white/70 hover:text-amber-400"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="text-white/40 hover:text-rose-400 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Price Calculation */}
              <div className="space-y-2 text-xs text-white/70 pt-4 border-t border-white/10">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-white">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (5%)</span>
                  <span className="font-bold text-white">₹{tax}</span>
                </div>
                {deliveryFee > 0 && (
                  <div className="flex justify-between text-amber-400 font-semibold">
                    <span>Delivery Charge</span>
                    <span className="font-bold">₹{deliveryFee}</span>
                  </div>
                )}
                <div className="flex justify-between pt-3 border-t border-white/10 font-black text-white text-lg">
                  <span>Grand Total</span>
                  <span className="text-amber-400 font-display">₹{grandTotal}</span>
                </div>
              </div>

              {/* Place Order CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-sm uppercase tracking-wider transition-all shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2"
              >
                <span>{isSubmitting ? 'Processing Order...' : 'Confirm & Place Order'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
