import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ErrorBoundary } from "@/components/error-boundary"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
  adjustFontFallback: true,
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://xiamenunion.com'),
  title: {
    default: "Xiamen Union Spares Ltd. - Professional Industrial Spare Parts Supplier",
    template: "%s | Xiamen Union Spares Ltd."
  },
  description:
    "Xiamen Union Spares Ltd. is a professional industrial equipment spare parts supplier, providing hydraulic systems, electrical control, mechanical transmission and other industrial spare parts and technical support services.",
  keywords:
    "industrial spare parts,hydraulic parts,electrical parts,mechanical parts,Xiamen spare parts,industrial equipment,cylinder cover,piston,cylinder liner,bearing,crankshaft,connecting rod",
  authors: [{ name: "Xiamen Union Spares Ltd." }],
  creator: "Xiamen Union Spares Ltd.",
  publisher: "Xiamen Union Spares Ltd.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://xiamenunion.com',
    title: 'Xiamen Union Spares Ltd. - Professional Industrial Spare Parts Supplier',
    description: 'Professional industrial equipment spare parts supplier with 15+ years of experience, serving global industries with precision-engineered solutions.',
    siteName: 'Xiamen Union Spares Ltd.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Xiamen Union Spares Ltd.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Xiamen Union Spares Ltd.',
    description: 'Professional industrial equipment spare parts supplier',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to external origins */}
        <link rel="preconnect" href="https://xiamenunion.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        <ErrorBoundary>{children}</ErrorBoundary>
      </body>
    </html>
  )
}
