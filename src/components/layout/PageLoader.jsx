import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { personal } from '@/data/portfolioData'

const NODES = [
  { cx: 32, cy: 18 },
  { cx: 50, cy: 28 },
  { cx: 44, cy: 48 },
  { cx: 20, cy: 42 },
  { cx: 14, cy: 22 },
]

export default function PageLoader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const ready = document.readyState === 'complete'
    const delay = ready ? 1200 : 1600
    const timer = setTimeout(() => setVisible(false), delay)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[10001] flex items-center justify-center bg-navy-950"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Loading"
          role="status"
        >
          <div className="flex flex-col items-center gap-6">
            <motion.svg
              width="72"
              height="72"
              viewBox="0 0 64 64"
              className="text-blue-light"
              initial={{ opacity: 0.6 }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              {NODES.map((a, i) =>
                NODES.slice(i + 1).map((b, j) => (
                  <motion.line
                    key={`${i}-${j}`}
                    x1={a.cx}
                    y1={a.cy}
                    x2={b.cx}
                    y2={b.cy}
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeOpacity="0.35"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: [0, 1, 0.4] }}
                    transition={{
                      duration: 1.4,
                      repeat: Infinity,
                      delay: (i + j) * 0.08,
                      ease: 'easeInOut',
                    }}
                  />
                )),
              )}
              {NODES.map((node, i) => (
                <motion.circle
                  key={i}
                  cx={node.cx}
                  cy={node.cy}
                  r="3"
                  fill="#60A5FA"
                  animate={{
                    r: [2.5, 3.8, 2.5],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.12,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </motion.svg>

            <motion.p
              className="font-mono text-gradient-blue animate-gradient bg-300% text-2xl font-bold tracking-[0.25em]"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.45 }}
            >
              {personal.brandMark}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
