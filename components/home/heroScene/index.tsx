'use client'

import { useEffect, type CSSProperties, type RefObject } from 'react'

import styles from './heroScene.module.css'

/*
 * The world around the hero: aurora ribbons, little drifting clouds,
 * a moonlit sea of clouds and motes of light rising out of it.
 * Layers shift with the mouse (--mx / --my, set by useMouseParallax)
 * and drift apart on scroll so the scene has depth.
 * Positions are fixed (no randomness) so SSR matches.
 */

export type Vars = CSSProperties & Record<`--${string}`, string>

/* cloud tops as [width, bump height, valley y] in a 1440×240 tile */
export type Bump = [number, number, number]

export function cloudMask(bumps: Bump[], blur: number) {
  const first = bumps[0][2]
  let x = 0
  let d = `M0 240 L0 ${first}`
  bumps.forEach(([w, h], i) => {
    // last bump lands back on the first valley so the tile repeats seamlessly
    const nextY = i === bumps.length - 1 ? first : bumps[i + 1][2]
    x += w
    d += ` A${(w / 2) * 1.04} ${h} 0 0 1 ${x} ${nextY}`
  })
  d += ' L1440 240 Z'
  // drawn three times side by side so the soft edge also wraps across the seam
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 240' preserveAspectRatio='none'>` +
    `<filter id='b' filterUnits='userSpaceOnUse' x='-1440' y='-240' width='4320' height='720'><feGaussianBlur stdDeviation='${blur}'/></filter>` +
    `<g filter='url(#b)'><path d='${d}' transform='translate(-1440 0)'/><path d='${d}'/><path d='${d}' transform='translate(1440 0)'/></g></svg>`
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
}

const SEA = [
  {
    key: 'far',
    blur: 7,
    bumps: [[260, 70, 150], [320, 95, 140], [230, 55, 155], [330, 85, 135], [300, 75, 148]] as Bump[],
  },
  {
    key: 'mid',
    blur: 5,
    bumps: [[210, 55, 130], [170, 65, 120], [260, 80, 135], [190, 50, 125], [230, 70, 130], [200, 58, 122], [180, 62, 128]] as Bump[],
  },
  {
    key: 'near',
    blur: 4,
    bumps: [[150, 45, 110], [120, 38, 104], [170, 52, 115], [140, 40, 106], [160, 48, 112], [130, 42, 104], [180, 55, 114], [145, 44, 108], [135, 40, 112], [110, 36, 106]] as Bump[],
  },
].map((layer) => ({ ...layer, mask: cloudMask(layer.bumps, layer.blur) }))

/* one fluffy cloud for the small clouds drifting in the sky */
export const PUFF_MASK = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 120'><filter id='b'><feGaussianBlur stdDeviation='3.5'/></filter>` +
    `<path filter='url(#b)' d='M24 104 A28 28 0 0 1 64 76 A42 42 0 0 1 140 52 A36 36 0 0 1 206 62 A30 30 0 0 1 252 82 A22 22 0 0 1 276 104 Z'/></svg>`,
)}")`

const SKY_CLOUDS = [
  { top: '44%', left: '3%', scale: 1, dur: 38, delay: -10 },
  { top: '22%', left: '76%', scale: 0.8, dur: 46, delay: -30 },
  { top: '56%', left: '82%', scale: 0.65, dur: 34, delay: -20 },
  { top: '17%', left: '10%', scale: 0.5, dur: 52, delay: -40 },
]

