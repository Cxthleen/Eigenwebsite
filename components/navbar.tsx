"use client"
import { useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { href: '/about', label: 'About', emoji: '🌸' },
    { href: '/projects', label: 'Projects', emoji: '🌷' },
    { href: '/blog', label: 'Logbook', emoji: '📓' },
    { href: '/contact', label: 'Contact', emoji: '💌' },
  ]

  return (
    <nav className="sticky top-4 z-20 max-w-3xl mx-auto px-4">
      <div className="bg-white/80 backdrop-blur-md border-2 border-pink-border rounded-full shadow-sm px-5 py-3 flex items-center justify-between relative">
        <Link href="/" className="heading-font font-bold text-lg text-plum">
          ✨ Cathleen van Duuren
        </Link>

        <div className="hidden sm:flex gap-1 text-sm font-semibold text-lavender">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 rounded-full hover:bg-pink-light hover:text-plum transition"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden w-9 h-9 rounded-full bg-pink-tag flex items-center justify-center text-lg text-pink-tag-text hover:bg-pink-light transition"
          aria-label="Toggle menu"
        >
          {isOpen ? '✕' : '☰'}
        </button>

        {isOpen && (
          <div className="sm:hidden absolute right-4 top-16 bg-white border-2 border-pink-border rounded-2xl shadow-lg flex flex-col gap-1 p-3 text-sm font-semibold text-lavender z-10 min-w-40">
            <div className="absolute -top-2 right-4 w-4 h-4 bg-white border-t-2 border-l-2 border-pink-border rotate-45"></div>

            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-pink-light hover:text-plum transition"
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