import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'
import { useMousePosition } from '@/hooks/useMousePosition'

const HOVER_SELECTOR = 'a, button, [data-cursor="hover"], input, textarea, label, summary'

function useIsDesktopCursor() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px) and (pointer: fine)')

    const update = () => setEnabled(media.matches)
    update()

    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return enabled
}

export default function CustomCursor() {
  const enabled = useIsDesktopCursor()
  const { x, y } = useMousePosition()
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const springConfig = { stiffness: 350, damping: 28, mass: 0.45 }
  const ringSpring = { stiffness: 180, damping: 22, mass: 0.6 }

  const dotX = useSpring(0, springConfig)
  const dotY = useSpring(0, springConfig)
  const ringX = useSpring(0, ringSpring)
  const ringY = useSpring(0, ringSpring)

  useEffect(() => {
    if (!enabled) return undefined

    dotX.set(x)
    dotY.set(y)
    ringX.set(x)
    ringY.set(y)

    if (!isVisible && (x !== 0 || y !== 0)) {
      setIsVisible(true)
    }
  }, [enabled, x, y, dotX, dotY, ringX, ringY, isVisible])

  useEffect(() => {
    if (!enabled) return undefined

    const onOver = (event) => {
      const target = event.target
      if (!(target instanceof Element)) return
      setIsHovering(Boolean(target.closest(HOVER_SELECTOR)))
    }

    const onLeaveWindow = () => setIsVisible(false)
    const onEnterWindow = () => setIsVisible(true)

    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOver)
    document.documentElement.addEventListener('mouseleave', onLeaveWindow)
    document.documentElement.addEventListener('mouseenter', onEnterWindow)

    return () => {
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOver)
      document.documentElement.removeEventListener('mouseleave', onLeaveWindow)
      document.documentElement.removeEventListener('mouseenter', onEnterWindow)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] hidden md:block"
      aria-hidden="true"
    >
      {/* Core dot — snappier chase */}
      <motion.div
        className="absolute left-0 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-accent"
        style={{
          x: dotX,
          y: dotY,
          opacity: isVisible ? 1 : 0,
        }}
      />

      {/* Outer ring — heavier lag + hover scale/glow */}
      <motion.div
        className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-light/70 bg-blue-glow/20"
        animate={{
          width: isHovering ? 56 : 36,
          height: isHovering ? 56 : 36,
          opacity: isVisible ? (isHovering ? 0.95 : 0.7) : 0,
          boxShadow: isHovering
            ? '0 0 28px rgba(59, 130, 246, 0.55), 0 0 56px rgba(30, 58, 138, 0.45)'
            : '0 0 14px rgba(59, 130, 246, 0.28), 0 0 28px rgba(30, 58, 138, 0.2)',
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, mass: 0.5 }}
        style={{
          x: ringX,
          y: ringY,
        }}
      />
    </div>
  )
}
