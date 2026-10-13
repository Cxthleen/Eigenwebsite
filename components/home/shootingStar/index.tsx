'use client'

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from 'react'

import { burstParticles, COLORS, SPARKLE_PATH } from './particles'
import styles from './shootingStar.module.css'

type Phase = 'falling' | 'impact' | 'done'

/* How long the star takes to glide onto the target. */
const FALL_MS = 2100
const FALL_DELAY_MS = 150
/* how often the tail sheds a fleck of stardust */
const DUST_EVERY_MS = 35

type ParticleStyle = CSSProperties & {
  '--x': string
  '--y': string
  '--fall': string
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

/* one fleck of stardust that floats off the tail and fades */
function shedDust(overlay: HTMLElement, x: number, y: number, angle: number) {
  const dot = document.createElement('span')
  dot.className = styles.dust
  const size = 2 + Math.random() * 3
  const color = COLORS[Math.floor(Math.random() * COLORS.length)]
  Object.assign(dot.style, {
    left: `${x}px`,
    top: `${y}px`,
    width: `${size}px`,
    height: `${size}px`,
    background: color,
    boxShadow: `0 0 ${size * 2}px ${color}`,
  })
  overlay.appendChild(dot)

  // drift back along the path a little, sideways, and slowly down
  const back = 10 + Math.random() * 25
  const side = (Math.random() - 0.5) * 24
  const dx = -Math.cos(angle) * back - Math.sin(angle) * side
  const dy = -Math.sin(angle) * back + Math.cos(angle) * side + 14

  dot
    .animate(
      [
        { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
        { opacity: 0, transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0.3)` },
      ],
      { duration: 700 + Math.random() * 600, easing: 'ease-out', fill: 'forwards' },
    )
    .finished.then(() => dot.remove())
    .catch(() => dot.remove())
}

export default function ShootingStar({ targetRef, onLand }: Props) {
  const [phase, setPhase] = useState<Phase>('falling')
  const overlayRef = useRef<HTMLDivElement>(null)
  const starRef = useRef<HTMLDivElement>(null)

  /*
   * Measure where the target is, THEN start the glide.
   *
   * The glide is started from JS (not CSS) so it can never
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

    // fall straight down the middle onto the moon
    const startX = 0
    const startY = -60
    const endY = impactY - 6
    const angle = Math.atan2(endY - startY, -startX)
    star.style.setProperty('--angle', `${angle}rad`)

    const fall = star.animate(
      [
        { opacity: 0, transform: `translate(calc(-50% + ${startX}px), ${startY}px) scale(0.5)` },
        { opacity: 1, offset: 0.08 },
        { opacity: 1, transform: `translate(-50%, ${endY}px) scale(1.1)` },
      ],
      {
        duration: FALL_MS,
        delay: FALL_DELAY_MS,
        // gentle start, gathering speed as it nears the moon
        easing: 'cubic-bezier(0.45, 0, 0.8, 0.45)',
        fill: 'forwards',
      },
    )

    // stardust shed from the head while it flies
    const dust = window.setInterval(() => {
      const r = star.getBoundingClientRect()
      if (r.width === 0 || Number(getComputedStyle(star).opacity) < 0.5) return
      shedDust(
        overlay,
        r.left - overlayRect.left + r.width / 2,
        r.top - overlayRect.top + r.height / 2,
        angle,
      )
    }, DUST_EVERY_MS)

    // cancelled on unmount → rejects; that's fine
    fall.finished.then(land).catch(() => {})

    // safety net if the animation never finishes (e.g. hidden tab)
    const fallback = window.setTimeout(
      land,
      FALL_DELAY_MS + FALL_MS + 600,
    )

    return () => {
      fall.cancel()
      window.clearInterval(dust)
      window.clearTimeout(fallback)
    }
  }, [targetRef])

  useEffect(() => {
    if (phase !== 'impact') return

    onLand()

    const cleanup = window.setTimeout(() => setPhase('done'), 2000)

    return () => window.clearTimeout(cleanup)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  if (phase === 'done') return null

  return (
    <div ref={overlayRef} className={styles.overlay} aria-hidden="true">
      {phase === 'falling' && (
        <div ref={starRef} className={styles.shootingStar}>
          <div className={styles.tail}>
            <div className={styles.tailGlow} />
            <div className={styles.tailCore} />
          </div>
          <div className={styles.headGlow} />
          <svg
            className={styles.starHead}
            viewBox="0 0 24 24"
            width="34"
            height="34"
          >
            <path d={SPARKLE_PATH} />
          </svg>
        </div>
      )}

      {phase === 'impact' && (
        <div className={styles.burst}>
          <div className={styles.bloom} />
          <div className={styles.burstRing} />
          <div className={`${styles.burstRing} ${styles.ringLate}`} />

          {burstParticles.map((p, index) => (
            <svg
              key={index}
              viewBox="0 0 24 24"
              className={styles.burstStar}
              style={
                {
                  '--x': p.x,
                  '--y': p.y,
                  '--fall': p.fall,
                  '--size': p.size,
                  '--spin': p.spin,
                  '--dur': p.dur,
                  '--delay': p.delay,
                  fill: p.color,
                  color: p.color,
                } as ParticleStyle
              }
            >
              <path d={SPARKLE_PATH} />
            </svg>
          ))}
        </div>
      )}
    </div>
  )
}
