'use client'

import { useState } from 'react'
import Link from 'next/link'
import { X, Menu, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'Story' },
  { href: '/contact', label: 'Contact' },
  { href: '/login', label: 'Customer Login' },
  { href: '/admin', label: 'Admin Portal' },
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
        className="lg:hidden p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/15"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden bg-black/90 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <Link href="/" onClick={closeMenu} className="font-display font-extrabold text-white text-xl">
                Amritsari Food Court
              </Link>
              <button
                onClick={closeMenu}
                className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 flex flex-col justify-center gap-5 my-6">
              {navLinks.map((link, i) => (
                <MotionLink
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="text-2xl font-display font-extrabold text-white/80 hover:text-amber-400 transition-colors flex items-center justify-between group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.04 }}
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-amber-400" />
                </MotionLink>
              ))}
            </nav>

            {/* Bottom Actions */}
            <div className="space-y-4 pt-6 border-t border-white/10">
              <Link
                href="/menu"
                onClick={closeMenu}
                className="w-full py-4 rounded-full bg-amber-500 text-black font-extrabold text-sm uppercase tracking-wider text-center block shadow-xl shadow-amber-500/20"
              >
                Explore Full Menu
              </Link>
              <p className="text-white/40 text-xs text-center">
                L Block Red Light, Mahipalpur, Delhi · Open 11 AM - 11 PM
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}