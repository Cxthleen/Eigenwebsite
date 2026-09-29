'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import Navbar from '@/components/layout/navbar'
import FloatingDecor from '@/components/shared/floatingDecor'
import dreamy from '@/components/dreamy/dreamy.module.css'
import { usePointerGlow } from '@/hooks/usePointerGlow'
import { supabase } from '@/lib/supabase'

import styles from './blog.module.css'

type Entry = {
  id: string
  date: string
  hours: number
  note: string
}

const GOAL_HOURS = 1196

/* stars along the progress trail that light up as you pass them */
const MILESTONES = [25, 50, 75, 100]

type EntryCardProps = {
  entry: Entry
  index: number
  canDelete: boolean
  deletingId: string | null
  onDelete: (id: string) => void
}

function EntryCard({ entry, index, canDelete, deletingId, onDelete }: EntryCardProps) {
  const glow = usePointerGlow({ tilt: 4 })

  return (
    <article
      {...glow}
      className={`${dreamy.glass} ${dreamy.glow} ${dreamy.tilt} ${styles.entry}`}
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      {canDelete && (
        <button
          type="button"
          onClick={() => onDelete(entry.id)}
          disabled={deletingId !== null}
          className={styles.delete}
          aria-label={`Delete entry from ${entry.date}`}
          title="Delete entry"
        >
          {deletingId === entry.id ? '…' : '✕'}
        </button>
      )}

      <div className="mb-4 flex flex-wrap items-center gap-3 pr-10">
        <span className={`heading-font ${styles.entryDate}`}>{entry.date}</span>

        <span className={styles.hoursPill}>
          <span aria-hidden="true">☾</span>
          {entry.hours} hrs
        </span>
      </div>

      <p className={styles.note}>{entry.note}</p>

      <span aria-hidden="true" className={styles.entrySparkle}>
        ✦
      </span>
    </article>
  )
}

