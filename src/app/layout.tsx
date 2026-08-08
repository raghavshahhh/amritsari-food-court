import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import Link from "next/link";
import MobileMenu from "@/components/MobileMenu";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Amritsari Food Court | Authentic Punjabi Food in Delhi",
    template: "%s | Amritsari Food Court",
  },
  description:
    "Delhi's best Amritsari food — Kulcha, Chole, Lassi, Tandoori. 4.39★ Google rated. Mahipalpur, Vasant Kunj. Open till 11 PM.",
  keywords: [
    "Amritsari food Delhi",
    "best kulcha Mahipalpur",
    "Punjabi food Vasant Kunj",
    "food court Delhi",
    "Amritsari chole",
    "tandoori food Delhi",
    "best lassi Delhi",
  ],
  openGraph: {
    title: "Amritsari Food Court | Authentic Punjabi Food in Delhi",
    description:
      "Delhi's best Amritsari food — Kulcha, Chole, Lassi, Tandoori. 4.39★ Google rated.",
    url: "https://amritsarifoodcourt.com",
    siteName: "Amritsari Food Court",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amritsari Food Court",
    description: "Authentic Punjabi food in Mahipalpur, Delhi. 4.39★ rated.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://amritsarifoodcourt.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Amritsari Food Court",
  image: "/og-image.jpg",
  url: "https://amritsarifoodcourt.com",
  telephone: "+91-XXXXXXXXXX",
  address: {
    "@type": "PostalAddress",
    streetAddress: "L Block, Red Light, Main, Vasant Kunj Rd",
    addressLocality: "Mahipalpur",
    addressRegion: "Delhi",
    postalCode: "110037",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 28.5494,
    longitude: 77.0922,
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.39",
    reviewCount: "500",
  },
  priceRange: "₹",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "11:00",
      closes: "23:00",
    },
  ],
  servesCuisine: ["Punjabi", "North Indian", "Amritsari"],
  menu: "https://amritsarifoodcourt.com/menu",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-cream text-brown">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-brown/95 backdrop-blur-md border-b border-saffron/20 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 md:h-20">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2 group">
                <span className="text-3xl">🍛</span>
                <div>
                  <h1 className="text-lg md:text-xl font-bold text-gold font-[family-name:var(--font-heading)] tracking-tight">
                    Amritsari Food Court
                  </h1>
                  <p className="text-[10px] md:text-xs text-saffron/80 -mt-1">
                    Authentic Punjabi Taste Since Delhi
                  </p>
                </div>
              </Link>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center gap-8">
                {[
                  { href: "/", label: "Home" },
                  { href: "/menu", label: "Menu" },
                  { href: "/about", label: "About" },
                  { href: "/contact", label: "Contact" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-cream/80 hover:text-saffron transition-colors relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-saffron transition-all group-hover:w-full" />
                  </Link>
                ))}
                <a
                  href="tel:+91XXXXXXXXXX"
                  className="bg-saffron hover:bg-saffron-dark text-white px-4 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105 animate-pulse-glow"
                >
                  📞 Order Now
                </a>
              </div>

              {/* Mobile Menu */}
              <MobileMenu />
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="bg-brown text-cream/80">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Brand */}
              <div>
                <h3 className="text-xl font-bold text-gold mb-3 font-[family-name:var(--font-heading)]">
                  🍛 Amritsari Food Court
                </h3>
                <p className="text-sm leading-relaxed">
                  Delhi ki sabse authentic Amritsari taste. Har dish mein Punjab ka pyaar aur masala.
                </p>
                <div className="flex items-center gap-1 mt-3">
                  {[1, 2, 3, 4].map((i) => (
                    <span key={i} className="text-gold text-lg">★</span>
                  ))}
                  <span className="text-gold/60 text-lg">★</span>
                  <span className="ml-2 text-sm">4.39 on Google</span>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-semibold text-saffron mb-3">Quick Links</h4>
                <div className="flex flex-col gap-2">
                  {["Menu", "About Us", "Contact", "Directions"].map((item) => (
                    <Link
                      key={item}
                      href={`/${item.toLowerCase().replace(" ", "-")}`}
                      className="text-sm hover:text-saffron transition-colors"
                    >
                      → {item}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Hours & Location */}
              <div>
                <h4 className="font-semibold text-saffron mb-3">Visit Us</h4>
                <div className="text-sm space-y-2">
                  <p>📍 L Block, Red Light, Vasant Kunj Rd, Mahipalpur, Delhi 110037</p>
                  <p>🕐 Open daily: 11:00 AM – 11:00 PM</p>
                  <p>📞 +91-XXXXXXXXXX</p>
                </div>
                <a
                  href="https://maps.google.com/?q=Amritsari+Food+Court+Mahipalpur+Delhi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 bg-saffron/20 hover:bg-saffron text-saffron hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
                >
                  📍 Get Directions
                </a>
              </div>
            </div>

            <div className="border-t border-cream/10 mt-8 pt-6 text-center text-xs text-cream/40">
              <p>© {new Date().getFullYear()} Amritsari Food Court. All rights reserved.</p>
              <p className="mt-1">Made with ❤️ in Delhi</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
