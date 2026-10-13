import styles from './scrollMoon.module.css'

const CRESCENT = 'M15 2 A10 10 0 1 0 22 17 A8 8 0 1 1 15 2 Z'

/*
 * "Scroll down" hint: a little crescent moon floating on the clouds,
 * with stardust drifting down beneath it.
 */
export default function ScrollMoon({ href }: { href: string }) {
  return (
    <a href={href} aria-label="Scroll down" className={styles.link}>
      <span className={styles.float}>
        <span className={styles.glow} aria-hidden="true" />
        <svg className={styles.moon} viewBox="0 0 24 24" width="30" height="30" aria-hidden="true">
          <defs>
            <linearGradient id="scroll-moon-fill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" style={{ stopColor: 'var(--moon-a)' }} />
              <stop offset="1" style={{ stopColor: 'var(--moon-b)' }} />
            </linearGradient>
          </defs>
          <path d={CRESCENT} fill="url(#scroll-moon-fill)" />
        </svg>
      </span>

      <span className={styles.dust} aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
    </a>
  )
}
