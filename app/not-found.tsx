import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20 text-center flex flex-col items-center">
      <img
        src="/hellokitty.gif"
        alt="A cat peeking"
        className="w-80 h-60 object-contain mb-6"
      />

      <h1 className="heading-font text-4xl font-bold text-plum dark:text-dark-text mb-2">
        404
      </h1>
      <h2 className="heading-font text-xl font-bold text-plum dark:text-dark-text mb-2">
        this page wandered off 
      </h2>
      <p className="text-plum-soft dark:text-dark-text-soft mb-6 max-w-sm">
        I couldn&apos;t find the page you&apos;re looking for — maybe it got lost chasing something shiny.
      </p>

      <Link
        href="/"
        className="px-5 py-2 bg-pink text-white rounded-full text-sm font-bold shadow-sm hover:bg-pink-hover animate-glow transition"
      >
        take me home 🎀
      </Link>
    </main>
  )
}