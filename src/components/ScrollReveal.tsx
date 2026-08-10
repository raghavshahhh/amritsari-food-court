'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  distance?: number
}

const directionMap = {
  up: (d: number) => ({ y: d, x: 0 }),
  down: (d: number) => ({ y: -d, x: 0 }),
  left: (d: number) => ({ x: d, y: 0 }),
  right: (d: number) => ({ x: -d, y: 0 }),
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 40,
}: ScrollRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })
  const initial = directionMap[direction](distance)

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...initial }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...initial }}
      transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1], delay }}
    >
      {children}
    </motion.div>
  )
}