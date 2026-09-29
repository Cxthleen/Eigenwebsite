import { NextResponse } from 'next/server'
import { isAdmin } from '@/lib/adminAuth'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

const unauthorized = () => NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

export async function POST(request: Request) {
  if (!(await isAdmin())) return unauthorized()

  const { date, hours, note } = await request.json().catch(() => ({}))
  const parsedHours = Number(hours)

  if (
    typeof date !== 'string' ||
    typeof note !== 'string' ||
    !date ||
    !note.trim() ||
    !Number.isFinite(parsedHours) ||
    parsedHours <= 0 ||
    parsedHours > 24
  ) {
    return NextResponse.json({ error: 'Invalid entry' }, { status: 400 })
  }

  const { error } = await supabaseAdmin
    .from('entries')
    .insert([{ date, hours: parsedHours, note }])

  if (error) {
    console.error('Error adding entry:', error.message)
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
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
