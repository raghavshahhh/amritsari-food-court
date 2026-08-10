import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        width: 1200, height: 630, background: '#0a0a0a', color: '#fff', fontFamily: 'Inter, system-ui', padding: 80
      }}>
        <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.2, textAlign: 'center', fontFamily: 'Poppins, system-ui' }}>
          Amritsari Food Court
        </div>
        <div style={{ fontSize: 28, color: '#e6a32e', marginTop: 16, fontFamily: 'Poppins, system-ui', fontWeight: 600 }}>
          Authentic Punjabi Since 2018
        </div>
        <div style={{ fontSize: 20, color: '#fff', opacity: 0.6, marginTop: 24, textAlign: 'center' }}>
          4.39★ • 2,800+ Reviews • Mahipalpur, Delhi
        </div>
        <div style={{ marginTop: 40, display: 'flex', gap: 24 }}>
          <div style={{ background: 'rgba(230,163,46,0.2)', padding: '12px 24px', borderRadius: '9999px', fontSize: 16, color: '#e6a32e', fontWeight: 600 }}>
            Amritsari Kulcha
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '12px 24px', borderRadius: '9999px', fontSize: 16, color: '#fff', fontWeight: 500 }}>
            Chole Bhature
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '12px 24px', borderRadius: '9999px', fontSize: 16, color: '#fff', fontWeight: 500 }}>
            Butter Chicken
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}