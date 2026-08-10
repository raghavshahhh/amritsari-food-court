import { NextResponse } from 'next/server'
import { store } from '@/lib/store'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, date, guests, message } = body

    if (!name || !phone || !message) {
      return NextResponse.json({ success: false, error: 'Name, phone and message are required' }, { status: 400 })
    }

    const submission = store.addContactSubmission({
      name,
      email: email || '',
      phone,
      date: date || '',
      guests: guests || '2 Guests',
      message,
    })

    return NextResponse.json({ success: true, submission, message: 'Thank you! Your table request / message has been received.' }, { status: 201 })
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to process inquiry' }, { status: 500 })
  }
}

export async function GET() {
  const submissions = store.getContactSubmissions()
  return NextResponse.json({ success: true, submissions })
}
