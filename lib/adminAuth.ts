import { createHmac, timingSafeEqual } from 'crypto'
import { cookies } from 'next/headers'

export const ADMIN_COOKIE = 'logbook_admin'

// the cookie holds an HMAC of the password, so it can't be forged without knowing it
export function adminToken() {
  const password = process.env.ADMIN_PASSWORD
  if (!password) throw new Error('ADMIN_PASSWORD is not set')
  return createHmac('sha256', password).update('logbook-admin').digest('hex')
}

function safeEqual(a: string, b: string) {
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB)
}

export function checkPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD
  return !!expected && safeEqual(password, expected)
}

export async function isAdmin() {
  const cookie = (await cookies()).get(ADMIN_COOKIE)?.value
  return !!cookie && safeEqual(cookie, adminToken())
}
