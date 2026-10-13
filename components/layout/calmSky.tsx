'use client'

import { usePauseSkyWhileScrolling } from '@/hooks/useSceneMotion'

/* Renders nothing; just pauses the sky animations while scrolling. */
export default function CalmSky() {
  usePauseSkyWhileScrolling()
  return null
}
