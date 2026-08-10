'use client'

import dynamic from 'next/dynamic'
import { Heart, Award, Truck, Users, UtensilsCrossed, Sparkles } from 'lucide-react'

const TextReveal = dynamic(() => import('@/components/TextReveal'), { ssr: false })
const ScrollReveal = dynamic(() => import('@/components/ScrollReveal'), { ssr: false })
const Counter = dynamic(() => import('@/components/Counter'), { ssr: false })
const MagneticButton = dynamic(() => import('@/components/MagneticButton'), { ssr: false })
const GradientOrb = dynamic(() => import('@/components/GradientOrb'), { ssr: false })

const values = [
  { icon: Heart, title: 'Authenticity First', desc: 'Every recipe passed down through generations, unchanged and uncompromised' },
  { icon: Award, title: 'Quality Ingredients', desc: 'Fresh produce sourced daily, spices ground in-house, no pre-made bases' },
  { icon: Truck, title: 'Fresh Daily', desc: 'Everything made fresh each morning — dough, curries, chutneys, pickles' },
  { icon: Users, title: 'Family Hospitality', desc: "Treating every guest like family, because that's the Punjabi way" },
  { icon: UtensilsCrossed, title: 'Generational Recipes', desc: 'Secret family recipes from Amritsar, perfected over decades' },
  { icon: Sparkles, title: 'Consistency', desc: "Same great taste every visit — that's our promise to you" },
]

const timeline = [
  { year: '2018', title: 'The Beginning', desc: 'Opened doors in Mahipalpur with 5 dishes and a dream to bring real Amritsari taste to Delhi' },
  { year: '2019', title: 'First 1000 Customers', desc: 'Word spread fast. The kulcha line wrapped around the block. 4.2★ on Google.' },
  { year: '2020', title: 'Pandemic Resilience', desc: 'Stayed open for takeaway, fed frontline workers. Community supported us back.' },
  { year: '2021', title: 'Menu Expansion', desc: 'Added tandoori specials, biryanis, and desserts. Team grew to 15.' },
  { year: '2022', title: '4.39★ Milestone', desc: 'Hit 2,500+ reviews. Recognized as Top Punjabi Restaurant in Delhi NCR.' },
  { year: '2023', title: 'New Kitchen', desc: 'Upgraded to commercial tandoors. Capacity doubled. Quality unchanged.' },
  { year: '2024', title: 'Today & Beyond', desc: "2,800+ reviews. Same recipes. Same passion. Serving Delhi's favorite Punjabi food." },
]

const stats = [
  { value: 2018, label: 'Established' },
  { value: 2847, suffix: '+', label: 'Google Reviews' },
  { value: 4.39, suffix: '★', label: 'Rating' },
  { value: 50, suffix: '+', label: 'Menu Items' },
  { value: 15, suffix: '+', label: 'Team Members' },
  { value: 6, suffix: '+', label: 'Years Serving' },
]

