import { motion } from 'framer-motion'
import StatCard from '@/components/about/StatCard'
import { stats } from '@/data/portfolioData'
import { fadeUp, staggerContainer, viewportOnce } from '@/utils/animations'

const JOURNEY = ['Learning', 'Building', 'Experimenting', 'Evolving']

export default function About() {
  return (
    <div className="bg-navy-900 py-16 sm:py-24 lg:py-28">
      <div className="section-container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-8 lg:mb-10"
        >
          <motion.p
            variants={fadeUp}
            className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-text-muted"
          >
            About Me
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="max-w-3xl text-[1.75rem] font-bold leading-tight tracking-tight text-text-main sm:text-4xl lg:text-5xl"
          >
            Building{' '}
            <span className="gradient-text animate-gradient bg-300%">
              AI Products That Matter
            </span>
          </motion.h2>
        </motion.div>

        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          {/* Left — story */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.div variants={fadeUp} className="space-y-4">
              <p className="text-[0.95rem] leading-relaxed text-text-muted sm:text-base sm:leading-7">
                I&apos;m Kavirathna Velmurugan, an AI &amp; Data Science student who enjoys
                turning ideas into real, usable technology.
              </p>
              <p className="text-[0.95rem] leading-relaxed text-text-muted sm:text-base sm:leading-7">
                I work across AI, Machine Learning, Full-Stack Development, and AWS Cloud —
                building projects that combine intelligent systems, thoughtful design, and
                practical functionality.
              </p>
              <p className="text-[0.95rem] leading-relaxed text-text-muted sm:text-base sm:leading-7">
                I believe the best way to learn technology is to build with it —
                experimenting, solving problems, breaking things, and constantly finding
                ways to build better.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8 sm:mt-10">
              <div className="inline-flex max-w-full flex-col gap-3">
                <span className="h-px w-16 bg-gradient-to-r from-blue-accent to-transparent" />
                <p className="flex flex-wrap items-center gap-x-2 gap-y-2 text-sm font-semibold tracking-[0.06em] sm:text-base">
                  {JOURNEY.map((step, index) => (
                    <span key={step} className="inline-flex items-center gap-x-2">
                      <span className="gradient-text animate-gradient bg-300%">
                        {step}
                      </span>
                      {index < JOURNEY.length - 1 && (
                        <span aria-hidden="true" className="text-blue-accent/70">
                          →
                        </span>
                      )}
                    </span>
                  ))}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — stats */}
          <motion.div
            className="grid grid-cols-2 gap-3 sm:gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {stats.map((stat) => (
              <StatCard
                key={stat.label}
                label={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                decimals={stat.decimals ?? 0}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
