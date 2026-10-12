import { NextResponse } from 'next/server'
import { isAdmin } from '@/lib/adminAuth'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

const unauthorized = () => NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

type EntryInput = { date: string; hours: number; note: string; learned: string | null }

// shared validation for adding and editing entries
function parseEntry(body: Record<string, unknown>): EntryInput | null {
  const { date, hours, note, learned } = body
  const parsedHours = Number(hours)

  if (
    typeof date !== 'string' ||
    typeof note !== 'string' ||
    !date ||
    !note.trim() ||
    !Number.isFinite(parsedHours) ||
    parsedHours <= 0 ||
    parsedHours > 24 ||
    (learned != null && typeof learned !== 'string')
  ) {
    return null
  }

  // "what I learned" is optional, store empty as null
  return { date, hours: parsedHours, note, learned: learned?.trim() || null }
}

export async function POST(request: Request) {
  if (!(await isAdmin())) return unauthorized()

  const entry = parseEntry(await request.json().catch(() => ({})))
  if (!entry) return NextResponse.json({ error: 'Invalid entry' }, { status: 400 })

  const { error } = await supabaseAdmin.from('entries').insert([entry])

  if (error) {
    console.error('Error adding entry:', error.message)
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}

export async function PATCH(request: Request) {
  if (!(await isAdmin())) return unauthorized()

  const body = await request.json().catch(() => ({}))
  if ((typeof body.id !== 'string' && typeof body.id !== 'number') || body.id === '') {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  }

  const entry = parseEntry(body)
  if (!entry) return NextResponse.json({ error: 'Invalid entry' }, { status: 400 })

  const { error } = await supabaseAdmin.from('entries').update(entry).eq('id', body.id)

  if (error) {
    console.error('Error updating entry:', error.message)
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}

export async function DELETE(request: Request) {
  if (!(await isAdmin())) return unauthorized()

  const id = new URL(request.url).searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

  const { error } = await supabaseAdmin.from('entries').delete().eq('id', id)

  if (error) {
    console.error('Error deleting entry:', error.message)
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
