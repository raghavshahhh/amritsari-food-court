import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Amritsari Food Court',
    short_name: 'Amritsari FC',
    description: 'Authentic Punjabi food in Delhi — Amritsari kulchas, chole bhature, and more. 4.39★ on Google.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#e6a32e',
    orientation: 'portrait-primary',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
    categories: ['food', 'restaurant'],
    shortcuts: [
      { name: 'Menu', url: '/menu', description: 'View our full menu' },
      { name: 'Contact', url: '/contact', description: 'Find us and order' },
    ],
  }
}