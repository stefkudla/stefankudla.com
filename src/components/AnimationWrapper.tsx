import React, { useRef } from 'react'
import { Variants, motion, useInView } from 'framer-motion'
import cn from 'classnames'

const AnimationWrapper = ({
  children,
  classNames,
  viewAmount = 0.5,
  repeat = false,
  ...props
}: {
  children: React.ReactNode | React.ReactNode[]
  classNames?: string
  viewAmount?: number
  repeat?: boolean
  duration?: number
}) => {
  const container = useRef(null)
  const isInView = useInView(container, {
    once: !repeat,
    amount: viewAmount,
  })
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 100 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: props.duration || 0.4,
        staggerChildren: 0.15,
      },
    },
  }
  return (
    <motion.div
      ref={container}
      animate={isInView ? 'show' : 'hidden'}
      variants={containerVariants}
      className={cn('flex flex-col items-center gap-y-20', classNames)}
    >
      {children}
    </motion.div>
  )
}

export default AnimationWrapper
