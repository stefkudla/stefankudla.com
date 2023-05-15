import { ForwardArrowIcon } from '@/configs/icons'
import Image from 'next/image'
import Link from 'next/link'
import classNames from 'classnames'
import SectionWrapper from '@/components/SectionWrapper'
import ArrowTopRightIcon from '@/components/icons/ArrowTopRightIcon'
import { Variants, motion } from 'framer-motion'
import ExpandIcon from '@/components/icons/ExpandIcon'
import MinimizeIcon from '@/components/icons/MinimizeIcon'
import CloseIcon from '@/components/icons/CloseIcon'
import { useState } from 'react'

export type Services = {
  slug: string
  title: string
  metadata: {
    description: string
    icon?: {
      imgix_url: string
      url: string
    }
    featured?: boolean
  }
}

interface Props {
  heading: string
  text: string
  services: Services[]
}

const entrance: Variants = {
  hidden: {
    y: 100,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 100,
    transition: {
      bounce: 0.4,
      duration: 0.3,
    },
  },
}

const modalVariants: Variants = {
  hidden: {
    height: '0',
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
  show: {
    opacity: 1,
    height: '100%',
    transition: {
      bounce: 0.4,
      duration: 0.1,
      ease: 'easeInOut',
    },
  },
}

const textAnimation: Variants = {
  hidden: {
    opacity: 0,
    y: -30,
    transition: {
      duration: 0.01,
    },
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.03,
    },
  },
}

const childVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
}

const FeaturedSection: React.FC<Props> = ({ heading, text }) => {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <SectionWrapper classNames="rounded-lg w-auto">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        className={classNames('flex flex-col rounded max-w-7xl')}
      >
        <motion.div
          variants={entrance}
          className="flex items-start gap-12 w-full justify-evenly"
        >
          <div className="max-w-7xl min-h-[800px] relative">
            <div className="group absolute top-2 left-3 flex items-center gap-x-1">
              <motion.button
                aria-label="Close Modal"
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.6 },
                }}
                whileTap={{ scale: 0.9 }}
                className="relative flex justify-center items-center  h-[11px] w-[11px] bg-red-300 dark:bg-purple-500 rounded-full cursor-default"
              >
                <CloseIcon classNames="leading-none font-semibold opacity-0 group-hover:opacity-100 transition-opacity w-[11px] h-[11px]" />
              </motion.button>
              <motion.button
                aria-label="Minimze Modal"
                onClick={() => setIsExpanded(false)}
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.6 },
                }}
                whileTap={{ scale: 0.9 }}
                className="relative flex justify-center items-center  h-[11px] w-[11px] bg-yellow-300 dark:bg-blue-400 rounded-full cursor-default"
              >
                <MinimizeIcon classNames="leading-none font-semibold opacity-0 group-hover:opacity-100 transition-opacity w-full pr-px" />
              </motion.button>
              <motion.button
                aria-label="Open Modal"
                onClick={() => setIsExpanded(true)}
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.6 },
                }}
                whileTap={{ scale: 0.9 }}
                className="relative flex justify-center items-center h-[11px] w-[11px] bg-green-300 dark:bg-green-500 rounded-full cursor-default"
              >
                <ExpandIcon
                  width={'9'}
                  height={'9'}
                  classNames="leading-none font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </motion.button>
            </div>
            <div className="flex items-stretch w-full">
              <h2 className="text-2xl md:text-4xl font-bold px-3 pt-5 pb-2 font-oswald bg-accent text-back-primary rounded-t-2xl uppercase w-full min-w-[600px]">
                Featured Projects
              </h2>
              <div className="bg-accent">
                <div className="sm:pl-6 bg-back-primary flex items-center h-full p-3 rounded-bl-2xl relative">
                  <Link
                    href="/services"
                    className="text-xs sm:text-base whitespace-nowrap flex items-center gap-x-2 border-b-2 border-accent hover:opacity-75"
                  >
                    All projects
                    <span className="mb-1">
                      <ArrowTopRightIcon />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <motion.div
              animate={isExpanded ? 'show' : 'hidden'}
              variants={modalVariants}
              className="border-2 border-accent rounded-b-2xl p-3 "
            >
              <motion.ul
                animate={isExpanded ? 'show' : 'hidden'}
                variants={textAnimation}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              ></motion.ul>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  )
}

export default FeaturedSection
