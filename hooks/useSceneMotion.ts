'use client'

import { useEffect, type RefObject } from 'react'

/*
 * Drifts every `data-depth="dx dy"` element inside `ref` toward the mouse
 * (dx/dy = px at the screen edge). Writes `translate` straight onto those
 * few elements, so the rest of the page never has to restyle.
 */
export function useMouseParallax(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = ref.current
    if (!root) return
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const layers = [...root.querySelectorAll<HTMLElement>('[data-depth]')].map((el) => {
      const [dx, dy] = (el.dataset.depth ?? '0 0').split(' ').map(Number)
      return { el, dx, dy }
    })

    let tx = 0
    let ty = 0
    let x = 0
    let y = 0
    let frame = 0
    let visible = true

    const tick = () => {
      x += (tx - x) * 0.06
      y += (ty - y) * 0.06
      for (const { el, dx, dy } of layers) {
        el.style.translate = `${(x * dx).toFixed(2)}px ${(y * dy).toFixed(2)}px`
      }
      frame =
        Math.abs(tx - x) > 0.001 || Math.abs(ty - y) > 0.001
          ? requestAnimationFrame(tick)
          : 0
    }

    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth) * 2 - 1
      ty = (e.clientY / window.innerHeight) * 2 - 1
      if (visible && !frame) frame = requestAnimationFrame(tick)
    }

    // no work at all while this part of the page is scrolled away
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    io.observe(root)

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
    }
  }, [ref])
}

/*
 * Pauses every CSS animation inside `ref` while it's off screen
 * (sets `data-paused`; the scene stylesheets pause on it).
 */
export function usePauseOffscreen(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      el.toggleAttribute('data-paused', !entry.isIntersecting)
    })
    io.observe(el)
    return () => io.disconnect()
  }, [ref])
}
