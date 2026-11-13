import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight, ExternalLink, FileBadge2, Github } from 'lucide-react'
import TimelineItem from '@/components/experience/TimelineItem'
import {
  clientProjects,
  otherInternships,
  pairedInternships,
} from '@/data/portfolioData'
import { fadeUp, staggerContainer, viewportOnce } from '@/utils/animations'

const internshipImages = import.meta.glob(
  '../../assets/Internship/*.{png,jpg,jpeg,webp}',
  {
    eager: true,
    import: 'default',
  },
)

function resolveImage(imageName) {
  if (!imageName) return null
  const entry = Object.entries(internshipImages).find(([path]) =>
    path.endsWith(`/${imageName}`),
  )
  return entry ? entry[1] : null
}

function PairedRow({ row }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="group relative"
    >
      <div className="relative grid grid-cols-1 items-stretch gap-3 lg:grid-cols-5 lg:gap-4">
        {/* Left Card: ~40% (2 cols of 5) */}
        <div className="glow-card relative flex h-full min-h-[220px] flex-col justify-between border-l-2 border-l-blue-accent/80 p-5 sm:p-6 lg:col-span-2 lg:min-h-[260px]">
          <div>
            <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-blue-light/70">
              Internship
            </span>
            <h4 className="text-lg font-bold text-text-main transition-colors group-hover:text-white">
              {row.left.company}
            </h4>
            <p className="mt-1 text-sm font-semibold text-blue-light">
              {row.left.role}
            </p>
            <p className="mt-3 font-mono text-xs text-text-muted">
              {row.left.dates}
            </p>
            <p className="mt-1 text-xs text-text-muted/80">
              {row.left.location}
            </p>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-blue-glow/20 pt-3 text-xs text-text-muted">
            <span className="font-mono text-[11px] text-blue-light/80">Shipped Product →</span>
            <span className="text-xs font-semibold text-text-main">{row.right.title}</span>
          </div>
        </div>

        {/* Desktop connector arrow */}
        <div
          aria-hidden="true"
          className="absolute left-[40%] top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-blue-accent/60 bg-navy-900 shadow-blue-glow transition-transform group-hover:scale-110 group-hover:border-blue-light lg:flex h-8 w-8 text-blue-light"
        >
          <ArrowRight size={14} />
        </div>

        {/* Mobile connector arrow */}
        <div
          aria-hidden="true"
          className="-my-1.5 flex justify-center z-10 lg:hidden"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-full border border-blue-accent/60 bg-navy-900 shadow-blue-glow text-blue-light">
            <ArrowDown size={12} />
          </div>
        </div>

        {/* Right Card: ~60% (3 cols of 5) */}
        <div className="glow-card flex h-full min-h-[220px] flex-col justify-between border-l-2 border-l-blue-accent/50 p-5 sm:p-6 lg:col-span-3 lg:min-h-[260px] lg:border-l-blue-glow/30">
          <div>
            <h4 className="text-xl font-bold text-text-main transition-colors group-hover:text-white">
              {row.right.title}
            </h4>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-blue-light">
              {row.right.subtitle}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">
              {row.right.body}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {row.right.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-blue-glow/40 bg-navy-950/70 px-2.5 py-0.5 text-[11px] font-medium text-blue-light"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-auto flex flex-wrap gap-3 pt-5">
            {row.right.buttons.map((btn) => {
              const href = btn.isOfferLetter ? resolveImage(btn.href) || btn.href : btn.href
              return (
                <a
                  key={btn.label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="hover"
                  className={
                    btn.isPrimary
                      ? 'inline-flex items-center gap-1.5 rounded-lg bg-blue-accent px-3.5 py-2 text-xs font-semibold text-white shadow-blue-glow transition hover:shadow-blue-glow-lg'
                      : 'inline-flex items-center gap-1.5 rounded-lg border border-blue-accent/70 px-3.5 py-2 text-xs font-semibold text-blue-light transition hover:border-blue-light hover:bg-blue-glow/25'
                  }
                >
                  {btn.label}
                  {btn.icon === 'github' && <Github size={13} />}
                  {btn.icon === 'external' && <ExternalLink size={13} />}
                  {btn.icon === 'file' && <FileBadge2 size={13} />}
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function TimelineSection({ title, subtitle, items, showImages = false }) {
  return (
    <div>
      <motion.h3
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-blue-light"
      >
        {title}
      </motion.h3>
      {subtitle && (
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-1 mb-6 text-sm text-text-muted"
        >
          {subtitle}
        </motion.p>
      )}

      <div className="relative mt-4">
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
              certificateUrl={
                item.certificateUrl
                  ? resolveImage(item.certificateUrl) || item.certificateUrl
                  : undefined
              }
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
        {/* Section Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-14"
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
            Products delivered for clients and during internships — not side experiments.
          </motion.p>
        </motion.div>

        {/* Top: Paired Format for Skill Hive, Techpuram, and Ambattur */}
        <div className="mb-20">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mb-8"
          >
            <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-blue-light">
              Internships & Shipped Products
            </h3>
            <p className="mt-1 text-sm text-text-muted">
              Internship on the left, production software shipped during it on the right.
            </p>
          </motion.div>

          <div className="space-y-6">
            {pairedInternships.map((row) => (
              <PairedRow key={row.id} row={row} />
            ))}
          </div>
        </div>

        {/* Bottom: 2-column layout like before */}
        {/* One side: Client Projects (JAI Magilan & MS Elegant, SkipQ removed) */}
        {/* Other side: AWS Educate & Gateway (no image, View Certificate alone) */}
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-12">
          <TimelineSection
            title="Client & Product Work"
            subtitle="Products delivered for clients — not side experiments."
            items={clientProjects}
          />
          <TimelineSection
            title="Internships"
            subtitle="Enterprise delivery and virtual cloud engineering programs."
            items={otherInternships}
          />
        </div>
      </div>
    </div>
  )
}
