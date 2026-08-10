import { Metadata } from 'next'
import GalleryClient from './GalleryClient'

export const metadata: Metadata = {
  title: 'Food & Ambiance Gallery | Amritsari Food Court',
  description: 'Explore photos of our authentic clay tandoors, Amritsari kulchas, butter chicken, and luxury restaurant dining in Mahipalpur, Delhi.',
}

export default function GalleryPage() {
  return <GalleryClient />
}
