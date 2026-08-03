import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { personal } from '@/data/portfolioData'

const LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
]

function scrollToSection(href) {
  const id = href.replace('#', '')
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const prevBody = document.body.style.overflow
    const prevHtml = document.documentElement.style.overflow
    if (open) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = prevBody || ''
      document.documentElement.style.overflow = prevHtml || ''
    }
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [open])

  const handleNav = (href) => {
    setOpen(false)
    scrollToSection(href)
  }

  // Active section highlighting can be added later with IntersectionObserver.

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-[9000] transition-all duration-300 ${
        scrolled
          ? 'border-b border-blue-glow/40 bg-navy-950/80 shadow-[0_8px_30px_rgba(10,15,30,0.45)] backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault()
            handleNav('#hero')
          }}
          className="font-mono text-lg font-bold tracking-[0.2em] text-blue-light transition-shadow duration-300 hover:text-blue-accent hover:[text-shadow:0_0_18px_rgba(96,165,250,0.55)]"
          data-cursor="hover"
        >
          {personal.brandMark}
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNav(link.href)
                }}
                className="text-sm font-medium text-text-muted transition-colors duration-200 hover:text-blue-light"
                data-cursor="hover"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="tap-target rounded-lg border border-blue-glow/50 text-text-main md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          data-cursor="hover"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 top-16 z-[8999] overflow-y-auto overscroll-contain bg-navy-950/95 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          >
            <ul className="flex flex-col gap-2 px-6 py-8">
              {LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNav(link.href)
                    }}
                    className="block min-h-11 rounded-xl px-4 py-3 text-lg font-medium text-text-main transition-colors hover:bg-navy-800 hover:text-blue-light"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
