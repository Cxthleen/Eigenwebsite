import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Noto_Sans, Playfair_Display } from "next/font/google";
import { cn } from "@/lib/utils";

const playfairDisplayHeading = Playfair_Display({subsets:['latin'],variable:'--font-heading'});

const notoSans = Noto_Sans({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: 'Cathleen van Duuren — Portfolio',
  description: 'Student developer building thoughtful, cute things for the web.',
  openGraph: {
    title: 'Cathleen van Duuren — Portfolio',
    description: 'Student developer building thoughtful, cute things for the web.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn("font-sans", notoSans.variable, playfairDisplayHeading.variable)}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;700&family=Nunito:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-cream dark:bg-dark-bg text-ink dark:text-dark-ink transition-colors duration-300 min-h-screen">
        {/* soft ambient wash — adds depth behind everything */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-b from-blush via-cream to-latte dark:from-dark-bg dark:via-dark-bg dark:to-dark-surface" />
        {children}
        <Footer />
      </body>
    </html>
  )
}