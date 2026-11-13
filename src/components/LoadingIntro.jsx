import { useCallback, useEffect, useRef, useState } from 'react'

export default function LoadingIntro() {
  const [visible, setVisible] = useState(false)
  const [exiting, setExiting] = useState(false)
  const [progress, setProgress] = useState(0)
  const hasFinishedRef = useRef(false)
  const timerRef = useRef(null)

  const finish = useCallback(() => {
    if (hasFinishedRef.current) return
    hasFinishedRef.current = true

    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    try {
      sessionStorage.setItem('kv-intro-seen', 'true')
    } catch {
      // Ignore sessionStorage exceptions (private browsing / quota)
    }

    setExiting(true)

    // Complete curtain-wipe transition (700ms) before unmounting
    setTimeout(() => {
      setVisible(false)
    }, 700)
  }, [])

  useEffect(() => {
    // 1. Check if already seen in this session
    try {
      if (sessionStorage.getItem('kv-intro-seen') === 'true') {
        return
      }
    } catch {
      // Continue if sessionStorage not accessible
    }

    // 2. Respect prefers-reduced-motion by skipping entirely
    if (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      try {
        sessionStorage.setItem('kv-intro-seen', 'true')
      } catch {
        // Ignore
      }
      return
    }

    // Show the intro overlay
    setVisible(true)

    // Run 0 to 100 counter over ~1.6 seconds (approx 16ms interval, +1% per step)
    const startTime = performance.now()
    const duration = 1600

    timerRef.current = setInterval(() => {
      const elapsed = performance.now() - startTime
      const nextProgress = Math.min(100, Math.floor((elapsed / duration) * 100))
      setProgress(nextProgress)

      if (nextProgress >= 100) {
        clearInterval(timerRef.current)
        setTimeout(() => {
          finish()
        }, 120)
      }
    }, 16)

    // Skip on any key press
    const handleKeyDown = () => {
      finish()
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [finish])

  if (!visible) return null

  const statusText =
    progress < 35
      ? 'Loading models'
      : progress < 70
        ? 'Warming up projects'
        : 'Ready'

  return (
    <aside
      className={`kv-intro-overlay ${exiting ? 'kv-intro-exiting' : ''}`}
      onClick={finish}
      role="status"
      aria-live="polite"
      aria-label="Welcome intro"
    >
      <div className="flex flex-col items-center gap-6 px-6 text-center">
        {/* Tabular counter 000 - 100 */}
        <div className="kv-intro-counter font-mono text-6xl font-extrabold tracking-tight text-text-main sm:text-8xl">
          {String(progress).padStart(3, '0')}
        </div>

        {/* Thin progress bar */}
        <div className="kv-intro-bar-track">
          <div
            className="kv-intro-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Changing status line */}
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-text-muted sm:text-sm">
          {statusText}
        </p>

        {/* Skip hint */}
        <p className="mt-4 text-[11px] text-text-muted/60">
          Click anywhere or press any key to skip
        </p>
      </div>
    </aside>
  )
}
