const ACCENT = {
  aws: {
    stripe: 'border-t-aws',
    text: 'text-aws',
    hoverShadow: 'hover:shadow-[0_0_28px_rgba(255,153,0,0.35)]',
    hoverBorder: 'hover:border-aws/60',
  },
  nvidia: {
    stripe: 'border-t-nvidia',
    text: 'text-nvidia',
    hoverShadow: 'hover:shadow-[0_0_28px_rgba(118,185,0,0.35)]',
    hoverBorder: 'hover:border-nvidia/60',
  },
  blue: {
    stripe: 'border-t-blue-accent',
    text: 'text-blue-light',
    hoverShadow: 'hover:shadow-[0_0_28px_rgba(59,130,246,0.35)]',
    hoverBorder: 'hover:border-blue-accent/60',
  },
}

export default function CertCard({ cert }) {
  const accent = ACCENT[cert.color] || ACCENT.blue
  const detail = cert.detail || cert.validity || cert.valid
  const validationId = cert.validationId || cert.validation

  return (
    <article
      className={`glow-card border-t-4 ${accent.stripe} ${accent.hoverBorder} ${accent.hoverShadow} flex h-full flex-col p-5 sm:p-6`}
    >
      <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${accent.text}`}>
        {cert.issuer}
      </p>

      <h3 className="mt-2 text-lg font-bold text-text-main sm:text-xl">{cert.name}</h3>

      {cert.nameOnCert && (
        <p className="mt-4 text-sm text-text-muted">
          Name on certificate:{' '}
          <span className="font-medium text-text-main">{cert.nameOnCert}</span>
        </p>
      )}

      {detail && (
        <p className="mt-2 text-sm text-text-muted">
          <span className="text-text-main">{detail}</span>
        </p>
      )}

      {validationId && (
        <p className="mt-3 break-all font-mono text-xs text-blue-light/90">
          {validationId}
        </p>
      )}
    </article>
  )
}
