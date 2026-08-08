import Link from "next/link";
import AnimateOnScroll from "@/components/AnimateOnScroll";

const menuHighlights = [
  {
    name: "Amritsari Kulcha",
    price: "₹80",
    emoji: "🫓",
    desc: "Crispy stuffed kulcha with spicy chole",
    tag: "Bestseller",
  },
  {
    name: "Chole Bhature",
    price: "₹100",
    emoji: "🍛",
    desc: "Fluffy bhature with rich chole curry",
    tag: "Popular",
  },
  {
    name: "Tandoori Momos",
    price: "₹120",
    emoji: "🥟",
    desc: "Smoky tandoori momos with spicy chutney",
    tag: "Must Try",
  },
  {
    name: "Amritsari Lassi",
    price: "₹60",
    emoji: "🥛",
    desc: "Thick creamy lassi with makhan malai",
    tag: "Classic",
  },
  {
    name: "Paneer Tikka",
    price: "₹150",
    emoji: "🧀",
    desc: "Chargrilled paneer with mint chutney",
    tag: "Vegetarian",
  },
  {
    name: "Fish Amritsari",
    price: "₹180",
    emoji: "🐟",
    desc: "Crispy fried fish with tangy masala",
    tag: "Signature",
  },
];

const stats = [
  { num: "4.39", label: "Google Rating", icon: "⭐" },
  { num: "500+", label: "Happy Customers", icon: "😊" },
  { num: "50+", label: "Menu Items", icon: "🍽️" },
  { num: "12hrs", label: "Open Daily", icon: "🕐" },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-brown via-brown-light to-saffron/30" />
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
        }} />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="animate-float mb-6">
            <span className="text-7xl md:text-8xl">🍛</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white font-[family-name:var(--font-heading)] leading-tight mb-4">
            Taste the{" "}
            <span className="text-saffron">Real Punjab</span>
            <br />
            in Delhi
          </h1>

          <p className="text-lg md:text-xl text-cream/80 max-w-2xl mx-auto mb-8 leading-relaxed">
            Amritsari Kulcha, Chole Bhature, Tandoori Momos — sab kuch ek jagah.
            Delhi ki sabse authentic Amritsari taste, Mahipalpur mein.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/menu"
              className="bg-saffron hover:bg-saffron-dark text-white px-8 py-4 rounded-full text-lg font-bold transition-all hover:scale-105 shadow-lg hover:shadow-xl animate-pulse-glow"
            >
              🍽️ View Full Menu
            </Link>
            <a
              href="https://maps.google.com/?q=Amritsari+Food+Court+Mahipalpur+Delhi"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105"
            >
              📍 Get Directions
            </a>
          </div>

          {/* Rating Badge */}
          <div className="mt-10 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2">
            <div className="flex">
              {[1, 2, 3, 4].map((i) => (
                <span key={i} className="text-gold text-lg">★</span>
              ))}
              <span className="text-gold/50 text-lg">★</span>
            </div>
            <span className="text-white font-semibold">4.39</span>
            <span className="text-cream/60">on Google Reviews</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-saffron/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <AnimateOnScroll key={stat.label} delay={i * 100}>
                <div className="text-center p-4 rounded-2xl bg-cream/50 hover:bg-cream transition-colors">
                  <span className="text-3xl mb-2 block">{stat.icon}</span>
                  <div className="text-3xl md:text-4xl font-extrabold text-saffron font-[family-name:var(--font-heading)]">
                    {stat.num}
                  </div>
                  <div className="text-sm text-brown/60 mt-1">{stat.label}</div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimateOnScroll>
              <div>
              <span className="text-saffron font-semibold text-sm uppercase tracking-wider">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-brown mt-2 mb-6 font-[family-name:var(--font-heading)]">
                Punjab Se Delhi Tak, Asli Swad
              </h2>
              <p className="text-brown/70 leading-relaxed mb-4">
                Humara food court Amritsari flavors ko Delhi tak laya hai. Har dish mein Punjab ki mitti ki khushboo hai —
                wohi asli makhan, wohi tandoor ki garmi, aur wohi zayka jo Amritsar ke galiyon mein milta hai.
              </p>
              <p className="text-brown/70 leading-relaxed mb-6">
                From our signature Kulcha to the smoky Tandoori Momos — every bite tells a story of tradition, love, and authentic Punjabi spices.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-saffron hover:text-saffron-dark font-semibold transition-colors group"
              >
                Read Our Full Story
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
            </AnimateOnScroll>

            {/* Food Emoji Grid */}
            <AnimateOnScroll delay={200}>
              <div className="grid grid-cols-3 gap-4">
              {["🫓", "🍛", "🥟", "🥛", "🧀", "🐟", "🌶️", "🍵", "🥘"].map((emoji, i) => (
                <div
                  key={i}
                  className="aspect-square bg-white rounded-2xl shadow-md flex items-center justify-center text-4xl hover:shadow-lg hover:scale-105 transition-all cursor-default"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {emoji}
                </div>
              ))}
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Menu Highlights */}
      <section className="py-20 bg-brown">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-saffron font-semibold text-sm uppercase tracking-wider">Our Best Dishes</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2 font-[family-name:var(--font-heading)]">
              Menu Se highlights
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuHighlights.map((item, i) => (
              <AnimateOnScroll key={item.name} delay={i * 100}>
                <div className="bg-brown-light/80 backdrop-blur-sm rounded-2xl p-6 border border-saffron/10 hover:border-saffron/30 transition-all hover:scale-[1.02] group">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-4xl group-hover:scale-110 transition-transform">{item.emoji}</span>
                    <span className="bg-saffron/20 text-saffron text-xs font-bold px-2 py-1 rounded-full">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{item.name}</h3>
                  <p className="text-cream/50 text-sm mb-3">{item.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-saffron font-bold text-xl">{item.price}</span>
                    <span className="text-xs text-cream/30">Incl. all taxes</span>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 bg-saffron hover:bg-saffron-dark text-white px-8 py-3 rounded-full font-semibold transition-all hover:scale-105"
            >
              🍽️ View Complete Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-saffron font-semibold text-sm uppercase tracking-wider">Find Us</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-brown mt-2 font-[family-name:var(--font-heading)]">
              Humse Milein
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Map Embed */}
            <AnimateOnScroll>
              <div className="rounded-2xl overflow-hidden shadow-lg border border-saffron/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.5!2d77.0922!3d28.5494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sAmritsari+Food+Court+Mahipalpur!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Amritsari Food Court Location"
              />
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={200}>
              <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-md border border-saffron/10">
                <h3 className="font-bold text-brown text-lg mb-4 font-[family-name:var(--font-heading)]">📍 Address</h3>
                <p className="text-brown/70 text-sm leading-relaxed">
                  L Block, Red Light, Main,<br />
                  Vasant Kunj Rd, Mahipalpur,<br />
                  Delhi 110037
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-md border border-saffron/10">
                <h3 className="font-bold text-brown text-lg mb-4 font-[family-name:var(--font-heading)]">🕐 Timings</h3>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-green rounded-full animate-pulse" />
                  <span className="text-sm font-semibold text-green">Open Now</span>
                </div>
                <p className="text-brown/70 text-sm mt-1">Open daily: 11:00 AM – 11:00 PM</p>
              </div>

              <a
                href="https://maps.google.com/?q=Amritsari+Food+Court+Mahipalpur+Delhi"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-saffron hover:bg-saffron-dark text-white text-center py-4 rounded-2xl font-bold transition-all hover:scale-[1.02] shadow-lg"
              >
                📍 Open in Google Maps
              </a>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-saffron to-saffron-dark">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 font-[family-name:var(--font-heading)]">
            Bhookh Lagi Hai? 🤤
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Abhi call karo ya visit karo. Authentic Amritsari taste sirf ek call door!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+91XXXXXXXXXX"
              className="bg-white text-saffron hover:bg-cream px-8 py-4 rounded-full text-lg font-bold transition-all hover:scale-105 shadow-lg"
            >
              📞 Call to Order
            </a>
            <a
              href="https://maps.google.com/?q=Amritsari+Food+Court+Mahipalpur+Delhi"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105"
            >
              📍 Visit Us Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
