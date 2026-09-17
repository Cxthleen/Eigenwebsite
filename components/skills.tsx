import FloatingDecor from "./floatingDecor"
import ScrollReveal from "./scrollReveal"

type Skill = {
  name: string
  emoji: string
  bg: string
  text: string
  border: string
}

const skills: Skill[] = [
  {
    name: 'HTML',
    emoji: '📄',
    bg: 'bg-blush dark:bg-dark-raised',
    text: 'text-rose-deep dark:text-dark-ink',
    border: 'border-petal dark:border-dark-line',
  },
  {
    name: 'CSS / Tailwind',
    emoji: '🎨',
    bg: 'bg-lilac/40 dark:bg-dark-raised',
    text: 'text-lilac-deep dark:text-dark-ink',
    border: 'border-lilac dark:border-dark-line',
  },
  {
    name: 'JavaScript',
    emoji: '⚡',
    bg: 'bg-butter/50 dark:bg-dark-raised',
    text: 'text-butter-deep dark:text-dark-ink',
    border: 'border-butter dark:border-dark-line',
  },
  {
    name: 'C#',
    emoji: '🦋',
    bg: 'bg-sage/30 dark:bg-dark-raised',
    text: 'text-sage-deep dark:text-dark-ink',
    border: 'border-sage dark:border-dark-line',
  },
  {
    name: 'Next.js',
    emoji: '🪻',
    bg: 'bg-latte dark:bg-dark-raised',
    text: 'text-cocoa dark:text-dark-ink',
    border: 'border-mocha/50 dark:border-dark-line',
  },
]

export default function Skills() {
  return (
    <section
      id="skills"
      className="snap-start relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden bg-cream px-5 py-24 dark:bg-dark-bg sm:px-8"
    >
      {/* Soft background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-32 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-lilac/25 blur-3xl dark:bg-lilac/10" />
        <div className="absolute -bottom-40 -left-24 h-80 w-80 rounded-full bg-blush/50 blur-3xl dark:bg-rose/10" />
        <div className="absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-butter/20 blur-3xl dark:bg-butter/5" />
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

      <div className="relative mx-auto w-full max-w-5xl">
        {/* Section heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-petal/70 bg-white/60 px-4 py-2 text-xs font-bold tracking-[0.18em] text-rose-deep shadow-sm backdrop-blur-md dark:border-dark-line dark:bg-dark-surface/70 dark:text-dark-ink-soft">
            <span className="animate-sparkle">✦</span>
            MY TOOLKIT
            <span className="animate-sparkle">✦</span>
          </span>

          <h2 className="heading-font text-4xl font-bold leading-tight tracking-tight text-ink dark:text-dark-ink sm:text-5xl md:text-6xl">
            What I can do
            <span className="ml-2 inline-block animate-sparkle">✨</span>
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-ink-soft dark:text-dark-ink-soft sm:text-lg">
            Things I’m comfortable with, and things I’m still growing into.
          </p>
        </div>

        {/* Skills panel */}
        <div className="soft-card relative overflow-hidden rounded-[2rem] border border-petal/50 bg-white/55 p-6 shadow-xl shadow-mocha/5 backdrop-blur-xl dark:border-dark-line dark:bg-dark-surface/50 sm:p-10 md:p-12">
          {/* Decorative corner details */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-3 -top-6 rotate-12 text-6xl opacity-50 sm:right-5 sm:top-2"
          >
            ✧
          </span>

          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-5 -left-2 -rotate-12 text-6xl text-lilac-deep/20 dark:text-lilac/20 sm:bottom-1 sm:left-5"
          >
            ✦
          </span>

          <div className="relative z-10">
            <div className="mb-6 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-petal dark:to-dark-line sm:w-16" />
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink-soft dark:text-dark-ink-soft">
                Technologies I explore
              </p>
              <span className="h-px w-10 bg-gradient-to-l from-transparent to-petal dark:to-dark-line sm:w-16" />
            </div>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {skills.map((skill, index) => (
                <span
                  key={skill.name}
                  style={{ animationDelay: `${index * 100}ms` }}
                  className={`soft-pill inline-flex items-center gap-2.5 rounded-2xl border px-4 py-3 text-sm font-bold shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:px-5 sm:py-3.5 sm:text-base ${skill.bg} ${skill.border} ${skill.text}`}
                >
                  <span className="text-lg" aria-hidden="true">
                    {skill.emoji}
                  </span>
                  {skill.name}
                </span>
              ))}
            </div>

            <div className="mt-9 flex items-center justify-center gap-2 text-center text-sm text-ink-soft dark:text-dark-ink-soft">
              <span className="text-base">🌱</span>
              <span>Always learning, always creating.</span>
            </div>
          </div>
        </div>

        {/* Small transition hint */}
        <div className="mt-10 flex justify-center">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-ink-soft transition-colors hover:text-rose-deep dark:text-dark-ink-soft dark:hover:text-dark-ink"
          >
            A little more about me
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