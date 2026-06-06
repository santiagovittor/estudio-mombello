import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt =
  'Dr. Fabio Mombello — Abogado Penal, Laboral y Familia en Buenos Aires';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  let fontData: ArrayBuffer | null = null;

  try {
    const css = await fetch(
      'https://fonts.googleapis.com/css2?family=Archivo:wght@900&display=swap',
      { headers: { 'User-Agent': 'Mozilla/5.0 (compatible)' } }
    ).then((r) => r.text());

    const fontUrl = /src: url\((.+?)\)/.exec(css)?.[1];

    if (fontUrl) {
      fontData = await fetch(fontUrl).then((r) => r.arrayBuffer());
    }
  } catch {
    // font load failed — ImageResponse falls back to system-ui
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#0d0e13',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '0 88px',
        }}
      >
        {/* Accent bar */}
        <div
          style={{
            width: '48px',
            height: '3px',
            background: '#c0614a',
            marginBottom: '32px',
          }}
        />

        {/* Eyebrow */}
        <div
          style={{
            fontFamily: fontData ? 'Archivo' : 'system-ui',
            fontWeight: 900,
            fontSize: '14px',
            color: 'rgba(242, 237, 230, 0.38)',
            letterSpacing: '0.18em',
            marginBottom: '24px',
            textTransform: 'uppercase',
          }}
        >
          BUENOS AIRES · 20 AÑOS DE EXPERIENCIA
        </div>

        {/* Headline */}
        <div
          style={{
            fontFamily: fontData ? 'Archivo' : 'system-ui',
            fontWeight: 900,
            fontSize: '72px',
            lineHeight: 1.0,
            color: '#f2ede6',
            maxWidth: '880px',
          }}
        >
          Su problema tiene solución.
        </div>

        {/* Sub-line */}
        <div
          style={{
            fontFamily: fontData ? 'Archivo' : 'system-ui',
            fontWeight: 400,
            fontSize: '20px',
            color: 'rgba(242, 237, 230, 0.50)',
            marginTop: '28px',
          }}
        >
          Dr. Fabio Mombello · Abogado
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fontData
        ? [{ name: 'Archivo', data: fontData, weight: 900, style: 'normal' }]
        : [],
    }
  );
}
