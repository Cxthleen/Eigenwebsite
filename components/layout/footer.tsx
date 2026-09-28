export default function Footer() {
  return (
    <footer className="mx-auto max-w-4xl px-6 pb-10">
      <div className="relative pt-6 text-center">
        {/* starry divider */}
        <div
          aria-hidden="true"
          className="mb-5 flex items-center justify-center gap-3 text-[#c9a8f0] dark:text-[#fff3b0]"
        >
          <span className="h-px w-24 bg-gradient-to-r from-transparent to-lilac dark:to-dark-line" />
          <span className="animate-sparkle text-xs">✦</span>
          <span className="text-base drop-shadow-[0_0_6px_rgba(201,168,240,0.7)] dark:drop-shadow-[0_0_6px_rgba(255,232,184,0.7)]">☾</span>
          <span className="animate-sparkle text-xs [animation-delay:0.5s]">✦</span>
          <span className="h-px w-24 bg-gradient-to-l from-transparent to-lilac dark:to-dark-line" />
        </div>

        <p className="text-xs text-ink-soft dark:text-dark-ink-soft">
          Made under the stars by Cathleen xoxo
        </p>

        <a
          href="#"
          className="mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-lilac-deep/80 transition-colors hover:bg-white/60 hover:text-lilac-deep dark:text-dark-ink-soft dark:hover:bg-white/5 dark:hover:text-dark-ink"
        >
          Back to the moon <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  )
}