export default function Blog() {
  const progressGlow = usePointerGlow()
  const formGlow = usePointerGlow()
  const loginGlow = usePointerGlow()

  const [entries, setEntries] = useState<Entry[]>([])
  const [date, setDate] = useState('')
  const [hours, setHours] = useState('')
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  // brief "saved" sparkle message after adding an entry
  const [justSaved, setJustSaved] = useState(false)
  // only the owner (logged in with ADMIN_PASSWORD) can add or delete entries
  const [isAdmin, setIsAdmin] = useState(false)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

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
    fetch('/api/admin')
      .then((res) => res.json())
      .then((data) => setIsAdmin(!!data.isAdmin))
      .catch(() => setIsAdmin(false))
  }, [])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()

    const res = await fetch('/api/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    setLoginError(!res.ok)
    setIsAdmin(res.ok)
    if (res.ok) {
      setShowLogin(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    setPassword('')
  }

  function closeLogin() {
    setShowLogin(false)
    setLoginError(false)
    setPassword('')
  }

  // close the login popup with Escape
  useEffect(() => {
    if (!showLogin) return

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') closeLogin()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [showLogin])

  async function handleLogout() {
    await fetch('/api/admin', { method: 'DELETE' })
    setIsAdmin(false)
  }

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

    const res = await fetch('/api/entries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date, hours: parsedHours, note }),
    })

    if (!res.ok) {
      console.error('Error adding entry:', res.status)
      setSaving(false)
      return
    }

    setDate('')
    setHours('')
    setNote('')

    await fetchEntries()
    setCurrentPage(1)
    setSaving(false)
    setJustSaved(true)
    window.setTimeout(() => setJustSaved(false), 2500)
  }

  async function handleDelete(id: string) {
    if (deletingId) return

    setDeletingId(id)

    const res = await fetch(`/api/entries?id=${encodeURIComponent(id)}`, { method: 'DELETE' })

    if (!res.ok) {
      console.error('Error deleting entry:', res.status)
      setDeletingId(null)
      return
    }

    await fetchEntries()
    setCurrentPage((page) =>
    Math.min(page, Math.max(1, Math.ceil((entries.length - 1) / ENTRIES_PER_PAGE)))
  )
    setDeletingId(null)
  }

  return (
    <main className="relative isolate min-h-screen w-full overflow-hidden text-ink">
      {/* Navbar only on this page */}
      <div className="absolute left-0 top-4 z-40 w-full px-4">
        <Navbar />
      </div>

      {/* Floating decorations */}
      <FloatingDecor className="right-[10%] top-36 hidden text-5xl opacity-60 sm:block">☾</FloatingDecor>
      <FloatingDecor className="left-[8%] top-[42rem] hidden text-xl opacity-70 sm:block" delay="1.2s">
        ✦
      </FloatingDecor>
      <FloatingDecor className="right-[9%] top-[78rem] hidden text-2xl opacity-60 sm:block" delay="2s">
        ✧
      </FloatingDecor>

      <div className="relative z-10 mx-auto w-full max-w-5xl px-5 pb-24 pt-32 sm:px-8 sm:pt-40">
        {/* Page heading */}
        <header className="mb-14 text-center">
          <p className={`mb-5 ${dreamy.badge}`}>
            <span className={dreamy.badgeStar} aria-hidden="true">✧</span>
            LITTLE STEPS, BIG PROGRESS
            <span className={dreamy.badgeStar} aria-hidden="true">✧</span>
          </p>

          <h1 className="heading-font text-4xl sm:text-6xl">
            <span className={dreamy.title}>Internship logbook</span>
          </h1>

          <p className={`mx-auto mt-6 max-w-xl text-base leading-8 sm:text-lg ${dreamy.subtitle}`}>
            A little diary of my internship: the hours, the lessons, and all
            the tiny wins worth remembering.
          </p>
        </header>

        {/* Progress dashboard */}
        <section aria-label="Internship hours progress" className="relative mb-10">
          <div
            {...progressGlow}
            className={`${dreamy.glass} ${dreamy.glow} rounded-[2rem] p-6 sm:p-9`}
          >
            <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className={styles.eyebrow}>✧ Your progress</p>

                <p
                  key={totalHours}
                  className={`heading-font mt-3 text-4xl font-bold animate-pop sm:text-5xl ${styles.bigNumber}`}
                >
                  {totalHours.toLocaleString()}
                  <span className={`ml-2 text-base font-normal sm:text-lg ${styles.muted}`}>
                    / {GOAL_HOURS.toLocaleString()} hrs
                  </span>
                </p>
              </div>

              <span className={styles.percent}>{progressPercent.toFixed(1)}% complete</span>
            </div>

            <div
              className={styles.track}
              role="progressbar"
              aria-valuenow={Math.round(progressPercent)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Internship hours progress"
            >
              {MILESTONES.map((m) => (
                <span
                  key={m}
                  aria-hidden="true"
                  className={`${styles.milestone} ${progressPercent >= m ? styles.milestoneLit : ''}`}
                  style={{ left: `${m === 100 ? 97 : m}%` }}
                >
                  ✦
                </span>
              ))}

              <div className={styles.fill} style={{ width: `${progressPercent}%` }}>
                {progressPercent > 0 && (
                  <span aria-hidden="true" className={styles.moonTip}>
                    🌙
                  </span>
                )}
              </div>
            </div>

            <div className={styles.milestoneLabels} aria-hidden="true">
              {MILESTONES.map((m) => (
                <span
                  key={m}
                  className={styles.milestoneLabel}
                  style={{ left: `${m === 100 ? 97 : m}%` }}
                >
                  {m}%
                </span>
              ))}
            </div>

            <div className={`mt-5 flex flex-wrap items-center justify-between gap-3 text-sm ${styles.muted}`}>
              <p>
                {hoursLeft === 0
                  ? 'You did it! Internship goal reached 🌷'
                  : `${hoursLeft.toLocaleString()} hours to go, you’ve totally got this 🌷`}
              </p>

              <p className="text-xs font-medium">
                {entries.length} {entries.length === 1 ? 'entry' : 'entries'} logged
              </p>
            </div>
          </div>
        </section>

        {/* Add entry form, owner only */}
        {isAdmin && (
          <section className="mb-16">
            <div className="mb-5 flex items-center gap-3">
              <div>
                <h2 className={`heading-font text-xl font-bold ${styles.entryDate}`}>
                  Add a little update
                </h2>
                <p className={`mt-1 text-sm ${styles.muted}`}>What did today look like?</p>
              </div>
            </div>

            <form
              {...formGlow}
              onSubmit={handleSubmit}
              className={`${dreamy.glass} ${dreamy.glow} flex flex-col gap-6 rounded-[2rem] p-6 sm:p-8`}
            >
              <div className="grid gap-5 sm:grid-cols-[1fr_180px]">
                <div>
                  <label htmlFor="date" className={styles.label}>
                    Date
                  </label>

                  <input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className={styles.input}
                  />
                </div>

                <div>
                  <label htmlFor="hours" className={styles.label}>
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
                    className={styles.input}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="note" className={styles.label}>
                  Today&apos;s little story
                </label>

                <textarea
                  id="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={4}
                  placeholder="Sat in on a client call, fixed a form validation bug..."
                  required
                  className={`${styles.input} resize-y`}
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                {justSaved ? (
                  <p className={styles.saved} aria-live="polite">
                    ✨ Saved! Another little star in your sky
                  </p>
                ) : (
                  <p className={`text-xs ${styles.muted}`}>One day at a time ✧</p>
                )}

                <button
                  type="submit"
                  disabled={saving}
                  className={`${dreamy.btn} ${dreamy.btnPrimary} ${styles.submit}`}
                >
                  {saving ? 'Adding...' : 'Add entry'}
                  <span aria-hidden="true">🌙</span>
                </button>
              </div>
            </form>
          </section>
        )}

        {/* Entries */}
        <section>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className={`mb-2 ${styles.eyebrow}`}>The little things add up</p>

              <h2 className="heading-font text-2xl sm:text-3xl">
                <span className={dreamy.title}>Your entries</span>
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <span className={`text-sm ${styles.muted}`}>{entries.length} logged</span>

              {/* owner login: a little moon key that opens the login popup */}
              {!isAdmin && (
                <button
                  type="button"
                  onClick={() => setShowLogin(true)}
                  className={styles.moonKey}
                  aria-haspopup="dialog"
                  aria-label="Owner login"
                  title="Owner login"
                >
                  ☾
                </button>
              )}

              {/* owner is logged in: the moon swaps for a little "log out" pill */}
              {isAdmin && (
                <button type="button" onClick={handleLogout} className={styles.logoutPill}>
                  <span aria-hidden="true">☾</span>
                  Log out
                </button>
              )}
            </div>
          </div>


          {loading && (
            <div className={`${dreamy.glass} rounded-3xl p-8 text-center`}>
              <span className="mb-3 block animate-float text-2xl">🌙</span>
              <p className={`text-sm ${styles.muted}`}>Gathering your entries...</p>
            </div>
          )}

          {!loading && entries.length === 0 && (
            <div className={`${dreamy.glass} rounded-3xl p-10 text-center`}>
              <span className="mb-4 block text-3xl">🌱</span>
              <h3 className={`heading-font text-lg font-bold ${styles.entryDate}`}>
                Your story starts here ✧
              </h3>
              <p className={`mx-auto mt-2 max-w-sm text-sm leading-7 ${styles.muted}`}>
                Nothing here yet! Add your first day above and watch your
                little collection of memories grow.
              </p>
            </div>
          )}

          {!loading && entries.length > 0 && (
            <div className="flex flex-col gap-5">
              {paginatedEntries.map((entry, index) => (
                <EntryCard
                  key={entry.id}
                  entry={entry}
                  index={index}
                  canDelete={isAdmin}
                  deletingId={deletingId}
                  onDelete={handleDelete}
                />
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
                className={`${dreamy.btn} ${dreamy.btnGhost} ${styles.pageBtn}`}
              >
                ← Previous
              </button>

              <span className={styles.pageNum}>
                {currentPage} / {totalPages}
              </span>

              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                disabled={currentPage === totalPages}
                className={`${dreamy.btn} ${dreamy.btnGhost} ${styles.pageBtn}`}
              >
                Next →
              </button>
            </nav>
          )}
        </section>

        {/* Back home */}
        <div className="mt-20 text-center">
          <Link href="/" className={`${dreamy.btn} ${dreamy.btnGhost}`}>
            <span aria-hidden="true">←</span>
            Back home
            <span aria-hidden="true">✧</span>
          </Link>
        </div>
      </div>

      {/* Owner login popup, portalled to body so it floats above the navbar */}
      {!isAdmin &&
        showLogin &&
        createPortal(
          <div className={styles.loginOverlay} onClick={closeLogin}>
            <form
              {...loginGlow}
              onSubmit={handleLogin}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="owner-login-title"
              className={`${dreamy.glass} ${dreamy.glow} ${styles.loginCard}`}
            >
              <span aria-hidden="true" className={styles.loginMoon}>
                🌙
              </span>

              <button
                type="button"
                onClick={closeLogin}
                className={styles.delete}
                aria-label="Close"
                title="Close"
              >
                ✕
              </button>

              <h2 id="owner-login-title" className={`heading-font text-lg font-bold ${styles.entryDate}`}>
                Owner&apos;s corner
              </h2>
              <p className={`mt-1 mb-5 text-sm ${styles.muted}`}>
                Just me, tucking in today&apos;s story ✧
              </p>

              <label htmlFor="owner-password" className="sr-only">
                Owner password
              </label>
              <input
                id="owner-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Secret password"
                autoFocus
                required
                className={styles.input}
              />

              {loginError && (
                <p className={`${styles.saved} mt-3`} aria-live="polite">
                  Hmm, that&apos;s not quite it ✧
                </p>
              )}

              <button
                type="submit"
                className={`${dreamy.btn} ${dreamy.btnPrimary} mt-5 w-full justify-center`}
              >
                Unlock
                <span aria-hidden="true">✨</span>
              </button>
            </form>
          </div>,
          document.body
        )}
    </main>
  )
}
