import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[10000] h-[3px] w-full origin-left bg-gradient-to-r from-blue-accent to-blue-light"
      style={{ scaleX }}
      aria-hidden="true"
    />
  )
}
