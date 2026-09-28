'use client'

import type { CSSProperties } from 'react'

import styles from './skills.module.css'
import dreamy from '@/components/dreamy/dreamy.module.css'
import { usePointerGlow } from '@/hooks/usePointerGlow'
import SectionHeading from '@/components/dreamy/sectionHeading'
import ScrollHint from '@/components/dreamy/scrollHint'
import FloatingDecor from '@/components/shared/floatingDecor'
import ScrollReveal from '@/components/shared/scrollReveal'

type Skill = {
  name: string
  emoji: string
  /* pastel glow color for the star */
  tint: string
}

const skills: Skill[] = [
  { name: 'HTML', emoji: '📄', tint: '#ffd9e3' },
  { name: 'CSS / Tailwind', emoji: '🎨', tint: '#ded0f0' },
  { name: 'JavaScript', emoji: '⚡', tint: '#ffe8b8' },
  { name: 'C#', emoji: '🦋', tint: '#c8e6d4' },
  { name: 'Next.js', emoji: '🪻', tint: '#f3dff7' },
]

function SkillCard({ skill }: { skill: Skill }) {
  const glow = usePointerGlow({ tilt: 14 })

  return (
    <li
      {...glow}
      className={`${dreamy.glass} ${dreamy.glow} ${dreamy.tilt} ${styles.card}`}
      style={{ '--tint': skill.tint } as CSSProperties}
    >
      <span className={styles.orb} aria-hidden="true">
        <span className={styles.star} />
        <span className={styles.emoji}>{skill.emoji}</span>
      </span>
      <span className={styles.name}>{skill.name}</span>
    </li>
  )
}

export default function Skills() {
  const panelGlow = usePointerGlow()

  return (
    <section
      id="skills"
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
        <div className="relative mx-auto w-full max-w-5xl">
          <div className="mb-12 sm:mb-16">
            <SectionHeading
              badge="MY TOOLKIT"
              title="My little toolbox"
              subtitle="The tools I feel cozy with, plus a few I’m still growing into."
            />
          </div>

          <div
            {...panelGlow}
            className={`${dreamy.glass} ${dreamy.glow} rounded-[2rem] p-5 sm:p-10`}
          >
            <p className="mb-7 text-center text-xs font-bold uppercase tracking-[0.2em] text-lilac-deep/80 dark:text-dark-ink-soft">
              ✧ Things I love tinkering with ✧
            </p>

            <ul className={styles.grid}>
              {skills.map((skill) => (
                <SkillCard key={skill.name} skill={skill} />
              ))}
            </ul>

            <p className="mt-8 text-center text-sm text-ink-soft dark:text-dark-ink-soft">
              🌱 Still learning, still making, still curious.
            </p>
          </div>

          <ScrollHint href="#projects" label="See what I’ve made" />
        </div>
      </ScrollReveal>
    </section>
  )
}
