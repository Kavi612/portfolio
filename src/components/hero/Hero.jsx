import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'
import NetworkGlobe from '@/components/hero/NetworkGlobe'
import { personal } from '@/data/portfolioData'
import { useMousePosition } from '@/hooks/useMousePosition'
import { fadeUp, magneticOffset, staggerContainer } from '@/utils/animations'

function useDesktopParallax() {
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

const PARTICLES = [
  { top: '12%', left: '8%', size: 10, delay: '0s', duration: '7s' },
  { top: '28%', left: '78%', size: 7, delay: '0.8s', duration: '9s' },
  { top: '62%', left: '14%', size: 12, delay: '1.4s', duration: '8s' },
  { top: '70%', left: '62%', size: 8, delay: '0.3s', duration: '10s' },
  { top: '40%', left: '48%', size: 6, delay: '1.1s', duration: '6.5s' },
  { top: '18%', left: '40%', size: 9, delay: '1.8s', duration: '11s' },
]

const headlineReveal = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

function MagneticButton({ children, className, onClick, href, download }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 280, damping: 18, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 280, damping: 18, mass: 0.4 })

  const onMove = (event) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const offset = magneticOffset(event.clientX, event.clientY, rect, 0.32)
    x.set(offset.x)
    y.set(offset.y)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  const shared = {
    ref,
    style: { x: springX, y: springY },
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    className,
    'data-cursor': 'hover',
  }

  if (href) {
    return (
      <motion.a href={href} download={download} {...shared}>
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button type="button" onClick={onClick} {...shared}>
      {children}
    </motion.button>
  )
}

export default function Hero() {
  const { nx, ny } = useMousePosition()
  const parallax = useDesktopParallax()
  const px = parallax ? nx : 0
  const py = parallax ? ny : 0

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-12 pt-20 sm:pb-16"
    >
      {/* Floating particles — lightest parallax (desktop only) */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{ x: px * 8, y: py * 8 }}
        transition={{ type: 'spring', stiffness: 50, damping: 20, mass: 0.8 }}
      >
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-blue-light/40 blur-[1px] animate-float"
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              animationDuration: p.duration,
              boxShadow: '0 0 18px rgba(96, 165, 250, 0.55)',
            }}
          />
        ))}
      </motion.div>

      <div className="section-container relative z-10 grid w-full items-center gap-8 lg:grid-cols-2 lg:gap-10">
        <motion.div
          className="order-2 max-w-xl lg:order-1 lg:max-w-none"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          style={{
            transform: `translate3d(${px * 14}px, ${py * 10}px, 0)`,
          }}
        >
          {/* Eyebrow */}
          <motion.p
            variants={fadeUp}
            className="mb-5 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-blue-light/80 sm:text-xs"
          >
            <span className="hidden h-px w-8 bg-gradient-to-r from-blue-accent/80 to-transparent sm:block" />
            Welcome to my digital space
          </motion.p>

          {/* Greeting */}
          <motion.p
            variants={fadeUp}
            className="mb-2 text-base font-normal tracking-wide text-text-muted sm:text-lg"
          >
            Hi, I&apos;m
          </motion.p>

          {/* Primary identity — name */}
          <motion.h1
            variants={fadeUp}
            className="gradient-text animate-gradient bg-300% text-[2.15rem] font-bold leading-[1.1] tracking-tight break-words sm:text-5xl md:text-6xl lg:text-[3.75rem]"
          >
            Kavirathna Velmurugan
          </motion.h1>

          {/* Brand headline — second strongest */}
          <motion.h2
            variants={headlineReveal}
            className="mt-5 max-w-xl text-lg font-semibold uppercase leading-snug tracking-[0.04em] text-text-main sm:mt-6 sm:text-xl md:text-2xl md:leading-tight"
          >
            Engineering Intelligence.{' '}
            <span className="text-blue-light">Building Impact.</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-[38rem] text-[0.95rem] leading-relaxed text-text-muted sm:mt-6 sm:text-base sm:leading-8"
          >
            Exploring the intersection of AI, software, and human-centered technology
            to build intelligent solutions for the world ahead.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-wrap items-center gap-3 sm:mt-9 sm:gap-4"
          >
            <MagneticButton
              onClick={scrollToProjects}
              className="inline-flex min-h-11 items-center rounded-xl bg-blue-accent px-6 py-3 text-sm font-semibold text-white shadow-blue-glow transition-shadow hover:shadow-blue-glow-lg"
            >
              Explore My Work →
            </MagneticButton>

            <MagneticButton
              href={personal.resumeUrl}
              download
              className="inline-flex min-h-11 items-center rounded-xl border border-blue-accent/70 bg-transparent px-6 py-3 text-sm font-semibold text-blue-light transition-colors hover:border-blue-light hover:bg-blue-glow/30"
            >
              Download Resume
            </MagneticButton>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 flex items-center gap-3">
            <a
              href={personal.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              data-cursor="hover"
              className="tap-target rounded-full border border-blue-glow/50 text-text-muted transition-all hover:border-blue-light hover:text-blue-light hover:shadow-blue-glow"
            >
              <Github size={18} />
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              data-cursor="hover"
              className="tap-target rounded-full border border-blue-glow/50 text-text-muted transition-all hover:border-blue-light hover:text-blue-light hover:shadow-blue-glow"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={`mailto:${personal.email}`}
              aria-label="Email"
              data-cursor="hover"
              className="tap-target rounded-full border border-blue-glow/50 text-text-muted transition-all hover:border-blue-light hover:text-blue-light hover:shadow-blue-glow"
            >
              <Mail size={18} />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="order-1 lg:order-2"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{
            opacity: 1,
            scale: 1,
            x: px * -18,
            y: py * -12,
          }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <NetworkGlobe />
        </motion.div>
      </div>
    </section>
  )
}
