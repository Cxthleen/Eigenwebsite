'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '../lib/supabase'

type Entry = {
  id: string
  date: string
  hours: number
  note: string
}

export default function Blog() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [date, setDate] = useState('')
  const [hours, setHours] = useState('')
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(true)

  const totalHours = entries.reduce((sum, entry) => sum + entry.hours, 0)


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
      setEntries(data as Entry[])
    }
    setLoading(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!date || !hours || !note) return

    const { error } = await supabase
      .from('entries')
      .insert([{ date, hours: parseFloat(hours), note }])

    if (error) {
      console.error('Error adding entry:', error.message)
      return
    }

    setDate('')
    setHours('')
    setNote('')
    fetchEntries()
  }

  async function handleDelete(id: string) {
    const { error } = await supabase.from('entries').delete().eq('id', id)

    if (error) {
      console.error('Error deleting entry:', error.message)
      return
    }

    fetchEntries()
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-14">
      <Link href="/" className="text-sm text-lavender hover:text-plum">
        ← back home
      </Link>

      <h1 className="heading-font text-3xl font-bold text-plum mt-4 mb-2">
        Internship logbook 📓
      </h1>
      <p className="text-plum-soft mb-8">
        Logging my hours and what I got up to each day.
      </p>

      <div className="bg-white border-2 border-pink-border rounded-2xl px-5 py-4 mb-8 flex items-center gap-3 w-fit">
        <div>
          <p className="text-xs font-semibold text-lavender uppercase tracking-wide">
            Total logged
          </p>
          <p className="heading-font text-xl font-bold text-plum">
            <p key={totalHours} className="heading-font text-xl font-bold text-plum animate-pop">
                {totalHours} hours
            </p>
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border-2 border-pink-border rounded-3xl p-6 shadow-sm mb-10 flex flex-col gap-4"
      >
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-sm font-semibold text-lavender block mb-1">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border-2 border-pink-border rounded-xl px-3 py-2 text-sm"
            />
          </div>
          <div className="w-28">
            <label className="text-sm font-semibold text-lavender block mb-1">
              Hours
            </label>
            <input
              type="number"
              step="0.5"
              min="0"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder="4"
              className="w-full border-2 border-pink-border rounded-xl px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-lavender block mb-1">
            What did you do today?
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            placeholder="Sat in on a client call, helped debug a form validation bug..."
            className="w-full border-2 border-pink-border rounded-xl px-3 py-2 text-sm"
          />
        </div>

        <button
          type="submit"
          className="self-start px-5 py-2 bg-pink text-white rounded-full text-sm font-bold shadow-sm hover:bg-pink-hover transition"
        >
          Add entry 🌙
        </button>
      </form>

      <div className="flex flex-col gap-4">
        {loading && <p className="text-plum-soft text-sm">Loading entries...</p>}

        {!loading && entries.length === 0 && (
          <p className="text-plum-soft text-sm">No entries yet — add your first day above!</p>
        )}

        {entries.map((entry) => (
          <div
            key={entry.id}
            className="bg-white border-2 border-pink-border rounded-3xl p-5 shadow-sm relative animate-card-in"
          >
            <button
              onClick={() => handleDelete(entry.id)}
              className="absolute top-4 right-4 text-xs text-lavender hover:text-pink-hover"
              aria-label="Delete entry"
            >
              ✕
            </button>
            <div className="flex items-center gap-3 mb-2">
              <span className="heading-font font-bold text-plum">{entry.date}</span>
              <span className="text-xs px-2 py-1 bg-pink-tag rounded-full text-pink-tag-text font-semibold">
                {entry.hours} hrs
              </span>
            </div>
            <p className="text-sm text-plum-soft whitespace-pre-wrap">{entry.note}</p>
          </div>
        ))}
      </div>
    </main>
  )
}