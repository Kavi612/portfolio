import { useEffect, useState } from 'react'
import { FiArrowUp, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { profile } from '@/data/portfolioData'

const socials = [
  { label: 'GitHub', href: profile.github, icon: FiGithub },
  { label: 'LinkedIn', href: profile.linkedin, icon: FiLinkedin },
  { label: 'Email', href: `mailto:${profile.email}`, icon: FiMail },
]

export default function Footer() {
  const year = new Date().getFullYear()
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <footer className="border-t border-blue-glow/30 bg-bg-alt">
        <div className="section-container flex flex-col items-center justify-between gap-5 py-8 sm:flex-row">
          <p className="text-sm text-text-muted">
            © {year} {profile.fullName}
          </p>

          <div className="flex items-center gap-3">
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noreferrer' : undefined}
                aria-label={label}
                data-cursor="hover"
                className="tap-target rounded-full border border-blue-glow/50 text-text-muted transition hover:border-blue-light hover:text-blue-light hover:shadow-blue-glow"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </footer>

      <button
        type="button"
        aria-label="Back to top"
        data-cursor="hover"
        onClick={scrollTop}
        className={`tap-target fixed bottom-5 right-5 z-[8500] rounded-full border border-blue-accent/60 bg-navy-800 text-blue-light shadow-blue-glow transition-all duration-300 hover:border-blue-light hover:shadow-blue-glow-lg sm:bottom-6 sm:right-6 ${
          showTop
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-3 opacity-0'
        }`}
      >
        <FiArrowUp size={18} />
      </button>
    </>
  )
}
