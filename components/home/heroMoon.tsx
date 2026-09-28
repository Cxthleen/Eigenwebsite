'use client'

import { useEffect, useRef, useState } from 'react'

import ShootingStar from './shootingStar'
import HeroContent from './heroContent'
import MoonPortrait from './moonPortrait'
import NightSky from '@/components/nightSky'

import Navbar from '@/components/layout/navbar'
import profileReveal from './profileReveal'

export default function HeroMoon() {
  const [progress, setProgress] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [introPlaying, setIntroPlaying] = useState(true)

  const headerRef = useRef<HTMLDivElement>(null)
  const moonRef = useRef<HTMLDivElement>(null)

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

  const moonTranslateY = progress * 260
  const moonScale = 1 - progress * 0.25
  const skyFade = progress

  return (
    <div
      ref={headerRef}
      className="relative h-screen w-full overflow-hidden snap-start"
    >
      <Navbar />

      <ShootingStar
        targetRef={moonRef}
        onLand={() => setIntroPlaying(false)}
      />

      <div
        className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden px-6 text-center dark:!bg-none"
        style={{
          background: `linear-gradient(
            to bottom,
            color-mix(in srgb, var(--color-night-top) ${
              100 - skyFade * 100
            }%, transparent) 0%,
            color-mix(in srgb, var(--color-night-mid) ${
              100 - skyFade * 100
            }%, transparent) 35%,
            color-mix(in srgb, var(--color-horizon) ${
              100 - skyFade * 100
            }%, transparent) 75%,
            transparent 100%
          )`,
        }}
      >
        {/* in dark mode the site-wide night sky (layout.tsx) shows through instead */}
        <div
          className="absolute inset-0 dark:hidden [mask-image:linear-gradient(to_bottom,black_60%,transparent)]"
          style={{ opacity: 1 - skyFade * 0.7 }}
        >
          <NightSky />
        </div>

        {/* Profile / portrait */}
        <div
          ref={moonRef}
          className={`relative z-10 mb-6 ${profileReveal(introPlaying)}`}
          style={{
            transform: `translateY(${moonTranslateY}px) scale(${moonScale})`,
          }}
        >
          <MoonPortrait src="/images/avatar.jpeg" alt="Cathleen" />
        </div>

        {/* Everything else stays invisible until impact */}
        <div
          className={`relative z-10 max-w-xl pb-12 ${profileReveal(introPlaying)}`}
          style={{
            opacity: mounted
              ? Math.max(0, 1 - skyFade * 1.2)
              : 0,
          }}
        >
          <HeroContent />
        </div>

        {/* Scroll indicator */}
        <div
          className={`absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 animate-bounce-slow [@media(max-height:760px)]:hidden ${profileReveal(introPlaying)}`}
        >
          <a
            href="#skills"
            aria-label="Scroll down"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-white/10 text-xl shadow-[0_0_20px_rgba(255,232,184,0.35)] backdrop-blur-md transition hover:shadow-[0_0_30px_rgba(255,232,184,0.6)]"
          >
            🌙
          </a>
        </div>
      </div>
    </div>
  )
}
