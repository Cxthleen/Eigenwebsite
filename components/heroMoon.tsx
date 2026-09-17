
'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

import Stars from '@/components/stars'
import Navbar from './navbar'

export default function HeroMoon() {
  const [progress, setProgress] = useState(0)
  const [mounted, setMounted] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)

    function handleScroll() {
      const el = headerRef.current
      if (!el) return

      const height = el.offsetHeight
      const scrolled = Math.min(
        Math.max(window.scrollY / height, 0),
        1,
      )

      setProgress(scrolled)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Moon drifts down and slightly shrinks as you scroll
  const moonTranslateY = progress * 260
  const moonScale = 1 - progress * 0.25
  const skyFade = progress

  const interests = [
    '💻 Web development',
    '🎨 UI & design',
    '✨ Creative coding',
  ]

  return (
    <div
      ref={headerRef}
      className="snap-start relative h-screen w-full overflow-hidden"
    >
      <Navbar />

      {/* Night sky, fading into the ground palette as you scroll */}
      <div
        className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden px-6 text-center"
        style={{
          background: `linear-gradient(
            to bottom,
            color-mix(in srgb, var(--color-night-top) ${100 - skyFade * 100}%, var(--color-blush)) 0%,
            color-mix(in srgb, var(--color-night-mid) ${100 - skyFade * 100}%, var(--color-blush)) 35%,
            color-mix(in srgb, var(--color-horizon) ${100 - skyFade * 100}%, var(--color-cream)) 75%,
            var(--color-cream) 100%
          )`,
        }}
      >
        {/* Stars */}
        <div
          className="absolute inset-0"
          style={{ opacity: 1 - skyFade * 0.7 }}
        >
          <Stars />
        </div>

        {/* Moon / profile picture */}
        <div
          className="relative z-10 mb-6"
          style={{
            transform: `translateY(${moonTranslateY}px) scale(${moonScale})`,
            transition: 'transform 0.05s linear',
          }}
        >
          <div className="relative h-40 w-40">
            <div className="absolute -inset-6 rounded-full bg-moon-glow/40 blur-2xl" />

            <img
              src="/avatar2.jpeg"
              alt="Cathleen"
              className="relative h-40 w-40 rounded-full border-4 border-white/80 object-cover shadow-[0_0_50px_rgba(255,232,214,0.5)]"
            />
          </div>
        </div>

        {/* Intro */}
        <div
          className={`relative z-10 max-w-xl pb-12 transition-all duration-700 ease-out ${
            mounted
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
          }`}
          style={{
            opacity: mounted ? Math.max(0, 1 - skyFade * 1.2) : 0,
          }}
        >
          {/* Intro badge */}
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-medium tracking-wide text-star/80 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.8)]" />
            Student · Aspiring developer
          </span>

          <h1 className="heading-font mb-3 text-4xl font-bold text-star sm:text-5xl">
            Hiii, I&apos;m Cathleen
          </h1>

          <p className="mx-auto max-w-md text-base leading-relaxed text-star/80">
            I&apos;m a student learning to build websites and
            applications. I love to create things that are both
            functional and visually appealing. This site is one of
            the first things I&apos;ve made with HTML and Tailwind CSS 💕
          </p>

          {/* Interests */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {interests.map((interest) => (
              <span
                key={interest}
                className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-medium text-star/90 backdrop-blur-md"
              >
                {interest}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href="/projects"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-night shadow-lg shadow-black/10 transition hover:-translate-y-1 hover:shadow-xl"
            >
              Explore my work <span aria-hidden="true">↗</span>
            </Link>

            <Link
              href="/contact"
              className="rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-star backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/20"
            >
              Say hello 💌
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 animate-bounce-slow">
          <a href="#skills">

            <span className="text-xl transition-transform duration-300 group-hover:translate-y-1">🌙</span>
            </a>
        </div>
      </div>
    </div>
  )
}