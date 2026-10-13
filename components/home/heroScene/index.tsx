import { cloudImage, puffImage, type Bump, type Stop, type Vars } from '@/components/dreamy/skyArt'

import styles from './heroScene.module.css'

/*
 * The world around the hero: aurora ribbons, little drifting clouds,
 * a moonlit sea of clouds and motes of light rising out of it.
 * Layers marked data-depth drift with the mouse (useMouseParallax).
 * Positions are fixed (no randomness) so SSR matches.
 */

type SeaLayer = {
  key: string
  depth: string
  /* layer height as a share of the sea */
  share: number
  bumps: Bump[]
  blur: number
  fadeFrom: number
  /* moonlit rim in dark mode — only on some layers so it isn't overwhelming */
  nightRim?: number
  day: Stop[]
  night: Stop[]
}

/* each layer is baked into a day and a night image (see skyArt) */
const SEA_LAYERS: SeaLayer[] = [
  {
    key: 'far',
    depth: '-8 -3',
    share: 1,
    bumps: [[260, 70, 150], [320, 95, 140], [230, 55, 155], [330, 85, 135], [300, 75, 148]],
    blur: 7,
    fadeFrom: 0.7,
    nightRim: 0.55,
    day: [[0, '#f9e6f1'], [0.6, '#e8cde3']],
    night: [[0, '#8574bf'], [0.26, '#4c3e7a'], [0.75, '#2a2149']],
  },
  {
    key: 'mid',
    depth: '-16 -5',
    share: 0.74,
    nightRim: 0.2,
    bumps: [[210, 55, 130], [170, 65, 120], [260, 80, 135], [190, 50, 125], [230, 70, 130], [200, 58, 122], [180, 62, 128]],
    blur: 5,
    fadeFrom: 0.7,
    day: [[0, '#fff2f7'], [0.7, '#f6dfeb']],
    night: [[0, '#6e5fa6'], [0.3, '#372b62'], [0.8, '#1e1838']],
  },
  {
    key: 'near',
    depth: '-28 -8',
    share: 0.5,
    bumps: [[150, 45, 110], [120, 38, 104], [170, 52, 115], [140, 40, 106], [160, 48, 112], [130, 42, 104], [180, 55, 114], [145, 44, 108], [135, 40, 112], [110, 36, 106]],
    blur: 4,
    // the nearest layer melts into the section below
    fadeFrom: 0.6,
    day: [[0, '#fffafc'], [1, '#fff4f8']],
    night: [[0, '#54468a'], [0.35, '#251d47'], [0.85, '#110e22']],
  },
]

/* the sea is ~225px tall on a typical screen; the rim sits 4px above each layer */
const SEA_PX = 225
/* the whole sea also fades out from 65% of its height down */
const SEA_FADE_FROM = 0.65

const SEA = SEA_LAYERS.map(({ bumps, blur, fadeFrom, share, nightRim, day, night, ...layer }) => {
  const base = {
    blur,
    fadeFrom,
    rimOffset: (4 * 240) / (SEA_PX * share),
    // the sea-wide fade, measured from this layer's own top
    stackFadeFrom: Math.max(0, (SEA_FADE_FROM - (1 - share)) / share),
  }
  return {
    ...layer,
    images: {
      '--day': cloudImage(bumps, { ...base, fill: day, rim: ['#ffffff', 0.9] }),
      '--night': cloudImage(bumps, { ...base, fill: night, rim: nightRim ? ['#ded0f0', nightRim] : undefined }),
    } as Vars,
  }
})

const PUFF = {
  '--day': puffImage(['#fffafc', 0.95], ['#fadeee', 0.7]),
  '--night': puffImage(['#d2c3fa', 0.42], ['#7864b4', 0.14]),
} as Vars

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
      <div className={styles.depth} data-depth="-6 -4">
        <div className={`${styles.aurora} ${styles.auroraA}`} />
        <div className={`${styles.aurora} ${styles.auroraB}`} />
      </div>

      <div className={styles.depth} data-depth="-14 -8">
        {SKY_CLOUDS.map((c, i) => (
          <div
            key={i}
            className={styles.puff}
            style={
              {
                ...PUFF,
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

        {SEA.map((layer) => (
          <div key={layer.key} className={`${styles.depth} ${styles[layer.key]}`} data-depth={layer.depth}>
            <div className={styles.cloudLayer} style={layer.images} />
          </div>
        ))}

        <div className={styles.depth} data-depth="-30 -14">
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

/*
 * Moonlight bloom, a soft corona and a faint moon halo ring, plus two
 * orbit rings framing the portrait.
 * Each sparkle orbits via two composited sine motions (x and y a quarter
 * period apart), which traces an ellipse without repainting anything.
 */
export function MoonAura() {
  return (
    <div className={styles.aura} data-depth="6 4" aria-hidden="true">
      <div className={styles.bloom} />
      <div className={styles.corona} />
      <div className={styles.halo} />
      <div className={`${styles.orbit} ${styles.orbitInner}`}>
        <span className={styles.orbitX}>
          <span className={styles.orbitY}>
            <span className={styles.traveler} />
          </span>
        </span>
      </div>
      <div className={`${styles.orbit} ${styles.orbitOuter}`}>
        <span className={styles.orbitX}>
          <span className={styles.orbitY}>
            <span className={styles.traveler} />
          </span>
        </span>
        <span className={`${styles.orbitX} ${styles.late}`}>
          <span className={styles.orbitY}>
            <span className={`${styles.traveler} ${styles.small}`} />
          </span>
        </span>
      </div>
    </div>
  )
}
