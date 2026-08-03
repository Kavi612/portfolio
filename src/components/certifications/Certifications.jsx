import { motion } from 'framer-motion'
import CertCard from '@/components/certifications/CertCard'
import { certifications } from '@/data/portfolioData'
import { fadeUp, scaleIn, staggerContainer, viewportOnce } from '@/utils/animations'

const industryCerts = certifications.filter((c) => c.category === 'industry')
const courseCerts = certifications.filter((c) => c.category === 'course')

function CertGrid({ items }) {
  return (
    <motion.div
      className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {items.map((cert) => (
        <motion.div key={cert.id} variants={scaleIn}>
          <CertCard cert={cert} />
        </motion.div>
      ))}
    </motion.div>
  )
}

export default function Certifications() {
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
            05 — Certifications
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-3xl font-bold text-text-main sm:text-4xl lg:text-5xl"
          >
            Credentials that{' '}
            <span className="gradient-text animate-gradient bg-300%">back the work</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-2xl text-base text-text-muted sm:text-lg"
          >
            Two industry AWS certifications, plus course and workshop credentials —
            text details only.
          </motion.p>
        </motion.div>

        <div className="space-y-12">
          <div>
            <motion.h3
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="mb-5 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-blue-light"
            >
              Industry Certificates ({industryCerts.length})
            </motion.h3>
            <CertGrid items={industryCerts} />
          </div>

          <div>
            <motion.h3
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="mb-5 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-blue-light"
            >
              Course Certificates ({courseCerts.length})
            </motion.h3>
            <CertGrid items={courseCerts} />
          </div>
        </div>
      </div>
    </div>
  )
}