export default function AboutClient() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <GradientOrb color="rgba(230, 163, 46, 0.1)" size={600} className="top-1/4 left-1/4" delay={0} />
        <GradientOrb color="rgba(230, 163, 46, 0.08)" size={400} className="bottom-1/4 right-1/4" delay={2} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <TextReveal as="span" className="text-sm font-medium tracking-widest uppercase text-amber-500 mb-4 block" delay={0}>
            Our Journey
          </TextReveal>
          <TextReveal as="h1" className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold leading-[1.02] mb-6" delay={0.1}>
            Serving <span className="gradient-text">Since 2018</span>
          </TextReveal>
          <TextReveal as="p" className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto" delay={0.2}>
            From a small kitchen in Mahipalpur to Delhi&apos;s most loved Punjabi restaurant — this is our story
          </TextReveal>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-black/50 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.08} className="text-center">
                <Counter to={stat.value} suffix={stat.suffix || ''} className="text-4xl md:text-5xl font-display font-extrabold text-white" duration={2} />
                <p className="text-white/60 mt-2 font-medium">{stat.label}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 lg:py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <TextReveal as="span" className="text-sm font-medium tracking-widest uppercase text-amber-500 mb-4 block" delay={0}>
                Our Philosophy
              </TextReveal>
              <TextReveal as="h2" className="text-4xl md:text-5xl font-display font-bold leading-tight mb-6" delay={0.1}>
                <span className="gradient-text">Authenticity</span> Over Everything
              </TextReveal>
              <TextReveal as="p" className="text-lg text-white/60 leading-relaxed mb-6" delay={0.2}>
                In 2018, we noticed something missing in Delhi&apos;s food scene — real Amritsari food. Not the watered-down versions, but the genuine article: kulchas stuffed by hand, chole simmered for hours, lassi churned the traditional way.
              </TextReveal>
              <TextReveal as="p" className="text-white/50 leading-relaxed mb-6" delay={0.3}>
                We started with my grandmother&apos;s recipes, a second-hand tandoor, and zero marketing budget. Six years later, 2,800+ customers have rated us 4.39 stars. But we still make everything fresh every morning. We still hand-stuff every kulcha. We still grind our own spices.
              </TextReveal>
              <TextReveal as="p" className="text-white/50 leading-relaxed mb-8" delay={0.4}>
                Because authenticity isn&apos;t a marketing angle. It&apos;s the only way we know how to cook.
              </TextReveal>
            </div>
            <div className="relative aspect-square">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-amber-900/20 rounded-[20px]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-9xl opacity-20">🫓</span>
              </div>
              <div className="absolute bottom-6 left-6 right-6 p-4 glass-card">
                <p className="text-white/80 text-center">&quot;Best Amritsari food outside Amritsar&quot;</p>
                <p className="text-amber-500 text-center text-sm font-medium mt-1">— Google Reviews</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <TextReveal as="span" className="text-sm font-medium tracking-widest uppercase text-amber-500 mb-4 block" delay={0}>
              Our Values
            </TextReveal>
            <TextReveal as="h2" className="text-4xl md:text-5xl font-display font-bold leading-tight" delay={0.1}>
              What <span className="gradient-text">Guides Us</span>
            </TextReveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <ScrollReveal key={value.title} delay={i * 0.08} className="glass-card p-6 hover:border-amber-500/30 hover:shadow-glow transition-all duration-300">
                <value.icon className="w-8 h-8 text-amber-500 mb-4" aria-hidden="true" />
                <h3 className="font-semibold text-white text-lg mb-2">{value.title}</h3>
                <p className="text-white/50">{value.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 lg:py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <TextReveal as="span" className="text-sm font-medium tracking-widest uppercase text-amber-500 mb-4 block" delay={0}>
              Our Journey
            </TextReveal>
            <TextReveal as="h2" className="text-4xl md:text-5xl font-display font-bold leading-tight" delay={0.1}>
              From <span className="gradient-text">Then to Now</span>
            </TextReveal>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-500/30 via-transparent to-amber-500/30" />
            {timeline.map((item, i) => (
              <ScrollReveal key={item.year} delay={i * 0.08} className="relative pl-20 pb-12 last:pb-0">
                <div className="absolute left-0 top-2 w-16 h-16 rounded-full bg-black border-2 border-amber-500 flex items-center justify-center z-10">
                  <span className="font-display font-bold text-amber-500 text-lg">{item.year}</span>
                </div>
                <div className="glass-card p-6 ml-4">
                  <h3 className="font-semibold text-white text-lg mb-2">{item.title}</h3>
                  <p className="text-white/60">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <GradientOrb color="rgba(230, 163, 46, 0.12)" size={600} className="top-1/2 left-1/2" delay={0} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="glass-card p-12 lg:p-20 rounded-[20px]">
            <TextReveal as="h2" className="text-4xl md:text-5xl font-display font-bold leading-tight mb-6" delay={0}>
              Want to <span className="gradient-text">Taste the Story?</span>
            </TextReveal>
            <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10">
              Every dish has a history. Come write the next chapter with us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton className="bg-amber-500 text-black px-10 py-5 font-semibold rounded-[12px] text-lg" href="/menu">
                View Menu
              </MagneticButton>
              <MagneticButton className="border border-white/20 text-white px-10 py-5 font-semibold rounded-[12px] text-lg hover:border-amber-500 hover:text-amber-500" href="/contact">
                Visit Us
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}