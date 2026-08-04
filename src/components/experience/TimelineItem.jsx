import { motion } from 'framer-motion'
import { ExternalLink, FileBadge2, Github } from 'lucide-react'
import { fadeUp, viewportOnce } from '@/utils/animations'

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

export default function TimelineItem({
  role,
  org,
  company,
  type,
  period,
  duration,
  description,
  location,
  liveUrl,
  githubUrl,
  certificateUrl,
  image,
  isLast = false,
}) {
  const orgName = org || company
  const timeLabel = period || duration
  const certUrl = certificateUrl
  const imgSrc = resolveImage(image)

  return (
    <motion.li
      className="relative flex gap-4 pb-10 last:pb-0 sm:gap-6"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {/* Spine column */}
      <div className="relative flex w-5 shrink-0 flex-col items-center">
        <span className="relative z-10 mt-1.5 h-3.5 w-3.5 rounded-full bg-blue-accent animate-pulse-glow" />
        {!isLast && (
          <span className="absolute top-5 bottom-0 w-px bg-gradient-to-b from-blue-accent via-blue-glow to-transparent" />
        )}
      </div>

      <article className="glow-card min-w-0 flex-1 overflow-hidden p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row">
          {image !== undefined && (
            <div className="sm:w-28 sm:shrink-0">
              {imgSrc ? (
                <img
                  src={imgSrc}
                  alt={`${orgName} offer letter`}
                  className="h-28 w-full rounded-xl border border-blue-glow/30 bg-white object-contain object-center sm:h-32 sm:w-36"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-20 w-full items-center justify-center rounded-xl border border-blue-glow/40 bg-navy-950/70 px-2 text-center sm:h-24">
                  <span className="text-xs text-text-muted">{orgName}</span>
                </div>
              )}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-semibold text-text-main">{role}</h3>
              {type && (
                <span className="rounded-full border border-blue-glow/50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-blue-light">
                  {type}
                </span>
              )}
            </div>

            <p className="mt-1 text-sm font-medium text-blue-light">{orgName}</p>

            <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-text-muted">
              {timeLabel && <span>{timeLabel}</span>}
              {location && <span>• {location}</span>}
            </div>

            {description && (
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                {description}
              </p>
            )}

            <div className="mt-4 flex flex-wrap gap-3">
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="hover"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-blue-accent px-3.5 py-2 text-xs font-semibold text-white shadow-blue-glow transition hover:shadow-blue-glow-lg"
                >
                  View Live
                  <ExternalLink size={13} />
                </a>
              )}

              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="hover"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-blue-accent/70 px-3.5 py-2 text-xs font-semibold text-blue-light transition hover:border-blue-light hover:bg-blue-glow/25"
                >
                  View GitHub
                  <Github size={13} />
                </a>
              )}

              {certUrl ? (
                <a
                  href={certUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="hover"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-blue-accent/70 px-3.5 py-2 text-xs font-semibold text-blue-light transition hover:border-blue-light hover:bg-blue-glow/25"
                >
                  View Certificate
                  <FileBadge2 size={13} />
                </a>
              ) : (
                // TODO: add certificate link once available
                null
              )}
            </div>
          </div>
        </div>
      </article>
    </motion.li>
  )
}
