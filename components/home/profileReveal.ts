import styles from './profileReveal.module.css'

/* Class names for content that appears when the intro ends. */
export default function profileReveal(hidden: boolean) {
  return `${styles.reveal} ${hidden ? styles.hidden : styles.visible}`
}
