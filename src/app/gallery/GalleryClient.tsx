'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ZoomIn } from 'lucide-react'
import dynamic from 'next/dynamic'

const TextReveal = dynamic(() => import('@/components/TextReveal'), { ssr: false })

export interface GalleryItem {
  id: string
  title: string
  category: 'Kitchen & Tandoor' | 'Signature Dishes' | 'Ambiance' | 'Ingredients'
  image: string
  desc: string
}

export const GalleryItemData: GalleryItem[] = [
  {
    id: 'tandoor-master',
    title: 'Flaming Clay Tandoor & Fresh Naan',
    category: 'Kitchen & Tandoor',
    image: '/images/tandoor_clay.jpg',
    desc: 'Our master chef baking traditional flatbreads at 500°C in hand-crafted clay ovens.',
  },
  {
    id: 'hero-kulcha',
    title: 'Amritsari Kulcha with Melted Desi Ghee',
    category: 'Signature Dishes',
    image: '/images/hero_kulcha.jpg',
    desc: 'Golden flaky kulcha stuffed with spiced potatoes and pomegranate seeds.',
  },
  {
    id: 'chole-bhature',
    title: 'Puffed Golden Bhature & Dark Chole',
    category: 'Signature Dishes',
    image: '/images/chole_bhature.jpg',
    desc: 'Classic 8-hour slow cooked chickpea curry served with light puffed bhature.',
  },
  {
    id: 'butter-chicken',
    title: 'Rich Creamy Butter Chicken',
    category: 'Signature Dishes',
    image: '/images/butter_chicken.jpg',
    desc: 'Smoky chargrilled chicken tikka in tomato cashew gravy with fresh cream swirl.',
  },
  {
    id: 'dal-makhani',
    title: 'Overnight Slow-Cooked Dal Makhani',
    category: 'Signature Dishes',
    image: '/images/dal_makhani.jpg',
    desc: 'Velvety black lentils simmered overnight on low charcoal heat with white butter.',
  },
  {
    id: 'tandoori-tikka',
    title: 'Sizzling Paneer & Chicken Tikka',
    category: 'Signature Dishes',
    image: '/images/tandoori_tikka.jpg',
    desc: 'Chargrilled skewers served hot on sizzler platter with fresh mint chutney.',
  },
  {
    id: 'kulhad-lassi',
    title: 'Thick Kulhad Lassi with Malai Layer',
    category: 'Signature Dishes',
    image: '/images/punjabi_lassi.jpg',
    desc: 'Hand-churned sweet Punjabi lassi served in traditional clay kulhad glass.',
  },
  {
    id: 'dining-hall',
    title: 'Luxury Dining Ambiance in Mahipalpur',
    category: 'Ambiance',
    image: '/images/restaurant_ambiance.jpg',
    desc: 'Warm ambient pendant lighting, comfortable seating & authentic Punjabi hospitality.',
  },
]

const CATEGORIES = ['All', 'Signature Dishes', 'Kitchen & Tandoor', 'Ambiance'] as const

export default function GalleryClient() {
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null)

  const filteredItems = GalleryItemData.filter((item) =>
    activeCategory === 'All' ? true : item.category === activeCategory
  )

  return (
    <div className="min-h-screen pt-24 pb-28">
      {/* Header */}
      <section className="py-12 border-b border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-xs font-black uppercase tracking-widest text-amber-500 mb-3 block">
            Visual Storytelling
          </span>
          <TextReveal as="h1" className="text-4xl md:text-6xl font-display font-black leading-tight mb-4" delay={0.1}>
            Inside <span className="gradient-text">Amritsari Food Court</span>
          </TextReveal>
          <p className="text-white/70 max-w-2xl mx-auto text-base">
            From flaming clay tandoors to rich slow-cooked curries and warm restaurant hospitality in Mahipalpur.
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <div className="sticky top-16 z-30 bg-black/90 backdrop-blur-xl border-b border-white/10 py-4 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-center gap-2 overflow-x-auto no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all border ${
                activeCategory === cat
                  ? 'bg-amber-500 text-black border-amber-500 shadow-md shadow-amber-500/20'
                  : 'bg-white/5 text-white/70 border-white/10 hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              onClick={() => setActiveImage(item)}
              className="group glass-card overflow-hidden cursor-pointer relative aspect-[4/3] border border-white/12 hover:border-amber-500/50 transition-all shadow-xl"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Hover Zoom Icon */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-amber-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-white/20">
                <ZoomIn className="w-4 h-4" />
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-0 left-0 right-0 p-5 space-y-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">
                  {item.category}
                </span>
                <h3 className="font-display font-extrabold text-white text-lg leading-snug">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8">
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full rounded-3xl overflow-hidden glass-panel border border-amber-500/30 shadow-2xl flex flex-col"
            >
              <div className="relative aspect-[16/10] w-full bg-black">
                <Image
                  src={activeImage.image}
                  alt={activeImage.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="p-6 bg-black border-t border-white/10 space-y-2">
                <span className="text-xs font-black uppercase tracking-widest text-amber-400">
                  {activeImage.category}
                </span>
                <h2 className="text-2xl font-display font-extrabold text-white">
                  {activeImage.title}
                </h2>
                <p className="text-white/70 text-sm leading-relaxed">
                  {activeImage.desc}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
