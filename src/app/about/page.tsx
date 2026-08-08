import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Amritsari Food Court ki kahani — Delhi mein authentic Punjabi food ka safar. Humari journey, humari values.",
};

const values = [
  {
    emoji: "🔥",
    title: "Asli Tandoor",
    desc: "Humara tandoor hamesha garam rehta hai. Har dish fresh aur tandoor-seedha aapki plate tak.",
  },
  {
    emoji: "🌶️",
    title: "Real Masale",
    desc: "Hum sirf original Amritsari masale use karte hain. Koi compromise nahi.",
  },
  {
    emoji: "💛",
    title: "Pyaar Se Pakana",
    desc: "Har dish mein Punjab ka pyaar hai. Humara khana aapko ghar jaisa feel karayega.",
  },
  {
    emoji: "💰",
    title: "Honest Prices",
    desc: "Authentic taste, honest prices. Koi hidden charges nahi.",
  },
];

const timeline = [
  { year: "2018", title: "Shuruaat", desc: "Chhote se stall se shuru hua safar. Sirf kulcha aur chole se." },
  { year: "2020", title: "Food Court", desc: "Mahipalpur mein apna food court open kiya." },
  { year: "2022", title: "4.39 Rating", desc: "Google par 4.39 rating achieve ki — customers ka pyaar." },
  { year: "2025", title: "Growing", desc: "50+ menu items, 500+ happy customers daily." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brown py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-6xl mb-4 block">🍛</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white font-[family-name:var(--font-heading)] mb-4">
            Humari Kahani
          </h1>
          <p className="text-cream/70 text-lg max-w-xl mx-auto">
            Ek chhote se stall se lekar Delhi ke favourite food court tak — yeh hai humari journey.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-brown mb-6 font-[family-name:var(--font-heading)]">
                Punjab Se Delhi Tak
              </h2>
              <p className="text-brown/70 leading-relaxed mb-4">
                2018 mein humne ek chhote se stall se shuru kiya — sirf kulcha aur chole ke saath.
                Humne socha tha ki Delhi walon ko bhi wohi asli Amritsari taste milna chahiye jo
                Amritsar ki galiyon mein milta hai.
              </p>
              <p className="text-brown/70 leading-relaxed mb-4">
                Aaj humara food court Mahipalpur mein hai, jahan 50+ dishes serve hoti hain daily.
                4.39 Google rating — yeh humari mehnat aur aapke pyaar ka result hai.
              </p>
              <p className="text-brown/70 leading-relaxed">
                Humara mission simple hai: <strong className="text-saffron">authentic Punjabi taste, honest prices, aur customer satisfaction</strong>.
                Yeh woh values hain jo humare food court ki jaan hain.
              </p>
            </div>

            {/* Emoji grid for story */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-saffron/10 rounded-2xl p-8 text-center">
                <span className="text-5xl block mb-3">🫓</span>
                <p className="font-semibold text-brown">Since 2018</p>
                <p className="text-sm text-brown/50">Serving Delhi</p>
              </div>
              <div className="bg-saffron/10 rounded-2xl p-8 text-center">
                <span className="text-5xl block mb-3">⭐</span>
                <p className="font-semibold text-brown">4.39 Rating</p>
                <p className="text-sm text-brown/50">Google Reviews</p>
              </div>
              <div className="bg-saffron/10 rounded-2xl p-8 text-center">
                <span className="text-5xl block mb-3">🍽️</span>
                <p className="font-semibold text-brown">50+ Dishes</p>
                <p className="text-sm text-brown/50">On Our Menu</p>
              </div>
              <div className="bg-saffron/10 rounded-2xl p-8 text-center">
                <span className="text-5xl block mb-3">😊</span>
                <p className="font-semibold text-brown">500+</p>
                <p className="text-sm text-brown/50">Happy Customers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-brown text-center mb-12 font-[family-name:var(--font-heading)]">
            Humari Values
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="text-center p-6 rounded-2xl bg-cream hover:bg-saffron/10 transition-colors border border-saffron/5"
              >
                <span className="text-4xl mb-3 block">{v.emoji}</span>
                <h3 className="font-bold text-brown mb-2">{v.title}</h3>
                <p className="text-sm text-brown/60">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-brown text-center mb-12 font-[family-name:var(--font-heading)]">
            Humari Journey
          </h2>
          <div className="space-y-8">
            {timeline.map((t, i) => (
              <div key={t.year} className="flex gap-6 items-start">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-saffron rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {t.year.slice(2)}
                  </div>
                  {i < timeline.length - 1 && (
                    <div className="w-0.5 h-full bg-saffron/20 mt-2" />
                  )}
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-saffron/5 flex-1 mb-4">
                  <span className="text-xs font-bold text-saffron">{t.year}</span>
                  <h3 className="font-bold text-brown">{t.title}</h3>
                  <p className="text-sm text-brown/60 mt-1">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-saffron to-saffron-dark px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4 font-[family-name:var(--font-heading)]">
            Aap Bhi Humse Milein! 🤝
          </h2>
          <p className="text-white/80 mb-8">
            Authentic Amritsari food ka maza lena hai? Visit karo ya call karo.
          </p>
          <a
            href="/contact"
            className="bg-white text-saffron hover:bg-cream px-8 py-4 rounded-full text-lg font-bold transition-all hover:scale-105 inline-block"
          >
            📍 Contact Us
          </a>
        </div>
      </section>
    </>
  );
}
