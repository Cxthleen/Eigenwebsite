import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { ADMIN_COOKIE, adminToken, checkPassword, isAdmin } from '@/lib/adminAuth'

export async function GET() {
  return NextResponse.json({ isAdmin: await isAdmin() })
}

export async function POST(request: Request) {
  const { password } = await request.json().catch(() => ({}))

  if (typeof password !== 'string' || !checkPassword(password)) {
    return NextResponse.json({ error: 'Wrong password' }, { status: 401 })
  }

  ;(await cookies()).set(ADMIN_COOKIE, adminToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 90,
  })

  return NextResponse.json({ isAdmin: true })
}

export async function DELETE() {
  ;(await cookies()).delete(ADMIN_COOKIE)
  return NextResponse.json({ isAdmin: false })
}
