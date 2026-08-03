import { ExternalLink, Github } from 'lucide-react'

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
    <article
      className={`glow-card mx-auto flex h-full w-full max-w-6xl flex-col overflow-hidden md:min-h-[560px] md:flex-row ${
        isActive ? 'border-blue-accent/60 shadow-blue-glow-lg' : ''
      }`}
    >
      <div className="relative overflow-hidden md:w-1/2">
        {src ? (
          <img
            src={src}
            alt={`${project.name} — ${project.tagline} product screenshot`}
            className="h-48 w-full object-cover transition-transform duration-500 ease-out md:h-full md:hover:scale-[1.04]"
            loading="lazy"
          />
        ) : (
          // TODO: add real screenshot to src/assets/projects/
          <div className="flex h-48 w-full items-center justify-center bg-navy-950/80 md:h-full">
            <div className="px-6 text-center">
              <p className="text-xl font-semibold text-blue-light">{project.name}</p>
              <p className="mt-2 text-sm text-text-muted">Screenshot coming soon</p>
            </div>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/50 to-transparent md:bg-gradient-to-r" />
      </div>

      <div className="flex flex-1 flex-col justify-center gap-4 p-5 sm:p-8 md:w-1/2 md:p-10">
        <div>
          <h3 className="text-xl font-bold text-text-main sm:text-3xl">
            {project.name}
          </h3>
          <p className="mt-1 text-sm font-medium text-blue-light sm:text-base">
            {project.tagline}
          </p>
        </div>

        <p className="text-sm leading-relaxed text-text-muted sm:text-base sm:leading-7">
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

        <div className="mt-2 flex flex-wrap gap-3">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            data-cursor="hover"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-blue-accent px-5 py-2.5 text-sm font-semibold text-white shadow-blue-glow transition-shadow hover:shadow-blue-glow-lg"
          >
            Live Demo
            <ExternalLink size={15} />
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            data-cursor="hover"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-blue-accent/70 px-5 py-2.5 text-sm font-semibold text-blue-light transition-colors hover:border-blue-light hover:bg-blue-glow/25"
          >
            GitHub
            <Github size={15} />
          </a>
        </div>
      </div>
    </article>
  )
}
