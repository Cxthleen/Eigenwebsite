
import Link from 'next/link'
import ProjectCard from '@/components/projectCard'
import { projects } from '@/lib/projects'
import ScrollReveal from './scrollReveal'
import FloatingDecor from './floatingDecor'

export default function Projects() {
  const loopedProjects = [...projects, ...projects]

  return (
    <section
      id="projects"
      className="snap-start relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden bg-latte/30 px-5 py-24 dark:bg-dark-surface sm:px-8"
    >
      {/* Soft ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -right-24 top-[8%] h-80 w-80 rounded-full bg-mocha/15 blur-3xl dark:bg-dark-line/20" />
        <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-butter/25 blur-3xl dark:bg-dark-raised/30" />
        <div className="absolute left-1/2 top-1/2 h-72 w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blush/20 blur-3xl dark:bg-rose/5" />
      </div>
      {/* Floating decorations */}
        <FloatingDecor className="left-[9%] top-[20%] text-2xl opacity-50">
          ✦
        </FloatingDecor>

        <FloatingDecor
          className="right-[12%] top-[28%] text-3xl opacity-40"
          delay="1.5s"
        >
          ✧
        </FloatingDecor>

        <FloatingDecor
          className="bottom-[18%] right-[18%] text-xl opacity-40"
          delay="3s"
        >
          ☾
        </FloatingDecor>
        <ScrollReveal className="relative z-10 w-full">

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* Heading */}
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-petal/70 bg-white/60 px-4 py-2 text-xs font-bold tracking-[0.18em] text-rose-deep shadow-sm backdrop-blur-md dark:border-dark-line dark:bg-dark-surface/70 dark:text-dark-ink-soft">
              <span>✦</span>
              A LITTLE OF WHAT I MAKE
              <span>✦</span>
            </span>

            <h2 className="heading-font text-4xl font-bold leading-tight tracking-tight text-ink dark:text-dark-ink sm:text-5xl md:text-6xl">
              My little projects
              <span className="ml-2 inline-block">🌷</span>
            </h2>

            <p className="mt-4 max-w-xl text-base leading-7 text-ink-soft dark:text-dark-ink-soft sm:text-lg">
              Ideas, experiments, and things I’ve brought to life.
            </p>
          </div>

          <Link
            href="/projects"
            className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-petal/70 bg-white/70 px-5 py-3 text-sm font-bold text-rose-deep shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-rose-deep/30 hover:shadow-md dark:border-dark-line dark:bg-dark-raised dark:text-rose"
          >
            See all {projects.length}
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {/* Marquee panel */}
        <div className="soft-card relative overflow-hidden rounded-[2rem] border border-petal/50 bg-white/45 py-5 shadow-xl shadow-mocha/5 backdrop-blur-xl dark:border-dark-line dark:bg-dark-surface/40 sm:py-8">
          <div className="mb-4 flex items-center justify-center gap-3 px-5 sm:mb-6">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-petal sm:w-14" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink-soft dark:text-dark-ink-soft">
              Made with fairy dust
            </p>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-petal sm:w-14" />
          </div>

          <div className="group relative">
            {/* Fade edges */}
            <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-8 bg-gradient-to-r from-white/70 to-transparent dark:from-dark-surface/70 sm:w-16" />
            <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-8 bg-gradient-to-l from-white/70 to-transparent dark:from-dark-surface/70 sm:w-16" />

            <div className="overflow-hidden py-3">
              <div className="flex w-max gap-5 animate-marquee group-hover:[animation-play-state:paused] sm:gap-6">
                {loopedProjects.map((project, index) => (
                  <div
                    key={`${project.name}-${index}`}
                    className="w-72 shrink-0 sm:w-80"
                  >
                    <ProjectCard {...project} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-5 text-center text-xs text-ink-soft/80 dark:text-dark-ink-soft/80">
            Hover to pause · Click to explore
          </p>
        </div>

        {/* Bottom note */}
        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-ink-soft dark:text-dark-ink-soft">
          <span>🌱</span>
          <span>More little creations are always growing.</span>
          </div>
        {/* Small transition hint */}
        <div className="mt-10 flex justify-center">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-ink-soft transition-colors hover:text-rose-deep dark:text-dark-ink-soft dark:hover:text-dark-ink"
          >
            Almost there
            <span className="transition-transform duration-300 group-hover:translate-y-1">
              ↓
            </span>
          </a>
        </div>
        </div>
        </ScrollReveal>
    </section>
  )
}