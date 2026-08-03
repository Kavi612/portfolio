import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProjectCard from '@/components/projects/ProjectCard'
import { projects } from '@/data/portfolioData'
import { fadeUp, staggerContainer, viewportOnce } from '@/utils/animations'

export default function Projects() {
  const scrollerRef = useRef(null)
  const [active, setActive] = useState(0)

  const updateActiveFromScroll = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    const width = el.clientWidth || 1
    const index = Math.round(el.scrollLeft / width)
    setActive(Math.max(0, Math.min(projects.length - 1, index)))
  }, [])

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return undefined

    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        updateActiveFromScroll()
        ticking = false
      })
    }

    el.addEventListener('scroll', onScroll, { passive: true })
    updateActiveFromScroll()
    return () => el.removeEventListener('scroll', onScroll)
  }, [updateActiveFromScroll])

  const scrollToIndex = (index) => {
    const el = scrollerRef.current
    if (!el) return
    const clamped = Math.max(0, Math.min(projects.length - 1, index))
    el.scrollTo({ left: clamped * el.clientWidth, behavior: 'smooth' })
    setActive(clamped)
  }

  const onKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      scrollToIndex(active + 1)
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      scrollToIndex(active - 1)
    }
  }

  return (
    <div className="bg-navy-950 py-16 sm:py-24 lg:py-28">
      <div className="section-container mb-8 sm:mb-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.p
            variants={fadeUp}
            className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-text-muted"
          >
            02 — Projects
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-3xl font-bold text-text-main sm:text-4xl lg:text-5xl"
          >
            Built for{' '}
            <span className="gradient-text animate-gradient bg-300%">
              real impact
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-2xl text-base text-text-muted sm:text-lg"
          >
            Production AI products — swipe or use arrows to explore each build.
          </motion.p>
        </motion.div>
      </div>

      <div
        className="relative outline-none"
        tabIndex={0}
        onKeyDown={onKeyDown}
        aria-roledescription="carousel"
        aria-label="Featured projects"
      >
        {/* Padding lives inside snap-items so each slide is exactly one viewport width */}
        <div ref={scrollerRef} className="snap-x-container">
          {projects.map((project, index) => (
            <div key={project.id} className="snap-item">
              <div className="px-5 sm:px-8 lg:px-10">
                <ProjectCard project={project} isActive={index === active} />
              </div>
            </div>
          ))}
        </div>

        <div className="section-container mt-6 flex items-center justify-between gap-4 sm:mt-8">
          <div className="hidden items-center gap-3 md:flex">
            <button
              type="button"
              aria-label="Previous project"
              data-cursor="hover"
              disabled={active === 0}
              onClick={() => scrollToIndex(active - 1)}
              className="tap-target rounded-full border border-blue-glow/50 text-text-main transition enabled:hover:border-blue-light enabled:hover:text-blue-light disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              aria-label="Next project"
              data-cursor="hover"
              disabled={active === projects.length - 1}
              onClick={() => scrollToIndex(active + 1)}
              className="tap-target rounded-full border border-blue-glow/50 text-text-main transition enabled:hover:border-blue-light enabled:hover:text-blue-light disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div
            className="flex flex-1 items-center justify-center gap-1 md:justify-end"
            role="tablist"
            aria-label="Project indicators"
          >
            {projects.map((project, index) => (
              <button
                key={project.id}
                type="button"
                role="tab"
                aria-selected={index === active}
                aria-label={`Go to ${project.name}`}
                data-cursor="hover"
                onClick={() => scrollToIndex(index)}
                className="tap-target"
              >
                <span
                  className={`block h-2.5 rounded-full transition-all duration-300 ${
                    index === active
                      ? 'w-8 bg-blue-accent shadow-blue-glow'
                      : 'w-2.5 bg-blue-glow/70'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
