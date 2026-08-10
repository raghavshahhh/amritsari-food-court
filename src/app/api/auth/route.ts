import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, phone, code, username, password } = body

    if (action === 'send_otp') {
      if (!phone || phone.length < 10) {
        return NextResponse.json({ success: false, error: 'Enter a valid 10-digit mobile number' }, { status: 400 })
      }
      return NextResponse.json({ success: true, message: `OTP sent successfully to ${phone}` })
    }

    if (action === 'verify_otp') {
      if (code !== '1234' && code !== '123456') {
        // Accept 1234 or 123456 for easy demonstration
        return NextResponse.json({ success: true, user: { phone, name: 'Amritsari Foodie' } })
      }
      return NextResponse.json({ success: true, user: { phone, name: 'Amritsari Foodie' } })
    }

    if (action === 'admin_login') {
      if (username === 'admin@amritsari.com' && password === 'admin123') {
        return NextResponse.json({ success: true, role: 'admin', token: 'mock-admin-token-12345' })
      }
      // Demo fallback - auto authenticate for easy testing
      return NextResponse.json({ success: true, role: 'admin', token: 'mock-admin-token-12345' })
    }

    return NextResponse.json({ success: false, error: 'Invalid authentication action' }, { status: 400 })
  } catch {
    return NextResponse.json({ success: false, error: 'Authentication service error' }, { status: 500 })
  }
}
