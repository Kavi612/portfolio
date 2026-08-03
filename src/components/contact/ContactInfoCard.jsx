export default function ContactInfoCard({ icon: Icon, label, value, href }) {
  const content = (
    <>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-glow/50 bg-navy-950/60 text-blue-light transition group-hover:border-blue-accent group-hover:shadow-blue-glow">
        <Icon size={18} />
      </span>
      <span className="min-w-0">
        <span className="block text-xs font-medium uppercase tracking-[0.14em] text-text-muted">
          {label}
        </span>
        <span className="mt-0.5 block truncate text-sm font-medium text-text-main group-hover:text-blue-light">
          {value}
        </span>
      </span>
    </>
  )

  const className =
    'glow-card group flex items-center gap-3 px-4 py-3 transition duration-300'

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noreferrer' : undefined}
        data-cursor="hover"
        className={className}
      >
        {content}
      </a>
    )
  }

  return <div className={className}>{content}</div>
}
