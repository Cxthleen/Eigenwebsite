'use client'

import { useEffect, useState } from 'react'

import styles from './darkModeToggle.module.css'

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false)
  // only spin the icon when the user actually flips the theme
  const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    // the inline script in layout.tsx already applied the saved theme; just sync the icon
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])

  function toggle() {
    const next = !isDark
    setIsDark(next)
    setFlipped(true)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="soft-pill w-9 h-9 rounded-xl bg-latte dark:bg-dark-raised flex items-center justify-center text-base hover:bg-butter dark:hover:bg-dark-line transition-all"
    >
      <span key={String(isDark)} className={flipped ? styles.icon : undefined}>
        {isDark ? '☀️' : '🌙'}
      </span>
    </button>
  )
}
