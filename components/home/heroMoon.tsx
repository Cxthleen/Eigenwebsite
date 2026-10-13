'use client'

import { useEffect, useRef, useState } from 'react'

import ShootingStar from './shootingStar'
import ScrollMoon from './scrollMoon'
import HeroContent from './heroContent'
import MoonPortrait from './moonPortrait'
import HeroScene, { MoonAura } from './heroScene'
import { useMouseParallax, usePauseOffscreen } from '@/hooks/useSceneMotion'
import NightSky from '@/components/nightSky'

import Navbar from '@/components/layout/navbar'
import profileReveal from './profileReveal'

export default function HeroMoon() {
  const [introPlaying, setIntroPlaying] = useState(true)

  const headerRef = useRef<HTMLDivElement>(null)
  const moonRef = useRef<HTMLDivElement>(null)
  const skyRef = useRef<HTMLDivElement>(null)
  const starsRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useMouseParallax(headerRef)
  usePauseOffscreen(headerRef)

  /*
   * Scroll effects are written straight onto the elements, at most once
   * per frame. Going through React state re-rendered the whole hero (and
   * rebuilt its sky gradient) on every scroll event, which made scrolling lag.
   */
  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    const fades = [...header.querySelectorAll<HTMLElement>('[data-scroll-fade]')]
    let height = header.offsetHeight
    let last = -1
    let frame = 0

    const apply = () => {
      frame = 0
      const p = Math.min(Math.max(window.scrollY / height, 0), 1)
      if (p === last) return
      last = p

      if (moonRef.current) {
        moonRef.current.style.transform = `translateY(${p * 260}px) scale(${1 - p * 0.25})`
      }
      if (skyRef.current) skyRef.current.style.opacity = String(1 - p)
      if (starsRef.current) starsRef.current.style.opacity = String(1 - p * 0.7)
      if (contentRef.current) contentRef.current.style.opacity = String(Math.max(0, 1 - p * 1.2))
      for (const el of fades) el.style.opacity = String(1 - p)

      // the light hero paints its own sky over the site-wide one; pause the hidden one
      document.documentElement.toggleAttribute('data-hero-covers', p < 0.6)
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(apply)
    }
    const onResize = () => {
      height = header.offsetHeight
      onScroll()
    }

    apply()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      document.documentElement.removeAttribute('data-hero-covers')
    }
  }, [])

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

      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden px-6 text-center">
        {/*
          dusk sky for light mode; it fades out by opacity as you scroll
          (cheap for the browser, unlike rebuilding the gradient each frame).
          In dark mode the site-wide night sky (layout.tsx) shows through instead.
        */}
        <div
          ref={skyRef}
          className="absolute inset-0 dark:hidden"
          style={{
            background:
              'linear-gradient(to bottom, var(--color-night-top) 0%, var(--color-night-mid) 35%, var(--color-horizon) 75%, transparent 100%)',
          }}
        />

        <div ref={starsRef} className="absolute inset-0 dark:hidden" data-sky-layer>
          <NightSky />
        </div>

        <HeroScene />

        {/* Profile / portrait */}
        <div
          ref={moonRef}
          className={`relative z-10 mb-6 ${profileReveal(introPlaying)}`}
        >
          <MoonAura />
          <MoonPortrait src="/images/avatar.jpeg" alt="Cathleen" />
        </div>

        {/* Everything else stays invisible until impact */}
        <div
          ref={contentRef}
          className={`relative z-10 max-w-xl pb-12 ${profileReveal(introPlaying)}`}
        >
          <HeroContent />
        </div>

        {/* Scroll indicator */}
        <div
          className={`absolute bottom-8 left-1/2 z-10 -translate-x-1/2 [@media(max-height:760px)]:hidden ${profileReveal(introPlaying)}`}
        >
          <ScrollMoon href="#skills" />
        </div>
      </div>
    </div>
  )
}
