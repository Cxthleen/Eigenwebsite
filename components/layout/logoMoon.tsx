import { useId } from 'react'
import styles from './logoMoon.module.css'

// four-pointed sparkle centred on 0,0
const sparkle = (s: number) =>
  `M0,${-s} Q0,0 ${s},0 Q0,0 0,${s} Q0,0 ${-s},0 Q0,0 0,${-s} Z`

const stars = [
  { x: 6, y: 9, size: 2.4 },
  { x: 47, y: 6, size: 1.6 },
  { x: 50, y: 33, size: 2 },
  { x: 9, y: 37, size: 1.3 },
]

export default function LogoMoon() {
  const clipId = useId()

  return (
    <svg className={styles.sky} viewBox="0 0 56 44" aria-hidden="true">
      <defs>
        <clipPath id={clipId}>
          <circle cx="28" cy="22" r="13" />
        </clipPath>
      </defs>

      {stars.map((star, i) => (
        <g key={i} transform={`translate(${star.x} ${star.y})`}>
          <path
            className={styles.star}
            d={sparkle(star.size)}
            style={{ animationDelay: `${i * 0.8}s` }}
          />
        </g>
      ))}

      <circle className={styles.halo} cx="28" cy="22" r="17" />

      {/* the moon: a lit disc with a shadow sliding across it, new → full → new */}
      <g className={styles.moon}>
        <circle className={styles.lit} cx="28" cy="22" r="13" />
        <g clipPath={`url(#${clipId})`}>
          <circle className={styles.shadow} cx="28" cy="22" r="14" />
        </g>
        <circle className={styles.rim} cx="28" cy="22" r="13" />
      </g>

      <path
        className={styles.cloud}
        d="M14,34 a3.5,3.5 0 0 1 3.2,-4.4 a4.6,4.6 0 0 1 8.6,-0.6 a3.4,3.4 0 0 1 3.6,5 Z"
      />
    </svg>
  )
}
