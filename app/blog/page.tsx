'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import { supabase } from '@/lib/supabase'

type Entry = {
  id: string
  date: string
  hours: number
  note: string
}

const GOAL_HOURS = 1196

export default function Blog() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [date, setDate] = useState('')
  const [hours, setHours] = useState('')
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const totalHours = entries.reduce((sum, entry) => sum + entry.hours, 0)
  const progressPercent = Math.min((totalHours / GOAL_HOURS) * 100, 100)
  const hoursLeft = Math.max(GOAL_HOURS - totalHours, 0)

  const ENTRIES_PER_PAGE = 4

  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(entries.length / ENTRIES_PER_PAGE)

  const paginatedEntries = entries.slice(
    (currentPage - 1) * ENTRIES_PER_PAGE,
    currentPage * ENTRIES_PER_PAGE
)

  useEffect(() => {
    fetchEntries()
  }, [])

  async function fetchEntries() {
    setLoading(true)

    const { data, error } = await supabase
      .from('entries')
      .select('*')
      .order('date', { ascending: false })

    if (error) {
      console.error('Error fetching entries:', error.message)
    } else {
      setEntries((data ?? []) as Entry[])
    }

    setLoading(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!date || !hours || !note || saving) return

    const parsedHours = Number(hours)

    if (!Number.isFinite(parsedHours) || parsedHours <= 0) return

    setSaving(true)

    const { error } = await supabase
      .from('entries')
      .insert([{ date, hours: parsedHours, note }])

    if (error) {
      console.error('Error adding entry:', error.message)
      setSaving(false)
      return
    }

    setDate('')
    setHours('')
    setNote('')

    await fetchEntries()
    setCurrentPage(1)
    setSaving(false)
  }

  async function handleDelete(id: string) {
    if (deletingId) return

    setDeletingId(id)

    const { error } = await supabase.from('entries').delete().eq('id', id)

    if (error) {
      console.error('Error deleting entry:', error.message)
      setDeletingId(null)
      return
    }

    await fetchEntries()
    setCurrentPage((page) =>
    Math.min(page, Math.max(1, Math.ceil((entries.length - 1) / ENTRIES_PER_PAGE)))
  )
    setDeletingId(null)
  }

  const inputClass =
    'w-full rounded-2xl border border-petal/70 bg-white/70 px-4 py-3 text-sm text-ink placeholder:text-mocha/50 shadow-sm outline-none backdrop-blur-md transition-all focus:border-rose focus:ring-4 focus:ring-rose/10 dark:border-dark-line dark:bg-dark-bg/70 dark:text-dark-ink dark:placeholder:text-dark-ink-soft/50'

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
        className="pointer-events-none absolute right-[10%] top-36 hidden animate-float text-5xl text-mocha/30 sm:block dark:text-white/30"
      >
        ☾
      </span>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-[8%] top-[42rem] hidden animate-float text-xl text-petal sm:block"
        style={{ animationDelay: '1.2s' }}
      >
        ✦
      </span>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-[9%] top-[78rem] hidden animate-float text-2xl text-mocha/40 sm:block dark:text-white/30"
        style={{ animationDelay: '2s' }}
      >
        ✧
      </span>

      <div className="relative z-10 mx-auto w-full max-w-5xl px-5 pb-24 pt-32 sm:px-8 sm:pt-40">
        {/* Page heading */}
        <header className="mb-14 text-center">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-petal/70 bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-mocha shadow-sm backdrop-blur-md dark:border-dark-line dark:bg-dark-surface/70 dark:text-dark-ink-soft">
            <span>✧</span>
            Little steps, big progress
            <span>✧</span>
          </p>

          <h1 className="heading-font text-4xl font-bold tracking-tight text-ink sm:text-6xl dark:text-dark-ink">
            Internship logbook{' '}
            <span className="inline-block animate-float">📓</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-ink-soft sm:text-lg dark:text-dark-ink-soft">
            Logging my hours, capturing what I learn, and keeping track of
            every little step along the way.
          </p>

          <div
            aria-hidden="true"
            className="mx-auto mt-8 h-px w-28 bg-gradient-to-r from-transparent via-petal to-transparent"
          />
        </header>

        {/* Progress dashboard */}
        <section
          aria-label="Internship hours progress"
          className="relative mb-10"
        >
          <div
            aria-hidden="true"
            className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-br from-petal/30 via-lavender/20 to-rose-200/30 blur-2xl"
          />

          <div className="soft-card relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/65 p-6 shadow-[0_20px_70px_-35px_rgba(120,85,130,0.35)] backdrop-blur-xl sm:p-9 dark:border-dark-line dark:bg-dark-surface/75">
            <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mocha dark:text-dark-ink-soft">
                  Your progress
                </p>

                <p
                  key={totalHours}
                  className="heading-font mt-3 text-4xl font-bold text-ink animate-pop sm:text-5xl dark:text-dark-ink"
                >
                  {totalHours.toLocaleString()}
                  <span className="ml-2 text-base font-normal text-mocha sm:text-lg dark:text-dark-ink-soft">
                    / {GOAL_HOURS.toLocaleString()} hrs
                  </span>
                </p>
              </div>

              <span className="soft-pill rounded-2xl border border-petal/70 bg-blush/80 px-4 py-2 text-sm font-bold text-rose-deep dark:border-dark-line dark:bg-dark-raised dark:text-dark-ink">
                {progressPercent.toFixed(1)}% complete
              </span>
            </div>

            <div
              className="relative h-5 w-full overflow-hidden rounded-full bg-latte/80 dark:bg-dark-bg"
              role="progressbar"
              aria-valuenow={Math.round(progressPercent)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Internship hours progress"
              style={{
                boxShadow: 'inset 0 2px 5px rgba(139,111,99,0.15)',
              }}
            >
              <div
                className="relative h-full rounded-full bg-gradient-to-r from-petal via-rose to-rose-deep transition-[width] duration-700 ease-out"
                style={{
                  width: `${progressPercent}%`,
                  boxShadow:
                    'inset 0 2px 3px rgba(255,255,255,0.55), inset 0 -2px 4px rgba(0,0,0,0.12)',
                }}
              >
                {progressPercent > 0 && (
                  <span
                    aria-hidden="true"
                    className="absolute right-1 top-1/2 -translate-y-1/2 text-xs"
                  >
                    ✦
                  </span>
                )}
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm text-ink-soft dark:text-dark-ink-soft">
              <p>
                {hoursLeft === 0
                  ? 'You reached your internship goal! 🌷'
                  : `${hoursLeft.toLocaleString()} hours to go — you’ve got this 🌷`}
              </p>

              <p className="text-xs font-medium text-mocha/80 dark:text-dark-ink-soft">
                {entries.length} {entries.length === 1 ? 'entry' : 'entries'} logged
              </p>
            </div>
          </div>
        </section>

        {/* Add entry form */}
        <section className="mb-16">
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-petal/70 bg-white/70 shadow-sm dark:border-dark-line dark:bg-dark-raised">
              ✍️
            </span>

            <div>
              <h2 className="heading-font text-xl font-bold text-ink dark:text-dark-ink">
                Add a little update
              </h2>
              <p className="mt-1 text-sm text-ink-soft dark:text-dark-ink-soft">
                What did you work on today?
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="soft-card flex flex-col gap-6 rounded-[2rem] border border-white/80 bg-white/60 p-6 shadow-[0_16px_55px_-35px_rgba(120,85,130,0.3)] backdrop-blur-xl sm:p-8 dark:border-dark-line dark:bg-dark-surface/70"
          >
            <div className="grid gap-5 sm:grid-cols-[1fr_180px]">
              <div>
                <label
                  htmlFor="date"
                  className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-cocoa dark:text-dark-ink-soft"
                >
                  Date
                </label>

                <input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label
                  htmlFor="hours"
                  className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-cocoa dark:text-dark-ink-soft"
                >
                  Hours
                </label>

                <input
                  id="hours"
                  type="number"
                  step="0.5"
                  min="0.5"
                  max="24"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  placeholder="8"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="note"
                className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-cocoa dark:text-dark-ink-soft"
              >
                What did you do today?
              </label>

              <textarea
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={4}
                placeholder="Sat in on a client call, fixed a form validation bug..."
                required
                className={`${inputClass} resize-y`}
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs text-ink-soft dark:text-dark-ink-soft">
                One day at a time ✧
              </p>

              <button
                type="submit"
                disabled={saving}
                className="soft-card soft-card-hover inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-rose to-rose-deep px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-rose/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-rose/25 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? 'Adding...' : 'Add entry'}
                <span aria-hidden="true">🌙</span>
              </button>
            </div>
          </form>
        </section>

        {/* Entries */}
        <section>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-mocha dark:text-dark-ink-soft">
                The little things add up
              </p>

              <h2 className="heading-font text-2xl font-bold text-ink sm:text-3xl dark:text-dark-ink">
                Your entries <span>🌷</span>
              </h2>
            </div>

            <span className="text-sm text-ink-soft dark:text-dark-ink-soft">
              {entries.length} logged
            </span>
          </div>

          {loading && (
            <div className="soft-card rounded-3xl border border-petal/70 bg-white/60 p-8 text-center backdrop-blur-md dark:border-dark-line dark:bg-dark-surface/70">
              <span className="mb-3 block animate-float text-2xl">🌙</span>
              <p className="text-sm text-ink-soft dark:text-dark-ink-soft">
                Gathering your entries...
              </p>
            </div>
          )}

          {!loading && entries.length === 0 && (
            <div className="soft-card rounded-3xl border border-white/80 bg-white/60 p-10 text-center shadow-sm backdrop-blur-xl dark:border-dark-line dark:bg-dark-surface/70">
              <span className="mb-4 block text-3xl">🌱</span>
              <h3 className="heading-font text-lg font-bold text-ink dark:text-dark-ink">
                Your story starts here
              </h3>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-7 text-ink-soft dark:text-dark-ink-soft">
                No entries yet. Add your first day above and start building
                your little collection of memories.
              </p>
            </div>
          )}

          {!loading && entries.length > 0 && (
 <div className="flex flex-col gap-5">
  {paginatedEntries.map((entry, index) => (
    <article
      key={entry.id}
      className="soft-card group relative rounded-3xl border border-white/80 bg-white/60 p-6 shadow-[0_12px_40px_-28px_rgba(100,70,110,0.35)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/80 sm:p-7 dark:border-dark-line dark:bg-dark-surface/70 dark:hover:bg-dark-raised/80"
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      <button
        type="button"
        onClick={() => handleDelete(entry.id)}
        disabled={deletingId !== null}
        className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-xl text-sm text-mocha/70 transition hover:bg-blush hover:text-rose-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose/50 disabled:cursor-not-allowed disabled:opacity-40 dark:text-dark-ink-soft dark:hover:bg-dark-raised"
        aria-label={`Delete entry from ${entry.date}`}
        title="Delete entry"
      >
        {deletingId === entry.id ? '…' : '✕'}
      </button>

      <div className="mb-4 flex flex-wrap items-center gap-3 pr-10">
        <span className="heading-font font-bold text-ink dark:text-dark-ink">
          {entry.date}
        </span>

        <span className="soft-pill rounded-xl border border-petal/70 bg-blush/80 px-3 py-1.5 text-xs font-bold text-rose-deep dark:border-dark-line dark:bg-dark-raised dark:text-dark-ink">
          {entry.hours} hrs
        </span>
      </div>

      <p className="whitespace-pre-wrap text-sm leading-7 text-ink-soft sm:text-base dark:text-dark-ink-soft">
        {entry.note}
      </p>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-5 right-6 text-sm text-petal/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      >
        ✧
      </span>
    </article>
  ))}
</div>
    )}

        {/* Pagination */}
        {totalPages > 1 && (
          <nav
            aria-label="Entries pagination"
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={currentPage === 1}
              className="rounded-full border border-petal/70 bg-white/60 px-5 py-2.5 text-sm font-semibold text-cocoa shadow-sm backdrop-blur-md transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 dark:border-dark-line dark:bg-dark-surface/70 dark:text-dark-ink-soft dark:hover:bg-dark-raised"
            >
              ← Previous
            </button>

            <span className="rounded-full border border-petal/50 bg-blush/70 px-4 py-2.5 text-sm font-semibold text-rose-deep dark:border-dark-line dark:bg-dark-raised dark:text-dark-ink">
              {currentPage} / {totalPages}
            </span>

            <button
              type="button"
              onClick={() =>
                setCurrentPage((page) => Math.min(totalPages, page + 1))
              }
              disabled={currentPage === totalPages}
              className="rounded-full border border-petal/70 bg-white/60 px-5 py-2.5 text-sm font-semibold text-cocoa shadow-sm backdrop-blur-md transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 dark:border-dark-line dark:bg-dark-surface/70 dark:text-dark-ink-soft dark:hover:bg-dark-raised"
            >
              Next →
            </button>
          </nav>
        )}
        </section>

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