'use client'

import { useState, type CSSProperties } from 'react'

import styles from './contact.module.css'
import dreamy from '@/components/dreamy/dreamy.module.css'
import { usePointerGlow } from '@/hooks/usePointerGlow'
import SectionHeading from '@/components/dreamy/sectionHeading'
import FloatingDecor from '@/components/shared/floatingDecor'
import ScrollReveal from '@/components/shared/scrollReveal'

type ContactLink = {
  label: string
  href: string
  icon: string
  external: boolean
}

const contactLinks: ContactLink[] = [
  { label: 'Email', href: '/contact', icon: '💌', external: false },
  { label: 'GitHub', href: 'https://github.com/Cxthleen', icon: '🐈‍⬛', external: true },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/cathleen-van-duuren-8731642bb',
    icon: '💼',
    external: true,
  },
]

const WISH_MESSAGES = [
  'Your wish is on its way ✨',
  'The stars heard you 🌙',
  'Another wish sent into the sky ✦',
  'Wishes are free, so make another 💫',
]

type Wish = { id: number; dx: number }

export default function Contact() {
  const cardGlow = usePointerGlow()
  const [wishes, setWishes] = useState<Wish[]>([])
  const [count, setCount] = useState(0)

  function makeWish() {
    const wish = { id: Date.now(), dx: Math.round((Math.random() - 0.5) * 320) }
    setWishes((w) => [...w, wish])
    setCount((c) => c + 1)
    window.setTimeout(() => {
      setWishes((w) => w.filter((x) => x.id !== wish.id))
    }, 1400)
  }

  return (
    <section
      id="contact"
      className="snap-start relative isolate flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 py-24"
    >
      <FloatingDecor className="left-[12%] top-[18%] text-4xl opacity-60">☾</FloatingDecor>
      <FloatingDecor className="right-[15%] top-[24%] text-2xl opacity-60" delay="1s">
        ✦
      </FloatingDecor>
      <FloatingDecor className="bottom-[22%] left-[18%] text-xl opacity-50" delay="2.5s">
        ✧
      </FloatingDecor>
      <FloatingDecor className="bottom-[16%] right-[12%] text-3xl opacity-40" delay="3.5s">
        ✦
      </FloatingDecor>

      <ScrollReveal className="relative z-10 w-full">
        <div
          {...cardGlow}
          className={`${dreamy.glass} ${dreamy.glow} mx-auto w-full max-w-2xl rounded-[2rem] p-8 text-center sm:p-12`}
        >
          <div className="mb-9">
            <SectionHeading
              badge="LET'S CONNECT"
              title="Get in touch"
              subtitle="My inbox is always open, and I love a good chat"
            />
          </div>

          <div className={styles.links}>
            {contactLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                {...(link.external && { target: '_blank', rel: 'noopener noreferrer' })}
                className={`${dreamy.btn} ${i === 0 ? dreamy.btnPrimary : dreamy.btnGhost} ${styles.linkBtn}`}
              >
                <span className={styles.icon} aria-hidden="true">
                  {link.icon}
                </span>
                {link.label}
                {link.external && <span className="text-xs opacity-60">↗</span>}
              </a>
            ))}
          </div>

          <div className={styles.wishArea}>
            {wishes.map((wish) => (
              <span
                key={wish.id}
                className={styles.flyer}
                style={
                  {
                    '--dx': `${wish.dx}px`,
                    // point the tail opposite the direction of travel (dx, -220)
                    '--trail': `${Math.round(Math.atan2(-220, wish.dx) * (180 / Math.PI))}deg`,
                  } as CSSProperties
                }
                aria-hidden="true"
              />
            ))}

            <button type="button" onClick={makeWish} className={styles.wishButton}>
              <span className={styles.wishStar} aria-hidden="true">✦</span>
              Make a wish
            </button>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
