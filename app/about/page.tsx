import Link from 'next/link'
import Navbar from '@/components/navbar'

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
      'Began learning the basics of programming.',
    emoji: '🎓',
  },
  {
    date: '2025',
    title: 'Started my 1st internship',
    description:
      'Made game',
    emoji: '💼',
  },
  {
    date: '2026',
    title: 'Started my 2nd internship',
    description:
      'Help designing idk',
    emoji: '💼',
  },
]

export default function About() {
  return (
    <main className="relative isolate min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#f8f0ff] via-[#fff8f3] to-[#fcecf5] text-ink dark:from-dark-bg dark:via-dark-surface dark:to-[#211c30]">
      {/* Soft ambient moonlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-32 left-[-8rem] h-80 w-80 rounded-full bg-petal/30 blur-[100px] dark:bg-purple-400/10" />
        <div className="absolute right-[-7rem] top-[35%] h-96 w-96 rounded-full bg-lavender/30 blur-[110px] dark:bg-indigo-400/10" />
        <div className="absolute bottom-[-8rem] left-[25%] h-80 w-80 rounded-full bg-rose-200/40 blur-[100px] dark:bg-rose-400/10" />
      </div>

      {/* Navbar only on this page */}
      <div className="absolute left-0 top-4 z-40 w-full px-4">
        <Navbar />
      </div>

      {/* Decorative moon and stars */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[8%] top-36 hidden text-5xl text-mocha/30 animate-float sm:block dark:text-white/30"
      >
        ☾
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[9%] top-[38rem] hidden text-xl text-petal/80 animate-float sm:block"
        style={{ animationDelay: '1.2s' }}
      >
        ✦
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[12%] top-[68rem] hidden text-2xl text-mocha/40 animate-float sm:block dark:text-white/30"
        style={{ animationDelay: '2s' }}
      >
        ✧
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl px-5 pb-24 pt-32 sm:px-8 sm:pt-40">
        {/* Intro */}
        <section className="mx-auto mb-24 max-w-3xl text-center">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-petal/70 bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-mocha shadow-sm backdrop-blur-md dark:border-dark-line dark:bg-dark-surface/70 dark:text-dark-ink-soft">
            <span>✧</span>
            A little about me
            <span>✧</span>
          </p>

          <h1 className="heading-font text-4xl font-bold tracking-tight text-ink sm:text-6xl dark:text-dark-ink">
            About me{' '}
            <span className="inline-block animate-float">🌸</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-ink-soft sm:text-lg dark:text-dark-ink-soft">
            A small corner of the internet about my journey, the things I
            enjoy, and what I&apos;m learning along the way.
          </p>

          <div
            aria-hidden="true"
            className="mx-auto mt-8 h-px w-28 bg-gradient-to-r from-transparent via-petal to-transparent"
          />
        </section>

        {/* About card */}
        <section className="relative mx-auto mb-28 max-w-3xl">
          <div
            aria-hidden="true"
            className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-br from-petal/30 via-lavender/20 to-rose-200/30 blur-2xl"
          />

          <div className="soft-card relative rounded-[2rem] border border-white/70 bg-white/65 p-7 shadow-[0_20px_70px_-35px_rgba(120,85,130,0.35)] backdrop-blur-xl sm:p-12 dark:border-dark-line dark:bg-dark-surface/75">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-petal/60 bg-petal/20 text-xl dark:border-dark-line dark:bg-dark-raised">
                🌙
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mocha dark:text-dark-ink-soft">
                  Hello, I&apos;m
                </p>
                <h2 className="heading-font mt-1 text-2xl font-bold text-ink dark:text-dark-ink">
                  Cathleen
                </h2>
              </div>
            </div>

            <p className="text-base leading-8 text-ink-soft sm:text-lg dark:text-dark-ink-soft">
              I&apos;m Cathleen, a student learning to build websites and
              applications. I love creating things that are both functional
              and visually appealing, and I&apos;m always looking for new
              things to learn. Outside of coding, I enjoy reading and gaming.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {['Web development', 'Creative projects', 'Reading', 'Gaming'].map(
                (interest) => (
                  <span
                    key={interest}
                    className="rounded-full border border-petal/60 bg-petal/15 px-4 py-2 text-xs font-medium text-cocoa dark:border-dark-line dark:bg-dark-raised dark:text-dark-ink-soft"
                  >
                    {interest}
                  </span>
                ),
              )}
            </div>
          </div>
        </section>

        {/* Journey */}
        <section className="mx-auto max-w-3xl">
          <div className="mb-12 text-center sm:text-left">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-mocha dark:text-dark-ink-soft">
              Little by little
            </p>

            <h2 className="heading-font text-3xl font-bold text-ink sm:text-4xl dark:text-dark-ink">
              My journey <span>🌷</span>
            </h2>

            <p className="mt-4 max-w-xl leading-7 text-ink-soft dark:text-dark-ink-soft">
              Every project and new experience has been another little step
              forward.
            </p>
          </div>

          <div className="relative pl-7 sm:pl-10">
            {/* Soft timeline line */}
            <div className="absolute bottom-8 left-[0.4rem] top-5 w-px bg-gradient-to-b from-petal via-mocha/30 to-transparent sm:left-[0.65rem] dark:via-dark-line" />

            <div className="flex flex-col gap-7 sm:gap-9">
              {timeline.map((item, index) => (
                <article
                  key={`${item.date}-${item.title}`}
                  className="relative animate-rise"
                  style={{ animationDelay: `${index * 0.12}s` }}
                >
                  <span className="absolute -left-7 top-7 flex h-8 w-8 items-center justify-center rounded-xl border border-petal/70 bg-white/90 text-sm shadow-sm sm:-left-10 dark:border-dark-line dark:bg-dark-raised">
                    {item.emoji}
                  </span>

                  <div className="soft-card rounded-3xl border border-white/80 bg-white/60 p-6 shadow-[0_12px_40px_-28px_rgba(100,70,110,0.35)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-white/80 sm:p-7 dark:border-dark-line dark:bg-dark-surface/70 dark:hover:bg-dark-raised/80">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-mocha dark:text-dark-ink-soft">
                      {item.date}
                    </span>

                    <h3 className="heading-font mt-2 text-xl font-bold text-ink dark:text-dark-ink">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-ink-soft sm:text-base dark:text-dark-ink-soft">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Back home */}
        <div className="mt-24 text-center">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 rounded-full border border-petal/70 bg-white/60 px-6 py-3 text-sm font-semibold text-cocoa shadow-sm backdrop-blur-md transition hover:-translate-y-0.5 hover:border-petal hover:bg-white dark:border-dark-line dark:bg-dark-surface/70 dark:text-dark-ink-soft dark:hover:bg-dark-raised"
          >
            <span className="transition-transform group-hover:-translate-x-1">
              ←
            </span>
            Back home
            <span className="text-petal">✧</span>
          </Link>
        </div>
      </div>
    </main>
  )
}