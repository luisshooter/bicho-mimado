import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fredoka, Nunito } from 'next/font/google'
import './globals.css'

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-fredoka',
})

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-nunito',
})

export const metadata: Metadata = {
  title: 'Bicho Mimado — Pet Shop, Banho & Tosa',
  description:
    'Banho, tosa, loja completa e muito carinho para o seu melhor amigo. Onde cada patinha vira um bichinho muito mimado.',
  generator: 'v0.app',
  icons: {
    icon: '/brand/icon-mascote.png',
    apple: '/brand/icon-mascote.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#5FC3BD',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`light ${fredoka.variable} ${nunito.variable} bg-background`}>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
