import { motion } from 'framer-motion'
import SkillBadge from '@/components/skills/SkillBadge'
import { skills } from '@/data/portfolioData'
import { fadeUp, scaleIn, staggerContainer, viewportOnce } from '@/utils/animations'

const categories = Object.entries(skills)

export default function Skills() {
  return (
    <div className="bg-navy-900 py-16 sm:py-24 lg:py-28">
      <div className="section-container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-12"
        >
          <motion.p
            variants={fadeUp}
            className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-text-muted"
          >
            03 — Skills
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-3xl font-bold text-text-main sm:text-4xl lg:text-5xl"
          >
            Stack I ship with{' '}
            <span className="gradient-text animate-gradient bg-300%">every week</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-2xl text-base text-text-muted sm:text-lg"
          >
            From model training to full-stack delivery and cloud deploy — tools I use to
            build production AI products.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {categories.map(([category, items]) => (
            <motion.div
              key={category}
              className="glow-card p-5 sm:p-6"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={staggerContainer}
            >
              <motion.h3
                variants={fadeUp}
                className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-blue-light"
              >
                {category}
              </motion.h3>

              <motion.div
                className="flex flex-wrap gap-2"
                variants={staggerContainer}
              >
                {items.map((skill) => (
                  <motion.div key={skill} variants={scaleIn}>
                    <SkillBadge name={skill} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
