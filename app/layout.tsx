import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ClientShell from '@/components/layout/ClientShell';

export const metadata: Metadata = {
  metadataBase: new URL('https://velouraboutique.com'),
  title: { default: 'Veloura Boutique — Elegant Fashion, Timeless Style', template: '%s | Veloura Boutique' },
  description: 'Discover curated luxury fashion at Veloura Boutique. Shop premium dresses, blazers, accessories and more. Elegant fashion, timeless style.',
  keywords: ['luxury fashion', 'boutique', "women's clothing", 'designer fashion', 'elegant style', 'Veloura'],
  authors: [{ name: 'Veloura Boutique' }],
  creator: 'Veloura Boutique',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://velouraboutique.com',
    siteName: 'Veloura Boutique',
    title: 'Veloura Boutique — Elegant Fashion, Timeless Style',
    description: 'Discover curated luxury fashion at Veloura Boutique.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Veloura Boutique' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Veloura Boutique — Elegant Fashion, Timeless Style',
    description: 'Discover curated luxury fashion at Veloura Boutique.',
    images: ['/og-image.jpg'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        {/* Client-only overlays: cart drawer, toasts, back-to-top, whatsapp */}
        <ClientShell />
      </body>
    </html>
  );
}
