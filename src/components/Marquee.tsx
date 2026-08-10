'use client'

import { motion } from 'framer-motion'

interface MarqueeProps {
  items: string[]
  className?: string
  speed?: number
  gap?: string
}

export default function Marquee({ items, className = '', speed = 20, gap = '4rem' }: MarqueeProps) {
  const doubled = [...items, ...items]

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-flex"
        style={{ gap }}
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="inline-block text-lg font-medium text-white/20 uppercase tracking-widest">
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}