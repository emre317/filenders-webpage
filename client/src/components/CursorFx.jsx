import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

let uid = 0

export default function CursorFx() {
  const [particles, setParticles] = useState([])
  const lastSpawn = useRef(0)
  const enabled = useRef(false)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches
    enabled.current = !reduceMotion && !coarsePointer
    if (!enabled.current) return

    const handleMove = (e) => {
      const now = performance.now()
      if (now - lastSpawn.current < 60) return
      lastSpawn.current = now

      const id = uid++
      setParticles((prev) => [
        ...prev.slice(-16),
        { id, x: e.clientX, y: e.clientY, rot: Math.random() * 90 - 45, size: 4 + Math.random() * 5 },
      ])

      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== id))
      }, 700)
    }

    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <div className="cursor-fx" aria-hidden="true">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="cursor-fx-shard"
            style={{ left: p.x, top: p.y, width: p.size, height: p.size }}
            initial={{ opacity: 0.9, scale: 1, rotate: p.rot, x: 0, y: 0 }}
            animate={{
              opacity: 0,
              scale: 0.2,
              rotate: p.rot + (Math.random() > 0.5 ? 50 : -50),
              x: (Math.random() - 0.5) * 46,
              y: (Math.random() - 0.5) * 30 + 26,
            }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
