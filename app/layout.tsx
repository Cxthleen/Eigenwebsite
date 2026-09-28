import type { Metadata } from 'next'
import './globals.css'
import Footer from '@/components/layout/footer'
import NightSky from '@/components/nightSky'
import { Noto_Sans, Playfair_Display } from "next/font/google";
import { cn } from "@/lib/utils";
import StyledJsxRegistry from './registry'

const playfairDisplayHeading = Playfair_Display({subsets:['latin'],variable:'--font-heading'});

const notoSans = Noto_Sans({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: 'Cathleen van Duuren — Portfolio',
  description: 'A student developer making thoughtful, cute little things for the web.',
  openGraph: {
    title: 'Cathleen van Duuren — Portfolio',
    description: 'A student developer making thoughtful, cute little things for the web.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // suppressHydrationWarning: the inline script below may add `dark` before React hydrates
    <html lang="en" className={cn("font-sans", notoSans.variable, playfairDisplayHeading.variable)} suppressHydrationWarning>
      <head>
        {/* apply the saved theme before first paint so dark mode never flashes light */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem("theme")==="dark")document.documentElement.classList.add("dark")}catch(e){}})()`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;700&family=Nunito:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-cream dark:bg-dark-bg text-ink dark:text-dark-ink transition-colors duration-300 min-h-screen">
        {/* soft ambient wash — adds depth behind everything */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#f4ecff] via-[#fff6f9] to-[#ffeef2] dark:from-dark-bg dark:via-dark-bg dark:to-dark-surface" />
        {/* light mode: a pastel dawn sky with soft lilac stars */}
        <div className="fixed inset-0 -z-10 dark:hidden">
          <NightSky fullHeight tone="day" />
        </div>
        {/* dark mode: the whole site sits in a starry night sky */}
        <div className="fixed inset-0 -z-10 hidden dark:block">
          <NightSky fullHeight />
        </div>
        <StyledJsxRegistry>
          {children}
          <Footer />
        </StyledJsxRegistry>
      </body>
    </html>
  )
}