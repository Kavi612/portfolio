import { useRef } from 'react'

export default function Spotlight({
  as: Component = 'div',
  className = '',
  children,
  onPointerMove,
  ...rest
}) {
  const containerRef = useRef(null)

  const handlePointerMove = (e) => {
    const el = containerRef.current
    if (el) {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      el.style.setProperty('--mx', `${x}px`)
      el.style.setProperty('--my', `${y}px`)
    }
    if (onPointerMove) {
      onPointerMove(e)
    }
  }

  return (
    <Component
      ref={containerRef}
      onPointerMove={handlePointerMove}
      className={`kv-spotlight ${className}`.trim()}
      {...rest}
    >
      {children}
    </Component>
  )
}
