'use client'

import type { PointerEvent } from 'react'

/*
 * Moonlight that follows the cursor (+ optional 3D tilt).
 * Writes CSS vars on the element; pair with the
 * .glow / .tilt classes from dreamy.module.css.
 */
export function usePointerGlow({ tilt = 0 }: { tilt?: number } = {}) {
  function onPointerMove(e: PointerEvent<HTMLElement>) {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    el.style.setProperty('--mx', `${x}px`)
    el.style.setProperty('--my', `${y}px`)

    if (tilt) {
      const px = x / rect.width - 0.5
      const py = y / rect.height - 0.5
      el.style.setProperty('--rx', `${(-py * tilt).toFixed(2)}deg`)
      el.style.setProperty('--ry', `${(px * tilt).toFixed(2)}deg`)
    }
  }

  function onPointerLeave(e: PointerEvent<HTMLElement>) {
    e.currentTarget.style.setProperty('--rx', '0deg')
    e.currentTarget.style.setProperty('--ry', '0deg')
  }

  return { onPointerMove, onPointerLeave }
}
