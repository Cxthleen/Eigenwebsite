import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Cathleen van Duuren — Portfolio',
  description: 'Student developer building cute things for the web.',
  openGraph: {
    title: 'Cathleen van Duuren — Portfolio',
    description: 'Student developer building cute things for the web.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;700&family=Nunito:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
          <body className="bg-pink-50 dark:bg-dark-bg text-plum dark:text-dark-text transition-colors duration-300">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}