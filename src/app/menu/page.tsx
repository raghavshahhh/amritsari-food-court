import { Metadata } from 'next'
import MenuClient from './MenuClient'

export const metadata: Metadata = {
  title: 'Full Menu',
  description: 'Explore our complete menu — Amritsari kulchas, chole bhature, tandoori specialties, curries, breads, and drinks. Authentic Punjabi flavors since 2018.',
}

export default function MenuPage() {
  return <MenuClient />
}