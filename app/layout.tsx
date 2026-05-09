import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#1A3C8C',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Grão de Mostarda',
  description: 'Devocionais e reflexões semanais — Ministérios Cristãos Grão de Mostarda',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Grão de Mostarda',
  },
  icons: {
    icon: '/icons/icon-192.png',
    apple: '/icons/icon-192.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable} h-full`}>
      <body className="min-h-full bg-cream text-ink antialiased">
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  )
}
