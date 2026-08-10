'use client'

import { MapPin, Clock, Star, Phone, ExternalLink } from 'lucide-react'
import dynamic from 'next/dynamic'

const TextReveal = dynamic(() => import('@/components/TextReveal'), { ssr: false })
const ScrollReveal = dynamic(() => import('@/components/ScrollReveal'), { ssr: false })
const GradientOrb = dynamic(() => import('@/components/GradientOrb'), { ssr: false })
const MagneticButton = dynamic(() => import('@/components/MagneticButton'), { ssr: false })

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
    lines: ['+91-XXXXXXXXXX', 'Call for orders & reservations'],
    action: { label: 'Call Now', href: 'tel:+91XXXXXXXXXX' },
  },
  {
    icon: Star,
    title: 'Rating',
    lines: ['4.39★ on Google', '2,847+ reviews'],
    action: { label: 'Read Reviews', href: 'https://share.google/UpbJggUjy9lqkMt2s' },
  },
]

export default function ContactClient() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <GradientOrb color="rgba(230, 163, 46, 0.12)" size={600} className="top-1/4 left-1/4" delay={0} />
        <GradientOrb color="rgba(230, 163, 46, 0.08)" size={400} className="bottom-1/4 right-1/4" delay={2} />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <TextReveal as="span" className="text-sm font-medium tracking-widest uppercase text-amber-500 mb-4 block" delay={0}>
              Get In Touch
            </TextReveal>
            <TextReveal as="h1" className="text-4xl md:text-6xl font-display font-bold leading-tight mb-6" delay={0.1}>
              Visit <span className="gradient-text">Amritsari Food Court</span>
            </TextReveal>
            <TextReveal as="p" className="text-lg text-white/60 leading-relaxed mb-12" delay={0.2}>
              Join us in Mahipalpur for authentic Punjabi flavors. Dine in, take away, or plan your visit. We serve daily 11 AM – 11 PM.
            </TextReveal>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6">
            {contactInfo.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1} className="glass-card p-8">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/20 flex items-center justify-center shrink-0">
                    <item.icon className="w-7 h-7 text-amber-500" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-display font-semibold text-white text-xl mb-2">{item.title}</h2>
                    {item.lines.map((line, j) => (
                      <p key={j} className="text-white/60">{line}</p>
                    ))}
                    {item.action && (
                      <a
                        href={item.action.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 font-medium mt-4 transition-colors"
                      >
                        {item.action.label} <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal className="relative aspect-[16/9] md:aspect-[21/9] rounded-[20px] overflow-hidden glass-card">
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
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <GradientOrb color="rgba(230, 163, 46, 0.1)" size={500} className="top-1/2 left-1/2" delay={0} />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <div className="glass-card p-12 rounded-[20px]">
            <TextReveal as="h2" className="text-3xl md:text-4xl font-display font-bold mb-4" delay={0}>
              Ready to <span className="gradient-text">Order?</span>
            </TextReveal>
            <p className="text-white/60 mb-8">
              Call us or visit directly. Walk-ins welcome!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton className="bg-amber-500 text-black px-8 py-4 font-semibold rounded-[12px] text-lg" href="tel:+91XXXXXXXXXX">
                Call to Order
              </MagneticButton>
              <MagneticButton className="border border-white/20 text-white px-8 py-4 font-semibold rounded-[12px] text-lg hover:border-amber-500 hover:text-amber-500" href="https://maps.google.com/?q=Amritsari+Food+Court+Mahipalpur">
                Get Directions
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
