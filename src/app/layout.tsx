import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/Providers'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'
import GrainOverlay from '@/components/GrainOverlay'
import { SkipToContent } from '@/components/SkipToContent'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
})

const siteUrl = 'https://amritsarifoodcourt.com'
const siteName = 'Amritsari Food Court'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Amritsari Food Court | Authentic Punjabi Food in Delhi',
    template: '%s | Amritsari Food Court',
  },
  description: 'Serving authentic Amritsari kulchas, chole bhature, and Punjabi delicacies since 2018. 4.39★ on Google. Mahipalpur, Delhi. Order now!',
  keywords: [
    'Amritsari Food Court',
    'Punjabi restaurant Delhi',
    'Amritsari kulcha',
    'chole bhature Mahipalpur',
    'best Punjabi food Delhi',
    'restaurant near me',
  ],
  authors: [{ name: 'Amritsari Food Court' }],
  creator: 'Amritsari Food Court',
  publisher: 'Amritsari Food Court',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    siteName,
    title: 'Amritsari Food Court | Authentic Punjabi Food in Delhi',
    description: 'Serving authentic Amritsari kulchas, chole bhature, and Punjabi delicacies since 2018. 4.39★ on Google.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Amritsari Food Court - Authentic Punjabi Food',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amritsari Food Court | Authentic Punjabi Food in Delhi',
    description: 'Serving authentic Amritsari kulchas, chole bhature, and Punjabi delicacies since 2018.',
    images: ['/og-image.png'],
  },
  verification: {
    google: 'google-site-verification-code',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'Amritsari Food Court',
  image: `${siteUrl}/og-image.png`,
  '@id': `${siteUrl}/#restaurant`,
  url: siteUrl,
  telephone: '+91-XXXXXXXXXX',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'L Block Red Light, Vasant Kunj Rd',
    addressLocality: 'Mahipalpur',
    addressRegion: 'Delhi',
    postalCode: '110037',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 28.5254,
    longitude: 77.1567,
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.39',
    reviewCount: '2847',
    bestRating: '5',
    worstRating: '1',
  },
  priceRange: '₹₹',
  servesCuisine: ['Punjabi', 'North Indian', 'Amritsari'],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '11:00',
      closes: '23:00',
    },
  ],
  hasMenu: `${siteUrl}/menu`,
  acceptsReservations: 'False',
  paymentAccepted: 'Cash, Credit Card, UPI',
  currenciesAccepted: 'INR',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} font-sans`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-bg text-text antialiased">
        <Providers>
          <SkipToContent />
          <CustomCursor />
          <GrainOverlay />
          <Navbar />
          <main id="main-content" className="min-h-screen pt-16" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}