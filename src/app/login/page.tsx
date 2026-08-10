import { Metadata } from 'next'
import LoginClient from './LoginClient'

export const metadata: Metadata = {
  title: 'Sign In | Amritsari Food Court',
  description: 'Customer & Staff Portal Login for Amritsari Food Court Delhi.',
}

export default function LoginPage() {
  return <LoginClient />
}
