'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, ReactNode, Children, isValidElement } from 'react'

interface TextRevealProps {
  children: ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  className?: string
  delay?: number
  id?: string
}

export default function TextReveal({
  children,
  as: Tag = 'h2',
  className = '',
  delay = 0,
  id,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  let wordIndex = 0

  const processNode = (node: ReactNode): ReactNode => {
    if (typeof node === 'string') {
      const words = node.split(' ')
      return words.map((word, i) => {
        if (!word && i > 0) return null
        const currentIndex = wordIndex++
        return (
          <span key={currentIndex} className="inline-block overflow-hidden mr-[0.25em]">
            <motion.span
              className="inline-block"
              initial={{ y: '100%' }}
              animate={isInView ? { y: 0 } : { y: '100%' }}
              transition={{
                duration: 0.5,
                ease: [0.33, 1, 0.68, 1],
                delay: delay + currentIndex * 0.04,
              }}
            >
              {word}
            </motion.span>
          </span>
        )
      })
    }

    if (isValidElement(node)) {
      const currentIndex = wordIndex++
      return (
        <span key={currentIndex} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: '100%' }}
            animate={isInView ? { y: 0 } : { y: '100%' }}
            transition={{
              duration: 0.5,
              ease: [0.33, 1, 0.68, 1],
              delay: delay + currentIndex * 0.04,
            }}
          >
            {node}
          </motion.span>
        </span>
      )
    }

    return node
  }

  return (
    <Tag ref={ref as unknown as React.RefObject<HTMLHeadingElement>} id={id} className={className}>
      {Children.map(children, (child) => processNode(child))}
    </Tag>
  )
}