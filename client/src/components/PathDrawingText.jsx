import { useId } from 'react'
import { useReducedMotion } from 'framer-motion'

export default function PathDrawingText({
  text,
  fromColor = 'var(--color-primary)',
  toColor = 'var(--color-accent)',
  strokeWidth = 3,
  durationSec = 3.4,
  fontSize = 96,
  viewBoxWidth = 560,
  viewBoxHeight = 130,
  align = 'start',
  className = '',
}) {
  const gradientId = `path-draw-${useId().replace(/:/g, '')}`
  const reduceMotion = useReducedMotion()
  const x = align === 'start' ? '0' : '50%'
  const textAnchor = align === 'start' ? 'start' : 'middle'

  return (
    <svg
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      className={`path-draw-svg ${className}`}
      role="img"
      aria-label={text}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={fromColor} />
          <stop offset="100%" stopColor={toColor} />
        </linearGradient>
      </defs>
      <text
        x={x}
        y="50%"
        textAnchor={textAnchor}
        dominantBaseline="middle"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
        fontSize={fontSize}
        fontWeight="800"
        fontFamily="Inter, system-ui, sans-serif"
        letterSpacing="-0.02em"
        className={reduceMotion ? undefined : 'path-draw-sweep'}
        style={reduceMotion ? undefined : { animationDuration: `${durationSec}s` }}
      >
        {text}
      </text>
    </svg>
  )
}
