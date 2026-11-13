import { useEffect, useState } from 'react'

const GITHUB_USER = 'Kavi612'

function getISTTime() {
  try {
    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
    return formatter.format(new Date())
  } catch {
    return '12:00'
  }
}

function formatRelativeDays(dateStr) {
  if (!dateStr) return 'recently'
  const pushedDate = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - pushedDate.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays <= 0) return 'today'
  if (diffDays === 1) return 'yesterday'
  return `${diffDays} days ago`
}

export default function StatsStrip() {
  const [time, setTime] = useState(getISTTime)
  const [githubStats, setGithubStats] = useState(null)

  // Live IST clock updated every 30 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getISTTime())
    }, 30000)
    return () => clearInterval(timer)
  }, [])

  // Fetch GitHub repos for public repo count and latest push
  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    async function fetchGitHubData() {
      try {
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USER}/repos?sort=pushed&per_page=100`,
          { signal: controller.signal },
        )
        if (!res.ok) return

        const repos = await res.json()
        if (!Array.isArray(repos) || repos.length === 0) return

        const publicCount = repos.length
        // Sort by pushed_at descending to find the latest pushed repo
        const sorted = [...repos].sort(
          (a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(),
        )
        const latest = sorted[0]

        if (isMounted) {
          setGithubStats({
            repoCount: publicCount,
            lastRepo: latest?.name || '',
            lastPush: formatRelativeDays(latest?.pushed_at),
          })
        }
      } catch {
        // Silently omit GitHub items if network / rate limit fails
      }
    }

    fetchGitHubData()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  const items = [
    {
      key: 'mnc',
      node: (
        <>
          <span className="kv-pulse-dot" aria-hidden="true" />
          <span>Open to MNC roles</span>
        </>
      ),
    },
    {
      key: 'time',
      node: <span>Madurai, {time} IST</span>,
    },
    {
      key: 'aws',
      node: <span>AWS Certified</span>,
    },
    ...(githubStats
      ? [
          {
            key: 'github-count',
            node: <span>{githubStats.repoCount} GitHub public repos</span>,
          },
          {
            key: 'github-push',
            node: (
              <span>
                Last push to {githubStats.lastRepo} {githubStats.lastPush}
              </span>
            ),
          },
        ]
      : []),
    {
      key: 'projects',
      node: <span>6 full-stack projects built</span>,
    },
  ]

  const renderTrackItems = () =>
    items.map((item, index) => (
      <span key={`${item.key}-${index}`} className="inline-flex items-center">
        <span className="kv-strip-item">{item.node}</span>
        <span className="kv-strip-separator" aria-hidden="true">
          ◆
        </span>
      </span>
    ))

  return (
    <div
      className="kv-stats-strip"
      role="region"
      aria-label="Live portfolio status"
    >
      <div className="kv-stats-strip-container">
        {/* Primary marquee row */}
        <div className="kv-stats-track">{renderTrackItems()}</div>
        {/* Duplicated row for seamless continuous marquee loop */}
        <div className="kv-stats-track" aria-hidden="true">
          {renderTrackItems()}
        </div>
      </div>
    </div>
  )
}
