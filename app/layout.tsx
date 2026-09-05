import { Analytics } from '@vercel/analytics/next'
import { DM_Serif_Display, Geist } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { LanguageProvider } from '@/components/language-provider'
import { LanguageSwitcher } from '@/components/language-switcher'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const dmSerif = DM_Serif_Display({ subsets: ['latin'], weight: '400', variable: '--font-dm-serif' })

export const metadata: Metadata = {
  title: 'SAHAYAK — Trusted help, fair work',
  description: 'Find trusted local service workers and help build fairer livelihoods with SAHAYAK.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#6f1d35',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${geist.variable} ${dmSerif.variable} antialiased`}>
        <LanguageProvider><div className="fixed right-4 top-4 z-50"><LanguageSwitcher /></div>{children}</LanguageProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
