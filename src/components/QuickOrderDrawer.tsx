'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, MessageSquare } from 'lucide-react'
import { useCart, CartItem } from '@/context/CartContext'

export default function QuickOrderDrawer() {
  const {
    cart,
    isDrawerOpen,
    setIsDrawerOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    setActiveOrder,
    setIsTrackerOpen,
    showToast,
  } = useCart()

  const [orderType, setOrderType] = useState<'takeaway' | 'dinein' | 'delivery'>('takeaway')
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [tableOrAddress, setTableOrAddress] = useState('')
  const [notes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const tax = Math.round(subtotal * 0.05)
  const deliveryFee = orderType === 'delivery' ? 40 : 0
  const grandTotal = subtotal + tax + deliveryFee

  const handlePlaceOrder = async (method: 'whatsapp' | 'cod') => {
    if (cart.length === 0) return
    if (!customerName || !customerPhone) {
      showToast('Please enter your name and phone number', 'error')
      return
    }

    setIsSubmitting(true)
    try {
      const typeLabel = orderType === 'dinein' ? 'Dine In' : orderType === 'delivery' ? 'Delivery' : 'Takeaway'
      const payload = {
        customerName,
        customerPhone,
        type: typeLabel,
        tableOrAddress: tableOrAddress || (orderType === 'dinein' ? 'Table 1' : orderType === 'delivery' ? 'Mahipalpur' : 'Counter Pickup'),
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
        setIsDrawerOpen(false)

        if (method === 'whatsapp') {
          // Construct formatted WhatsApp order message
          const itemsText = data.order.items.map((i: CartItem) => `• ${i.name} x${i.quantity} (₹${i.price * i.quantity})`).join('%0A')
          const waMessage = `*NEW ORDER - ${data.order.id}*%0A%0A` +
            `*Customer:* ${customerName} (${customerPhone})%0A` +
            `*Order Type:* ${typeLabel} (${data.order.tableOrAddress})%0A%0A` +
            `*Items:*%0A${itemsText}%0A%0A` +
            `*Subtotal:* ₹${subtotal}%0A` +
            `*GST (5%):* ₹${tax}%0A` +
            (deliveryFee ? `*Delivery Fee:* ₹${deliveryFee}%0A` : '') +
            `*Grand Total:* ₹${grandTotal}%0A%0A` +
            `Please confirm and prepare my order!`

          window.open(`https://wa.me/919999999999?text=${waMessage}`, '_blank')
        }

        showToast(`Order ${data.order.id} placed successfully!`)
        setIsTrackerOpen(true)
      } else {
        showToast(data.error || 'Failed to place order', 'error')
      }
    } catch {
      showToast('Network error placing order', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsDrawerOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md bg-neutral-950 border-l border-white/12 h-full flex flex-col justify-between p-6 z-10 shadow-2xl overflow-y-auto"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-amber-500" />
                <h2 className="font-display font-extrabold text-white text-lg">Your Amritsari Order</h2>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/30">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <p className="font-display font-bold text-white text-lg">Your cart is empty</p>
                  <p className="text-white/50 text-xs mt-1">Explore our menu and add authentic Amritsari kulchas & butter chicken.</p>
                </div>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
                {/* Order Type Tabs */}
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/50">Order Type</label>
                  <div className="flex gap-2">
                    {(['takeaway', 'dinein', 'delivery'] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => setOrderType(type)}
                        className={`flex-1 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all border ${
                          orderType === type
                            ? 'bg-amber-500 text-black border-amber-500 shadow-md shadow-amber-500/20'
                            : 'bg-white/5 text-white/70 border-white/10 hover:border-white/20'
                        }`}
                      >
                        {type === 'dinein' ? 'Dine In' : type === 'takeaway' ? 'Takeaway' : 'Delivery'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-3"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                          <p className="font-bold text-white text-xs truncate">{item.name}</p>
                        </div>
                        <p className="text-amber-400 font-extrabold text-xs mt-0.5">₹{item.price * item.quantity}</p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 bg-black/60 px-2 py-1 rounded-xl border border-white/15">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="text-white/70 hover:text-amber-400"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-black text-white w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="text-white/70 hover:text-amber-400"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-white/40 hover:text-rose-400 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Customer Details Form */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <p className="text-xs font-extrabold text-white uppercase tracking-wider">Customer Info</p>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Your Full Name *"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-500"
                    />
                    <input
                      type="tel"
                      placeholder="Mobile Phone Number *"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-500"
                    />
                    <input
                      type="text"
                      placeholder={
                        orderType === 'dinein'
                          ? 'Table Number (e.g. Table 4)'
                          : orderType === 'delivery'
                          ? 'Delivery Address (Mahipalpur / Vasant Kunj)'
                          : 'Pickup Instructions'
                      }
                      value={tableOrAddress}
                      onChange={(e) => setTableOrAddress(e.target.value)}
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Bill & Checkout CTA */}
            {cart.length > 0 && (
              <div className="pt-4 border-t border-white/10 space-y-4">
                <div className="space-y-1.5 text-xs text-white/70">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (5%)</span>
                    <span>₹{tax}</span>
                  </div>
                  {deliveryFee > 0 && (
                    <div className="flex justify-between text-amber-400 font-semibold">
                      <span>Delivery Charge</span>
                      <span>₹{deliveryFee}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-white/10 font-extrabold text-white text-base">
                    <span>Grand Total</span>
                    <span className="text-amber-400">₹{grandTotal}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    disabled={isSubmitting}
                    onClick={() => handlePlaceOrder('whatsapp')}
                    className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
                  >
                    <MessageSquare className="w-4 h-4 fill-white" />
                    <span>Order via WhatsApp & Pay</span>
                  </button>

                  <button
                    disabled={isSubmitting}
                    onClick={() => handlePlaceOrder('cod')}
                    className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                  >
                    <span>Place Order (Cash / Counter)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
