import Card from '@/components/Card'
import SectionWrapper from '@/components/SectionWrapper'
import { Variants, motion, useInView } from 'framer-motion'
import FriendlyPeopleIcon from '@/components/icons/FriendlyPeopleIcon'
import PlugIcon from '@/components/icons/PlugIcon'
import ConfigureIcon from '@/components/icons/ConfigureIcon'
import MiniCard from '@/components/MiniCard'
import AJLogo from '@/assets/images/logos/aj-properties-logo.png'
import AJLogoDark from '@/assets/images/logos/aj-properties-logo-dark.png'
import CosmicLogo from '@/assets/images/logos/cosmic-logo.png'
import CosmicLogoDark from '@/assets/images/logos/cosmic-logo-dark.png'
import DwpLogo from '@/assets/images/logos/dwp-logo.png'
import DwpLogoDark from '@/assets/images/logos/dwp-logo-dark.png'
import LifeSenseiLogo from '@/assets/images/logos/life-sensei-logo.png'
import LifeSenseiLogoDark from '@/assets/images/logos/life-sensei-logo-dark.png'
import OesterrtechLogo from '@/assets/images/logos/oesterrtech-logo.png'
import ProjexLogo from '@/assets/images/logos/projex-logo.png'
import Link from 'next/link'
import MailIcon from '@/components/icons/MailIcon'
import { useRef } from 'react'
import AnimationWrapper from '@/components/AnimationWrapper'

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 100 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      staggerChildren: 0.15,
    },
  },
}

const childVariants: Variants = {
  hidden: { opacity: 0, y: 100 },
  show: {
    opacity: 1,
    y: 0,
  },
}

const CtaSection = () => {
  return (
    <SectionWrapper
      classNames="bg-back-primary dark:bg-back-subtle flex flex-col items-center gap-y-20"
      fullWidth
      innerPadding
    >
      <AnimationWrapper viewAmount={0.1}>
        <motion.div className="flex flex-col items-center gap-y-20">
          <motion.h2
            variants={childVariants}
            className="text-3xl font-oswald font-bold"
          >
            Why hire me?
          </motion.h2>
          <motion.div
            variants={containerVariants}
            className="flex items-center gap-8 flex-wrap md:flex-nowrap justify-center"
          >
            <motion.div variants={childVariants}>
              <Card
                icon={<FriendlyPeopleIcon />}
                heading={'Reliable'}
                content={
                  'You can trust that during our collaboration, I will communicate promptly and will never leave you hanging. Building long-lasting relationships is my end goal.'
                }
              />
            </motion.div>
            <motion.div variants={childVariants}>
              <Card
                icon={<PlugIcon />}
                heading={'Developer and Designer'}
                content={
                  'As both a developer and designer, I not only understand the visual aspect of creating a great website, but I’m knowledgable of the solution and how it’s built on the technical side. '
                }
              />
            </motion.div>
            <motion.div variants={childVariants}>
              <Card
                icon={<ConfigureIcon />}
                heading={'Verstile'}
                content={
                  'I am well versed in a range of website builders like WordPress, though mostly build websites custom HTML, CSS, and JavaScript, as well as frameworks like React and Next.js.'
                }
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimationWrapper>
      <AnimationWrapper viewAmount={0.3}>
        <h4 className="text-2xl font-bold">Trusted by</h4>
        <div className="flex flex-wrap gap-6 max-w-3xl w-full justify-center">
          <MiniCard
            image={{
              src: CosmicLogo,
              alt: 'Cosmic logo',
              srcDark: CosmicLogoDark,
            }}
          />
          <MiniCard
            image={{
              src: AJLogo,
              alt: 'Aj properties logo',
              srcDark: AJLogoDark,
            }}
          />
          <MiniCard
            image={{
              src: LifeSenseiLogo,
              alt: 'Life Sensei logo',
              srcDark: LifeSenseiLogoDark,
            }}
          />
          <MiniCard
            image={{
              src: ProjexLogo,
              alt: 'Projex Academy logo',
            }}
          />
          <MiniCard
            image={{
              src: DwpLogo,
              alt: 'Dream world passport logo',
              srcDark: DwpLogoDark,
            }}
          />
          <MiniCard
            image={{
              src: OesterrtechLogo,
              alt: 'ÖesterrTech logo',
            }}
          />
        </div>
        <Link
          href="/contact"
          className="bg-accent rounded-lg px-8 py-3.5 text-white flex items-center gap-x-2 hover:opacity-75 transition-opacity justify-center font-bold"
        >
          <MailIcon /> Work with me
        </Link>
      </AnimationWrapper>
    </SectionWrapper>
  )
}

export default CtaSection
