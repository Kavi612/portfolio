import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import ContactForm from '@/components/contact/ContactForm'
import ContactInfoCard from '@/components/contact/ContactInfoCard'
import { profile } from '@/data/portfolioData'
import { fadeUp, viewportOnce } from '@/utils/animations'

const contactMethods = [
  {
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: FiMail,
  },
  {
    label: 'Phone',
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s+/g, '')}`,
    icon: FiPhone,
  },
  {
    label: 'Location',
    value: profile.location,
    href: null,
    icon: FiMapPin,
  },
  {
    label: 'GitHub',
    value: 'github.com/Kavi612',
    href: profile.github,
    icon: FiGithub,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/kavirathna612',
    href: profile.linkedin,
    icon: FiLinkedin,
  },
]

export default function Contact() {
  return (
    <div className="bg-navy-950 py-16 sm:py-24 lg:py-28">
      <div className="section-container">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-14">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-text-muted">
              06 — Contact
            </p>
            <h2 className="text-3xl font-bold text-text-main sm:text-4xl lg:text-5xl">
              Let&apos;s Build{' '}
              <span className="gradient-text animate-gradient bg-300%">
                Something Together
              </span>
            </h2>
            <p className="mt-4 max-w-xl text-base text-text-muted sm:text-lg">
              Open to AI/ML, Full Stack, and AWS roles — especially at product-based
              companies building real-world software. Reach out anytime.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              {contactMethods.map((method) => (
                <ContactInfoCard
                  key={method.label}
                  icon={method.icon}
                  label={method.label}
                  value={method.value}
                  href={method.href}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
