import { Metadata } from 'next'
import CheckoutClient from './CheckoutClient'

export const metadata: Metadata = {
  title: 'Luxury Checkout | Amritsari Food Court',
  description: 'Complete your order for authentic Amritsari kulchas, butter chicken, and lassi with instant kitchen tracking.',
}

export default function CheckoutPage() {
  return <CheckoutClient />
}
