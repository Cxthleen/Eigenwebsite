'use client'

import { useEffect, useState } from 'react'

export function useIsDark() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // set the initial value on mount
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsDark(document.documentElement.classList.contains('dark'))

    // watch for the class changing (e.g. when the toggle button is clicked)
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'))
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  return isDark
}