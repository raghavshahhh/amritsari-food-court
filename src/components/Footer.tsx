'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MapPin, Clock, Star, ArrowRight, PhoneCall } from 'lucide-react'

const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'Our Story' },
  { href: '/contact', label: 'Contact' },
  { href: '/login', label: 'Login' },
  { href: '/admin', label: 'Admin Portal' },
]

export default function Footer() {
  const pathname = usePathname()

  // Hide footer on menu and checkout pages per user directive
  if (pathname === '/menu' || pathname === '/checkout') return null

  return (
    <footer className="relative max-w-7xl mx-auto px-4 sm:px-6 pb-12 pt-8">
      <div className="rounded-[32px] bg-neutral-950 border border-white/12 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
        {/* Subtle Ambient Background Gradient */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full filter blur-[120px] pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 relative z-10">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2 font-display font-extrabold text-2xl text-white tracking-tight">
              <span className="w-3 h-3 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50" />
              <span>Amritsari Food Court</span>
            </Link>

            <p className="text-white/60 text-sm leading-relaxed max-w-sm">
              Serving authentic Amritsari kulchas, slow-cooked dal makhani & rich Punjabi delicacies in Delhi since 2018. Crafted with 100% pure desi ghee.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <div className="flex items-center gap-1 bg-amber-500/15 border border-amber-500/30 px-3 py-1.5 rounded-full">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span className="font-extrabold text-amber-400 text-sm">4.39</span>
              </div>
              <span className="text-white/50 text-xs font-semibold">2,847+ Verified Google Reviews</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="font-display font-bold text-white text-sm uppercase tracking-wider">Quick Navigation</h3>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-amber-400 text-xs uppercase tracking-wider font-bold transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <ArrowRight className="w-3 h-3 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Location & Hours */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="font-display font-bold text-white text-sm uppercase tracking-wider">Visit & Contact</h3>
            <div className="space-y-3 text-white/60 text-xs leading-relaxed">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">L Block Red Light</p>
                  <p>Vasant Kunj Rd, Mahipalpur, New Delhi 110037</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <div>
                  <p className="font-bold text-white">Daily: 11:00 AM – 11:00 PM</p>
                  <p className="text-white/40">Last Order 10:30 PM</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <PhoneCall className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="tel:+919999999999" className="hover:text-amber-400 transition-colors font-bold text-white">
                  +91-9999999999
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-white/40 text-xs relative z-10">
          <p>© {new Date().getFullYear()} Amritsari Food Court. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Crafted by</span>
            <a href="https://ragspro.com" target="_blank" rel="noopener noreferrer" className="font-bold text-amber-400 hover:underline">
              RAGSPRO
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}