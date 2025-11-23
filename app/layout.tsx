import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rastreador de Hábitos - Construa Bons Hábitos Diariamente',
  description:
    'Monitore seus hábitos diários, construa sequências, ganhe conquistas e alcance seus objetivos com nosso lindo aplicativo de rastreamento de hábitos.',
  keywords: [
    'rastreador de hábitos',
    'hábitos diários',
    'produtividade',
    'rastreamento de metas',
    'sequências',
  ],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://habit-tracker.example.com',
    siteName: 'Rastreador de Hábitos',
    title: 'Rastreador de Hábitos - Construa Bons Hábitos Diariamente',
    description:
      'Monitore seus hábitos diários, construa sequências, ganhe conquistas e alcance seus objetivos.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Rastreador de Hábitos',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rastreador de Hábitos - Construa Bons Hábitos Diariamente',
    description:
      'Monitore seus hábitos diários, construa sequências, ganhe conquistas e alcance seus objetivos.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
