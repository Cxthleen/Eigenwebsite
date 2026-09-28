'use client'

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from 'react'

import { burstParticles, STAR_PATH } from './particles'
import styles from './shootingStar.module.css'

type Phase = 'falling' | 'impact' | 'done'

/* How long the star takes to fall onto the target. */
const FALL_MS = 2100
const FALL_DELAY_MS = 150

type ParticleStyle = CSSProperties & {
  '--x': string
  '--y': string
  '--size': string
  '--spin': string
  '--dur': string
  '--delay': string
}

type Props = {
  /* The element the star lands on (its vertical center). */
  targetRef: RefObject<HTMLElement | null>
  /* Called the moment the star hits the target. */
  onLand: () => void
}

export default function ShootingStar({ targetRef, onLand }: Props) {
  const [phase, setPhase] = useState<Phase>('falling')
  const overlayRef = useRef<HTMLDivElement>(null)
  const starRef = useRef<HTMLDivElement>(null)

  /*
   * Measure where the target is, THEN start the fall.
   *
   * The fall is started from JS (not CSS) so it can never
   * begin before we know the landing spot, and so landing
   * doesn't depend on React catching an animationend that
   * may fire before hydration.
   */
  useEffect(() => {
    const overlay = overlayRef.current
    const star = starRef.current
    const target = targetRef.current

    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const land = () =>
      setPhase((p) => (p === 'falling' ? 'impact' : p))

    if (!overlay || !star || !target || reduced) {
      land()
      return
    }

    const overlayRect = overlay.getBoundingClientRect()
    const targetRect = target.getBoundingClientRect()
    const impactY =
      targetRect.top - overlayRect.top + targetRect.height / 2

    // used by the burst
    overlay.style.setProperty('--impact-y', `${impactY}px`)

    const fall = star.animate(
      [
        { opacity: 0, transform: 'translate(-50%, -60px) scale(0.6)' },
        { opacity: 1, offset: 0.06 },
        {
          opacity: 1,
          transform: `translate(-50%, ${impactY - 20}px) scale(1.15)`,
        },
      ],
      {
        duration: FALL_MS,
        delay: FALL_DELAY_MS,
        easing: 'linear',
        fill: 'forwards',
      },
    )

    // cancelled on unmount → rejects; that's fine
    fall.finished.then(land).catch(() => {})

    // safety net if the animation never finishes (e.g. hidden tab)
    const fallback = window.setTimeout(
      land,
      FALL_DELAY_MS + FALL_MS + 600,
    )

    return () => {
      fall.cancel()
      window.clearTimeout(fallback)
    }
  }, [targetRef])

  useEffect(() => {
    if (phase !== 'impact') return

    onLand()

    const cleanup = window.setTimeout(() => setPhase('done'), 1800)

    return () => window.clearTimeout(cleanup)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  if (phase === 'done') return null

  return (
    <div ref={overlayRef} className={styles.overlay} aria-hidden="true">
      {phase === 'falling' && (
        <div ref={starRef} className={styles.shootingStar}>
          <div className={styles.starTrail} />
          <svg
            className={styles.starHead}
            viewBox="0 0 24 24"
            width="40"
            height="40"
            fill="#fffaf0"
          >
            <path d={STAR_PATH} />
          </svg>
        </div>
      )}

      {phase === 'impact' && (
        <div className={styles.burst}>
          <div className={styles.burstFlash} />
          <div className={styles.burstRing} />

          {burstParticles.map((p, index) => (
            <svg
              key={index}
              viewBox="0 0 24 24"
              className={styles.burstStar}
              style={
                {
                  '--x': p.x,
                  '--y': p.y,
                  '--size': p.size,
                  '--spin': p.spin,
                  '--dur': p.dur,
                  '--delay': p.delay,
                  fill: p.color,
                } as ParticleStyle
              }
            >
              <path d={STAR_PATH} />
            </svg>
          ))}
        </div>
      )}
    </div>
  )
}
