import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { href: '#about', label: 'About', emoji: '🌸' },
    { href: '#projects', label: 'Projects', emoji: '🌷' },
    { href: '#contact', label: 'Contact', emoji: '💌' },
  ]

  return (
    <nav className="max-w-3xl mx-auto px-6 py-6 relative">
      <div className="flex items-center justify-between">
        <span className="heading-font font-bold text-lg text-[#4a3b52]">
          ✨ Your Name
        </span>

        <div className="hidden sm:flex gap-5 text-sm font-semibold text-[#8a6d9c]">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-[#4a3b52]">
              {link.label}
            </a>
          ))}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden text-2xl text-[#8a6d9c]"
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {isOpen && (
        <div className="sm:hidden absolute right-6 top-16 bg-white border-2 border-[#ffe3ec] rounded-2xl shadow-lg flex flex-col gap-1 p-3 text-sm font-semibold text-[#8a6d9c] z-10 min-w-40">
          <div className="absolute -top-2 right-4 w-4 h-4 bg-white border-t-2 border-l-2 border-[#ffe3ec] rotate-45"></div>

          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-[#fff0f4] hover:text-[#4a3b52] transition"
            >
              <span>{link.emoji}</span> {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}