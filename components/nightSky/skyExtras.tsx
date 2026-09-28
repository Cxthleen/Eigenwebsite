import type { CSSProperties } from 'react'

import styles from './skyExtras.module.css'

/*
 * Extra layers for the full-page backdrop so the sky
 * never feels empty: constellations, floating orbs,
 * clouds, ambient shooting stars, a planet and a moon.
 * Positions are fixed (no randomness) so SSR matches.
 */

const SPARKLE =
  'M12 0 C12.8 8 16 11.2 24 12 C16 12.8 12.8 16 12 24 C11.2 16 8 12.8 0 12 C8 11.2 11.2 8 12 0 Z'

/* lower-half stars (the base sky covers the top) */
const LOW_STARS = [
  { top: '72%', left: '6%', size: 16, dur: 3.4, delay: 0.4 },
  { top: '84%', left: '22%', size: 10, dur: 2.9, delay: 1.6 },
  { top: '78%', left: '40%', size: 8, dur: 4.2, delay: 2.2 },
  { top: '90%', left: '58%', size: 12, dur: 3.1, delay: 0.9 },
  { top: '74%', left: '71%', size: 18, dur: 3.8, delay: 2.8 },
  { top: '88%', left: '90%', size: 11, dur: 2.7, delay: 1.2 },
  { top: '48%', left: '3%', size: 9, dur: 3.6, delay: 3.1 },
  { top: '52%', left: '97%', size: 13, dur: 3.2, delay: 0.2 },
]

/* constellations as [x, y] points in a 100×100 box */
const CONSTELLATIONS = [
  {
    // a little "big dipper" top-left
    box: { top: '14%', left: '3%', width: 190, height: 110 },
    points: [[5, 60], [22, 50], [38, 55], [52, 42], [70, 30], [88, 38], [80, 62]],
    path: [0, 1, 2, 3, 4, 5, 6, 3],
  },
  {
    // a heart, bottom-right
    box: { top: '62%', left: '82%', width: 130, height: 120 },
    points: [[50, 90], [18, 55], [15, 25], [33, 12], [50, 28], [67, 12], [85, 25], [82, 55]],
    path: [0, 1, 2, 3, 4, 5, 6, 7, 0],
  },
  {
    // a small zigzag (cassiopeia-ish), mid-left
    box: { top: '58%', left: '8%', width: 150, height: 70 },
    points: [[5, 30], [28, 75], [50, 35], [72, 80], [95, 25]],
    path: [0, 1, 2, 3, 4],
  },
]

const ORBS = [
  { top: '20%', left: '12%', size: 90, hue: 'lilac', dur: 26, delay: 0 },
  { top: '65%', left: '30%', size: 60, hue: 'pink', dur: 22, delay: -6 },
  { top: '35%', left: '85%', size: 110, hue: 'peach', dur: 30, delay: -12 },
  { top: '80%', left: '65%', size: 70, hue: 'lilac', dur: 24, delay: -3 },
  { top: '8%', left: '60%', size: 50, hue: 'pink', dur: 20, delay: -9 },
  { top: '50%', left: '50%', size: 40, hue: 'peach', dur: 18, delay: -4 },
]

const CLOUDS = [
  { top: '12%', size: 1, dur: 90, delay: -20 },
  { top: '46%', size: 0.75, dur: 120, delay: -70 },
  { top: '78%', size: 1.2, dur: 105, delay: -40 },
]

const SHOOTING = [
  { top: '12%', left: '70%', dur: 11, delay: 3 },
  { top: '38%', left: '30%', dur: 15, delay: 8 },
  { top: '60%', left: '85%', dur: 19, delay: 13 },
]

type Vars = CSSProperties & Record<`--${string}`, string>

export default function SkyExtras() {
  return (
    <>
      {/* clouds (day) / wisps (night) */}
      {CLOUDS.map((c, i) => (
        <div
          key={`cloud-${i}`}
          className={styles.cloud}
          style={
            {
              top: c.top,
              '--scale': String(c.size),
              '--dur': `${c.dur}s`,
              '--delay': `${c.delay}s`,
            } as Vars
          }
        />
      ))}

      {/* floating glowy orbs */}
      {ORBS.map((o, i) => (
        <div
          key={`orb-${i}`}
          className={`${styles.orb} ${styles[o.hue]}`}
          style={
            {
              top: o.top,
              left: o.left,
              width: o.size,
              height: o.size,
              '--dur': `${o.dur}s`,
              '--delay': `${o.delay}s`,
            } as Vars
          }
        />
      ))}

      {/* constellations */}
      {CONSTELLATIONS.map((c, i) => (
        <svg
          key={`con-${i}`}
          className={styles.constellation}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ ...c.box, animationDelay: `${i * 1.7}s` }}
        >
          <polyline
            points={c.path.map((p) => c.points[p].join(',')).join(' ')}
            vectorEffect="non-scaling-stroke"
          />
          {c.points.map(([x, y], j) => (
            <circle
              key={j}
              cx={x}
              cy={y}
              r={j % 3 === 0 ? 1.8 : 1.2}
              style={{ animationDelay: `${(j * 0.6) % 3}s` }}
            />
          ))}
        </svg>
      ))}

      {/* more sparkle stars down low */}
      {LOW_STARS.map((s, i) => (
        <svg
          key={`low-${i}`}
          viewBox="0 0 24 24"
          width={s.size}
          height={s.size}
          className={styles.sparkle}
          style={
            {
              top: s.top,
              left: s.left,
              '--dur': `${s.dur}s`,
              '--delay': `${s.delay}s`,
            } as Vars
          }
        >
          <path d={SPARKLE} />
        </svg>
      ))}

      {/* ambient shooting stars every so often */}
      {SHOOTING.map((s, i) => (
        <span
          key={`shoot-${i}`}
          className={styles.shooting}
          style={
            {
              top: s.top,
              left: s.left,
              '--dur': `${s.dur}s`,
              '--delay': `${s.delay}s`,
            } as Vars
          }
        />
      ))}

      {/* tiny ringed planet + crescent */}
      <svg className={styles.planet} viewBox="0 0 64 40" width="64" height="40">
        <ellipse cx="32" cy="22" rx="30" ry="7" className={styles.ringBack} />
        <circle cx="32" cy="18" r="12" className={styles.planetBody} />
        <path d="M2 22 A30 7 0 0 0 62 22" className={styles.ringFront} />
      </svg>

      <svg className={styles.crescent} viewBox="0 0 24 24" width="30" height="30">
        <path d="M15 2 A10 10 0 1 0 22 17 A8 8 0 1 1 15 2 Z" />
      </svg>
    </>
  )
}
