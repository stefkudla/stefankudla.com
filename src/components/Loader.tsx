import React from 'react'
import { motion } from 'framer-motion'

const loaderContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const loaderVariants = {
  start: {
    y: '0%',
    opacity: '100%',
  },
  end: {
    y: '100%',
    opacity: '80%',
  },
}

const loadingCircleTransition = {
  duration: 0.5,
  yoyo: Infinity,
  ease: 'easeInOut',
}

const Loader = () => {
  return (
    <>
      <motion.div
        variants={loaderContainerVariants}
        initial="start"
        animate="end"
        className="flex gap-x-2"
      >
        <motion.span
          variants={loaderVariants}
          transition={loadingCircleTransition}
          className="w-2.5 h-2.5 rounded-full bg-slate-600 dark:bg-slate-200"
        />
        <motion.span
          variants={loaderVariants}
          transition={loadingCircleTransition}
          className="w-2.5 h-2.5 rounded-full bg-slate-600 dark:bg-slate-200"
        />
        <motion.span
          variants={loaderVariants}
          transition={loadingCircleTransition}
          className="w-2.5 h-2.5 rounded-full bg-slate-600 dark:bg-slate-200"
        />
      </motion.div>
    </>
  )
}

export default Loader
