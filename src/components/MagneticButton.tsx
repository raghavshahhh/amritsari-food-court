'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef, MouseEvent } from 'react'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  href?: string
  onClick?: () => void
  strength?: number
}

export default function MagneticButton({ children, className = '', href, onClick, strength = 0.3 }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 20 })
  const springY = useSpring(y, { stiffness: 300, damping: 20 })

  const handleMouse = (e: MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * strength)
    y.set((e.clientY - centerY) * strength)
  }

  const reset = () => { x.set(0); y.set(0) }

  const Tag = href ? 'a' : 'button'

  return (
    <motion.div style={{ x: springX, y: springY }}>
      <Tag
        ref={ref as never}
        href={href}
        onClick={onClick}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        className={className}
      >
        {children}
      </Tag>
    </motion.div>
  )
}