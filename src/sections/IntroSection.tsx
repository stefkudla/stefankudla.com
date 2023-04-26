import classNames from 'classnames'
import { motion } from 'framer-motion'
import { nunitoSans, oswald } from '@/fonts'
import ServicesSection from './ServicesSection'

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
      className="max-w-2xl flex flex-col items-center text-center gap-y-6"
    >
      <motion.span
        className={classNames('text-lg text-fore-subtle uppercase')}
        variants={child}
      >
        Stefan Kudla
      </motion.span>
      <motion.h1
        className={classNames(
          'font-medium tracking-wide font-oswald max-w-lg md:leading-[1.2]'
        )}
        variants={child}
      >
        Freelance Web Developer and Designer
      </motion.h1>
      <motion.p
        className="text-lg text-fore-primary max-w-md pr-2"
        variants={child}
      >
        I&apos;m a Web Developer who specializes in designing and building
        custom websites for small businesses and startups.
      </motion.p>
      <motion.div
        className="flex flex-col sm:flex-row gap-4 items-center w-full max-w-sm md:max-w-md"
        variants={child}
      >
        <a
          href="/services"
          className="flex-1 w-full whitespace-nowrap bg-accent px-8 py-3.5 text-white font-bold rounded-lg hover:opacity-75 transition-opacity"
        >
          View Services
        </a>
        <a
          href="mailto:stefan@stefankudla.com"
          className="flex-1 w-full bg-transparent border-accent border-2 px-8 py-3 text-current dark:text-white font-bold rounded-lg hover:opacity-75 transition-opacity whitespace-nowrap"
        >
          Work with me
        </a>
      </motion.div>
    </motion.div>
  </section>
)

export default IntroSection
