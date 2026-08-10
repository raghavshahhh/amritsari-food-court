'use client'

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { MouseEvent } from 'react'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
}

export default function GlassCard({ children, className = '', hover = true, onClick }: GlassCardProps) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const spotlight = useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, rgba(230, 163, 46, 0.08), transparent 80%)`

  return (
    <motion.div
      className={`relative overflow-hidden rounded-[var(--radius-card)] bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] ${hover ? 'hover:border-amber-500/30 transition-colors duration-300' : ''} ${className}`}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      whileHover={hover ? { y: -2 } : undefined}
      transition={{ duration: 0.2 }}
    >
      {hover && (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition duration-300 group-hover:opacity-100"
          style={{ background: spotlight }}
        />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}
