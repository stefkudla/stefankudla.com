import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useWindowSize } from '@react-hook/window-size'

const Marquee = ({
  children,
  gapBetween = 0,
  speed = 20,
}: {
  children: React.ReactNode | React.ReactNode[]
  gapBetween?: number
  speed?: number
}) => {
  const marquee = useRef<null | HTMLDivElement>(null)
  const [width] = useWindowSize()
  const [marqueeWidth, setMarqueeWidth] = useState(0)
  const [marqueeSpeed, setMarqueeSpeed] = useState(speed)

  useEffect(() => {
    if (global.window !== undefined) {
      setMarqueeWidth(marquee.current!.scrollWidth)
    }
  }, [width])

  const duplicateChildren = new Array(3).fill(children)

  return (
    <motion.div className="overflow-hidden">
      <motion.div
        animate={{
          x: [0, -marqueeWidth / 3],
          scale: 1,
        }}
        transition={{
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'linear',
          duration: marqueeSpeed,
        }}
        ref={marquee}
        className={`flex py-20 z-20`}
      >
        {duplicateChildren.map((child, index) => {
          return (
            <div key={index} className={`flex-shrink-0 px-${gapBetween / 2}`}>
              {child}
            </div>
          )
        })}
      </motion.div>
    </motion.div>
  )
}

export default Marquee
