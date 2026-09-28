'use client'

import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useState, type CSSProperties } from 'react'
import Navbar from '@/components/layout/navbar'
import FloatingDecor from '@/components/shared/floatingDecor'
import dreamy from '@/components/dreamy/dreamy.module.css'
import { usePointerGlow } from '@/hooks/usePointerGlow'
import styles from './contact.module.css'

type FormData = {
  name: string
  email: string
  message: string
}

/* little stars that pop out of the button when a message is sent */
const BURST = Array.from({ length: 14 }, (_, i) => {
  const angle = (i / 14) * Math.PI * 2
  const distance = 70 + (i % 3) * 28
  return {
    x: `${Math.round(Math.cos(angle) * distance)}px`,
    y: `${Math.round(Math.sin(angle) * distance * 0.7)}px`,
    r: `${(i % 2 ? 1 : -1) * (90 + i * 20)}deg`,
    s: `${12 + (i % 3) * 5}px`,
    c: ['#c9a8f0', '#f4a6c6', '#f2b441', '#b9a4e0'][i % 4],
    glyph: i % 2 ? '✦' : '✧',
  }
})

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>()

  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  // bumps on each successful send so the star burst replays
  const [sentCount, setSentCount] = useState(0)

  // no tilt on the form: it would wobble while typing
  const formGlow = usePointerGlow()

  async function onSubmit(data: FormData) {
    setStatus('idle')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error('Failed to send')

      setStatus('success')
      setSentCount((c) => c + 1)
      reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <main className="relative isolate min-h-screen overflow-hidden">
      <FloatingDecor className="left-[12%] top-[28%] text-2xl opacity-60">✧</FloatingDecor>
      <FloatingDecor className="right-[14%] top-[22%] text-xl opacity-60" delay="1.5s">
        ✦
      </FloatingDecor>
      <FloatingDecor className="bottom-[18%] right-[10%] text-3xl opacity-50" delay="2.5s">
        ☾
      </FloatingDecor>
      <FloatingDecor className="bottom-[25%] left-[8%] text-lg opacity-60" delay="1s">
        ✧
      </FloatingDecor>

      <Navbar />

      <section className="relative mx-auto flex w-full max-w-7xl flex-col px-5 pb-20 pt-32 sm:px-8 lg:min-h-screen lg:justify-center lg:px-12 lg:py-28">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Intro */}
          <div className="animate-page-in relative">
            <Link href="/" className={`${dreamy.btn} ${dreamy.btnGhost}`}>
              <span aria-hidden="true">←</span>
              Back home
            </Link>

            <div className="mt-10">
              <span className={dreamy.badge}>
                <span className={dreamy.badgeStar} aria-hidden="true">✦</span>
                A LITTLE HELLO
                <span className={dreamy.badgeStar} aria-hidden="true">✦</span>
              </span>
            </div>

            <h1 className="heading-font mt-6 text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              <span className={dreamy.title}>
                Get in
                <br />
                touch!
              </span>
            </h1>

            <p className={`mt-6 max-w-lg text-base leading-8 sm:text-lg ${dreamy.subtitle}`}>
              Got a question, a fun idea, or just want to say hi? I&apos;d
              truly love to hear from you. Leave me a little note and
              I&apos;ll write back as soon as I can.
            </p>

            <div className={`mt-9 flex items-center gap-3 text-sm ${dreamy.subtitle}`}>
              <span className={`${dreamy.star} ${styles.chip}`} aria-hidden="true">☁️</span>
              <span>Even a tiny message can make my whole day.</span>
            </div>

            <div className="mt-12 hidden max-w-sm lg:block">
              <div className={styles.divider} />
              <p className={`mt-4 text-xs tracking-wide ${dreamy.subtitle}`}>
                Made with a little love and a lot of daydreams ✧
              </p>
            </div>
          </div>

          {/* Contact form */}
          <div className="animate-page-in [animation-delay:150ms]">
            <form
              {...formGlow}
              onSubmit={handleSubmit(onSubmit)}
              className={`${dreamy.glass} ${dreamy.glow} rounded-[2rem] p-6 sm:p-9 lg:p-10`}
            >
              <div className="mb-8 flex items-start justify-between gap-4">
                <div>
                  <p className={styles.label}>✦ Your note</p>
                  <h2 className="heading-font mt-1 text-2xl font-bold text-ink dark:text-dark-ink sm:text-3xl">
                    Write me a little note
                  </h2>
                </div>
                <span className={`${dreamy.star} ${styles.chip}`} aria-hidden="true">💌</span>
              </div>

              <div className="flex flex-col gap-5">
                {/* Name */}
                <div>
                  <label htmlFor="name" className={styles.label}>
                    Name
                  </label>
                  <input
                    id="name"
                    {...register('name', {
                      required: 'Please enter your name',
                    })}
                    className={styles.field}
                    placeholder="Your name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className={styles.error}>
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className={styles.label}>
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register('email', {
                      required: 'Please enter your email',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Please enter a valid email',
                      },
                    })}
                    className={styles.field}
                    placeholder="you@example.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className={styles.error}>
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className={styles.label}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    {...register('message', {
                      required: 'Please write a message',
                    })}
                    rows={5}
                    className={`${styles.field} min-h-36 resize-y`}
                    placeholder="Tell me anything, I'm all ears..."
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  {errors.message && (
                    <p id="message-error" className={styles.error}>
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <div className={`mt-1 ${styles.submitWrap}`}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`${dreamy.btn} ${dreamy.btnPrimary} w-full justify-center py-4 disabled:cursor-not-allowed disabled:opacity-60`}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin">✧</span>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send message
                        <span aria-hidden="true">🎀</span>
                      </>
                    )}
                  </button>

                  {sentCount > 0 && (
                    <span key={sentCount} className={styles.burst} aria-hidden="true">
                      {BURST.map((p, i) => (
                        <span
                          key={i}
                          style={
                            {
                              '--x': p.x,
                              '--y': p.y,
                              '--r': p.r,
                              '--s': p.s,
                              '--c': p.c,
                              animationDelay: `${(i % 4) * 30}ms`,
                            } as CSSProperties
                          }
                        >
                          {p.glyph}
                        </span>
                      ))}
                    </span>
                  )}
                </div>

                <div aria-live="polite" className="min-h-0">
                  {status === 'success' && (
                    <p className={`${styles.status} ${styles.success}`}>
                      Your note is on its way. Thank you so much! 💌
                    </p>
                  )}

                  {status === 'error' && (
                    <p className={`${styles.status} ${styles.failure}`}>
                      Oops, it got lost along the way. Mind trying again?
                    </p>
                  )}
                </div>
              </div>
            </form>

            <p className={`mt-5 text-center text-xs ${dreamy.subtitle}`}>
              No rush — I&apos;ll be in touch as soon as I can. ✧
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
