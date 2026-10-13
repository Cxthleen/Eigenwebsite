'use client'

import { useEffect, useRef } from 'react'

/* Dreamy stardust trail + moonlight bloom on click, drawn on one canvas over
   everything. The sparkle cursor itself is plain CSS (see globals.css) so it
   never lags. */

// whiteCore: bright centers glow on the night sky but vanish on the pale dawn one
type Palette = { dust: string[]; bloom: string; ring: string; blend: GlobalCompositeOperation; whiteCore: boolean }

// light: pastel dawn — lilac, blush, butter; dark: starlight and moon glow
const PALETTES: Record<'day' | 'night', Palette> = {
  day: {
    dust: ['201, 168, 240', '255, 182, 206', '212, 184, 245', '255, 214, 160', '255, 255, 255'],
    bloom: '248, 217, 255',
    ring: '201, 168, 240',
    blend: 'source-over',
    whiteCore: false,
  },
  night: {
    dust: ['255, 248, 240', '222, 208, 240', '255, 232, 214', '255, 209, 227', '196, 176, 255'],
    bloom: '222, 208, 240',
    ring: '255, 248, 240',
    blend: 'lighter',
    whiteCore: true,
  },
}

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  color: string
  spin: number
  angle: number
  twinkle: number
  sparkle: boolean
}

type Bloom = { x: number; y: number; life: number }

// four-point sparkle, same shape as the sky stars
function sparklePath(ctx: CanvasRenderingContext2D, size: number) {
  const k = size * 0.12
  ctx.beginPath()
  ctx.moveTo(0, -size)
  ctx.quadraticCurveTo(k, -k, size, 0)
  ctx.quadraticCurveTo(k, k, 0, size)
  ctx.quadraticCurveTo(-k, k, -size, 0)
  ctx.quadraticCurveTo(-k, -k, 0, -size)
}

// soft glowing orb — a radial gradient is much cheaper than shadowBlur
function glow(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, rgb: string, alpha: number) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r)
  g.addColorStop(0, `rgba(${rgb}, ${alpha})`)
  g.addColorStop(0.35, `rgba(${rgb}, ${alpha * 0.45})`)
  g.addColorStop(1, `rgba(${rgb}, 0)`)
  ctx.fillStyle = g
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2)
  ctx.fill()
}

const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)]

export default function StarCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const particles: Particle[] = []
    const blooms: Bloom[] = []
    let last: { x: number; y: number } | null = null
    let frame = 0
    let running = false

    const palette = () =>
      PALETTES[document.documentElement.classList.contains('dark') ? 'night' : 'day']

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const start = () => {
      if (!running) {
        running = true
        frame = requestAnimationFrame(tick)
      }
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const { clientX: x, clientY: y } = e
      if (last) {
        const dx = x - last.x
        const dy = y - last.y
        const dist = Math.hypot(dx, dy)
        // more dust the faster you move, so the tail stretches out
        const count = Math.min(Math.ceil(dist / 9), 5)
        const { dust } = palette()
        for (let i = 0; i < count; i++) {
          const t = i / count
          const sparkle = Math.random() < 0.18
          particles.push({
            x: last.x + dx * t + (Math.random() - 0.5) * 6,
            y: last.y + dy * t + (Math.random() - 0.5) * 6,
            vx: -dx * 0.012 + (Math.random() - 0.5) * 0.25,
            vy: -dy * 0.012 + Math.random() * 0.2,
            life: 0,
            maxLife: 50 + Math.random() * 40,
            size: sparkle ? 3 + Math.random() * 2.5 : 1 + Math.random() * 1.8,
            color: pick(dust),
            spin: (Math.random() - 0.5) * 0.04,
            angle: Math.random() * Math.PI,
            twinkle: Math.random() * Math.PI * 2,
            sparkle,
          })
        }
      }
      last = { x, y }
      start()
    }

    const onLeave = () => {
      last = null
    }

    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const { clientX: x, clientY: y } = e
      blooms.push({ x, y, life: 0 })
      const { dust } = palette()
      const n = 8
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2 + (Math.random() - 0.5) * 0.5
        const speed = 1.2 + Math.random() * 1.4
        particles.push({
          x,
          y,
          vx: Math.cos(a) * speed,
          vy: Math.sin(a) * speed - 0.4,
          life: 0,
          maxLife: 70 + Math.random() * 30,
          size: 4 + Math.random() * 3.5,
          color: pick(dust),
          spin: (Math.random() - 0.5) * 0.06,
          angle: Math.random() * Math.PI,
          twinkle: Math.random() * Math.PI * 2,
          sparkle: true,
        })
      }
      start()
    }

    const tick = () => {
      const p = palette()
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      ctx.globalCompositeOperation = p.blend

      // moonlight bloom: a soft glow that swells, with a thin halo drifting out
      for (let i = blooms.length - 1; i >= 0; i--) {
        const b = blooms[i]
        b.life++
        const t = b.life / 45
        if (t >= 1) {
          blooms.splice(i, 1)
          continue
        }
        const ease = 1 - (1 - t) ** 3
        glow(ctx, b.x, b.y, 14 + ease * 30, p.bloom, 0.55 * (1 - t))
        ctx.strokeStyle = `rgba(${p.ring}, ${0.6 * (1 - t) ** 2})`
        ctx.lineWidth = 1.2
        ctx.beginPath()
        ctx.arc(b.x, b.y, 8 + ease * 36, 0, Math.PI * 2)
        ctx.stroke()
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const q = particles[i]
        q.life++
        if (q.life >= q.maxLife) {
          particles.splice(i, 1)
          continue
        }
        q.vx *= 0.96
        q.vy = q.vy * 0.96 + 0.025 // drifts down like slow stardust
        q.x += q.vx
        q.y += q.vy
        q.angle += q.spin

        const t = q.life / q.maxLife
        // fade in quickly, fade out gently, with a soft twinkle
        const fade = Math.min(1, q.life / 6) * (1 - t) ** 1.5
        const alpha = fade * (0.75 + 0.25 * Math.sin(q.life * 0.25 + q.twinkle))
        const size = q.size * (1 - t * 0.5)
        const core = p.whiteCore ? '255, 255, 255' : q.color

        glow(ctx, q.x, q.y, size * (q.sparkle ? 3 : 3.5), q.color, alpha * 0.5)
        if (q.sparkle) {
          ctx.save()
          ctx.translate(q.x, q.y)
          ctx.rotate(q.angle)
          ctx.fillStyle = `rgba(${core}, ${alpha})`
          sparklePath(ctx, size)
          ctx.fill()
          ctx.restore()
        } else {
          ctx.fillStyle = `rgba(${core}, ${alpha * 0.9})`
          ctx.beginPath()
          ctx.arc(q.x, q.y, size * 0.45, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      ctx.globalCompositeOperation = 'source-over'

      if (particles.length || blooms.length) {
        frame = requestAnimationFrame(tick)
      } else {
        running = false
      }
    }

    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] h-screen w-screen"
    />
  )
}
