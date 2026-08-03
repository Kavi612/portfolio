import { motion } from 'framer-motion'
import TimelineItem from '@/components/experience/TimelineItem'
import { internships, workExperience } from '@/data/portfolioData'
import { fadeUp, staggerContainer, viewportOnce } from '@/utils/animations'

function TimelineSection({ title, items, showImages = false }) {
  return (
    <div>
      <motion.h3
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mb-6 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-blue-light"
      >
        {title}
      </motion.h3>

      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute bottom-2 left-[9px] top-2 w-px bg-gradient-to-b from-blue-accent/80 via-blue-glow to-transparent"
        />
        <ul className="relative">
          {items.map((item, index) => (
            <TimelineItem
              key={item.id}
              role={item.role}
              org={item.org}
              company={item.company}
              type={item.type}
              period={item.period}
              duration={item.duration}
              description={item.description}
              location={item.location}
              liveUrl={item.liveUrl}
              githubUrl={item.githubUrl}
              certificateUrl={item.certificateUrl}
              image={showImages ? item.image : undefined}
              isLast={index === items.length - 1}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function Experience() {
  return (
    <div className="bg-navy-950 py-16 sm:py-24 lg:py-28">
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
            04 — Experience
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-3xl font-bold text-text-main sm:text-4xl lg:text-5xl"
          >
            Roles where I{' '}
            <span className="gradient-text animate-gradient bg-300%">
              shipped real work
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-2xl text-base text-text-muted sm:text-lg"
          >
            Full-stack products in production, plus AI/ML internships focused on retrieval,
            cloud, and client delivery.
          </motion.p>
        </motion.div>

        <div className="grid gap-14 lg:grid-cols-2 lg:gap-12">
          <TimelineSection title="Work Experience" items={workExperience} />
          <TimelineSection
            title="Internships"
            items={internships}
            showImages
          />
        </div>
      </div>
    </div>
  )
}
