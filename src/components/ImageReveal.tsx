'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image, { ImageProps } from 'next/image'

interface ImageRevealProps extends Omit<ImageProps, 'placeholder'> {
  delay?: number
}

export default function ImageReveal({ delay = 0, alt = '', ...props }: ImageRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <motion.div
      ref={ref}
      className="overflow-hidden"
      initial={{ clipPath: 'inset(100% 0 0 0)' }}
      animate={isInView ? { clipPath: 'inset(0% 0 0 0)' } : { clipPath: 'inset(100% 0 0 0)' }}
      transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay }}
    >
      <motion.div
        initial={{ scale: 1.3 }}
        animate={isInView ? { scale: 1 } : { scale: 1.3 }}
        transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1], delay }}
      >
        <Image alt={alt} {...props} />
      </motion.div>
    </motion.div>
  )
}