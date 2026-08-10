'use client'

import { useState } from 'react'
import { MapPin, Clock, Star, Phone, ExternalLink, Send, CheckCircle2 } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useCart } from '@/context/CartContext'

const TextReveal = dynamic(() => import('@/components/TextReveal'), { ssr: false })
const ScrollReveal = dynamic(() => import('@/components/ScrollReveal'), { ssr: false })
const GradientOrb = dynamic(() => import('@/components/GradientOrb'), { ssr: false })

const contactInfo = [
  {
    icon: MapPin,
    title: 'Address',
    lines: ['L Block Red Light, Vasant Kunj Rd', 'Mahipalpur, New Delhi 110037'],
    action: { label: 'Get Directions', href: 'https://maps.google.com/?q=Amritsari+Food+Court+Mahipalpur' },
  },
  {
    icon: Clock,
    title: 'Timings',
    lines: ['Daily: 11:00 AM – 11:00 PM', 'Last order at 10:30 PM'],
    action: null,
  },
  {
    icon: Phone,
    title: 'Phone',
    lines: ['+91-9999999999', 'Call for orders & reservations'],
    action: { label: 'Call Now', href: 'tel:+919999999999' },
  },
  {
    icon: Star,
    title: 'Rating',
    lines: ['4.39★ on Google', '2,847+ verified reviews'],
    action: { label: 'Read Reviews', href: 'https://share.google/UpbJggUjy9lqkMt2s' },
  },
]

export default function ContactClient() {
  const { showToast } = useCart()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [guests, setGuests] = useState('2 Guests')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, guests, message }),
      })
      const data = await res.json()
      if (data.success) {
        setIsSuccess(true)
        showToast('Table reservation / inquiry submitted!')
        setName('')
        setEmail('')
        setPhone('')
        setMessage('')
      } else {
        showToast(data.error || 'Failed to submit inquiry', 'error')
      }
    } catch {
      showToast('Error submitting form', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <GradientOrb color="rgba(230, 163, 46, 0.12)" size={600} className="top-1/4 left-1/4" delay={0} />
        <GradientOrb color="rgba(230, 163, 46, 0.08)" size={400} className="bottom-1/4 right-1/4" delay={2} />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <TextReveal as="span" className="text-xs font-black tracking-widest uppercase text-amber-500 mb-3 block" delay={0}>
              Get In Touch
            </TextReveal>
            <TextReveal as="h1" className="text-4xl md:text-6xl font-display font-extrabold leading-tight mb-4" delay={0.1}>
              Visit <span className="gradient-text">Amritsari Food Court</span>
            </TextReveal>
            <TextReveal as="p" className="text-base text-white/70 leading-relaxed mb-10 max-w-xl mx-auto" delay={0.2}>
              Join us in Mahipalpur for authentic Punjabi flavors. Dine in, take away, or reserve a table. We serve daily 11 AM – 11 PM.
            </TextReveal>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-12 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1} className="glass-card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-white text-base mb-1">{item.title}</h3>
                    {item.lines.map((line, j) => (
                      <p key={j} className="text-white/60 text-xs">
                        {line}
                      </p>
                    ))}
                    {item.action && (
                      <a
                        href={item.action.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-amber-400 hover:underline font-bold text-xs mt-3 transition-colors"
                      >
                        {item.action.label} <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Reservation & Form Section */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Info */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-black uppercase tracking-widest text-amber-500 block">
                Table Reservations
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white">
                Reserve Your Dining Experience
              </h2>
              <p className="text-white/70 text-sm leading-relaxed">
                Planning a family gathering or celebration? Book your table in advance and enjoy fresh hot kulchas with zero wait time.
              </p>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <p className="text-xs font-bold text-amber-400">Direct Reservation Hotline</p>
                <p className="text-white text-lg font-display font-black">+91 99999 99999</p>
                <p className="text-white/40 text-[11px]">Daily 11:00 AM – 10:30 PM</p>
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:col-span-7">
              <div className="glass-card border border-white/15 p-8 rounded-3xl space-y-6 relative overflow-hidden">
                <div className="space-y-1">
                  <h3 className="text-xl font-display font-extrabold text-white">Send Us a Message</h3>
                  <p className="text-white/60 text-xs">Fill out the form below for table bookings or catering inquiries.</p>
                </div>

                {isSuccess && (
                  <div className="p-4 rounded-2xl bg-emerald-950/90 border border-emerald-500/40 text-emerald-400 text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span>Inquiry sent successfully! Our team will contact you shortly.</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/50">Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Rahul Sharma"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/50">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/50">Email Address</label>
                      <input
                        type="email"
                        placeholder="rahul@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/50">Number of Guests</label>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="w-full bg-neutral-900 border border-white/15 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500"
                      >
                        <option value="1 Guest">1 Guest</option>
                        <option value="2 Guests">2 Guests</option>
                        <option value="4 Guests">4 Guests</option>
                        <option value="6+ Guests">6+ Guests (Party)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/50">Message / Special Requests *</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Special dietary needs, preferred seating, or event inquiry..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20"
                  >
                    <span>{isSubmitting ? 'Sending Request...' : 'Submit Reservation Request'}</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-[24px] overflow-hidden glass-card border border-white/15">
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
      </section>
    </>
  )
}
