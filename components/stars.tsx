'use client'

import { useEffect, useState } from 'react'

type Star = {
  top: string
  left: string
  size: number
  delay: number
}

export default function Stars({ count = 60 }: { count?: number }) {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    // generated client-side so server and client don't render different random values
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStars(
      Array.from({ length: count }, () => ({
        top: `${Math.random() * 70}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 3,
      }))
    )
  }, [count])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-star animate-twinkle"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  )
}