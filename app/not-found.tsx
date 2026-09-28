import Link from 'next/link'
import FloatingDecor from '@/components/shared/floatingDecor'
import GlowCard from '@/components/dreamy/glowCard'
import dreamy from '@/components/dreamy/dreamy.module.css'

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
      <FloatingDecor className="left-[12%] top-[20%] text-3xl opacity-70">✦</FloatingDecor>
      <FloatingDecor className="right-[15%] top-[30%] text-2xl opacity-70" delay="1s">✧</FloatingDecor>
      <FloatingDecor className="bottom-[22%] left-[20%] text-xl opacity-60" delay="2s">⋆</FloatingDecor>
      <FloatingDecor className="bottom-[18%] right-[15%] text-2xl opacity-60" delay="1.5s">☾</FloatingDecor>

      <GlowCard className="relative z-10 flex w-full max-w-xl flex-col items-center rounded-[2rem] px-6 py-10 sm:px-12">
        <div className={`mb-5 ${dreamy.badge}`}>
          <span aria-hidden="true">🌙</span>
          A LITTLE DETOUR
        </div>

        {/* Hello Kitty, floating in a moon glow */}
        <div className="relative mb-4 animate-float">
          <div className="absolute inset-0 scale-90 rounded-full bg-[radial-gradient(circle,rgba(255,240,220,0.9),rgba(248,217,255,0.5)_45%,transparent_70%)] blur-xl dark:bg-[radial-gradient(circle,rgba(255,232,184,0.35),rgba(180,150,240,0.2)_45%,transparent_70%)]" />

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hellokitty.gif"
            alt="Hello Kitty waving"
            className="relative h-48 w-72 rounded-[1.4rem] object-cover p-1.5 shadow-[0_0_0_1px_rgba(201,168,240,0.7),0_0_30px_rgba(222,208,240,0.9),0_10px_24px_rgba(107,84,144,0.15)] bg-white sm:h-56 sm:w-80 dark:bg-[#2e2552] dark:shadow-[0_0_0_1px_rgba(222,208,240,0.2),0_0_30px_rgba(180,150,240,0.3)]"
          />
        </div>

        <p className="heading-font mb-2 text-7xl sm:text-8xl">
          <span className={dreamy.title}>404</span>
        </p>

        <h1 className="heading-font mb-4 text-2xl font-bold text-ink sm:text-3xl dark:text-dark-ink">
          This page wandered off
        </h1>

        <p className={`mb-8 max-w-sm text-sm leading-relaxed sm:text-base ${dreamy.subtitle}`}>
          I couldn&apos;t find what you&apos;re looking for. Maybe it
          got distracted chasing something shiny.
          <br />
          <span className="mt-2 inline-block">
            Let&apos;s find our way back together. ✨
          </span>
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/" className={`${dreamy.btn} ${dreamy.btnPrimary}`}>
            <span aria-hidden="true">✦</span>
            Take me home
          </Link>

          <Link href="/projects" className={`${dreamy.btn} ${dreamy.btnGhost}`}>
            See my projects
          </Link>
        </div>

        <p className="mt-10 text-xs tracking-wide text-lilac-deep/70 dark:text-dark-ink-soft/70">
          Lost in space, but not for long ⋆｡°✩
        </p>
      </GlowCard>
    </main>
  )
}
