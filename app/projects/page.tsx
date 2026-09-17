import Link from 'next/link'
import Navbar from '@/components/navbar'
import ProjectCard from '@/components/projectCard'
import { projects } from '@/lib/projects'

export default function ProjectsPage() {
  return (
    <main className="relative isolate min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#f8f0ff] via-[#fff8f3] to-[#fcecf5] text-ink dark:from-dark-bg dark:via-dark-surface dark:to-[#211c30]">
      {/* Ambient moonlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-32 -top-28 h-96 w-96 rounded-full bg-petal/30 blur-[110px] dark:bg-purple-400/10" />
        <div className="absolute -right-32 top-[35%] h-[28rem] w-[28rem] rounded-full bg-lavender/30 blur-[120px] dark:bg-indigo-400/10" />
        <div className="absolute -bottom-40 left-[25%] h-96 w-96 rounded-full bg-rose-200/40 blur-[110px] dark:bg-rose-400/10" />
      </div>

      {/* Navbar only on this page */}
      <div className="absolute left-0 top-4 z-40 w-full px-4">
        <Navbar />
      </div>

      {/* Floating decorations */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-[12%] top-36 hidden animate-float text-5xl text-mocha/30 sm:block dark:text-white/30"
      >
        ☾
      </span>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-[9%] top-[42rem] hidden animate-float text-xl text-petal sm:block"
        style={{ animationDelay: '1.2s' }}
      >
        ✦
      </span>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-[8%] top-[75rem] hidden animate-float text-2xl text-mocha/40 sm:block dark:text-white/30"
        style={{ animationDelay: '2s' }}
      >
        ✧
      </span>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-24 pt-32 sm:px-8 sm:pt-40">
        {/* Page intro */}
        <header className="mx-auto mb-16 max-w-3xl text-center sm:mb-20">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-petal/70 bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-mocha shadow-sm backdrop-blur-md dark:border-dark-line dark:bg-dark-surface/70 dark:text-dark-ink-soft">
            <span>✧</span>
            A collection of things I&apos;ve made
            <span>✧</span>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <h1 className="heading-font text-4xl font-bold tracking-tight text-ink sm:text-6xl dark:text-dark-ink">
              My projects <span className="inline-block animate-float">🌷</span>
            </h1>

            <span className="soft-pill rounded-xl border border-petal bg-blush px-3 py-1.5 text-sm font-bold text-rose-deep shadow-sm dark:border-dark-line dark:bg-dark-raised dark:text-dark-ink">
              {projects.length}
            </span>
          </div>

          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-ink-soft sm:text-lg dark:text-dark-ink-soft">
            Everything I&apos;ve built so far, newest first. A little collection
            of ideas, experiments, and things I&apos;ve learned along the way.
          </p>

          <div
            aria-hidden="true"
            className="mx-auto mt-8 h-px w-28 bg-gradient-to-r from-transparent via-petal to-transparent"
          />
        </header>

        {/* Projects grid */}
        {projects.length > 0 ? (
          <section
            aria-label="My projects"
            className="grid gap-7 sm:grid-cols-2 lg:gap-8"
          >
            {projects.map((project, index) => (
              <div
                key={index}
                className="animate-rise"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <ProjectCard {...project} />
              </div>
            ))}
          </section>
        ) : (
          <div className="soft-card mx-auto max-w-xl rounded-3xl border border-white/70 bg-white/60 p-10 text-center shadow-sm backdrop-blur-xl dark:border-dark-line dark:bg-dark-surface/70">
            <span className="text-3xl">🌙</span>
            <h2 className="heading-font mt-4 text-xl font-bold text-ink dark:text-dark-ink">
              Something is on its way
            </h2>
            <p className="mt-2 text-sm leading-7 text-ink-soft dark:text-dark-ink-soft">
              I&apos;m still working on adding projects to this little
              collection.
            </p>
          </div>
        )}

        {/* Back home */}
        <div className="mt-20 text-center">
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