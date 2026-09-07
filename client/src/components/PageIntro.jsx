import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import logo from '../assets/logo.png'

const COLS = 10
const ROWS = 6
const EASE = [0.16, 1, 0.3, 1]

function useTiles() {
  return useMemo(() => {
    const tiles = []
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const cx = (c + 0.5) / COLS - 0.5
        const cy = (r + 0.5) / ROWS - 0.5
        tiles.push({
          id: `${r}-${c}`,
          col: c,
          row: r,
          angle: Math.atan2(cy, cx),
          dist: Math.sqrt(cx * cx + cy * cy),
        })
      }
    }
    return tiles
  }, [])
}

export default function PageIntro() {
  const tiles = useTiles()
  const [phase, setPhase] = useState('hold')

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      setPhase('done')
      return
    }

    document.body.style.overflow = 'hidden'
    const t1 = setTimeout(() => setPhase('shatter'), 600)
    const t2 = setTimeout(() => {
      setPhase('done')
      document.body.style.overflow = ''
    }, 600 + 1200)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      document.body.style.overflow = ''
    }
  }, [])

  if (phase === 'done') return null

  return (
    <div className="page-intro" aria-hidden="true">
      <div className="page-intro-tiles">
        {tiles.map((tile) => {
          const throwDist = 260 + tile.dist * 380
          const outX = Math.cos(tile.angle) * throwDist
          const outY = Math.sin(tile.angle) * throwDist
          const shattered = phase === 'shatter'

          return (
            <motion.span
              key={tile.id}
              className="page-intro-tile"
              style={{ gridColumn: tile.col + 1, gridRow: tile.row + 1 }}
              initial={false}
              animate={
                shattered
                  ? {
                      opacity: 0,
                      x: outX,
                      y: outY,
                      rotate: (tile.col - COLS / 2) * 18 + (tile.row - ROWS / 2) * 9,
                      scale: 0.25,
                    }
                  : { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }
              }
              transition={{
                duration: 0.85,
                delay: shattered ? tile.dist * 0.28 : 0,
                ease: EASE,
              }}
            />
          )
        })}
      </div>

      <motion.img
        src={logo}
        alt=""
        className="page-intro-logo"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{
          opacity: phase === 'shatter' ? 0 : 1,
          scale: phase === 'shatter' ? 1.15 : 1,
        }}
        transition={{ duration: 0.45, ease: EASE }}
      />
    </div>
  )
}
