import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

const TYPE_SPEED_MS = 18

export default function TypewriterText({ text, className = '', as: Tag = 'p' }) {
  const reduceMotion = useReducedMotion()
  const [display, setDisplay] = useState(reduceMotion ? text : '')
  const [done, setDone] = useState(reduceMotion)

  useEffect(() => {
    if (reduceMotion) {
      setDisplay(text)
      setDone(true)
      return undefined
    }

    let index = 0
    let timeoutId

    const tick = () => {
      index += 1
      setDisplay(text.slice(0, index))
      if (index >= text.length) {
        setDone(true)
        return
      }
      timeoutId = setTimeout(tick, TYPE_SPEED_MS)
    }

    setDisplay('')
    setDone(false)
    timeoutId = setTimeout(tick, TYPE_SPEED_MS)
    return () => clearTimeout(timeoutId)
  }, [text, reduceMotion])

  return (
    <Tag className={className}>
      <span aria-hidden="true">
        {display}
        {!done && <span className="typewriter-cursor" />}
      </span>
      <span className="sr-only">{text}</span>
    </Tag>
  )
}
