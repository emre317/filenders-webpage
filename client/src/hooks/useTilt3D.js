import { useRef } from 'react'
import { useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function useTilt3D(maxTilt = 8) {
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [maxTilt, -maxTilt]), {
    stiffness: 300,
    damping: 25,
    mass: 0.5,
  })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-maxTilt, maxTilt]), {
    stiffness: 300,
    damping: 25,
    mass: 0.5,
  })
  const glowX = useTransform(mx, [-0.5, 0.5], ['20%', '80%'])
  const glowY = useTransform(my, [-0.5, 0.5], ['20%', '80%'])

  const onMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const onMouseLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return {
    ref,
    tiltProps: {
      onMouseMove,
      onMouseLeave,
      style: { rotateX, rotateY, transformPerspective: 900 },
    },
    glowX,
    glowY,
  }
}
