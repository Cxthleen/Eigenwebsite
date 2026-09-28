'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import DarkModeToggle from './darkModeToggle'
import styles from './navbar.module.css'

const links = [
  { href: '/about', label: 'About', emoji: '✨' },
  { href: '/projects', label: 'Projects', emoji: '🌙' },
  { href: '/blog', label: 'Blog', emoji: '📓' },
  { href: '/contact', label: 'Contact', emoji: '⭐' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isNearTop, setIsNearTop] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  // only the home page has the night-sky hero behind the navbar
  const isOverSky = pathname === '/' && isNearTop

  useEffect(() => {
    function handleScroll() {
      // the hero's night sky fades out as you scroll; switch looks halfway through it
      setIsNearTop(window.scrollY < window.innerHeight * 0.5)
      setIsScrolled(window.scrollY > 24)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (href: string) => pathname.startsWith(href)

  return (
    <nav className={styles.nav} data-sky={isOverSky} data-scrolled={isScrolled}>
      <div className={styles.bar}>
        <span className={styles.twinkle} aria-hidden="true">✦</span>
        <span className={styles.twinkle} aria-hidden="true">✧</span>

        <Link href="/" className={`heading-font ${styles.logo}`}>
          <span className={styles.logoMoon} aria-hidden="true">☾</span>
          <span className={styles.logoText}>Cathleen</span>
        </Link>

        <div className={styles.links}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.link} ${isActive(link.href) ? styles.active : ''}`}
              aria-current={isActive(link.href) ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
          <span className={styles.divider} aria-hidden="true" />
          <div className={styles.orb}>
            <DarkModeToggle />
          </div>
        </div>

        <div className={styles.mobileActions}>
          <div className={styles.orb}>
            <DarkModeToggle />
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={styles.menuButton}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>

        {isOpen && (
          <div className={styles.menu}>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`${styles.menuLink} ${isActive(link.href) ? styles.active : ''}`}
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
