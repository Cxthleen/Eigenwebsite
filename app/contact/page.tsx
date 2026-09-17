'use client'

import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useState } from 'react'
import Navbar from '@/components/navbar'

type FormData = {
  name: string
  email: string
  message: string
}

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>()

  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

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
      reset()
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full rounded-2xl border border-petal/80 dark:border-dark-line bg-white/80 dark:bg-dark-bg/80 px-4 py-3.5 text-sm text-ink dark:text-dark-ink placeholder:text-mocha/50 focus:outline-none focus:border-rose focus:ring-4 focus:ring-rose/10 transition-all duration-300'

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-blush/20 dark:bg-dark-bg">
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-40 left-[-10%] h-[28rem] w-[28rem] rounded-full bg-rose/15 blur-[120px]" />
        <div className="absolute right-[-8%] top-[30%] h-[24rem] w-[24rem] rounded-full bg-lavender/20 blur-[120px]" />
        <div className="absolute bottom-[-10rem] left-[25%] h-[24rem] w-[24rem] rounded-full bg-peach/20 blur-[120px]" />

        <div className="absolute left-[12%] top-[28%] animate-float text-2xl text-rose/50">
          ✧
        </div>
        <div className="absolute right-[14%] top-[22%] animate-float text-xl text-mocha/40 [animation-delay:1.5s]">
          ✦
        </div>
        <div className="absolute bottom-[18%] right-[10%] animate-float text-3xl text-rose/40 [animation-delay:2.5s]">
          ⋆
        </div>
        <div className="absolute bottom-[25%] left-[8%] animate-float text-lg text-lavender/70 [animation-delay:1s]">
          ✧
        </div>
      </div>

      <Navbar />

      <section className="relative mx-auto flex w-full max-w-7xl flex-col px-5 pb-20 pt-32 sm:px-8 lg:min-h-screen lg:justify-center lg:px-12 lg:py-28">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Intro */}
          <div className="animate-page-in relative">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-petal/70 bg-white/60 px-4 py-2 text-sm font-semibold text-cocoa shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-x-1 hover:border-rose/50 hover:text-ink dark:border-dark-line dark:bg-dark-surface/70 dark:text-dark-ink-soft"
            >
              <span aria-hidden="true">←</span>
              Back home
            </Link>

            <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-rose/20 bg-white/60 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-rose-deep shadow-sm backdrop-blur-md dark:bg-dark-surface/70">
              <span className="text-base">✧</span>
              A little hello
            </div>

            <h1 className="heading-font mt-6 text-5xl font-bold leading-[1.08] tracking-tight text-ink dark:text-dark-ink sm:text-6xl lg:text-7xl">
              Get in
              <br />
              <span className="bg-gradient-to-r from-rose-deep via-rose to-lavender bg-clip-text text-transparent">
                touch!
              </span>{' '}
              <span className="inline-block animate-float">💌</span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-8 text-ink-soft dark:text-dark-ink-soft sm:text-lg">
              Have a question, an idea, or just want to say hi? I&apos;d love
              to hear from you. Leave me a little message and I&apos;ll get
              back to you as soon as I can.
            </p>

            <div className="mt-9 flex items-center gap-3 text-sm text-cocoa/80 dark:text-dark-ink-soft">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-petal/70 bg-white/70 text-lg shadow-sm dark:border-dark-line dark:bg-dark-surface">
                ☁️
              </span>
              <span>A tiny message can make my day.</span>
            </div>

            <div className="mt-12 hidden max-w-sm lg:block">
              <div className="h-px w-full bg-gradient-to-r from-rose/50 via-petal to-transparent" />
              <p className="mt-4 text-xs tracking-wide text-mocha/70 dark:text-dark-ink-soft">
                Made with a little love and a lot of daydreams
              </p>
            </div>
          </div>

          {/* Contact form */}
          <div className="animate-page-in [animation-delay:150ms]">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="soft-card relative overflow-hidden rounded-[2rem] border border-petal/70 bg-gradient-to-b from-white/95 via-white/85 to-blush/50 p-6 shadow-[0_24px_80px_-30px_rgba(190,110,140,0.3)] backdrop-blur-xl dark:border-dark-line dark:from-dark-surface/95 dark:via-dark-surface/90 dark:to-dark-raised/80 sm:p-9 lg:p-10"
            >
              {/* Card decoration */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full border border-rose/20"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full border border-rose/20"
              />

              <div className="relative">
                <div className="mb-8 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-rose-deep">
                      Your note
                    </p>
                    <h2 className="heading-font mt-2 text-2xl font-bold text-ink dark:text-dark-ink sm:text-3xl">
                      Send me a message
                    </h2>
                  </div>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-petal/70 bg-blush/70 text-xl shadow-sm dark:border-dark-line dark:bg-dark-raised">
                    💌
                  </span>
                </div>

                <div className="flex flex-col gap-5">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-xs font-bold uppercase tracking-wide text-cocoa dark:text-dark-ink-soft"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      {...register('name', {
                        required: 'Please enter your name',
                      })}
                      className={inputClass}
                      placeholder="Your name"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && (
                      <p
                        id="name-error"
                        className="mt-2 text-xs font-semibold text-rose-deep"
                      >
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-xs font-bold uppercase tracking-wide text-cocoa dark:text-dark-ink-soft"
                    >
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
                      className={inputClass}
                      placeholder="you@example.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <p
                        id="email-error"
                        className="mt-2 text-xs font-semibold text-rose-deep"
                      >
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-xs font-bold uppercase tracking-wide text-cocoa dark:text-dark-ink-soft"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      {...register('message', {
                        required: 'Please write a message',
                      })}
                      rows={5}
                      className={`${inputClass} min-h-36 resize-y`}
                      placeholder="What's on your mind?"
                      aria-invalid={!!errors.message}
                      aria-describedby={
                        errors.message ? 'message-error' : undefined
                      }
                    />
                    {errors.message && (
                      <p
                        id="message-error"
                        className="mt-2 text-xs font-semibold text-rose-deep"
                      >
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="soft-card soft-card-hover mt-1 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose to-rose-deep px-6 py-4 text-sm font-bold text-white shadow-lg shadow-rose/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-rose/25 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
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

                  <div aria-live="polite" className="min-h-0">
                    {status === 'success' && (
                      <p className="rounded-2xl border border-sage bg-sage/20 px-4 py-3 text-sm font-semibold text-sage-deep">
                        Message sent — thank you! 💌
                      </p>
                    )}

                    {status === 'error' && (
                      <p className="rounded-2xl border border-petal bg-blush px-4 py-3 text-sm font-semibold text-rose-deep">
                        Something went wrong — mind trying again?
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </form>

            <p className="mt-5 text-center text-xs text-mocha/70 dark:text-dark-ink-soft">
              No rush — I&apos;ll be in touch as soon as I can. ✧
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}