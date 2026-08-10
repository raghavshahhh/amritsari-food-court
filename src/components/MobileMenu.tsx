'use client'

import { useState } from 'react'
import Link from 'next/link'
import { X, Menu } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

const MotionLink = motion.create(Link)

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  return (
    <>
      <button
        onClick={toggleMenu}
        className="md:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMenu}
          >
            <motion.div
              className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-black/95 backdrop-blur-lg border-l border-white/10"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="flex flex-col h-full p-8">
                <div className="mb-12">
                  <Link href="/" onClick={closeMenu} className="text-2xl font-display font-bold text-amber-500">
                    Amritsari Food Court
                  </Link>
                </div>

                <nav className="flex-1 flex flex-col gap-6">
                  {navLinks.map((link, i) => (
                    <MotionLink
                      key={link.href}
                      href={link.href}
                      onClick={closeMenu}
                      className="text-xl font-medium text-white/80 hover:text-amber-500 transition-colors"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.08 }}
                    >
                      {link.label}
                    </MotionLink>
                  ))}

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + navLinks.length * 0.08 }}
                  >
                    <Link
                      href="/contact"
                      onClick={closeMenu}
                      className="magnetic-btn bg-amber-500 text-black w-full text-center"
                    >
                      Order Now
                    </Link>
                  </motion.div>
                </nav>

                <div className="pt-8 border-t border-white/10">
                  <p className="text-white/40 text-sm text-center">
                    L Block Red Light, Vasant Kunj Rd, Mahipalpur, Delhi 110037
                  </p>
                  <p className="text-white/40 text-sm text-center mt-1">
                    Open Daily · Closes 11 PM
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}