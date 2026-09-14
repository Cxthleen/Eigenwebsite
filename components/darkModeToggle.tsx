'use client'

import { useEffect, useState } from 'react';

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
        <button onClick={toggle} aria-label="Toggle dark mode" className="w-9 h-9 rounded-full bg-pink-tag dark:bg-dark-card flex items-center justify-center text-base hover:bg-pink-light dark:hover::bg-dark-border transition">
            {isDark ? '☀️' : '🌙'}
        </button>
    )
}