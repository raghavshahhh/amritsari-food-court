import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Amritsari Food Court se contact karo — Mahipalpur, Delhi. Call, visit, ya directions lein.",
};

const contactInfo = [
  {
    emoji: "📍",
    title: "Address",
    lines: [
      "L Block, Red Light, Main,",
      "Vasant Kunj Rd, Mahipalpur,",
      "Delhi 110037",
    ],
    action: {
      label: "Open in Google Maps",
      href: "https://maps.google.com/?q=Amritsari+Food+Court+Mahipalpur+Delhi",
    },
  },
  {
    emoji: "📞",
    title: "Phone",
    lines: ["+91-XXXXXXXXXX", "(Call for orders & reservations)"],
    action: {
      label: "Call Now",
      href: "tel:+91XXXXXXXXXX",
    },
  },
  {
    emoji: "🕐",
    title: "Timings",
    lines: ["Open Daily: 11:00 AM – 11:00 PM", "All 7 days a week"],
    action: null,
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brown py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-6xl mb-4 block">📞</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white font-[family-name:var(--font-heading)] mb-4">
            Contact Us
          </h1>
          <p className="text-cream/70 text-lg max-w-xl mx-auto">
            Visit karo, call karo, ya message karo. Hum hamesha available hain aapke liye.
          </p>
        </div>
      </section>

      {/* Contact Cards + Map */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Info Cards */}
            <div className="space-y-6">
              {contactInfo.map((c) => (
                <div
                  key={c.title}
                  className="bg-white rounded-2xl p-6 shadow-md border border-saffron/5 hover:border-saffron/20 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-3xl mt-1">{c.emoji}</span>
                    <div className="flex-1">
                      <h3 className="font-bold text-brown text-lg mb-2 font-[family-name:var(--font-heading)]">
                        {c.title}
                      </h3>
                      <div className="space-y-1">
                        {c.lines.map((line) => (
                          <p key={line} className="text-brown/60 text-sm">{line}</p>
                        ))}
                      </div>
                      {c.action && (
                        <a
                          href={c.action.href}
                          target={c.action.href.startsWith("http") ? "_blank" : undefined}
                          rel={c.action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="inline-block mt-3 bg-saffron hover:bg-saffron-dark text-white px-5 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105"
                        >
                          {c.action.label}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Google Review */}
              <div className="bg-white rounded-2xl p-6 shadow-md border border-saffron/5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">⭐</span>
                  <h3 className="font-bold text-brown text-lg font-[family-name:var(--font-heading)]">
                    Google Reviews
                  </h3>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4].map((i) => (
                      <span key={i} className="text-gold text-xl">★</span>
                    ))}
                    <span className="text-gold/40 text-xl">★</span>
                  </div>
                  <span className="text-2xl font-bold text-brown">4.39</span>
                </div>
                <p className="text-sm text-brown/50 mb-3">
                  500+ reviews on Google
                </p>
                <a
                  href="https://share.google/UpbJggUjy9lqkMt2s"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-saffron/10 hover:bg-saffron text-saffron hover:text-white px-5 py-2 rounded-lg text-sm font-semibold transition-all"
                >
                  Write a Review on Google →
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="space-y-6">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-saffron/10 h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.5!2d77.0922!3d28.5494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sAmritsari+Food+Court+Mahipalpur!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Amritsari Food Court Location"
                />
              </div>

              {/* Directions Card */}
              <div className="bg-gradient-to-br from-saffron to-saffron-dark rounded-2xl p-6 text-white">
                <h3 className="font-bold text-xl mb-2 font-[family-name:var(--font-heading)]">
                  Directions Lein 📍
                </h3>
                <p className="text-white/80 text-sm mb-4">
                  Mahipalpur, Vasant Kunj Road par. Metro se auto le sakte hain.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span>🚇</span>
                    <span>Nearest Metro: R.K. Puram / Vasant Kunj</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🚌</span>
                    <span>Bus Route: 764, 534</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🚗</span>
                    <span>Parking available near the food court</span>
                  </div>
                </div>
                <a
                  href="https://maps.google.com/?q=Amritsari+Food+Court+Mahipalpur+Delhi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 bg-white text-saffron hover:bg-cream px-6 py-3 rounded-full font-bold transition-all hover:scale-105"
                >
                  📍 Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-brown text-center mb-10 font-[family-name:var(--font-heading)]">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Kya home delivery available hai?",
                a: "Filhal home delivery nahi hai. Aap visit karke order le sakte hain ya call karke parcel karwa sakte hain.",
              },
              {
                q: "Kya vegetarian options available hain?",
                a: "Haan! Humare paas bahut saare vegetarian options hain — Kulcha, Paneer Tikka, Dal Makhani, Rajma, aur bahut kuch.",
              },
              {
                q: "Kya booking available hai?",
                a: "Groups ke liye booking available hai. Call karein advance mein.",
              },
              {
                q: "Kya parking available hai?",
                a: "Haan, food court ke paas parking available hai.",
              },
            ].map((faq) => (
              <div
                key={faq.q}
                className="bg-cream rounded-xl p-5 border border-saffron/5"
              >
                <h3 className="font-semibold text-brown mb-2">{faq.q}</h3>
                <p className="text-sm text-brown/60">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-saffron to-saffron-dark px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4 font-[family-name:var(--font-heading)]">
            Ready to Taste Punjab? 🤤
          </h2>
          <p className="text-white/80 mb-8">
            Abhi call karo ya visit karo — Delhi ki best Amritsari food aapka intezaar kar rahi hai!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+91XXXXXXXXXX"
              className="bg-white text-saffron hover:bg-cream px-8 py-4 rounded-full text-lg font-bold transition-all hover:scale-105 shadow-lg"
            >
              📞 Call Now
            </a>
            <a
              href="https://maps.google.com/?q=Amritsari+Food+Court+Mahipalpur+Delhi"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105"
            >
              📍 Visit Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
