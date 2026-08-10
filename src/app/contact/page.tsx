import { Metadata } from 'next'
import ContactClient from './ContactClient'

export const metadata: Metadata = {
  title: 'Contact & Visit',
  description: 'Visit Amritsari Food Court in Mahipalpur, Delhi. Open daily 11 AM - 11 PM. Call +91-XXXXXXXXXX for orders. 4.39★ on Google. Get directions here.',
}

export default function ContactPage() {
  return <ContactClient />
}