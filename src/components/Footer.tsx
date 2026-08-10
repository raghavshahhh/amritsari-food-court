'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, Clock, Star, ArrowRight } from 'lucide-react'

const footerLinks = {
  quick: [
    { href: '/', label: 'Home' },
    { href: '/menu', label: 'Menu' },
    { href: '/about', label: 'Our Story' },
    { href: '/contact', label: 'Contact' },
  ],
}

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          <motion.div
            className="max-w-xs"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/" className="text-2xl font-display font-bold text-amber-500 tracking-tight block mb-4">
              Amritsari Food Court
            </Link>
            <p className="text-white/60 mb-6 leading-relaxed">
              Serving authentic Punjabi flavors in Delhi since 2018. Where tradition meets taste.
            </p>
            <div className="flex items-center gap-3">
              <Star className="w-5 h-5 fill-amber-500 text-amber-500" aria-hidden="true" />
              <span className="font-medium text-white">4.39</span>
              <span className="text-white/50 text-sm">Google · 2,800+ reviews</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="font-semibold text-white mb-6">Quick Links</h3>
            <nav className="space-y-3" aria-label="Footer navigation">
              {footerLinks.quick.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 text-white/70 hover:text-amber-500 transition-colors"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </nav>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="font-semibold text-white mb-6">Visit Us</h3>
            <address className="not-italic space-y-4 text-white/60">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-medium text-white">L Block Red Light</p>
                  <p>Vasant Kunj Rd, Mahipalpur</p>
                  <p>New Delhi 110037</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-amber-500 shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-medium text-white">Daily: 11:00 AM – 11:00 PM</p>
                  <p className="text-white/40 text-sm">Last order 10:30 PM</p>
                </div>
              </div>
              <Link
                href="https://maps.google.com/?q=Amritsari+Food+Court+Mahipalpur"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 font-medium transition-colors mt-4"
              >
                Get Directions
                <ArrowRight className="w-4 h-4" />
              </Link>
            </address>
          </motion.div>
        </div>

        <motion.div
          className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Amritsari Food Court. All rights reserved.
          </p>
          <p className="text-white/40 text-sm">
            Built with ❤️ by <a href="https://ragspro.com" target="_blank" rel="noopener" className="hover:text-amber-500 transition-colors">RAGSPRO</a>
          </p>
        </motion.div>
      </div>
    </footer>
  )
}