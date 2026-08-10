'use client'

import { motion } from 'framer-motion'

interface GradientOrbProps {
  color?: string
  size?: number
  className?: string
  delay?: number
}

export default function GradientOrb({ color = 'rgba(230, 163, 46, 0.15)', size = 600, className = '', delay = 0 }: GradientOrbProps) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: 'blur(60px)',
      }}
      animate={{
        x: [0, 30, -20, 0],
        y: [0, -25, 15, 0],
        scale: [1, 1.1, 0.95, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    />
  )
}