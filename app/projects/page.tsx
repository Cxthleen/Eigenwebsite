import Link from 'next/link'
import Navbar from '@/components/layout/navbar'
import ProjectCard from '@/components/shared/projectCard'
import FloatingDecor from '@/components/shared/floatingDecor'
import ScrollReveal from '@/components/shared/scrollReveal'
import GlowCard from '@/components/dreamy/glowCard'
import dreamy from '@/components/dreamy/dreamy.module.css'
import { projects } from '@/lib/projects'

export default function ProjectsPage() {
  return (
    <main className="relative isolate min-h-screen w-full overflow-hidden text-ink">
      {/* Navbar only on this page */}
      <div className="absolute left-0 top-4 z-40 w-full px-4">
        <Navbar />
      </div>

      <FloatingDecor className="right-[12%] top-36 hidden text-5xl opacity-60 sm:block">☾</FloatingDecor>
      <FloatingDecor className="left-[9%] top-[42rem] hidden text-xl opacity-70 sm:block" delay="1.2s">
        ✦
      </FloatingDecor>
      <FloatingDecor className="right-[8%] top-[75rem] hidden text-2xl opacity-60 sm:block" delay="2s">
        ✧
      </FloatingDecor>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-24 pt-32 sm:px-8 sm:pt-40">
        {/* Page intro */}
        <header className="mx-auto mb-16 max-w-3xl text-center sm:mb-20">
          <p className={`mb-5 ${dreamy.badge}`}>
            <span className={dreamy.badgeStar} aria-hidden="true">✧</span>
            A COLLECTION OF THINGS I&apos;VE MADE
            <span className={dreamy.badgeStar} aria-hidden="true">✧</span>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <h1 className="heading-font text-5xl sm:text-6xl">
              <span className={dreamy.title}>My projects</span>
            </h1>

            {/* count, as a little glowing star */}
            <span className={`${dreamy.star} h-12 w-12 pt-1 text-sm font-extrabold text-[#3a2d4f]`}>
              {projects.length}
            </span>
          </div>

          <p className={`mx-auto mt-6 max-w-xl text-base leading-8 sm:text-lg ${dreamy.subtitle}`}>
            Everything I&apos;ve built so far, newest first. A little treasure
            box of ideas, experiments, and lessons learned along the way.
          </p>
        </header>

        {/* Projects grid */}
        {projects.length > 0 ? (
          <section aria-label="My projects" className="grid gap-7 sm:grid-cols-2 lg:gap-8">
            {projects.map((project, index) => (
              <ScrollReveal key={index}>
                <ProjectCard {...project} />
              </ScrollReveal>
            ))}
          </section>
        ) : (
          <GlowCard className="mx-auto max-w-xl rounded-3xl p-10 text-center">
            <span className="text-3xl">🌙</span>
            <h2 className="heading-font mt-4 text-xl font-bold text-ink dark:text-dark-ink">
              Something sweet is on its way
            </h2>
            <p className="mt-2 text-sm leading-7 text-ink-soft dark:text-dark-ink-soft">
              I&apos;m still polishing a few projects before they join this
              little collection. Check back soon!
            </p>
          </GlowCard>
        )}

        {/* Back home */}
        <div className="mt-20 text-center">
          <Link href="/" className={`${dreamy.btn} ${dreamy.btnGhost}`}>
            <span aria-hidden="true">←</span>
            Back home
            <span aria-hidden="true">✧</span>
          </Link>
        </div>
      </div>
    </main>
  )
}
