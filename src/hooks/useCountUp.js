import { useEffect, useState } from 'react'

/**
 * Animates a number from 0 to target when in view.
 * Always formats with `decimals` so CGPA eases as 0.00 → 8.13 (never flashes "8").
 * Accepts `start` or `isInView` as the trigger flag.
 */
export function useCountUp(
  target,
  {
    start = false,
    isInView = false,
    duration = 1400,
    decimals = 0,
  } = {},
) {
  const shouldStart = start || isInView
  const [display, setDisplay] = useState(() => (0).toFixed(decimals))

  useEffect(() => {
    if (!shouldStart) return undefined

    let frameId
    const began = performance.now()
    const end = Number(target)

    const tick = (now) => {
      const progress = Math.min((now - began) / duration, 1)
      const eased = 1 - (1 - progress) ** 3
      setDisplay((end * eased).toFixed(decimals))

      if (progress < 1) {
        frameId = requestAnimationFrame(tick)
      }
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [target, shouldStart, duration, decimals])

  return display
}
