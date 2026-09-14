import { useId } from 'react'
import { useReducedMotion } from 'framer-motion'

export default function PathDrawingText({
  text,
  tagline,
  fromColor = 'var(--color-primary)',
  toColor = 'var(--color-accent)',
  strokeWidth = 3,
  durationSec = 3.4,
  fontSize = 96,
  taglineFontSize,
  viewBoxWidth = 560,
  viewBoxHeight = 130,
  align = 'start',
  filled = false,
  className = '',
  fontFamily = 'Inter, system-ui, sans-serif',
  fontWeight = '800',
  taglineFontWeight = '600',
  letterSpacing = '-0.01em',
  taglineLetterSpacing,
  lowercase = false,
  uppercase = false,
  glowColor,
  shimmer = false,
  taglineColor,
}) {
  const uid = useId().replace(/:/g, '')
  const gradientId = `path-draw-${uid}`
  const shimmerId = `path-shimmer-${uid}`
  const reduceMotion = useReducedMotion()
  const x = align === 'start' ? '0' : '50%'
  const textAnchor = align === 'start' ? 'start' : 'middle'
  // When shimmer is on, it carries the "this is animated" impression on its
  // own — keeping the base wipe/fade cycling too made the brand text blink
  // out every few seconds, which read as glitchy rather than premium.
  const animate = !reduceMotion && !shimmer
  const showShimmer = shimmer && !reduceMotion
  const ariaLabel = tagline ? `${text} ${tagline}` : text
  const textTransform = uppercase ? 'uppercase' : lowercase ? 'lowercase' : undefined

  const textStyle = {
    textTransform,
    ...(animate ? { animationDuration: `${durationSec}s` } : undefined),
  }

  const renderLayer = ({ content, y, size, weight, spacing, key, solidColor }) => (
    <text
      key={key}
      x={x}
      y={y}
      textAnchor={textAnchor}
      dominantBaseline="middle"
      fill={solidColor || (filled ? `url(#${gradientId})` : 'none')}
      stroke={solidColor ? 'none' : filled ? 'none' : `url(#${gradientId})`}
      strokeWidth={filled ? 0 : strokeWidth}
      strokeLinejoin="round"
      strokeLinecap="round"
      fontSize={size}
      fontWeight={weight}
      fontFamily={fontFamily}
      letterSpacing={spacing}
      style={textStyle}
      className={animate ? 'path-draw-sweep' : undefined}
    >
      {content}
    </text>
  )

  const renderShimmerLayer = ({ content, y, size, weight, spacing, key }) => (
    <text
      key={key}
      x={x}
      y={y}
      textAnchor={textAnchor}
      dominantBaseline="middle"
      fill={`url(#${shimmerId})`}
      fontSize={size}
      fontWeight={weight}
      fontFamily={fontFamily}
      letterSpacing={spacing}
      style={{ textTransform, mixBlendMode: 'screen' }}
      aria-hidden="true"
    >
      {content}
    </text>
  )

  return (
    <svg
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      className={`path-draw-svg ${className}`}
      role="img"
      aria-label={ariaLabel}
      style={glowColor ? { filter: `drop-shadow(0 0 10px ${glowColor}) drop-shadow(0 0 2px ${glowColor})` } : undefined}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={fromColor} />
          <stop offset="100%" stopColor={toColor} />
        </linearGradient>
        {showShimmer && (
          <linearGradient id={shimmerId} x1="-160%" y1="0%" x2="-60%" y2="0%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0" />
            <stop offset="45%" stopColor="#fff" stopOpacity="0" />
            <stop offset="50%" stopColor="#fff" stopOpacity="0.85" />
            <stop offset="55%" stopColor="#fff" stopOpacity="0" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            <animate
              attributeName="x1"
              values="-160%;-160%;160%;160%"
              keyTimes="0;0.14;0.5;1"
              dur="7s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="x2"
              values="-60%;-60%;260%;260%"
              keyTimes="0;0.14;0.5;1"
              dur="7s"
              repeatCount="indefinite"
            />
          </linearGradient>
        )}
      </defs>

      {renderLayer({
        key: 'main',
        content: text,
        y: tagline ? '38%' : '50%',
        size: fontSize,
        weight: fontWeight,
        spacing: letterSpacing,
      })}
      {showShimmer &&
        renderShimmerLayer({
          key: 'main-shimmer',
          content: text,
          y: tagline ? '38%' : '50%',
          size: fontSize,
          weight: fontWeight,
          spacing: letterSpacing,
        })}

      {tagline && (
        <>
          {renderLayer({
            key: 'tagline',
            content: tagline,
            y: '80%',
            size: taglineFontSize ?? fontSize * 0.3,
            weight: taglineFontWeight,
            spacing: taglineLetterSpacing ?? letterSpacing,
            solidColor: taglineColor,
          })}
          {showShimmer &&
            renderShimmerLayer({
              key: 'tagline-shimmer',
              content: tagline,
              y: '80%',
              size: taglineFontSize ?? fontSize * 0.3,
              weight: taglineFontWeight,
              spacing: taglineLetterSpacing ?? letterSpacing,
            })}
        </>
      )}
    </svg>
  )
}
