'use client'

import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface CounterProps {
  to: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
  decimals?: number
}

export default function Counter({ to, duration = 2, suffix = '', prefix = '', className = '', decimals = 0 }: CounterProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => `${prefix}${v.toFixed(decimals)}${suffix}`)

  useEffect(() => {
    if (isInView) {
      animate(count, to, { duration, ease: 'easeOut' })
    }
  }, [isInView, count, to, duration])

  return <motion.span ref={ref} className={className}>{rounded}</motion.span>
}