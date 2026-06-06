import type { Metadata } from 'next';
import { Archivo } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import ScrollProgress from '@/components/ui/ScrollProgress';
import ClientCursor from '@/components/ui/ClientCursor';
import { getStructuredData } from '@/lib/structured-data';
import { SITE_URL, GOOGLE_BIZ_NAME } from '@/lib/constants';

const archivo = Archivo({
  variable: '--font-archivo',
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default:
      'Dr. Fabio Mombello | Abogado Penal, Laboral y Familia — Buenos Aires',
    template: '%s | Dr. Fabio Mombello — Abogado',
  },

  description:
    'Dr. Fabio Mombello — Abogado Penal, Laboral y Familia con 20 años de ' +
    'experiencia en tribunales de Buenos Aires. Estudio en General Pacheco, ' +
    'Tigre. Consulte hoy.',

  keywords: [
    'abogado Buenos Aires',
    'abogado penal Buenos Aires',
    'abogado laboral Buenos Aires',
    'abogado familia Buenos Aires',
    'abogado General Pacheco',
    'abogado Tigre',
    'estudio jurídico Zona Norte',
    'defensa penal Buenos Aires',
    'Dr. Fabio Mombello',
    'abogado accidente laboral',
    'divorcio abogado Buenos Aires',
  ],

  authors: [{ name: 'Dr. Fabio Mombello', url: SITE_URL }],
  creator: GOOGLE_BIZ_NAME,
  publisher: GOOGLE_BIZ_NAME,

  alternates: { canonical: '/' },

  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: SITE_URL,
    siteName: 'Dr. Fabio Mombello — Abogado',
    title:
      'Dr. Fabio Mombello | Abogado Penal, Laboral y Familia — Buenos Aires',
    description:
      'Dr. Fabio Mombello — 20 años defendiendo a sus clientes en tribunales ' +
      'de Buenos Aires. Penal, Laboral y Familia. General Pacheco, Tigre.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Dr. Fabio Mombello — Abogado Penal, Laboral y Familia en Buenos Aires',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Dr. Fabio Mombello | Abogado — Buenos Aires',
    description:
      '20 años de experiencia en derecho penal, laboral y familia en ' +
      'Buenos Aires. Estudio jurídico en General Pacheco.',
    images: ['/opengraph-image'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={archivo.variable}>
      <head>
        {getStructuredData().map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
            }}
          />
        ))}
      </head>
      <body>
        <ScrollProgress />
        {children}
        {GA4_ID && process.env.NODE_ENV === 'production' && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA4_ID}');
              `}
            </Script>
          </>
        )}
        <ClientCursor />
      </body>
    </html>
  );
}
