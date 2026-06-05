import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Yanyi Data Technology'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '90px',
          background:
            'radial-gradient(900px 600px at 12% -10%, rgba(45,127,249,0.5), transparent 60%), radial-gradient(800px 560px at 100% 30%, rgba(242,136,75,0.45), transparent 60%), #15233f',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 22, marginBottom: 40 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: 'linear-gradient(135deg, #2D7FF9, #F2884B)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            Y
          </div>
          <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: 1 }}>Yanyi Data Technology</div>
        </div>
        <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.1, maxWidth: 920 }}>
          AI + HI — companions that understand emotion & health
        </div>
        <div style={{ fontSize: 30, marginTop: 36, color: 'rgba(255,255,255,0.7)', letterSpacing: 6 }}>
          Technology, made for love
        </div>
      </div>
    ),
    size,
  )
}
