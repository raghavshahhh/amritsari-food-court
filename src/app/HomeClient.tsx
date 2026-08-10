'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { MapPin, Clock, Star, Users, Award, UtensilsCrossed, Heart, Play, Flame, Sparkles, ExternalLink, ShieldCheck, ChevronRight } from 'lucide-react'
import dynamic from 'next/dynamic'
import FoodReelsModal, { REELS_DATA } from '@/components/FoodReelsModal'
import { MENU_ITEMS } from '@/app/menu/MenuClient'
import { useCart } from '@/context/CartContext'

const TextReveal = dynamic(() => import('@/components/TextReveal'), { ssr: false })
const ScrollReveal = dynamic(() => import('@/components/ScrollReveal'), { ssr: false })
const Counter = dynamic(() => import('@/components/Counter'), { ssr: false })
const GradientOrb = dynamic(() => import('@/components/GradientOrb'), { ssr: false })
const Marquee = dynamic(() => import('@/components/Marquee'), { ssr: false })

const stats = [
  { value: 4.39, suffix: '★', label: 'Google Rating', icon: Star },
  { value: 2847, suffix: '+', label: 'Happy Diners', icon: Users },
  { value: 2018, suffix: '', label: 'Established', icon: Award },
  { value: 50, suffix: '+', label: 'Fresh Dishes', icon: UtensilsCrossed },
]

const features = [
  { icon: Heart, title: 'Generational Secret Recipes', desc: 'Authentic Amritsari spices & slow-cooked clay tandoor cooking' },
  { icon: ShieldCheck, title: '100% Pure Desi Ghee', desc: 'No cheap oils, zero shortcuts — pure taste in every bite' },
  { icon: Award, title: '4.39★ Rated on Google', desc: 'Over 2,800+ verified customer reviews in Delhi NCR' },
  { icon: Users, title: 'Authentic Punjabi Hospitality', desc: 'Generous portions & warm family environment in Mahipalpur' },
]

