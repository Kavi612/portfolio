import { useEffect, useState } from 'react'

/**
 * Tracks mouse position and returns normalized values in [-1, 1]
 * for parallax transforms.
 */
export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0, nx: 0, ny: 0 })

  useEffect(() => {
    const handleMove = (event) => {
      const { clientX, clientY } = event
      const { innerWidth, innerHeight } = window

      const nx = (clientX / innerWidth) * 2 - 1
      const ny = (clientY / innerHeight) * 2 - 1

      setPosition({
        x: clientX,
        y: clientY,
        nx: Number.isFinite(nx) ? nx : 0,
        ny: Number.isFinite(ny) ? ny : 0,
      })
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return position
}
