import { useMotionValue, useAnimationFrame } from 'framer-motion'

export default function useOrbitRotation(durationSec = 130) {
  const rotate = useMotionValue(0)
  const degPerMs = 360 / durationSec / 1000

  useAnimationFrame((t) => {
    rotate.set((t * degPerMs) % 360)
  })

  return rotate
}
