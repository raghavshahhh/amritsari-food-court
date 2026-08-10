import { Metadata } from 'next'
import AdminClient from './AdminClient'

export const metadata: Metadata = {
  title: 'Admin Dashboard | Amritsari Food Court',
  description: 'Staff & Kitchen Control Panel for Amritsari Food Court Delhi.',
}

export default function AdminPage() {
  return <AdminClient />
}
