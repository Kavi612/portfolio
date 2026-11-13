import { ExternalLink, Github } from 'lucide-react'
import Tilt from 'react-parallax-tilt'
import Spotlight from '@/components/Spotlight'

const imageModules = import.meta.glob('../../assets/projects/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
})

function resolveProjectImage(imageName) {
  if (!imageName) return null
  const entry = Object.entries(imageModules).find(([path]) =>
    path.endsWith(`/${imageName}`),
  )
  return entry ? entry[1] : null
}

export default function ProjectCard({ project, isActive = false }) {
  const src = resolveProjectImage(project.image)

  return (
    <Tilt
      tiltMaxAngleX={5}
      tiltMaxAngleY={5}
      glareEnable={false}
      transitionSpeed={1500}
      className="mx-auto w-full max-w-4xl rounded-3xl"
    >
      <Spotlight
        as="article"
        className={`glow-card mx-auto flex h-full w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] md:min-h-[460px] md:flex-row md:items-center ${
          isActive ? 'border-blue-accent/60 shadow-blue-glow-lg' : ''
        }`}
      >
        {/* Visual Slot - 50% split */}
        <div className="relative overflow-hidden md:w-1/2 flex items-center justify-center p-5 sm:p-6 md:p-8">
          {project.diagram ? (
            <div className="flex h-48 w-full items-center justify-center rounded-2xl bg-navy-950/80 p-4 sm:p-6 md:h-full md:min-h-[240px]">
              <div className="flex w-full max-w-sm flex-row items-center justify-center gap-2 sm:gap-2.5">
                <div className="flex flex-1 items-center justify-center rounded-xl border border-blue-glow/60 bg-navy-900/90 px-2.5 py-3 text-center text-xs font-semibold text-text-main shadow-blue-glow/30 backdrop-blur-md sm:py-3.5">
                  Codebase
                </div>
                <span className="text-sm font-bold text-blue-light drop-shadow-[0_0_8px_rgba(59,130,246,0.9)] sm:text-base">
                  →
                </span>
                <div className="flex flex-1 items-center justify-center rounded-xl border border-blue-glow/60 bg-navy-900/90 px-2.5 py-3 text-center text-xs font-semibold text-text-main shadow-blue-glow/30 backdrop-blur-md sm:py-3.5">
                  GraphRAG
                </div>
                <span className="text-sm font-bold text-blue-light drop-shadow-[0_0_8px_rgba(59,130,246,0.9)] sm:text-base">
                  →
                </span>
                <div className="flex flex-1 items-center justify-center rounded-xl border border-blue-glow/60 bg-navy-900/90 px-2.5 py-3 text-center text-xs font-semibold text-text-main shadow-blue-glow/30 backdrop-blur-md sm:py-3.5">
                  Fix Loop
                </div>
              </div>
            </div>
          ) : src ? (
            <img
              src={src}
              alt={`${project.name} — ${project.tagline} product screenshot`}
              className="h-48 w-full rounded-2xl object-cover transition-transform duration-500 ease-out md:h-full md:max-h-[320px] md:hover:scale-[1.02]"
              loading="lazy"
            />
          ) : (
            <div className="flex h-48 w-full items-center justify-center rounded-2xl bg-navy-950/80 md:h-full md:min-h-[240px]">
              <div className="px-6 text-center">
                <p className="text-xl font-semibold text-blue-light">{project.name}</p>
                <p className="mt-2 text-sm text-text-muted">Screenshot coming soon</p>
              </div>
            </div>
          )}
        </div>

        {/* Content Slot - 50% split */}
        <div className="flex flex-1 flex-col justify-center gap-3.5 p-6 sm:p-7 md:w-1/2 md:p-8 lg:p-9">
          <div>
            <h3 className="text-xl font-bold text-text-main sm:text-2xl lg:text-3xl">
              {project.name}
            </h3>
            <p className="mt-1 text-sm font-medium text-blue-light sm:text-base">
              {project.tagline}
            </p>
          </div>

          <p className="text-xs sm:text-sm leading-relaxed text-text-muted sm:leading-6">
            {project.description}
          </p>

          <ul className="flex flex-wrap gap-2">
            {project.tech.map((item) => (
              <li
                key={item}
                className="rounded-full border border-blue-glow/50 bg-navy-950/60 px-3 py-1 text-xs font-medium text-blue-light"
              >
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            {project.inProgress ? (
              <div className="inline-flex items-center gap-2.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs sm:text-sm font-semibold text-amber-400 shadow-[0_0_18px_rgba(245,158,11,0.2)] backdrop-blur-xl animate-pulse">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
                </span>
                <span>🚧 Work in Progress</span>
              </div>
            ) : (
              <>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="hover"
                    className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-blue-accent px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-blue-glow transition-shadow hover:shadow-blue-glow-lg"
                  >
                    Live Demo
                    <ExternalLink size={14} />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="hover"
                    className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-blue-accent/70 px-4 py-2 text-xs sm:text-sm font-semibold text-blue-light transition-colors hover:border-blue-light hover:bg-blue-glow/25"
                  >
                    GitHub
                    <Github size={14} />
                  </a>
                )}
              </>
            )}
          </div>
        </div>
      </Spotlight>
    </Tilt>
  )
}
