import Link from 'next/link'

import styles from './heroContent.module.css'

const INTERESTS = [
  { icon: '💻', label: 'Web development' },
  { icon: '🎨', label: 'UI & design' },
  { icon: '✨', label: 'Creative coding' },
]

export default function HeroContent() {
  return (
    <>
      <span className={styles.badge}>
        <span className={styles.badgeMoon} aria-hidden="true">
          ☾
        </span>
        Student · Aspiring developer
      </span>

      <h1 className={`heading-font ${styles.title}`}>
        <span className={styles.sparkleLeft} aria-hidden="true">
          ✦
        </span>
        Hiii, I&apos;m <span className={styles.name}>Cathleen</span>
        <span className={styles.sparkleRight} aria-hidden="true">
          ✧
        </span>
      </h1>

      <p className={styles.intro}>
        I&apos;m a student learning to build websites and apps, one tiny
        line of code at a time. I love making things that work well
        <em>and</em> look lovely. This little corner of the internet is one
        of the first things I&apos;ve made with HTML and Tailwind CSS 💕
      </p>

      <ul className={styles.chips}>
        {INTERESTS.map(({ icon, label }) => (
          <li key={label} className={styles.chip}>
            <span aria-hidden="true">{icon}</span>
            {label}
          </li>
        ))}
      </ul>

      <div className={styles.actions}>
        <Link href="/projects" className={styles.primary}>
          <span aria-hidden="true">✦</span>
          Peek at my work
        </Link>

        <Link href="/contact" className={styles.secondary}>
          Say hi
          <span aria-hidden="true">💌</span>
        </Link>
      </div>
    </>
  )
}
