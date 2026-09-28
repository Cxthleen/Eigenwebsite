import styles from './dreamy.module.css'

/* Small "keep scrolling" link between sections. */
export default function ScrollHint({ href, label }: { href: string; label: string }) {
  return (
    <div className="mt-10 flex justify-center">
      <a href={href} className={styles.hint}>
        {label}
        <span className={styles.hintStar} aria-hidden="true">✦</span>
      </a>
    </div>
  )
}
