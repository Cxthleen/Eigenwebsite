
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#fff8f3] via-[#fce8ef] to-[#eee8ff] px-6 py-24 text-center">
      {/* Soft ambient glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-10 -z-10 h-80 w-80 rounded-full bg-[#f5b8ce]/40 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-10 -z-10 h-96 w-96 rounded-full bg-[#c8b9f5]/40 blur-3xl"
      />

      {/* Floating decorations */}
      <span className="absolute left-[12%] top-[20%] animate-float text-3xl text-[#c58aa8] opacity-70">
        ✦
      </span>

      <span className="absolute right-[15%] top-[30%] animate-float text-2xl text-[#a393d1] opacity-70 [animation-delay:1s]">
        ✧
      </span>

      <span className="absolute bottom-[22%] left-[20%] animate-float text-xl text-[#c58aa8] opacity-60 [animation-delay:2s]">
        ⋆
      </span>

      <span className="absolute bottom-[18%] right-[15%] animate-float text-2xl text-[#a393d1] opacity-60 [animation-delay:1.5s]">
        ✧
      </span>

      {/* Main content */}
      <div className="relative z-10 flex max-w-xl flex-col items-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#e8c5d3] bg-white/70 px-4 py-2 text-xs font-semibold tracking-wide text-[#765568] shadow-sm backdrop-blur-md">
          <span>🌙</span>
          A little detour
        </div>

        {/* Hello Kitty */}
        <div className="relative mb-6">
          <div className="absolute inset-0 scale-75 rounded-full bg-[#f5c6d8]/60 blur-3xl" />

          <img
            src="/hellokitty.gif"
            alt="Hello Kitty waving"
            className="relative h-48 w-72 object-contain drop-shadow-xl sm:h-56 sm:w-80"
          />
        </div>

        {/* 404 */}
        <p className="heading-font mb-2 bg-gradient-to-r from-[#c56f99] to-[#9276c8] bg-clip-text text-7xl font-bold text-transparent sm:text-8xl">
          404
        </p>

        <h1 className="heading-font mb-4 text-2xl font-bold text-[#493744] sm:text-3xl">
          This page wandered off
        </h1>

        <p className="mb-8 max-w-sm text-sm leading-relaxed text-[#765f70] sm:text-base">
          I couldn&apos;t find what you&apos;re looking for — maybe it
          got lost chasing something shiny.
          <br />
          <span className="mt-2 inline-block">
            Let&apos;s find our way back together. ✨
          </span>
        </p>

        {/* Navigation buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-2xl bg-gradient-to-r from-[#d58aaa] to-[#b77bbd] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#c58aa8]/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            Take me home <span aria-hidden="true">↗</span>
          </Link>

          <Link
            href="/projects"
            className="rounded-2xl border border-[#e5c8d7] bg-white/80 px-6 py-3 text-sm font-bold text-[#62475a] shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white"
          >
            See my projects
          </Link>
        </div>

        <p className="mt-12 text-xs tracking-wide text-[#987b91]">
          Lost in space, but not for long ⋆｡°✩
        </p>
      </div>
    </main>
  )
}