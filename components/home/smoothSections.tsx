'use client'

import { useEffect } from 'react'

/*
 * Home page: one wheel tick / key press glides to the next
 * section with a soft ease, instead of the browser's fixed-speed
 * CSS snapping. Sections taller than the screen are visited in
 * two stops (their top, then their bottom) so nothing is skipped.
 *
 * Touch scrolling and reduced-motion users keep native scrolling.
 */

const QUIET_MS = 180 // trackpad inertia must pause this long before the next glide
const KEYS_DOWN = ['ArrowDown', 'PageDown', ' ']
const KEYS_UP = ['ArrowUp', 'PageUp']

// soft ease-in-out so the glide starts and lands gently
const ease = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

function snapPoints() {
  const vh = window.innerHeight
  const max = document.documentElement.scrollHeight - vh
  const points = new Set<number>([0, max])

  document.querySelectorAll<HTMLElement>('main[data-snap] > *').forEach((el) => {
    const top = el.getBoundingClientRect().top + window.scrollY
    points.add(Math.round(top))
    // tall section: also stop where its bottom meets the screen bottom
    if (el.offsetHeight > vh + 40) points.add(Math.round(top + el.offsetHeight - vh))
  })

  return [...points].filter((p) => p >= 0 && p <= max).sort((a, b) => a - b)
}

export default function SmoothSections() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const html = document.documentElement
    let animating = false
    let lastWheel = 0
    let frame = 0

    function glideTo(target: number) {
      const start = window.scrollY
      const distance = target - start
      if (Math.abs(distance) < 2) return

      // longer trips take a little longer, but always feel calm
      const duration = Math.min(1300, Math.max(750, Math.abs(distance) * 0.9))
      // clock starts on the first frame, so a paused/background tab can't skip the glide
      let t0 = -1
      animating = true
      // the global `scroll-behavior: smooth` would fight our per-frame scrolling
      html.style.scrollBehavior = 'auto'

      function step(now: number) {
        if (t0 < 0) t0 = now
        const t = Math.min(1, (now - t0) / duration)
        window.scrollTo(0, start + distance * ease(t))
        if (t < 1) {
          frame = requestAnimationFrame(step)
        } else {
          animating = false
          html.style.scrollBehavior = ''
        }
      }

      frame = requestAnimationFrame(step)
    }

    function go(direction: 1 | -1) {
      const y = window.scrollY
      const points = snapPoints()
      const target =
        direction === 1
          ? points.find((p) => p > y + 4)
          : [...points].reverse().find((p) => p < y - 4)
      if (target !== undefined) glideTo(target)
    }

    function onWheel(e: WheelEvent) {
      // leave pinch-zoom and sideways scrolling alone
      if (e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return

      e.preventDefault()
      const now = performance.now()
      const quiet = now - lastWheel > QUIET_MS
      lastWheel = now

      // swallow the glide itself and any trailing trackpad momentum
      if (animating || !quiet || Math.abs(e.deltaY) < 3) return
      go(e.deltaY > 0 ? 1 : -1)
    }

    function onKey(e: KeyboardEvent) {
      // don't hijack keys while typing (target can also be window/document)
      const target = e.target
      if (target instanceof Element && target.closest('input, textarea, select, [contenteditable]')) return
      if (e.altKey || e.ctrlKey || e.metaKey) return

      const down = KEYS_DOWN.includes(e.key) && !(e.key === ' ' && e.shiftKey)
      const up = KEYS_UP.includes(e.key) || (e.key === ' ' && e.shiftKey)
      if (!down && !up) return

      e.preventDefault()
      if (!animating) go(down ? 1 : -1)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKey)

    return () => {
      cancelAnimationFrame(frame)
      html.style.scrollBehavior = ''
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  return null
}
