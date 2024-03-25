import classNames from 'classnames'
import { motion } from 'framer-motion'
import Link from 'next/link'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    bottom: 0,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const child = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
}

const IntroSection: React.FC = () => (
  <section className="h-auto py-20">
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-sm md:max-w-2xl flex flex-col items-start sm:items-center text-start sm:text-center gap-y-6"
    >
      <motion.span
        className={classNames(
          'text-sm md:text-lg tracking-wide font-medium text-fore-subtle uppercase font-oswald'
        )}
        variants={child}
      >
        Stefan Kudla
      </motion.span>
      <motion.h1
        className={classNames(
          'font-bold font-oswald max-w-2lg md:leading-[1.2]'
        )}
        variants={child}
      >
        Professional Software Engineer and Web Designer
      </motion.h1>
      <motion.p
        className="md:text-lg text-fore-primary max-w-xs md:max-w-lg pr-2 md:pr-0"
        variants={child}
      >
        I&apos;m a Software Engineer based in Las Vegas who specializes in
        designing and developing custom apps and websites. Let me bring your
        digital vision to life.
      </motion.p>
      <motion.div
        className="flex flex-col sm:flex-row gap-4 items-center w-full max-w-sm md:max-w-md"
        variants={child}
      >
        <Link
          href="/services"
          className="flex-1 w-full text-center whitespace-nowrap bg-accent px-8 py-2.5 sm:py-3.5 text-white font-bold rounded-lg hover:opacity-75 transition-opacity text-sm sm:text-base"
        >
          View Services
        </Link>
        <Link
          href="/contact"
          className="flex-1 w-full text-center bg-transparent border-accent border-2 px-8 py-2 sm:py-3 text-current dark:text-white font-bold rounded-lg hover:opacity-75 transition-opacity whitespace-nowrap text-sm sm:text-base"
        >
          Work with me
        </Link>
      </motion.div>
    </motion.div>
  </section>
)

export default IntroSection
