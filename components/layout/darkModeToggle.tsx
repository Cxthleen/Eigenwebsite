'use client'

import { useEffect, useState } from 'react'

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const prefersDark = saved === 'dark'
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsDark(prefersDark)
    document.documentElement.classList.toggle('dark', prefersDark)
  }, [])

  function toggle() {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="soft-pill w-9 h-9 rounded-xl bg-latte dark:bg-dark-raised flex items-center justify-center text-base hover:bg-butter dark:hover:bg-dark-line transition-all"
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  )
}