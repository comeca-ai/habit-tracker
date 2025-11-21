import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Habit Tracker - Build Better Habits Daily',
  description:
    'Track your daily habits, build streaks, earn badges, and achieve your goals with our beautiful habit tracking app.',
  keywords: [
    'habit tracker',
    'daily habits',
    'productivity',
    'goal tracking',
    'streaks',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://habit-tracker.example.com',
    siteName: 'Habit Tracker',
    title: 'Habit Tracker - Build Better Habits Daily',
    description:
      'Track your daily habits, build streaks, earn badges, and achieve your goals.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Habit Tracker',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Habit Tracker - Build Better Habits Daily',
    description:
      'Track your daily habits, build streaks, earn badges, and achieve your goals.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
