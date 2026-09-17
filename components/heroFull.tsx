'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { BubbleBackground } from "@/components/ui/bubble-background"
import { useIsDark } from '@/lib/useIsDark'

export default function HeroFull() {
    const [mounted, setMounted] = useState(false)
    const isDark = useIsDark()


  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  return (
    <header className="isolate relative h-screen w-full overflow-hidden flex flex-col items-center justify-center text-center px-6">
      <div className="absolute inset-0 z-0 overflow-hidden">
        {isDark ? (
          <BubbleBackground
            bgColorA="rgb(34, 28, 32)"
            bgColorB="rgb(17, 22, 28)"
            bubbleColors={{
              colorA: '229, 107, 135',   // rose-deep
              colorB: '139, 111, 99',    // mocha
              colorC: '222, 208, 240',   // lilac
              colorD: '150, 116, 44',    // butter-deep
              colorE: '79, 122, 97',     // sage-deep
              interactive: '255, 143, 168', // rose
            }}
            blendMode="screen"
          />
        ) : (
          <BubbleBackground
            bgColorA="rgb(255, 238, 242)"
            bgColorB="rgb(255, 252, 250)"
            bubbleColors={{
              colorA: '255, 143, 168',   // rose
              colorB: '255, 217, 227',   // petal
              colorC: '222, 208, 240',   // lilac
              colorD: '255, 232, 184',   // butter
              colorE: '168, 201, 180',   // sage
              interactive: '229, 107, 135', // rose-deep
            }}
            blendMode="soft-light"
          />
        )}
      </div>

      <div className="relative z-10 max-w-2xl">
        <div
          className={`transition-all duration-700 ease-out ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-petal to-mocha rounded-[45%_55%_60%_40%/50%_45%_55%_50%] rotate-6 animate-float blur-[1px]" />
            <img
              src="/avatar2.jpeg"
              alt="Cathleen"
              className="soft-card relative w-32 h-32 rounded-full object-cover border-4 border-white dark:border-dark-surface"
            />
          </div>
        </div>

        <h1
          className={`heading-font text-5xl sm:text-6xl font-bold text-ink dark:text-dark-ink mb-4 transition-all duration-700 ease-out delay-100 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Hiii, I&apos;m Cathleen
        </h1>

        <p
          className={`text-lg text-ink-soft dark:text-dark-ink-soft leading-relaxed mb-8 transition-all duration-700 ease-out delay-200 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
        I&apos;m a student learning to build websites and applications.
        I love to create things that are both functional and visually appealing.
        This site is one of the first things I&apos;ve made with HTML and Tailwind CSS 💕
        </p>

        <div
          className={`flex justify-center flex-wrap gap-3 transition-all duration-700 ease-out delay-300 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Link
            href="/projects"
            className="soft-card soft-card-hover px-6 py-3 bg-gradient-to-b from-rose to-rose-deep text-white rounded-2xl text-sm font-bold hover:-translate-y-0.5 transition-all duration-300"
          >
            See my projects
          </Link>
          <Link
            href="/contact"
            className="soft-pill px-6 py-3 bg-white dark:bg-dark-surface border border-petal dark:border-dark-line rounded-2xl text-sm font-bold text-cocoa dark:text-dark-ink-soft hover:bg-blush dark:hover:bg-dark-raised hover:-translate-y-0.5 transition-all duration-300"
          >
            Get in touch
          </Link>
        </div>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-slow">
          <a
            href="#skills"
            className="group inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-ink-soft transition-colors hover:text-rose-deep dark:text-dark-ink-soft dark:hover:text-dark-ink"
          ></a>
        <span className="text-xs font-semibold text-ink-soft dark:text-dark-ink-soft uppercase tracking-widest">
          scroll
        </span>
        <span className="text-xl">🌸</span>
      </div>

              {/* Small transition hint */}

    </header>
  )
}