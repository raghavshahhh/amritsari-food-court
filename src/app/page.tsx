import { Metadata } from 'next'
import HomeClient from './HomeClient'

export const metadata: Metadata = {
  title: 'Authentic Punjabi Food in Delhi',
  description: 'Serving authentic Amritsari kulchas, chole bhature, and Punjabi delicacies since 2018. 4.39★ on Google. Mahipalpur, Delhi.',
}

export default function HomePage() {
  return <HomeClient />
}