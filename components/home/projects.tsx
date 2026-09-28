'use client'

import Link from 'next/link'

import ProjectCard from '@/components/shared/projectCard'
import { projects } from '@/lib/projects'

import dreamy from '@/components/dreamy/dreamy.module.css'
import { usePointerGlow } from '@/hooks/usePointerGlow'
import SectionHeading from '@/components/dreamy/sectionHeading'
import ScrollHint from '@/components/dreamy/scrollHint'
import FloatingDecor from '@/components/shared/floatingDecor'
import ScrollReveal from '@/components/shared/scrollReveal'

export default function Projects() {
  const loopedProjects = [...projects, ...projects]
  const panelGlow = usePointerGlow()

  return (
    <section
      id="projects"
      className="snap-start relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden px-5 py-24 sm:px-8"
    >
      <FloatingDecor className="left-[9%] top-[20%] text-2xl opacity-60">✦</FloatingDecor>
      <FloatingDecor className="right-[12%] top-[28%] text-3xl opacity-50" delay="1.5s">
        ✧
      </FloatingDecor>
      <FloatingDecor className="bottom-[18%] right-[18%] text-xl opacity-50" delay="3s">
        ☾
      </FloatingDecor>

      <ScrollReveal className="relative z-10 w-full">
        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              align="left"
              badge="A LITTLE OF WHAT I MAKE"
              title="My little projects"
              subtitle="Little ideas and happy experiments that made it off my to-do list."
            />

            <Link href="/projects" className={`${dreamy.btn} ${dreamy.btnGhost} w-fit shrink-0`}>
              See all {projects.length}
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div
            {...panelGlow}
            className={`${dreamy.glass} ${dreamy.glow} rounded-[2rem] py-6 sm:py-8`}
          >
            <p className="mb-4 text-center text-xs font-bold uppercase tracking-[0.2em] text-lilac-deep/80 dark:text-dark-ink-soft sm:mb-6">
              ✧ Made with fairy dust ✧
            </p>

            {/* marquee — edges fade out with a mask so it works on any background */}
            <div className="group overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]">
              <div className="flex w-max gap-5 px-3 animate-marquee group-hover:[animation-play-state:paused] sm:gap-6">
                {loopedProjects.map((project, index) => (
                  <div key={`${project.name}-${index}`} className="w-72 shrink-0 sm:w-80">
                    <ProjectCard {...project} />
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-4 text-center text-xs text-ink-soft/80 dark:text-dark-ink-soft/80">
              Hover to pause · Click to take a peek
            </p>
          </div>

          <p className="mt-8 text-center text-sm text-ink-soft dark:text-dark-ink-soft">
            🌱 More little creations are always growing.
          </p>

          <ScrollHint href="#contact" label="Come say hi" />
        </div>
      </ScrollReveal>
    </section>
  )
}
