
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-night-top via-night-mid to-cream px-6 py-24 text-center">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/4 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-moon-glow/20 blur-3xl"
      />

      {/* Floating decorations */}
      <span className="absolute left-[12%] top-[20%] animate-float text-3xl opacity-60">
        ✦
      </span>
      <span className="absolute right-[15%] top-[30%] animate-float text-2xl opacity-50 [animation-delay:1s]">
        ✧
      </span>
      <span className="absolute bottom-[22%] left-[20%] animate-float text-xl opacity-40 [animation-delay:2s]">
        ⋆
      </span>

      {/* Content */}
      <div className="relative z-10 flex max-w-xl flex-col items-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/20 px-4 py-2 text-xs font-medium tracking-wide text-cocoa shadow-sm backdrop-blur-md">
          <span>🌙</span>
          A little detour
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 scale-75 rounded-full bg-moon-glow/30 blur-3xl" />

          <img
            src="/hellokitty.gif"
            alt="Hello Kitty waving"
            className="relative h-48 w-72 object-contain drop-shadow-xl sm:h-56 sm:w-80"
          />
        </div>

        <p className="heading-font mb-2 bg-gradient-to-r from-rose to-rose-deep bg-clip-text text-7xl font-bold text-transparent sm:text-8xl">
          404
        </p>

        <h1 className="heading-font mb-4 text-2xl font-bold text-cocoa sm:text-3xl">
          This page wandered off
        </h1>

        <p className="mb-8 max-w-sm text-sm leading-relaxed text-cocoa/75 sm:text-base">
          I couldn&apos;t find what you&apos;re looking for — maybe it
          got lost chasing something shiny.
          <br />
          <span className="mt-2 inline-block">
            Let&apos;s find our way back together. ✨
          </span>
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-2xl bg-gradient-to-b from-rose to-rose-deep px-6 py-3 text-sm font-bold text-white shadow-lg shadow-rose/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            Take me home <span aria-hidden="true">↗</span>
          </Link>

          <Link
            href="/projects"
            className="rounded-2xl border border-petal bg-white/50 px-6 py-3 text-sm font-bold text-cocoa shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/80"
          >
            See my projects
          </Link>
        </div>

        <p className="mt-12 text-xs tracking-wide text-cocoa/50">
          Lost in space, but not for long ⋆｡°✩
        </p>
      </div>
    </main>
  )
}