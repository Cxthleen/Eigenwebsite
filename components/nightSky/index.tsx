import type { CSSProperties } from 'react'

import Stars from './stars'

import styles from './nightSky.module.css'
import SkyExtras from './skyExtras'

const FIVE_POINT =
  'M12 0 L14.9 8.6 L24 9 L16.8 14.6 L19.4 23.4 L12 18.2 L4.6 23.4 L7.2 14.6 L0 9 L9.1 8.6 Z'
const FOUR_POINT =
  'M12 0 C12.8 8 16 11.2 24 12 C16 12.8 12.8 16 12 24 C11.2 16 8 12.8 0 12 C8 11.2 11.2 8 12 0 Z'

type ShapedStar = {
  top: string
  left: string
  size: number
  shape: 'four' | 'five'
  dur: number
  delay: number
  spin?: boolean
}

/* Hand-placed so they frame the content instead of sitting on it. */
const SHAPED_STARS: ShapedStar[] = [
  { top: '12%', left: '8%', size: 18, shape: 'four', dur: 3.2, delay: 0 },
  { top: '22%', left: '18%', size: 10, shape: 'five', dur: 4.1, delay: 1.2 },
  { top: '8%', left: '32%', size: 12, shape: 'four', dur: 2.8, delay: 0.6 },
  { top: '38%', left: '6%', size: 14, shape: 'five', dur: 5, delay: 2, spin: true },
  { top: '55%', left: '14%', size: 9, shape: 'four', dur: 3.6, delay: 1.8 },
  { top: '10%', left: '70%', size: 14, shape: 'five', dur: 4.4, delay: 0.3 },
  { top: '18%', left: '88%', size: 22, shape: 'four', dur: 3.4, delay: 1.5, spin: true },
  { top: '30%', left: '78%', size: 10, shape: 'four', dur: 2.6, delay: 2.4 },
  { top: '44%', left: '93%', size: 12, shape: 'five', dur: 4.8, delay: 0.9 },
  { top: '60%', left: '84%', size: 9, shape: 'four', dur: 3.1, delay: 2.9 },
  { top: '5%', left: '52%', size: 8, shape: 'four', dur: 3.8, delay: 1 },
  { top: '66%', left: '28%', size: 8, shape: 'five', dur: 4.2, delay: 3.3 },
]

type StarStyle = CSSProperties & {
  '--dur': string
  '--delay': string
}

type Props = {
  /* scatter dot stars over the full height (for full-page backdrops) */
  fullHeight?: boolean
  /* 'night' = white stars on dark, 'day' = pastel dawn sky with lilac stars */
  tone?: 'night' | 'day'
}

export default function NightSky({ fullHeight = false, tone = 'night' }: Props) {
  return (
    <div
      className={`${styles.sky} ${tone === 'day' ? `${styles.day} sky-day` : ''}`}
      aria-hidden="true"
    >
      <div className={styles.nebulaA} />
      <div className={styles.nebulaB} />
      <div className={styles.milkyWay} />

      {fullHeight && <SkyExtras />}

      <Stars
        count={tone === 'day' ? 70 : 110}
        spread={fullHeight ? 100 : 70}
        color={tone === 'day' ? 'bg-[#c9a8f0]/70' : 'bg-star'}
      />

      {SHAPED_STARS.map((star, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          width={star.size}
          height={star.size}
          className={`${styles.shaped} ${star.spin ? styles.spin : ''}`}
          style={
            {
              top: star.top,
              left: star.left,
              '--dur': `${star.dur}s`,
              '--delay': `${star.delay}s`,
            } as StarStyle
          }
        >
          <path d={star.shape === 'four' ? FOUR_POINT : FIVE_POINT} />
        </svg>
      ))}
    </div>
  )
}
