import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useCountUp } from '@/hooks/useCountUp'
import { fadeUp } from '@/utils/animations'

export default function StatCard({ label, value, suffix = '', decimals = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const display = useCountUp(value, {
    start: inView,
    decimals,
    duration: 1500,
  })

  return (
    <motion.article
      ref={ref}
      variants={fadeUp}
      className="glow-card flex h-full min-h-[120px] flex-col items-center justify-center px-3 py-6 text-center sm:min-h-[140px] sm:px-4 sm:py-8"
    >
      <p className="text-3xl font-bold tracking-tight text-text-main sm:text-4xl lg:text-5xl">
        <span className="gradient-text animate-gradient bg-300%">{display}</span>
        {suffix}
      </p>
      <p className="mt-2 px-1 text-[11px] font-medium uppercase leading-snug tracking-[0.12em] text-text-muted sm:text-xs">
        {label}
      </p>
    </motion.article>
  )
}
