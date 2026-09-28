export const STAR_PATH =
  'M12 0 L14.9 8.6 L24 9 L16.8 14.6 L19.4 23.4 L12 18.2 L4.6 23.4 L7.2 14.6 L0 9 L9.1 8.6 Z'

/*
 * Deterministic pseudo-random so server and client
 * render the exact same particles (no hydration mismatch).
 */
function rand(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280
  return x - Math.floor(x)
}

const PARTICLE_COUNT = 40
const COLORS = ['#ffffff', '#ffe5d4', '#f8d9ff', '#fff3b0']

export const burstParticles = Array.from(
  { length: PARTICLE_COUNT },
  (_, i) => {
    const angle =
      (i / PARTICLE_COUNT) * Math.PI * 2 +
      (rand(i + 1) - 0.5) * 0.5
    const distance = 70 + rand(i + 101) * 130

    return {
      x: `${Math.round(Math.cos(angle) * distance)}px`,
      y: `${Math.round(Math.sin(angle) * distance)}px`,
      size: `${Math.round(5 + rand(i + 201) * 10)}px`,
      spin: `${Math.round((rand(i + 301) - 0.5) * 720)}deg`,
      dur: `${(0.8 + rand(i + 401) * 0.7).toFixed(2)}s`,
      delay: `${(rand(i + 501) * 0.12).toFixed(2)}s`,
      color: COLORS[i % COLORS.length],
    }
  },
)
