'use client'

import { useState, type CSSProperties } from 'react'

import styles from './contact.module.css'
import dreamy from '@/components/dreamy/dreamy.module.css'
import { usePointerGlow } from '@/hooks/usePointerGlow'
import SectionHeading from '@/components/dreamy/sectionHeading'
import FloatingDecor from '@/components/shared/floatingDecor'
import ScrollReveal from '@/components/shared/scrollReveal'
import AmbientScene from '@/components/dreamy/ambientScene'

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

/* each wish arcs up to (dx, dy) and pops into sparkles there */
type Wish = { id: number; dx: number; dy: number }

/* how many fading sparkles follow the wish to form its tail */
const TRAIL = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
/* the little ring of sparkles it bursts into */
const POP = [0, 1, 2, 3, 4, 5, 6, 7]

export default function Contact() {
  const cardGlow = usePointerGlow()
  const [wishes, setWishes] = useState<Wish[]>([])
  const [count, setCount] = useState(0)

  function makeWish() {
    const side = Math.random() < 0.5 ? -1 : 1
    const wish = {
      id: Date.now(),
      dx: Math.round(side * (60 + Math.random() * 140)),
      dy: Math.round(-(170 + Math.random() * 80)),
    }
    setWishes((w) => [...w, wish])
    setCount((c) => c + 1)
    window.setTimeout(() => {
      setWishes((w) => w.filter((x) => x.id !== wish.id))
    }, 2200)
  }

  const lastWish = wishes[wishes.length - 1]

  return (
    <section
      id="contact"
      className="snap-start relative isolate flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 py-24"
    >
      <AmbientScene variant={2} cloudBank />
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
            <button type="button" onClick={makeWish} className={styles.wishButton}>
              <span className={styles.starWrap}>
                {wishes.map((wish) => (
                  <span
                    key={wish.id}
                    className={styles.wish}
                    style={{ '--dx': `${wish.dx}px`, '--dy': `${wish.dy}px` } as CSSProperties}
                    aria-hidden="true"
                  >
                    {/* sparkles trailing behind on the same curve = a soft, bending tail */}
                    {TRAIL.map((i) => (
                      <span key={i} className={styles.arcX} style={{ '--i': i } as CSSProperties}>
                        <span className={styles.arcY}>
                          <span className={styles.trail} />
                        </span>
                      </span>
                    ))}
                    <span className={styles.arcX}>
                      <span className={styles.arcY}>
                        <span className={styles.head}>✦</span>
                      </span>
                    </span>

                    {/* at the top it blooms and pops into a ring of sparkles */}
                    <span className={styles.pop}>
                      <span className={styles.popGlow} />
                      {POP.map((i) => (
                        <span
                          key={i}
                          className={styles.spark}
                          style={{ '--a': `${i * 45 + (wish.id % 30)}deg` } as CSSProperties}
                        >
                          ✦
                        </span>
                      ))}
                    </span>
                  </span>
                ))}

                {/* the button's own star winks and sends out a ripple on each wish */}
                {lastWish && <span key={`ripple-${lastWish.id}`} className={styles.ripple} aria-hidden="true" />}
                <span
                  key={lastWish ? `star-${lastWish.id}` : 'star'}
                  className={`${styles.wishStar} ${lastWish ? styles.wink : ''}`}
                  aria-hidden="true"
                >
                  ✦
                </span>
              </span>
              Make a wish
            </button>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
