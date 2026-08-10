import { Metadata } from 'next'
import AboutClient from './AboutClient'

export const metadata: Metadata = {
  title: 'Our Story',
  description: 'Learn about Amritsari Food Court — our journey from 2018 to becoming Delhi\'s favorite Punjabi restaurant with 4.39★ on Google. Authentic recipes, family values.',
}

export default function AboutPage() {
  return <AboutClient />
}