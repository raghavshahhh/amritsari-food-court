export const runtime = 'edge'

export async function GET() {
  const content = `# Amritsari Food Court

## About
Authentic Punjabi restaurant in Mahipalpur, Delhi serving traditional Amritsari flavors since 2018.

## Location
L Block Red Light, Vasant Kunj Road, Mahipalpur, New Delhi 110037

## Hours
Daily: 11:00 AM - 11:00 PM
Last order: 10:30 PM

## Contact
Phone: +91-XXXXXXXXXX
Google Reviews: https://share.google/UpbJggUjy9lqkMt2s

## Rating
4.39★ on Google (2,847+ reviews)

## Menu Highlights
- Amritsari Kulcha (Aloo/Paneer/Onion) - ₹110-140
- Chole Bhature - ₹150
- Butter Chicken - ₹280
- Dal Makhani - ₹180
- Paneer Tikka - ₹220
- Lassi (Sweet/Salted/Mango) - ₹60-80

## Cuisine
Punjabi, North Indian, Amritsari specialties

## Features
- Hand-stuffed kulchas made fresh daily
- Traditional tandoor cooking
- Family recipes from Amritsar
- Dine-in, takeaway, and delivery (5km radius)
- Vegan options available

## Payment
Cash, UPI, Credit/Debit Cards`
  return new Response(content, { 
    headers: { 'Content-Type': 'text/plain; charset=utf-8' } 
  })
}