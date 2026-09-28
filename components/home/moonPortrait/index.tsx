import styles from './moonPortrait.module.css'

type Props = {
  src: string
  alt: string
}

/* Profile photo styled as a glowing full moon. */
export default function MoonPortrait({ src, alt }: Props) {
  return (
    <div className={styles.moon}>
      <div className={styles.halo} aria-hidden="true" />
      <div className={styles.haloOuter} aria-hidden="true" />

      <div className={styles.disc}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className={styles.photo} />

        <div className={styles.craters} aria-hidden="true" />
        <div className={styles.shade} aria-hidden="true" />
      </div>
    </div>
  )
}
