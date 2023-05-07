import Image from 'next/image'
import Link from 'next/link'
import classNames from 'classnames'
import SectionWrapper from '@/components/SectionWrapper'
import ArrowTopRightIcon from '@/components/icons/ArrowTopRightIcon'
import { Variants, motion, useInView } from 'framer-motion'
import ExpandIcon from '@/components/icons/ExpandIcon'
import MinimizeIcon from '@/components/icons/MinimizeIcon'
import CloseIcon from '@/components/icons/CloseIcon'
import { useEffect, useRef, useState } from 'react'
import AvatarQuoteMarks from '@/assets/images/avatar-quotemarks.png'
import RenewIcon from '@/components/icons/RenewIcon'
import ToolsIcon from '@/components/icons/ToolsIcon'
import DesktopIcon from '@/components/icons/DesktopIcon'

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
    y: 50,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 100,
    transition: {
      type: 'tween',
      delay: 0.7,
      bounce: 0.2,
      duration: 0.25,
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
    y: -50,
    transition: {
      duration: 0.15,
      ease: 'easeInOut',
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

const ServicesSection: React.FC<Props> = ({ heading, text, services }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isShowing, setIsShowing] = useState(true)
  const [showElement, setShowElement] = useState(false)

  const ref = useRef(null)

  const isInView = useInView(ref, {
    margin: '0px 0px 0px 0px',
    once: true,
  })

  useEffect(() => {
    if (isInView) {
      setIsExpanded(true)
    }
  }, [isInView])

  return (
    <SectionWrapper
      classNames="bg-gradient-to-b from-back-primary via-back-primary to-back-secondary"
      fullWidth
      innerPadding
    >
      <div className="flex flex-col items-center gap-y-15 rounded">
        <motion.div
          layout
          initial="hidden"
          animate="show"
          variants={entrance}
          className={classNames('min-h-[280px] w-fit z-10')}
        >
          <motion.div
            variants={entrance}
            className="flex flex-col items-center w-full"
          >
            <div className="max-w-3xl relative w-full">
              <div className="group absolute top-2 left-3 flex items-center gap-x-1">
                <motion.button
                  aria-label="Close Modal"
                  onClick={() => setIsShowing(false)}
                  whileTap={{ scale: 0.9 }}
                  className="relative flex justify-center items-center  h-[11px] w-[11px] bg-red-300 rounded-full cursor-default"
                >
                  <CloseIcon classNames="leading-none text-black font-semibold opacity-0 group-hover:opacity-100 transition-opacity w-[11px] h-[11px]" />
                </motion.button>
                <motion.button
                  aria-label="Minimze Modal"
                  onClick={() => setIsExpanded(false)}
                  whileTap={{ scale: 0.9 }}
                  className="relative flex justify-center items-center  h-[11px] w-[11px] bg-yellow-300 rounded-full cursor-default"
                >
                  <MinimizeIcon classNames="leading-none text-black font-semibold opacity-0 group-hover:opacity-100 transition-opacity w-full pr-px" />
                </motion.button>
                <motion.button
                  aria-label="Open Modal"
                  onClick={() => setIsExpanded(true)}
                  whileTap={{ scale: 0.9 }}
                  className="relative flex justify-center items-center h-[11px] w-[11px] bg-green-300 rounded-full cursor-default"
                >
                  <ExpandIcon
                    width={'9'}
                    height={'9'}
                    classNames="leading-none text-black font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </motion.button>
              </div>
              <div className="flex items-stretch">
                <h2 className="text-lg sm:text-xl md:text-3xl font-bold px-3 pt-5 pb-2 font-oswald bg-accent selection:text-accent selection:bg-back-primary text-white rounded-t-2xl uppercase">
                  Web Development Services
                </h2>
                <div className="bg-accent">
                  <div className="sm:pl-6 bg-back-primary rounded-bl-2xl flex items-center h-full p-3 relative">
                    <Link
                      href="/services"
                      className="text-xs sm:text-base whitespace-nowrap flex items-center gap-x-2 border-b-2 border-accent hover:opacity-75 z-20 w-full backdrop-blur-lg"
                    >
                      All services{' '}
                      <span className="mb-1">
                        <ArrowTopRightIcon />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
              <motion.div
                ref={ref}
                animate={isExpanded ? 'show' : 'hidden'}
                variants={modalVariants}
                className="border-2 border-accent bg-gray-50 dark:bg-dark-gray-50 rounded-b-2xl p-3 custom-shadow-lg-dark"
              >
                <motion.ul
                  animate={isExpanded ? 'show' : 'hidden'}
                  variants={textAnimation}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {services.map((service, index) => (
                    <motion.li
                      variants={childVariants}
                      key={service.title + index}
                      className="max-w-xs flex-wrap flex items-center gap-x-2 dark:text-gray-300 text-gray-600"
                    >
                      <span className="w-2 h-2 bg-gray-700 dark:bg-gray-50 rounded-full" />
                      {service.title}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
        <motion.div
          onViewportEnter={() => setShowElement(true)}
          animate={{
            opacity: showElement ? 1 : 0,
            y: showElement ? 0 : -100,
            transition: {
              type: 'intertia',
              duration: 0.5,
            },
            offset: 0.5,
          }}
          initial={{ opacity: 0 }}
          className="px-6 py-4 bg-card-background custom-shadow-md rounded-lg max-w-lg gap-6 flex sm:items-center flex-col sm:flex-row"
        >
          <Image
            width={69}
            height={63}
            src={AvatarQuoteMarks}
            alt="Stefan Kudla avatar"
          />
          <p className="text-card-text">
            I offer a wide range of services to help you bring your online
            vision to life. Whether you need a website, a web application, or
            custom software, I can help you.
          </p>
        </motion.div>
        <div className="flex items-stretch gap-8 flex-wrap lg:flex-nowrap justify-center">
          <div className="border border-gray-200 dark:border-dark-gray-100 flex flex-col items-center gap-y-8 rounded-lg custom-shadow-md md:max-w-[420px] bg-card-background  py-20 px-5">
            <RenewIcon />
            <h3 className="font-bold text-2xl text-fore-primary">
              Website Redesign
            </h3>
            <p className="text-center text-fore-secondary text-xl">
              Is your website in need of an update? I can refresh and redesign
              your website to give it a modern look and feel with your existing
              branding, or give it a entirely new identity. The web is
              constantly changing and your website deserves to keep up.
            </p>
          </div>
          <div className="flex border border-gray-200 dark:border-dark-gray-100 flex-col items-center gap-y-8 rounded-lg custom-shadow-md md:max-w-[420px] bg-card-background  py-20 px-5">
            <DesktopIcon />
            <h3 className="font-bold text-2xl text-fore-primary">
              Custom Websites
            </h3>
            <p className="text-center text-fore-secondary text-xl">
              By building a custom website from scratch, I&apos;m able to break
              through the limitations that site builders like Wordpress and Wix
              often come with. Your website will look, feel, and perform better
              than your competitors.
            </p>
          </div>
          <div className="flex border border-gray-200 dark:border-dark-gray-100 flex-col items-center gap-y-8 rounded-lg custom-shadow-md md:max-w-[420px] bg-card-background  py-20 px-5">
            <ToolsIcon />
            <h3 className="font-bold text-2xl text-fore-primary">
              Website Maintenance
            </h3>
            <p className="text-center text-fore-secondary text-xl">
              I offer ongoing support to maintain your website, ensuring that
              everything is up to date and your users do not experience
              unexpected issues. Let me handle your design and content updates
              so you can focus on running your business.
            </p>
          </div>
        </div>
        <Link
          href="/services"
          className="flex-1 w-fit !min-w-[214px] text-center whitespace-nowrap bg-accent px-8 py-2.5 sm:py-3.5 text-white font-bold rounded-lg hover:opacity-75 transition-opacity text-sm sm:text-base"
        >
          View Services
        </Link>
      </div>
    </SectionWrapper>
  )
}

export default ServicesSection
