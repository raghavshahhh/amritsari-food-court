'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, X, Plus, Minus, Send, PhoneCall } from 'lucide-react'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

interface QuickOrderDrawerProps {
  cart: CartItem[]
  onUpdateQuantity: (id: string, delta: number) => void
  onClearCart?: () => void
}

export default function QuickOrderDrawer({ cart, onUpdateQuantity }: QuickOrderDrawerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [orderType, setOrderType] = useState<'dinein' | 'takeaway' | 'delivery'>('takeaway')
  const [customerName, setCustomerName] = useState('')
  const [tableOrAddress, setTableOrAddress] = useState('')

  const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0)
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  if (totalCount === 0) return null

  const formatWhatsAppMessage = () => {
    const itemsList = cart.map((i) => `• ${i.name} x${i.quantity} (₹${i.price * i.quantity})`).join('\n')
    const text = `*New Order from Amritsari Food Court Website*\n\n*Order Type:* ${orderType.toUpperCase()}\n*Customer Name:* ${customerName || 'Guest'}\n${tableOrAddress ? `*Details:* ${tableOrAddress}\n` : ''}\n*Items:*\n${itemsList}\n\n*Total Amount:* ₹${totalPrice}`
    return encodeURIComponent(text)
  }

  const handleWhatsAppOrder = () => {
    const message = formatWhatsAppMessage()
    window.open(`https://wa.me/919999999999?text=${message}`, '_blank')
  }

  return (
    <>
      {/* Sticky Bottom Floating Bar */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md"
      >
        <button
          onClick={() => setIsOpen(true)}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-black font-bold text-base flex items-center justify-between shadow-2xl shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all border border-amber-300/50 group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-black text-amber-400 flex items-center justify-center font-display font-extrabold text-sm shadow-md">
              {totalCount}
            </div>
            <div className="text-left">
              <p className="text-xs uppercase tracking-widest text-black/70 font-black">Your Order</p>
              <p className="font-display font-extrabold text-black leading-tight text-lg">View Cart & Checkout</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-display font-black text-xl text-black">₹{totalPrice}</span>
            <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
              →
            </div>
          </div>
        </button>
      </motion.div>

      {/* Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-md p-0 sm:p-4">
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="w-full max-w-lg bg-black border border-amber-500/30 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl max-h-[85vh] flex flex-col justify-between"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-6 h-6 text-amber-500" />
                  <h3 className="font-display font-extrabold text-white text-xl">Your Punjabi Feast</h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-9 h-9 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto py-4 space-y-3 max-h-[40vh] my-2 pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10">
                    <div>
                      <h4 className="font-semibold text-white text-base">{item.name}</h4>
                      <p className="text-amber-400 font-display font-bold text-sm">₹{item.price * item.quantity}</p>
                    </div>
                    <div className="flex items-center gap-3 bg-white/10 rounded-lg p-1">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-7 h-7 rounded-md bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-bold text-white text-sm w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-7 h-7 rounded-md bg-amber-500 text-black hover:bg-amber-400 flex items-center justify-center font-bold"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Options */}
              <div className="space-y-4 pt-3 border-t border-white/10">
                <div className="flex gap-2">
                  {(['takeaway', 'dinein', 'delivery'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setOrderType(type)}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold capitalize transition-all border ${
                        orderType === type
                          ? 'bg-amber-500 text-black border-amber-500'
                          : 'bg-white/5 text-white/70 border-white/10 hover:border-white/20'
                      }`}
                    >
                      {type === 'dinein' ? '🍽️ Dine In' : type === 'takeaway' ? '🛍️ Takeaway' : '🚀 Delivery'}
                    </button>
                  ))}
                </div>

                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Your Name (Optional)"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                  <input
                    type="text"
                    placeholder={orderType === 'dinein' ? 'Table Number (e.g. Table 4)' : 'Delivery Address / Pick Up Time'}
                    value={tableOrAddress}
                    onChange={(e) => setTableOrAddress(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Subtotal */}
                <div className="flex justify-between items-center pt-2">
                  <span className="text-white/60 text-sm font-medium">Total Amount</span>
                  <span className="text-2xl font-display font-extrabold text-amber-400">₹{totalPrice}</span>
                </div>

                {/* Checkout Actions */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={handleWhatsAppOrder}
                    className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/40"
                  >
                    <Send className="w-4 h-4" /> Order via WhatsApp
                  </button>
                  <a
                    href="tel:+919999999999"
                    className="py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                  >
                    <PhoneCall className="w-4 h-4" /> Call to Order
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
