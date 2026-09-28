import Link from 'next/link'
import Navbar from '@/components/layout/navbar'
import FloatingDecor from '@/components/shared/floatingDecor'
import ScrollReveal from '@/components/shared/scrollReveal'
import GlowCard from '@/components/dreamy/glowCard'
import dreamy from '@/components/dreamy/dreamy.module.css'

import styles from './about.module.css'

type TimelineItem = {
  date: string
  title: string
  description: string
  emoji: string
}

const timeline: TimelineItem[] = [
  {
    date: '2023',
    title: 'Started studying',
    description:
      'Wrote my very first lines of code and bravely began my academic adventure (send cookies)',
    emoji: '🎓',
  },
  {
    date: '2025',
    title: 'Started my 1st internship',
    description:
      'Helped make a real game, Its name has sadly floated away from my memory',
    emoji: '💼',
  },
  {
    date: '2026',
    title: 'Started my 2nd internship',
    description:
      'Helping out with design and idk',
    emoji: '💼',
  },
]

const interests = ['Web development', 'Game development', 'Reading', 'Gaming']

export default function About() {
  return (
    <main className="relative isolate min-h-screen w-full overflow-hidden text-ink">
      {/* Navbar only on this page */}
      <div className="absolute left-0 top-4 z-40 w-full px-4">
        <Navbar />
      </div>

      <FloatingDecor className="right-[8%] top-36 hidden text-5xl opacity-60 sm:block">☾</FloatingDecor>
      <FloatingDecor className="left-[9%] top-[38rem] hidden text-xl opacity-70 sm:block" delay="1.2s">
        ✦
      </FloatingDecor>
      <FloatingDecor className="right-[12%] top-[68rem] hidden text-2xl opacity-60 sm:block" delay="2s">
        ✧
      </FloatingDecor>

      <div className="relative z-10 mx-auto w-full max-w-5xl px-5 pb-24 pt-32 sm:px-8 sm:pt-40">
        {/* Intro */}
        <section className="mx-auto mb-20 max-w-3xl text-center">
          <p className={`mb-5 ${dreamy.badge}`}>
            <span className={dreamy.badgeStar} aria-hidden="true">✧</span>
            A LITTLE ABOUT ME
            <span className={dreamy.badgeStar} aria-hidden="true">✧</span>
          </p>

          <h1 className="heading-font text-5xl sm:text-6xl">
            <span className={dreamy.title}>About me</span>
          </h1>

          <p className={`mx-auto mt-6 max-w-xl text-base leading-8 sm:text-lg ${dreamy.subtitle}`}>
            A cozy little corner of the internet about my journey, the things
            that make me happy, and everything I&apos;m learning along the way.
          </p>
        </section>

        {/* About card */}
        <ScrollReveal className="mx-auto mb-24 max-w-3xl">
          <GlowCard className="rounded-[2rem] p-7 sm:p-12">
            <div className="mb-6 flex items-center gap-3">
              <span className={`${dreamy.star} ${styles.avatarOrb}`} aria-hidden="true">🌙</span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-lilac-deep/80 dark:text-dark-ink-soft">
                  Hello, I&apos;m
                </p>
                <h2 className="heading-font mt-1 text-2xl font-bold text-ink dark:text-dark-ink">
                  Cathleen
                </h2>
              </div>
            </div>

            <p className="text-base leading-8 text-ink-soft sm:text-lg dark:text-dark-ink-soft">
              I&apos;m Cathleen, a student learning to build websites and
              apps. I love making things that work nicely and look pretty
              too, When I&apos;m not coding, you&apos;ll find me curled up
              with a book or lost in a game.
            </p>

            <ul className="mt-8 flex flex-wrap gap-2">
              {interests.map((interest) => (
                <li key={interest} className={styles.chip}>
                  {interest}
                </li>
              ))}
            </ul>
          </GlowCard>
        </ScrollReveal>

        {/* Journey */}
        <section className="mx-auto max-w-3xl">
          <div className="mb-12 text-center sm:text-left">
            <p className={`mb-4 ${dreamy.badge}`}>
              <span className={dreamy.badgeStar} aria-hidden="true">✦</span>
              LITTLE BY LITTLE
              <span className={dreamy.badgeStar} aria-hidden="true">✦</span>
            </p>

            <h2 className="heading-font text-4xl sm:text-5xl">
              <span className={dreamy.title}>My journey</span>
            </h2>

            <p className={`mt-4 max-w-xl leading-7 ${dreamy.subtitle}`}>
              Every project and every new adventure has been another little
              step forward, and I&apos;m enjoying every one.
            </p>
          </div>

          <div className={styles.timeline}>
            <div className={styles.line} aria-hidden="true" />

            <div className="flex flex-col gap-7 sm:gap-9">
              {timeline.map((item) => (
                <ScrollReveal key={`${item.date}-${item.title}`}>
                  <article className={styles.item}>
                    <span className={`${dreamy.star} ${styles.node}`} aria-hidden="true">
                      {item.emoji}
                    </span>

                    <GlowCard tilt={6} className="rounded-3xl p-6 sm:p-7">
                      <span className={styles.date}>✦ {item.date}</span>

                      <h3 className="heading-font mt-3 text-xl font-bold text-ink dark:text-dark-ink">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm leading-7 text-ink-soft sm:text-base dark:text-dark-ink-soft">
                        {item.description}
                      </p>
                    </GlowCard>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Back home */}
        <div className="mt-24 text-center">
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
