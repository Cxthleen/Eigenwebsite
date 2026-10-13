import type { CSSProperties } from 'react'

/*
 * Pre-baked SVG artwork for the sky scenes (hero + ambient).
 * Clouds are drawn ONCE into images with their colours,
 * soft edges and fades baked in, so moving them is just sliding a
 * picture — no masks or blur filters for the browser to redo each frame.
 */

export type Vars = CSSProperties & Record<`--${string}`, string>

/* cloud tops as [width, bump height, valley y] in a 1440×240 tile */
export type Bump = [number, number, number]

/* gradient stop: [offset 0–1, colour, opacity = 1] */
export type Stop = [number, string, number?]

const toUrl = (svg: string) => `url("data:image/svg+xml,${encodeURIComponent(svg)}")`

const stops = (list: Stop[]) =>
  list.map(([o, c, a = 1]) => `<stop offset='${o}' stop-color='${c}' stop-opacity='${a}'/>`).join('')

function cloudPath(bumps: Bump[]) {
  const first = bumps[0][2]
  let x = 0
  let d = `M0 240 L0 ${first}`
  bumps.forEach(([w, h], i) => {
    // last bump lands back on the first valley so the tile repeats seamlessly
    const nextY = i === bumps.length - 1 ? first : bumps[i + 1][2]
    x += w
    d += ` A${(w / 2) * 1.04} ${h} 0 0 1 ${x} ${nextY}`
  })
  return d + ' L1440 240 Z'
}

/*
 * Soft edges come from blurring only a white cut-out (an alpha mask);
 * the colours are laid through it unblurred. Blurring the coloured,
 * fading shapes directly made nearly-transparent pixels come out as
 * random hues (green/yellow lines) on some graphics cards.
 */
const softFilter = (blur: number, region = '') =>
  `<filter id='b' color-interpolation-filters='sRGB'${region}><feGaussianBlur stdDeviation='${blur}'/></filter>`

type CloudOptions = {
  /* soft-edge blur, in tile units */
  blur: number
  /* body gradient, top → bottom of the tile */
  fill: Stop[]
  /* optional moonlit rim peeking out above the body: colour + opacity */
  rim?: [string, number]
  /* how far the rim sits above the body, in tile units */
  rimOffset?: number
  /* the layer fades out from here (0–1) down to its bottom edge */
  fadeFrom: number
  /* optional second fade shared by all layers of a stack (0–1, in this layer's terms) */
  stackFadeFrom?: number
}

/*
 * One repeating 1440×240 tile of cloud tops (with an optional lighter
 * rim peeking out above), fading out toward the bottom.
 */
export function cloudImage(bumps: Bump[], { blur, fill, rim, rimOffset = 0, fadeFrom, stackFadeFrom }: CloudOptions) {
  const tiles = [-1440, 0, 1440] // neighbours, so the soft edge wraps across the seam
  const cutout = (y: number) =>
    `<g filter='url(#b)'>${tiles.map((x) => `<use href='#p' x='${x}' y='${y}' fill='white'/>`).join('')}</g>`
  const box = `x='0' y='-240' width='1440' height='480'`
  const alphaMask = (id: string, content: string) =>
    `<mask id='${id}' maskUnits='userSpaceOnUse' ${box} style='mask-type:alpha'>${content}</mask>`
  const fade = (id: string, from: number) =>
    `<linearGradient id='${id}g' gradientUnits='userSpaceOnUse' x1='0' y1='0' x2='0' y2='240'>${stops([[0, '#fff'], [from, '#fff'], [1, '#fff', 0]])}</linearGradient>` +
    alphaMask(id, `<rect ${box} fill='url(#${id}g)'/>`)
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 240' preserveAspectRatio='none'><defs>` +
    `<linearGradient id='f' gradientUnits='userSpaceOnUse' x1='0' y1='0' x2='0' y2='240'>${stops(fill)}</linearGradient>` +
    // the rim's gradient moves up with it, like the old offset element did
    (rim
      ? `<linearGradient id='r' gradientUnits='userSpaceOnUse' x1='0' y1='${-rimOffset}' x2='0' y2='${240 - rimOffset}'>${stops([[0, rim[0], rim[1]], [0.55, rim[0], rim[1]], [0.7, rim[0], 0]])}</linearGradient>` +
        alphaMask('mr', cutout(-rimOffset))
      : '') +
    softFilter(blur, ` filterUnits='userSpaceOnUse' x='-1440' y='-240' width='4320' height='720'`) +
    `<path id='p' d='${cloudPath(bumps)}'/>` +
    alphaMask('mf', cutout(0)) +
    fade('fl', fadeFrom) +
    (stackFadeFrom === undefined ? '' : fade('fs', stackFadeFrom)) +
    `</defs>` +
    (stackFadeFrom === undefined ? '' : `<g mask='url(#fs)'>`) +
    `<g mask='url(#fl)'>` +
    (rim ? `<rect width='1440' height='240' fill='url(#r)' mask='url(#mr)'/>` : '') +
    `<rect width='1440' height='240' fill='url(#f)' mask='url(#mf)'/>` +
    `</g>` +
    (stackFadeFrom === undefined ? '' : `</g>`) +
    `</svg>`
  return toUrl(svg)
}

/* one fluffy little cloud, lit from the top */
export function puffImage(top: [string, number], bottom: [string, number]) {
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 120' preserveAspectRatio='none'><defs>` +
    `<linearGradient id='f' x1='0' y1='0' x2='0' y2='1'>${stops([[0, ...top], [1, ...bottom]])}</linearGradient>` +
    softFilter(3.5) +
    `<mask id='m' style='mask-type:alpha'><path filter='url(#b)' fill='white' d='M24 104 A28 28 0 0 1 64 76 A42 42 0 0 1 140 52 A36 36 0 0 1 206 62 A30 30 0 0 1 252 82 A22 22 0 0 1 276 104 Z'/></mask></defs>` +
    `<rect width='300' height='120' fill='url(#f)' mask='url(#m)'/></svg>`
  return toUrl(svg)
}
