'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, Plus, Minus, Check, ArrowRight } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation'

interface AddOnOption {
  id: string
  name: string
  price: number
}

const AVAILABLE_ADDONS: AddOnOption[] = [
  { id: 'extra-butter', name: 'Extra Amul Butter Swirl', price: 20 },
  { id: 'extra-chole', name: 'Extra Portion Spicy Chole', price: 40 },
  { id: 'extra-malai', name: 'Extra Kulhad Malai Layer', price: 30 },
]

export default function AddToCartModal() {
  const router = useRouter()
  const { selectedItemForModal, closeAddToCartModal, addToCart } = useCart()

  const [quantity, setQuantity] = useState(1)
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const [spiceLevel, setSpiceLevel] = useState<'Mild' | 'Medium' | 'Hot'>('Medium')

  if (!selectedItemForModal) return null

  const addOnsTotal = selectedAddOns.reduce((acc, addOnId) => {
    const found = AVAILABLE_ADDONS.find((a) => a.id === addOnId)
    return acc + (found ? found.price : 0)
  }, 0)

  const unitPrice = selectedItemForModal.price + addOnsTotal
  const itemTotalPrice = unitPrice * quantity

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const handleAddAndClose = () => {
    const addOnNames = selectedAddOns
      .map((id) => AVAILABLE_ADDONS.find((a) => a.id === id)?.name)
      .filter(Boolean) as string[]

    addToCart({
      id: selectedItemForModal.id,
      name: addOnNames.length > 0 ? `${selectedItemForModal.name} (${addOnNames.join(', ')})` : selectedItemForModal.name,
      price: unitPrice,
      quantity,
      isVeg: selectedItemForModal.isVeg,
      image: selectedItemForModal.image,
      addOns: addOnNames,
      spiceLevel,
    })

    setQuantity(1)
    setSelectedAddOns([])
    closeAddToCartModal()
  }

  const handleAddAndCheckout = () => {
    handleAddAndClose()
    router.push('/checkout')
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[115] bg-black/85 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          className="relative max-w-md md:max-w-3xl w-full rounded-[32px] bg-neutral-950 border border-amber-500/30 overflow-hidden shadow-2xl flex flex-col md:grid md:grid-cols-12 my-auto"
        >
          {/* Close button */}
          <button
            onClick={() => {
              setQuantity(1)
              setSelectedAddOns([])
              closeAddToCartModal()
            }}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/70 backdrop-blur-md text-white flex items-center justify-center hover:bg-black transition-all border border-white/20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Side: Dish Image (Top on mobile, Left column on Laptop/Desktop) */}
          <div className="md:col-span-5 relative aspect-[16/10] md:aspect-auto md:min-h-full bg-black flex flex-col justify-end p-6 overflow-hidden">
            {selectedItemForModal.image && (
              <Image
                src={selectedItemForModal.image}
                alt={selectedItemForModal.name}
                fill
                className="object-cover filter contrast-[1.04]"
                priority
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent md:bg-gradient-to-r md:from-transparent md:via-neutral-950/40 md:to-neutral-950" />

            <div className="relative z-10 space-y-1">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    selectedItemForModal.isVeg ? 'bg-emerald-400' : 'bg-rose-400'
                  }`}
                />
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">
                  {selectedItemForModal.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-display font-extrabold text-white leading-tight">
                {selectedItemForModal.name}
              </h3>
            </div>
          </div>

          {/* Right Side: Options & Actions */}
          <div className="md:col-span-7 p-6 md:p-8 flex flex-col justify-between space-y-5 bg-neutral-950">
            <div className="space-y-4">
              {/* Header Details */}
              <div>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-black uppercase tracking-widest text-white/50">Base Price</span>
                  <span className="text-amber-400 font-display font-black text-2xl">₹{selectedItemForModal.price}</span>
                </div>
                {selectedItemForModal.desc && (
                  <p className="text-white/60 text-xs leading-relaxed mt-1">
                    {selectedItemForModal.desc}
                  </p>
                )}
              </div>

              {/* Spice Preference */}
              <div className="space-y-2 pt-3 border-t border-white/10">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/50 block">
                  Spice Preference
                </label>
                <div className="flex gap-2">
                  {(['Mild', 'Medium', 'Hot'] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => setSpiceLevel(level)}
                      className={`flex-1 py-2 rounded-xl text-xs font-extrabold uppercase transition-all border ${
                        spiceLevel === level
                          ? 'bg-amber-500 text-black border-amber-500 shadow-md shadow-amber-500/20'
                          : 'bg-white/5 text-white/60 border-white/10 hover:border-white/20'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chef Add-ons */}
              <div className="space-y-2.5 pt-3 border-t border-white/10">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/50 block">
                  Chef Add-ons (Optional)
                </label>
                <div className="space-y-2">
                  {AVAILABLE_ADDONS.map((addon) => {
                    const isSelected = selectedAddOns.includes(addon.id)
                    return (
                      <button
                        key={addon.id}
                        onClick={() => toggleAddOn(addon.id)}
                        className={`w-full p-3 rounded-2xl border text-xs flex items-center justify-between transition-all ${
                          isSelected
                            ? 'bg-amber-500/15 border-amber-500 text-white font-bold'
                            : 'bg-white/5 border-white/10 text-white/70 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                              isSelected ? 'bg-amber-500 border-amber-500 text-black' : 'border-white/30'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span>{addon.name}</span>
                        </div>
                        <span className="font-extrabold text-amber-400">+₹{addon.price}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <span className="text-xs font-black uppercase tracking-widest text-white/60">Quantity</span>
                <div className="flex items-center gap-3 bg-black border border-white/15 px-3 py-1.5 rounded-2xl">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-7 h-7 rounded-xl bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-display font-extrabold text-white text-base w-6 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-7 h-7 rounded-xl bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <div className="flex justify-between items-center text-sm font-extrabold text-white">
                <span>Item Total</span>
                <span className="text-amber-400 text-2xl font-display font-black">₹{itemTotalPrice}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAddAndClose}
                  className="py-3.5 px-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 border border-white/15"
                >
                  <span>Continue</span>
                </button>
                <button
                  onClick={handleAddAndCheckout}
                  className="py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/25"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
