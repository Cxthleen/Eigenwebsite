import styles from './dreamy.module.css'

type Props = {
  badge: string
  title: string
  subtitle?: string
  align?: 'center' | 'left'
}

export default function SectionHeading({
  badge,
  title,
  subtitle,
  align = 'center',
}: Props) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : ''}>
      <span className={`mb-5 ${styles.badge}`}>
        <span className={styles.badgeStar} aria-hidden="true">✦</span>
        {badge}
        <span className={styles.badgeStar} aria-hidden="true">✦</span>
      </span>

      <h2 className="heading-font text-4xl sm:text-5xl md:text-6xl">
        <span className={styles.title}>{title}</span>
      </h2>

      {subtitle && (
        <p
          className={`mt-4 max-w-xl text-base leading-7 sm:text-lg ${styles.subtitle} ${
            align === 'center' ? 'mx-auto' : ''
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
