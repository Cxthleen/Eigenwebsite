'use client'

import type { ReactNode } from 'react'

import styles from './dreamy.module.css'
import { usePointerGlow } from '@/hooks/usePointerGlow'

type Props = {
  children: ReactNode
  className?: string
  /* max tilt in degrees; 0 = no tilt */
  tilt?: number
}

/* Frosted glass panel with cursor-following moonlight (and optional tilt). */
export default function GlowCard({ children, className = '', tilt = 0 }: Props) {
  const glow = usePointerGlow({ tilt })

  return (
    <div
      {...glow}
      className={`${styles.glass} ${styles.glow} ${tilt ? styles.tilt : ''} ${className}`}
    >
      {children}
    </div>
  )
}
