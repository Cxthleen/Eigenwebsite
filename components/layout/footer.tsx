import styles from './footer.module.css'

export default function Footer() {
  return (
    <footer className="relative mx-auto max-w-4xl px-6 pb-12">
      <div className="relative pt-6 text-center">
        {/* starry divider */}
        <div
          aria-hidden="true"
          className="mb-5 flex items-center justify-center gap-3 text-[#c9a8f0] dark:text-[#fff3b0]"
        >
          <span className="h-px w-24 bg-gradient-to-r from-transparent to-lilac dark:to-dark-line sm:w-40" />
          <span className="animate-sparkle text-xs">✦</span>
          <span className="text-base drop-shadow-[0_0_6px_rgba(201,168,240,0.7)] dark:drop-shadow-[0_0_6px_rgba(255,232,184,0.7)]">☾</span>
          <span className="animate-sparkle text-xs [animation-delay:0.5s]">✦</span>
          <span className="h-px w-24 bg-gradient-to-l from-transparent to-lilac dark:to-dark-line sm:w-40" />
        </div>

        <p className={styles.signoff}>
          <span className={`${styles.twinkle} ${styles.left}`} aria-hidden="true">✧</span>
          Made under the stars by Cathleen xoxo
          <span className={`${styles.twinkle} ${styles.right}`} aria-hidden="true">✦</span>
        </p>

        <a href="#" className={styles.toTop}>
          <span className={styles.arrow} aria-hidden="true">↑</span>
          back to the moon
        </a>
      </div>
    </footer>
  )
}
