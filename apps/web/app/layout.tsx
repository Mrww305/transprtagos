import type { Metadata } from 'next'
import { Inter, Noto_Nastaliq_Urdu } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const notoNastaliq = Noto_Nastaliq_Urdu({
  weight: ['400', '700'],
  subsets: ['arabic'],
  variable: '--font-noto-nastaliq',
})

export const metadata: Metadata = {
  title: 'PakTransit OS - Autonomous Transport Agent System',
  description: 'Autonomous Transport Agent Operating System for Pakistan\'s logistics industry',
  keywords: ['logistics', 'Pakistan', 'fleet management', 'transport', 'AI agents'],
  authors: [{ name: 'PakTransit Team' }],
  openGraph: {
    title: 'PakTransit OS',
    description: 'Autonomous Transport Agent Operating System for Pakistan\'s logistics industry',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PakTransit OS',
    description: 'Autonomous Transport Agent Operating System for Pakistan\'s logistics industry',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${notoNastaliq.variable} font-sans antialiased`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