export default function HomeClient() {
  const [isReelOpen, setIsReelOpen] = useState(false)
  const [activeReelId, setActiveReelId] = useState('kulcha')
  const { openAddToCartModal } = useCart()

  const openReel = (id: string) => {
    setActiveReelId(id)
    setIsReelOpen(true)
  }

  const handleQuickAdd = (dishName: string) => {
    const found = MENU_ITEMS.find((m) => m.name.toLowerCase().includes(dishName.toLowerCase()))
    if (found) {
      openAddToCartModal({ id: found.id, name: found.name, price: found.price, isVeg: found.isVeg, image: found.image, desc: found.desc })
    }
  }

  const featuredDishes = MENU_ITEMS.filter((m) => m.popular)

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-12 pb-20">
        {/* Glow Orbs */}
        <GradientOrb color="rgba(255, 123, 0, 0.18)" size={700} className="top-10 left-1/4" delay={0} />
        <GradientOrb color="rgba(255, 174, 0, 0.12)" size={500} className="bottom-10 right-1/4" delay={2} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Gen-Z Copy & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-amber-500/30 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-widest text-amber-400">
                Live in Mahipalpur, Delhi · Open Daily 11 AM - 11 PM
              </span>
            </div>

            <TextReveal as="h1" className="text-4xl sm:text-6xl lg:text-7xl font-display font-black leading-[1.04] text-white tracking-tight" delay={0.1}>
              Taste the <span className="gradient-text">Real Amritsar</span> in Delhi
            </TextReveal>

            <motion.p
              className="text-base md:text-xl text-white/70 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Butter-drenched crisp Amritsari Kulchas, hot puffed Chole Bhature & velvety Butter Chicken — made with 100% Desi Ghee & 2,800+ 4.39★ reviews.
            </motion.p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/menu"
                className="w-full sm:w-auto py-4 px-8 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-lg flex items-center justify-center gap-2 shadow-2xl shadow-amber-500/30 hover:scale-[1.02] transition-all"
              >
                <Flame className="w-5 h-5 fill-black" /> Explore Full Menu
              </Link>
              <button
                onClick={() => openReel('kulcha')}
                className="w-full sm:w-auto py-4 px-8 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-extrabold text-base flex items-center justify-center gap-3 backdrop-blur-md transition-all hover:border-amber-400"
              >
                <div className="w-8 h-8 rounded-full bg-amber-500 text-black flex items-center justify-center">
                  <Play className="w-4 h-4 fill-black ml-0.5" />
                </div>
                Watch Kitchen Reel
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-white/60 text-xs font-bold uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" /> 4.39★ (2,847+ Reviews)
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-500" /> Mahipalpur Red Light, Delhi
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500" /> 11:00 AM – 11:00 PM
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Card */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/3] rounded-3xl overflow-hidden glass-panel border border-amber-500/30 shadow-2xl group cursor-pointer"
              onClick={() => openReel('kulcha')}
            >
              <Image
                src="/images/hero_kulcha.jpg"
                alt="Amritsari Kulcha Feast"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-[1.05]"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              {/* Play Overlay Badge */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-amber-500/90 text-black flex items-center justify-center shadow-2xl shadow-amber-500/50 group-hover:scale-110 transition-transform">
                  <Play className="w-7 h-7 fill-black ml-1" />
                </div>
              </div>

              {/* Floating Glowing Badge */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/80 backdrop-blur-md border border-white/15 flex items-center justify-between">
                <div>
                  <p className="text-amber-400 font-display font-extrabold text-base">Authentic Amritsari Kulcha</p>
                  <p className="text-white/60 text-xs">Served with spicy chole & melted butter</p>
                </div>
                <span className="px-3 py-1.5 rounded-xl bg-amber-500 text-black font-black text-xs">
                  ₹120
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gen-Z Food Reel Stories Bar */}
      <section className="py-8 bg-black/60 border-y border-white/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h2 className="text-sm font-black uppercase tracking-widest text-amber-400">
              Tap to Watch Live Kitchen Reels
            </h2>
          </div>

          <div className="flex items-center gap-4 overflow-x-auto pb-2 no-scrollbar">
            {REELS_DATA.map((reel) => (
              <button
                key={reel.id}
                onClick={() => openReel(reel.id)}
                className="flex items-center gap-3 p-2 pr-4 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/50 transition-all shrink-0 hover:scale-105"
              >
                <div className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-amber-500">
                  <Image src={reel.image} alt={reel.title} fill className="object-cover" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-white text-xs leading-tight line-clamp-1">{reel.title}</p>
                  <p className="text-amber-400 text-[10px] font-semibold">{reel.tag}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-black/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.1} className="glass-card p-6 text-center">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6" />
                </div>
                <Counter to={stat.value} suffix={stat.suffix} className="text-3xl md:text-4xl font-display font-black text-white" duration={2} />
                <p className="text-white/60 text-xs font-bold uppercase tracking-wider mt-1">{stat.label}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee Ticker */}
      <Marquee items={['Authentic Amritsari Kulcha', '100% Desi Ghee', '4.39★ Google Rated', 'Mahipalpur Delhi', 'Tandoori Starters', 'Kulhad Lassi']} className="py-4 border-y border-white/10 bg-amber-500/10 text-amber-400 font-bold" speed={25} />

      {/* Menu Highlights with High-Res Images */}
      <section className="py-20 lg:py-28 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <TextReveal as="span" className="text-xs font-black tracking-widest uppercase text-amber-500 mb-2 block" delay={0}>
              Bestsellers & Customer Favorites
            </TextReveal>
            <TextReveal as="h2" className="text-3xl md:text-5xl font-display font-black" delay={0.1}>
              Flavors That Keep Delhi Coming Back
            </TextReveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredDishes.map((item, i) => (
              <ScrollReveal key={item.id} delay={i * 0.1} className="glass-card overflow-hidden group flex flex-col justify-between">
                <div>
                  <div className="aspect-[16/10] relative overflow-hidden bg-black">
                    <Image
                      src={item.image || '/images/hero_kulcha.jpg'}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex gap-1">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-amber-500 text-black shadow-md flex items-center gap-1">
                        <Flame className="w-3 h-3 fill-black" /> Popular
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-display font-extrabold text-white text-xl">{item.name}</h3>
                      <span className="text-amber-400 font-display font-black text-xl">₹{item.price}</span>
                    </div>
                    <p className="text-white/60 text-xs leading-relaxed mb-4">{item.desc}</p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex gap-2">
                  <button
                    onClick={() => handleQuickAdd(item.name)}
                    className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                  >
                    + Add to Order
                  </button>
                  <Link
                    href="/menu"
                    className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center"
                  >
                    Details →
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 py-4 px-8 rounded-2xl bg-white/10 hover:bg-amber-500 hover:text-black border border-white/20 text-white font-extrabold text-base transition-all"
            >
              View Complete Menu (50+ Items) <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-black/50 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <ScrollReveal key={feature.title} delay={i * 0.08} className="glass-card p-6">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-white text-base mb-2">{feature.title}</h3>
                <p className="text-white/60 text-xs leading-relaxed">{feature.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Map Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <TextReveal as="span" className="text-xs font-black tracking-widest uppercase text-amber-500 block" delay={0}>
                📍 Visit Us in Delhi
              </TextReveal>
              <TextReveal as="h2" className="text-3xl md:text-5xl font-display font-black text-white" delay={0.1}>
                Drop by for a <span className="gradient-text">Hot Kulcha</span>
              </TextReveal>
              <p className="text-white/70 text-base leading-relaxed">
                Located conveniently at L Block Red Light, Mahipalpur, Vasant Kunj Road. Walk-ins welcome daily from 11 AM to 11 PM.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <MapPin className="w-6 h-6 text-amber-500 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-white text-sm">Location</h4>
                    <p className="text-white/60 text-xs">L Block Red Light, Vasant Kunj Rd, Mahipalpur, New Delhi 110037</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <Clock className="w-6 h-6 text-amber-500 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-white text-sm">Timings</h4>
                    <p className="text-white/60 text-xs">Daily: 11:00 AM – 11:00 PM (Last Order 10:30 PM)</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex gap-4">
                <a
                  href="https://maps.google.com/?q=Amritsari+Food+Court+Mahipalpur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm inline-flex items-center gap-2 shadow-lg shadow-amber-500/20"
                >
                  Get Directions on Maps <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Map Frame */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden glass-card border border-white/15">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.5!2d77.1567!3d28.5254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03e7b5b5b5b5%3A0x123456789abcdef!2sAmritsari%20Food%20Court!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Amritsari Food Court Location"
                className="absolute inset-0"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Food Reel Modal Component */}
      <FoodReelsModal
        isOpen={isReelOpen}
        onClose={() => setIsReelOpen(false)}
        initialReelId={activeReelId}
        onSelectOrder={(dishName) => handleQuickAdd(dishName)}
      />
    </>
  )
}