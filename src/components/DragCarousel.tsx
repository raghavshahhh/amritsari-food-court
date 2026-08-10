'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface DragCarouselProps {
  items: React.ReactNode[]
  className?: string
  itemWidth?: number
  gap?: number
}

export default function DragCarousel({ items, className = '', itemWidth = 350, gap = 24 }: DragCarouselProps) {
  const [centerIndex, setCenterIndex] = useState(0)

  return (
    <div className={`relative flex items-center justify-center overflow-hidden py-8 ${className}`}>
      <motion.div
        className="flex cursor-grab active:cursor-grabbing"
        style={{ gap }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.15}
        dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
        onDragEnd={(_, info) => {
          const threshold = 40
          const velocity = info.velocity.x
          const offset = info.offset.x
          if ((offset < -threshold || velocity < -300) && centerIndex < items.length - 1) {
            setCenterIndex((p) => p + 1)
          } else if ((offset > threshold || velocity > 300) && centerIndex > 0) {
            setCenterIndex((p) => p - 1)
          }
        }}
      >
        {items.map((item, i) => (
          <motion.div
            key={i}
            className="flex-shrink-0"
            style={{ width: itemWidth }}
            animate={{
              scale: i === centerIndex ? 1 : 0.85,
              opacity: i === centerIndex ? 1 : 0.4,
              filter: i === centerIndex ? 'blur(0px)' : 'blur(2px)',
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            {item}
          </motion.div>
        ))}
      </motion.div>

      <div className="absolute bottom-4 flex gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setCenterIndex(i)}
            className={`w-2 h-2 rounded-full transition-all ${i === centerIndex ? 'bg-amber-500 w-6' : 'bg-white/30'}`}
          />
        ))}
      </div>
    </div>
  )
}