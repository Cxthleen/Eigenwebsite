'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import DarkModeToggle from '@/components/darkModeToggle'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isOverSky, setIsOverSky] = useState(true)

  const links = [
    { href: '/about', label: 'About', emoji: '✨' },
    { href: '/projects', label: 'Projects', emoji: '🌙' },
    { href: '/blog', label: 'Blog', emoji: '📓' },
    { href: '/contact', label: 'Contact', emoji: '⭐' },
  ]

  useEffect(() => {
    function handleScroll() {
      // hero is 130vh tall, fade the navbar's look out over the first ~70% of it
      setIsOverSky(window.scrollY < window.innerHeight * 0.9)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
        <nav className="absolute top-4 left-0 z-40 w-full px-4">
          <div
            className={`soft-card relative mx-auto flex w-full max-w-4xl items-center justify-between rounded-2xl border px-5 py-3 backdrop-blur-xl transition-colors duration-500 ${
              isOverSky
                ? 'bg-night-mid/50 border-star/20'
                : 'bg-white/85 dark:bg-dark-surface/85 border-petal/60 dark:border-dark-line'
            }`}
          >
        <Link
          href="/"
          className={`heading-font font-bold text-lg transition-colors duration-500 ${
            isOverSky ? 'text-star hover:text-moon-glow' : 'text-ink dark:text-dark-ink hover:text-rose-deep dark:hover:text-rose'
          }`}
        >
          {isOverSky ? '🌙' : '✨'} Cathleen
        </Link>

        <div className="hidden sm:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-500 ${
                isOverSky
                  ? 'text-star/80 hover:bg-star/10 hover:text-star'
                  : 'text-cocoa dark:text-dark-ink-soft hover:bg-blush dark:hover:bg-dark-raised hover:text-ink dark:hover:text-dark-ink'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className={`ml-2 pl-2 border-l transition-colors duration-500 ${isOverSky ? 'border-star/20' : 'border-petal/60 dark:border-dark-line'}`}>
            <DarkModeToggle />
          </div>
        </div>

        <div className="sm:hidden flex items-center gap-2">
          <DarkModeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`soft-pill w-9 h-9 rounded-xl flex items-center justify-center text-base transition-all duration-500 ${
              isOverSky ? 'bg-star/10 text-star' : 'bg-petal dark:bg-dark-raised text-cocoa dark:text-dark-ink'
            }`}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>

        {isOpen && (
          <div className="soft-card sm:hidden absolute right-4 top-16 bg-white dark:bg-dark-surface border border-petal/60 dark:border-dark-line rounded-2xl flex flex-col gap-0.5 p-2 z-10 min-w-44">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-cocoa dark:text-dark-ink-soft hover:bg-blush dark:hover:bg-dark-raised hover:text-ink dark:hover:text-dark-ink transition-all"
              >
                <span>{link.emoji}</span> {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}