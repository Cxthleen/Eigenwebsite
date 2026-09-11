'use client'

import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useState } from 'react'

type FormData = {
  name: string
  email: string
  message: string
}

export default function Contact() {
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
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-14">
      <Link href="/" className="text-sm text-lavender hover:text-plum">
        ← back home
      </Link>

      <h1 className="heading-font text-3xl font-bold text-plum mt-4 mb-2">
        Get in touch! 💌
      </h1>
      <p className="text-plum-soft mb-8">
        Feel free to reach out — I'm happy to chat.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white border-2 border-pink-border rounded-3xl p-6 shadow-sm flex flex-col gap-4"
      >
        <div>
          <label className="text-sm font-semibold text-lavender block mb-1">
            Name
          </label>
          <input
            {...register('name', { required: 'Please enter your name' })}
            className="w-full border-2 border-pink-border rounded-xl px-3 py-2 text-sm"
            placeholder="Your name"
          />
          {errors.name && (
            <p className="text-xs text-pink-hover mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold text-lavender block mb-1">
            Email
          </label>
          <input
            {...register('email', {
              required: 'Please enter your email',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email',
              },
            })}
            className="w-full border-2 border-pink-border rounded-xl px-3 py-2 text-sm"
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="text-xs text-pink-hover mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold text-lavender block mb-1">
            Message
          </label>
          <textarea
            {...register('message', { required: 'Please write a message' })}
            rows={4}
            className="w-full border-2 border-pink-border rounded-xl px-3 py-2 text-sm"
            placeholder="What's on your mind?"
          />
          {errors.message && (
            <p className="text-xs text-pink-hover mt-1">{errors.message.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="self-start px-5 py-2 bg-pink text-white rounded-full text-sm font-bold shadow-sm hover:bg-pink-hover transition disabled:opacity-50"
        >
          {isSubmitting ? 'sending...' : 'Send message 🌙'}
        </button>

        {status === 'success' && (
          <p className="text-sm text-mint-tag-text">Message sent — thank you! 💌</p>
        )}
        {status === 'error' && (
          <p className="text-sm text-pink-hover">Something went wrong — try again?</p>
        )}
      </form>
    </main>
  )
}