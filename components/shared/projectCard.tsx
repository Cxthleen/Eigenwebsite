'use client'

import styles from './projectCard.module.css'
import dreamy from '@/components/dreamy/dreamy.module.css'
import { usePointerGlow } from '@/hooks/usePointerGlow'

type Project = {
  name: string
  description: string
  link: string
  photo: string
}

export default function ProjectCard({
  name,
  description,
  link,
  photo,
}: Project) {
  const glow = usePointerGlow({ tilt: 10 })

  return (
    <a
      {...glow}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`${dreamy.glass} ${dreamy.glow} ${dreamy.tilt} ${styles.card}`}
    >
      <div className={styles.frame}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo} alt={name} className={styles.photo} />
        <span className={styles.sparkle} aria-hidden="true">✦</span>
        <span className={styles.sparkle} aria-hidden="true">✧</span>
      </div>

      <div className={styles.body}>
        <h3 className={`heading-font ${styles.name}`}>{name}</h3>
        <p className={styles.description}>{description}</p>

        <div className={styles.footer}>
          <span className={styles.view}>✦ View project</span>
          <span className={styles.arrow} aria-hidden="true">→</span>
        </div>
      </div>
    </a>
  )
}
