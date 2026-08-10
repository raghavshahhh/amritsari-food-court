'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import MobileMenu from './MobileMenu'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

const MotionLink = motion.create(Link)

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between" aria-label="Main navigation">
        <Link
          href="/"
          className="text-2xl font-display font-bold text-amber-500 tracking-tight"
          aria-label="Amritsari Food Court - Home"
        >
          Amritsari Food Court
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <MotionLink
              key={link.href}
              href={link.href}
              className="text-white/80 hover:text-amber-500 transition-colors font-medium relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-amber-500 after:transition-all hover:after:w-full"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
            >
              {link.label}
            </MotionLink>
          ))}
          <Link
            href="/contact"
            className="magnetic-btn bg-amber-500 text-black hidden sm:inline-flex ml-4"
          >
            Order Now
          </Link>
        </div>

        <MobileMenu />
      </nav>
    </header>
  )
}