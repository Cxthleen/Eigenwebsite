'use client'

import { useRef } from 'react'

import {
  cloudMask,
  PUFF_MASK,
  useMouseParallax,
  type Bump,
  type Vars,
} from '@/components/home/heroScene'

import styles from './ambientScene.module.css'

/*
 * A quieter echo of the hero scene for sections and pages:
 * a faint aurora, a soft glow behind the content, a couple of
 * little clouds and a few rising motes, all drifting with the mouse.
 * Drop it in as the first child of a `relative isolate` container.
 */

type Layout = {
  aurora: { top: string; left: string; tilt: number }
  clouds: { top: string; left: string; scale: number; dur: number; delay: number }[]
  motes: { left: string; dur: number; delay: number; sway: number }[]
}

/* a few fixed arrangements so neighbouring sections don't look identical */
const LAYOUTS: Layout[] = [
  {
    aurora: { top: '6%', left: '-18%', tilt: -8 },
    clouds: [
      { top: '18%', left: '6%', scale: 0.55, dur: 44, delay: -12 },
      { top: '64%', left: '84%', scale: 0.45, dur: 50, delay: -30 },
    ],
    motes: [
      { left: '10%', dur: 22, delay: -4, sway: 16 },
      { left: '27%', dur: 27, delay: -15, sway: -12 },
      { left: '71%', dur: 24, delay: -9, sway: 14 },
      { left: '88%', dur: 29, delay: -20, sway: -18 },
    ],
  },
  {
    aurora: { top: '10%', left: '48%', tilt: 10 },
    clouds: [
      { top: '12%', left: '82%', scale: 0.5, dur: 48, delay: -8 },
      { top: '72%', left: '4%', scale: 0.6, dur: 42, delay: -26 },
    ],
    motes: [
      { left: '6%', dur: 25, delay: -11, sway: -14 },
      { left: '34%', dur: 21, delay: -2, sway: 12 },
      { left: '63%', dur: 28, delay: -17, sway: -16 },
      { left: '93%', dur: 23, delay: -7, sway: 18 },
    ],
  },
  {
    aurora: { top: '2%', left: '20%', tilt: -4 },
    clouds: [
      { top: '24%', left: '3%', scale: 0.45, dur: 52, delay: -18 },
      { top: '20%', left: '86%', scale: 0.55, dur: 46, delay: -5 },
    ],
    motes: [
      { left: '14%', dur: 26, delay: -6, sway: 14 },
      { left: '42%', dur: 30, delay: -21, sway: -12 },
      { left: '58%', dur: 22, delay: -13, sway: 16 },
      { left: '81%', dur: 27, delay: -3, sway: -14 },
    ],
  },
]

const BANK_MASK = cloudMask(
  [[210, 50, 150], [170, 62, 140], [260, 75, 152], [190, 48, 144], [230, 66, 150], [200, 54, 140], [180, 58, 148]] as Bump[],
  5,
)

type Props = {
  /* which arrangement to use (wraps around) */
  variant?: number
  /* a faint sea of clouds along the bottom, echoing the hero */
  cloudBank?: boolean
}

export default function AmbientScene({ variant = 0, cloudBank = false }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  useMouseParallax(ref)

  const layout = LAYOUTS[variant % LAYOUTS.length]

  return (
    <div ref={ref} className={styles.scene} aria-hidden="true">
      <div className={`${styles.depth} ${styles.far}`}>
        <div
          className={styles.aurora}
          style={
            {
              top: layout.aurora.top,
              left: layout.aurora.left,
              '--tilt': `${layout.aurora.tilt}deg`,
            } as Vars
          }
        />
        <div className={styles.glow} />
      </div>

      <div className={`${styles.depth} ${styles.mid}`}>
        {layout.clouds.map((c, i) => (
          <div
            key={i}
            className={styles.puff}
            style={
              {
                top: c.top,
                left: c.left,
                '--mask': PUFF_MASK,
                '--scale': String(c.scale),
                '--dur': `${c.dur}s`,
                '--delay': `${c.delay}s`,
              } as Vars
            }
          />
        ))}
      </div>

      <div className={`${styles.depth} ${styles.near}`}>
        {layout.motes.map((m, i) => (
          <span
            key={i}
            className={styles.mote}
            style={
              {
                left: m.left,
                '--dur': `${m.dur}s`,
                '--delay': `${m.delay}s`,
                '--sway': `${m.sway}px`,
              } as Vars
            }
          />
        ))}
      </div>

      {cloudBank && (
        <div className={`${styles.depth} ${styles.near} ${styles.bankWrap}`}>
          <div className={`${styles.bank} ${styles.rim}`} style={{ '--mask': BANK_MASK } as Vars} />
          <div className={styles.bank} style={{ '--mask': BANK_MASK } as Vars} />
        </div>
      )}
    </div>
  )
}
