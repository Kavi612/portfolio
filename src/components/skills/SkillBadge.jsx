export default function SkillBadge({ name }) {
  return (
    <span
      data-cursor="hover"
      className="inline-flex items-center rounded-full border border-blue-glow/60 bg-navy-950/50 px-3 py-1 text-xs font-medium text-text-main transition-all duration-300 hover:scale-105 hover:border-blue-accent hover:text-blue-light hover:shadow-[0_0_16px_rgba(59,130,246,0.35)]"
    >
      {name}
    </span>
  )
}