const MOTES = [
  { left: '8%', size: 4, dur: 16, delay: 0, sway: 18 },
  { left: '15%', size: 3, dur: 21, delay: -7, sway: -14 },
  { left: '23%', size: 5, dur: 18, delay: -12, sway: 22 },
  { left: '31%', size: 3, dur: 24, delay: -3, sway: -20 },
  { left: '38%', size: 4, dur: 19, delay: -15, sway: 16 },
  { left: '61%', size: 3, dur: 22, delay: -9, sway: -18 },
  { left: '68%', size: 5, dur: 17, delay: -2, sway: 20 },
  { left: '76%', size: 3, dur: 23, delay: -18, sway: -16 },
  { left: '84%', size: 4, dur: 20, delay: -6, sway: 14 },
  { left: '92%', size: 3, dur: 25, delay: -13, sway: -22 },
  { left: '47%', size: 2, dur: 26, delay: -20, sway: 12 },
  { left: '54%', size: 3, dur: 18, delay: -10, sway: -12 },
]

export default function HeroScene({ progress }: { progress: number }) {
  return (
    <div
      className={styles.scene}
      style={{ '--p': String(progress) } as Vars}
      aria-hidden="true"
    >
      <div className={`${styles.depth} ${styles.d1}`}>
        <div className={`${styles.aurora} ${styles.auroraA}`} />
        <div className={`${styles.aurora} ${styles.auroraB}`} />
      </div>

      <div className={`${styles.depth} ${styles.d2}`}>
        {SKY_CLOUDS.map((c, i) => (
          <div
            key={i}
            className={styles.puff}
            style={
              {
                '--mask': PUFF_MASK,
                top: c.top,
                left: c.left,
                '--scale': String(c.scale),
                '--dur': `${c.dur}s`,
                '--delay': `${c.delay}s`,
              } as Vars
            }
          />
        ))}
      </div>

      <div className={styles.sea}>
        {/* moonlight pooling on the clouds right under the moon */}
        <div className={styles.seaGlow} />

        <div className={styles.clouds}>
          {SEA.map((layer) => (
            <div key={layer.key} className={`${styles.depth} ${styles[layer.key]}`}>
              {/* a lighter copy peeking out above = moonlit rim on the cloud tops */}
              <div className={`${styles.cloudLayer} ${styles.rim}`} style={{ '--mask': layer.mask } as Vars} />
              <div className={styles.cloudLayer} style={{ '--mask': layer.mask } as Vars} />
            </div>
          ))}
        </div>

        <div className={`${styles.depth} ${styles.d3}`}>
          {MOTES.map((m, i) => (
            <span
              key={i}
              className={styles.mote}
              style={
                {
                  left: m.left,
                  width: m.size,
                  height: m.size,
                  '--dur': `${m.dur}s`,
                  '--delay': `${m.delay}s`,
                  '--sway': `${m.sway}px`,
                } as Vars
              }
            />
          ))}
        </div>
      </div>
    </div>
  )
}

/* Moonlight bloom, slow rays and two orbit rings framing the portrait. */
export function MoonAura() {
  return (
    <div className={styles.aura} aria-hidden="true">
      <div className={styles.bloom} />
      <div className={styles.rays} />
      <div className={`${styles.orbit} ${styles.orbitInner}`}>
        <span className={styles.traveler} />
      </div>
      <div className={`${styles.orbit} ${styles.orbitOuter}`}>
        <span className={styles.traveler} />
        <span className={`${styles.traveler} ${styles.travelerLate}`} />
      </div>
    </div>
  )
}

/*
 * Eases --mx / --my (−1…1) on the element toward the mouse,
 * so every layer underneath can drift by its own depth.
 */
export function useMouseParallax(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let tx = 0
    let ty = 0
    let x = 0
    let y = 0
    let frame = 0

    const tick = () => {
      x += (tx - x) * 0.06
      y += (ty - y) * 0.06
      el.style.setProperty('--mx', x.toFixed(4))
      el.style.setProperty('--my', y.toFixed(4))
      frame =
        Math.abs(tx - x) > 0.001 || Math.abs(ty - y) > 0.001
          ? requestAnimationFrame(tick)
          : 0
    }

    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth) * 2 - 1
      ty = (e.clientY / window.innerHeight) * 2 - 1
      if (!frame) frame = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
    }
  }, [ref])
}
