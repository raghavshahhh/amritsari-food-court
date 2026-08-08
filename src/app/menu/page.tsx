import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menu",
  description: "Amritsari Food Court ka complete menu — Kulcha, Chole Bhature, Tandoori Momos, Lassi, and more. Prices starting ₹30.",
};

const menuCategories = [
  {
    name: "Starters & Snacks",
    emoji: "🥗",
    items: [
      { name: "Amritsari Kulcha (Plain)", price: 60, desc: "Crispy golden kulcha, fresh from tandoor" },
      { name: "Amritsari Kulcha (Stuffed)", price: 80, desc: "Aloo/pyaaz/paneer stuffed with masala" },
      { name: "Chole Bhature", price: 100, desc: "Fluffy bhature with rich spicy chole" },
      { name: "Aloo Tikki", price: 50, desc: "Crispy potato tikki with chutneys" },
      { name: "Papdi Chaat", price: 60, desc: "Crunchy papdi with sweet & spicy toppings" },
      { name: "Samosa (2 pcs)", price: 40, desc: "Crispy fried samosa with potato filling" },
      { name: "Pani Puri", price: 50, desc: "Golgappa with tangy pani" },
    ],
  },
  {
    name: "Tandoori Special",
    emoji: "🔥",
    items: [
      { name: "Tandoori Momos", price: 120, desc: "Smoky tandoori momos with red chutney" },
      { name: "Paneer Tikka", price: 150, desc: "Chargrilled paneer with mint chutney" },
      { name: "Chicken Tikka", price: 180, desc: "Juicy chicken tikka, tandoor se" },
      { name: "Seekh Kebab", price: 160, desc: "Minced meat seekh kebab" },
      { name: "Tandoori Chicken (Half)", price: 200, desc: "Classic tandoori chicken, full flavour" },
      { name: "Fish Amritsari", price: 180, desc: "Crispy golden fish fry with masala" },
    ],
  },
  {
    name: "Main Course",
    emoji: "🍛",
    items: [
      { name: "Dal Makhani", price: 120, desc: "Creamy slow-cooked black lentils" },
      { name: "Paneer Butter Masala", price: 150, desc: "Rich tomato gravy with soft paneer" },
      { name: "Chicken Curry", price: 180, desc: "Traditional Punjabi chicken curry" },
      { name: "Rajma Chawal", price: 100, desc: "Rajma with steamed basmati rice" },
      { name: "Kadhi Chawal", price: 90, desc: "Punjabi kadhi with rice" },
      { name: "Egg Curry", price: 120, desc: "Boiled eggs in spicy gravy" },
    ],
  },
  {
    name: "Breads & Rice",
    emoji: "🫓",
    items: [
      { name: "Tandoori Roti", price: 15, desc: "Fresh tandoor-baked roti" },
      { name: "Butter Naan", price: 30, desc: "Soft butter naan" },
      { name: "Garlic Naan", price: 35, desc: "Garlic-infused butter naan" },
      { name: "Jeera Rice", price: 80, desc: "Cumin-flavoured basmati rice" },
      { name: "Plain Rice", price: 60, desc: "Steamed basmati rice" },
    ],
  },
  {
    name: "Drinks & Lassi",
    emoji: "🥛",
    items: [
      { name: "Amritsari Lassi", price: 60, desc: "Thick creamy lassi, makhan malai" },
      { name: "Sweet Lassi", price: 50, desc: "Classic sweet lassi" },
      { name: "Masala Lassi", price: 60, desc: "Spiced salted lassi" },
      { name: "Mango Lassi", price: 70, desc: "Seasonal mango lassi" },
      { name: "Chaas (Buttermilk)", price: 40, desc: "Refreshing spiced buttermilk" },
      { name: "Cold Drinks", price: 30, desc: "Pepsi / Coke / Sprite" },
      { name: "Mineral Water", price: 20, desc: "Packaged drinking water" },
    ],
  },
  {
    name: "Desserts",
    emoji: "🍮",
    items: [
      { name: "Gulab Jamun (2 pcs)", price: 40, desc: "Warm syrupy gulab jamun" },
      { name: "Jalebi", price: 50, desc: "Crispy hot jalebi with rabri" },
      { name: "Kheer", price: 60, desc: "Creamy rice kheer with dry fruits" },
      { name: "Rasgulla (2 pcs)", price: 40, desc: "Soft spongy rasgulla" },
    ],
  },
];

export default function MenuPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brown py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-6xl mb-4 block">🍽️</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white font-[family-name:var(--font-heading)] mb-4">
            Our Menu
          </h1>
          <p className="text-cream/70 text-lg max-w-xl mx-auto">
            Har dish tandoor se seedha aapki plate tak. Authentic Amritsari flavours, honest prices.
          </p>
        </div>
      </section>

      {/* Menu Content */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto space-y-16">
          {menuCategories.map((category) => (
            <div key={category.name}>
              <div className="flex items-center gap-3 mb-8">
                <span className="text-3xl">{category.emoji}</span>
                <h2 className="text-2xl md:text-3xl font-bold text-brown font-[family-name:var(--font-heading)]">
                  {category.name}
                </h2>
              </div>

              <div className="grid gap-3">
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between p-4 bg-white rounded-xl border border-saffron/5 hover:border-saffron/20 hover:shadow-md transition-all group"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-brown group-hover:text-saffron transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-sm text-brown/50 mt-0.5">{item.desc}</p>
                    </div>
                    <div className="ml-4 flex items-center gap-3">
                      <span className="h-px flex-1 min-w-8 bg-brown/10 hidden sm:block" />
                      <span className="text-saffron font-bold text-lg whitespace-nowrap">
                        ₹{item.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Note */}
      <section className="py-12 px-4 bg-cream border-t border-saffron/10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-brown/60 text-sm">
            * Prices are inclusive of all taxes. Menu items and prices may change without prior notice.
          </p>
          <p className="text-brown/60 text-sm mt-2">
            📞 For orders and reservations, call us or visit the restaurant directly.
          </p>
        </div>
      </section>
    </>
  );
}
