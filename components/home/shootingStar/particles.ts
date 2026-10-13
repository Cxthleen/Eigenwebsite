/* four-point sparkle, same shape as the sky stars and the cursor */
export const SPARKLE_PATH =
  'M12 0 C12.8 8 16 11.2 24 12 C16 12.8 12.8 16 12 24 C11.2 16 8 12.8 0 12 C8 11.2 11.2 8 12 0 Z'

/* pastel moonlight: starlight, butter, blush, lilac */
export const COLORS = ['#ffffff', '#fff3d6', '#ffd1e3', '#e3d4ff']

/*
 * Deterministic pseudo-random so server and client
 * render the exact same particles (no hydration mismatch).
 */
function rand(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280
  return x - Math.floor(x)
}

const PARTICLE_COUNT = 26

/* sparkles that float out of the impact, then drift down while twinkling */
export const burstParticles = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
  const angle = (i / PARTICLE_COUNT) * Math.PI * 2 + (rand(i + 1) - 0.5) * 0.6
  const distance = 60 + rand(i + 101) * 120

  return {
    x: `${Math.round(Math.cos(angle) * distance)}px`,
    y: `${Math.round(Math.sin(angle) * distance * 0.8)}px`,
    fall: `${Math.round(20 + rand(i + 601) * 40)}px`,
    size: `${Math.round(6 + rand(i + 201) * 10)}px`,
    spin: `${Math.round((rand(i + 301) - 0.5) * 240)}deg`,
    dur: `${(1.2 + rand(i + 401) * 0.5).toFixed(2)}s`,
    delay: `${(rand(i + 501) * 0.15).toFixed(2)}s`,
    color: COLORS[i % COLORS.length],
  }
})
