import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://url-encoder.vercel.app'),
  alternates: {
    canonical: 'https://url-encoder.vercel.app',
  },
  title: 'URL Encoder / Decoder — Percent Encoding | Free Online Tool',
  description: 'Encode and decode URLs with percent-encoding. Free online URL encoder and decoder for web developers.',
  keywords: ['url encoder', 'url decoder', 'percent encoding', 'url encode', 'url decode', 'uri encoder'],
  authors: [{ name: 'SmartOK Tools' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://url-encoder.vercel.app',
    siteName: 'URL Encoder',
    title: 'URL Encoder / Decoder — Percent Encoding',
    description: 'Encode and decode URLs with percent-encoding.',
    images: [{
      url: '/og-image.svg',
      width: 1200,
      height: 630,
      alt: 'URL Encoder — Encode & Decode URLs',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'URL Encoder / Decoder',
    description: 'Encode and decode URLs with percent-encoding.',
    images: ['/og-image.svg'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'URL Encoder / Decoder',
              applicationCategory: 'DeveloperApplication',
              operatingSystem: 'Any',
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
              featureList: 'URL encoding, URL decoding, Percent-encoding, Query string encoding',
            })
          }}
        />
      </head>
      <body className="min-h-screen bg-slate-50">{children}</body>
    </html>
  )
}
