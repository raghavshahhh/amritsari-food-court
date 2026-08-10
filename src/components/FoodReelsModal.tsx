'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Volume2, VolumeX, ShoppingBag, Flame, ChevronRight, ChevronLeft } from 'lucide-react'
import Image from 'next/image'

export interface ReelStory {
  id: string
  title: string
  subtitle: string
  image: string
  tag: string
  price: string
  desc: string
}

export const REELS_DATA: ReelStory[] = [
  {
    id: 'kulcha',
    title: 'Crushing the Crispy Kulcha',
    subtitle: 'Hand-stuffed potato & pomegranate seeds, baked at 500°C in clay tandoor',
    image: '/images/hero_kulcha.jpg',
    tag: 'Signature Item',
    price: '₹120',
    desc: 'Watch butter melt on our iconic flaky Amritsari Kulcha served with spicy chole.',
  },
  {
    id: 'chole-bhature',
    title: 'Puffed Golden Bhature',
    subtitle: 'Crispy outer layer, cloud-soft inside, paired with 8-hour simmered chole',
    image: '/images/chole_bhature.jpg',
    tag: 'Customer Favorite',
    price: '₹150',
    desc: 'Every bhatura puffs up live in hot oil right before your eyes.',
  },
  {
    id: 'butter-chicken',
    title: 'Sizzling Butter Chicken',
    subtitle: 'Smoky tandoori chicken submerged in velvety tomato cashew gravy',
    image: '/images/butter_chicken.jpg',
    tag: 'Bestseller',
    price: '₹280',
    desc: 'Finished with a rich cream swirl and fresh coriander.',
  },
  {
    id: 'lassi',
    title: 'Thick Kulhad Lassi',
    subtitle: 'Hand-churned yogurt topped with heavy malai cream & saffron',
    image: '/images/punjabi_lassi.jpg',
    tag: 'Refreshing',
    price: '₹60',
    desc: 'Served in authentic clay kulhad glass for ultimate cooling.',
  },
]

interface FoodReelsModalProps {
  isOpen: boolean
  onClose: () => void
  initialReelId?: string
  onSelectOrder?: (dishName: string) => void
}

export default function FoodReelsModal({ isOpen, onClose, initialReelId = 'kulcha', onSelectOrder }: FoodReelsModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [prevInitialId, setPrevInitialId] = useState(initialReelId)
  const [isMuted, setIsMuted] = useState(true)

  if (initialReelId !== prevInitialId) {
    setPrevInitialId(initialReelId)
    const idx = REELS_DATA.findIndex((r) => r.id === initialReelId)
    if (idx !== -1) {
      setCurrentIndex(idx)
    }
  }

  useEffect(() => {
    if (!isOpen) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % REELS_DATA.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [isOpen])

  if (!isOpen) return null

  const currentReel = REELS_DATA[currentIndex]

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % REELS_DATA.length)
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + REELS_DATA.length) % REELS_DATA.length)

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
          aria-label="Close food reel"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Container */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-sm md:max-w-md aspect-[9/16] rounded-3xl overflow-hidden glass-panel border border-amber-500/30 shadow-2xl flex flex-col justify-between"
        >
          {/* Story Progress Bar */}
          <div className="absolute top-4 left-4 right-4 z-20 flex gap-1.5">
            {REELS_DATA.map((reel, idx) => (
              <div key={reel.id} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-amber-500"
                  initial={{ width: idx < currentIndex ? '100%' : '0%' }}
                  animate={{ width: idx === currentIndex ? '100%' : idx < currentIndex ? '100%' : '0%' }}
                  transition={{ duration: idx === currentIndex ? 6 : 0, ease: 'linear' }}
                />
              </div>
            ))}
          </div>

          {/* Background Image / Reel Visual */}
          <div className="absolute inset-0 z-0">
            <Image
              src={currentReel.image}
              alt={currentReel.title}
              fill
              className="object-cover scale-105 filter contrast-[1.05]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40" />
          </div>

          {/* Controls & Nav Click Zones */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-0 bottom-0 w-1/3 z-10 opacity-0 hover:opacity-100 flex items-center justify-start pl-4"
          >
            <ChevronLeft className="w-8 h-8 text-white/70" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-0 bottom-0 w-1/3 z-10 opacity-0 hover:opacity-100 flex items-center justify-end pr-4"
          >
            <ChevronRight className="w-8 h-8 text-white/70" />
          </button>

          {/* Top Bar Info */}
          <div className="relative z-20 p-6 pt-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-amber-500 text-black flex items-center gap-1 shadow-lg">
                <Flame className="w-3.5 h-3.5 fill-black" /> {currentReel.tag}
              </span>
            </div>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center border border-white/10"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>

          {/* Bottom Card Content */}
          <div className="relative z-20 p-6 space-y-4 bg-gradient-to-t from-black via-black/80 to-transparent">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-2xl font-display font-extrabold text-white leading-tight">
                  {currentReel.title}
                </h3>
                <span className="text-amber-400 font-display font-bold text-xl">{currentReel.price}</span>
              </div>
              <p className="text-white/80 text-sm leading-relaxed">{currentReel.subtitle}</p>
            </div>

            <p className="text-white/60 text-xs">{currentReel.desc}</p>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  onSelectOrder?.(currentReel.title)
                  onClose()
                }}
                className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all"
              >
                <ShoppingBag className="w-4 h-4" /> Order This Dish
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
