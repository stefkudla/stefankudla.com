"use client"

import { useEffect, useState, useRef, useCallback } from 'react'
import {
  motion,
  AnimatePresence,
  type PanInfo,
} from 'motion/react'
import { X } from 'lucide-react'
import Image from 'next/image'
import avatar from '../../public/images/sk-portrait-min.jpg'
import { DitherShader } from '@/components/ui/dither-shader'
import SocialIcons from './SocialIcons'
import { Timeline, type TimelineEntry } from '@/components/ui/timeline'
import { cn } from '@/lib/utils'

interface AboutSheetProps {
  isOpen: boolean
  onClose: () => void
}

const DISMISS_THRESHOLD = 100
const DISMISS_VELOCITY = 500

const workHistory: TimelineEntry[] = [
  {
    title: 'Sep 2024 — Present',
    content: (
      <div>
        <div className="flex items-center gap-3 mb-4">
          <Image
            src="/images/logos/euronet_worldwide_logo.jpeg"
            alt="Euronet Worldwide logo"
            width={40}
            height={40}
            className="rounded"
          />
          <h4 className="text-lg font-semibold text-fore-primary">
            Euronet Worldwide
          </h4>
        </div>
        <p className="text-sm text-fore-subtle mb-4">
          Now leading a team of engineers on a white-label React Native
          platform that serves multiple casino operators. Built a CLI tool to
          automate multi-platform builds and releases, and migrated the content
          system to a hybrid i18n + headless CMS architecture so non-engineering
          teams could update content on their own.
        </p>
        <p className="text-sm text-fore-subtle mb-4">
          Before that, built a self-service onboarding platform that cut
          operator go-live timelines from months to weeks, and shipped React
          Native apps across iOS and Android for multiple casino brands.
        </p>
        <p className="text-sm text-fore-subtle">
          Started out building web apps with Vue.js, Nuxt.js, and Laravel
          serving 100+ operators — payment processing, access control, and
          casino management workflows.
        </p>
      </div>
    ),
  },
  {
    title: 'Nov 2023 — Aug 2024',
    content: (
      <div>
        <div className="flex items-center gap-3 mb-4">
          <Image
            src="/images/logos/strictly-logo.png"
            alt="Strictly logo"
            width={40}
            height={40}
            className="rounded"
          />
          <h4 className="text-lg font-semibold text-fore-primary">
            Strictly
          </h4>
        </div>
        <p className="text-sm text-fore-subtle mb-4">
          Led development of a SaaS website builder on Next.js and TypeScript.
          Integrated AI-powered content generation so users could create site
          copy in seconds, and built the auth system, i18n support, and a UI
          component library with Tailwind and Radix.
        </p>
        <p className="text-sm text-fore-subtle">
          Handled Stripe payments, Intercom integration, and managed AWS
          infrastructure for production deployments. Ran standups, sprint
          planning, and code reviews with the engineering team.
        </p>
      </div>
    ),
  },
  {
    title: 'Jun 2022 — Oct 2023',
    content: (
      <div>
        <div className="flex items-center gap-3 mb-4">
          <Image
            src="/images/logos/cosmic-logo.png"
            alt="Cosmic logo"
            width={40}
            height={40}
            className="rounded"
          />
          <h4 className="text-lg font-semibold text-fore-primary">
            Cosmic
          </h4>
        </div>
        <p className="text-sm text-fore-subtle mb-4">
          Software engineer at a headless CMS company. Built serverless apps
          with Node.js and React, shipped reusable component libraries, and
          created starter templates with Next.js and Astro that helped
          developers go from zero to production faster.
        </p>
        <p className="text-sm text-fore-subtle">
          Also wrote technical content on headless CMS patterns and ran SEO
          strategy for the knowledge base and docs. Built automated email
          marketing flows with MJML and third-party APIs.
        </p>
      </div>
    ),
  },
  {
    title: 'Feb 2022 — Sep 2023',
    content: (
      <div>
        <h4 className="text-lg font-semibold text-fore-primary mb-4">
          Freelance Consulting
        </h4>
        <p className="text-sm text-fore-subtle mb-4">
          Built marketing websites and developer-facing content for SaaS
          clients. Created research-driven content strategies, solutions pages,
          and product demo scripts.
        </p>
        <p className="text-sm text-fore-subtle">
          Managed vendor workflows through Notion and GitHub, and published
          educational resources to help developers adopt clients&apos;
          products.
        </p>
      </div>
    ),
  },
  {
    title: 'May 2021 — Jul 2022',
    content: (
      <div>
        <div className="flex items-center gap-3 mb-4">
          <Image
            src="/images/logos/projex-logo.png"
            alt="Projex logo"
            width={40}
            height={40}
            className="rounded"
          />
          <h4 className="text-lg font-semibold text-fore-primary">
            Software Projex
          </h4>
        </div>
        <p className="text-sm text-fore-subtle mb-4">
          WordPress developer who rebuilt a learning management platform and
          brought sales up to $2–4k/month. Shipped a storefront with
          WooCommerce payment integration and built custom features with
          JavaScript, CSS, and PHP.
        </p>
        <p className="text-sm text-fore-subtle">
          Also handled tech support, helping a few customers per week to
          improve retention.
        </p>
      </div>
    ),
  },
]

const AboutSheet: React.FC<AboutSheetProps> = ({ isOpen, onClose }) => {
  const [showRealImage, setShowRealImage] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (el && el.scrollTop > 8) {
      setShowRealImage(true)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      setShowRealImage(false)
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (
      info.offset.y > DISMISS_THRESHOLD ||
      info.velocity.y > DISMISS_VELOCITY
    ) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="about-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            key="about-sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={handleDragEnd}
            className={cn(
              'fixed inset-x-0 bottom-0 z-[70]',
              'overflow-hidden rounded-t-3xl',
              'bg-back-primary dark:bg-back-secondary',
              'ring-1 ring-inset ring-white/10 dark:ring-white/[0.06]',
              'shadow-[0_-8px_40px_-8px_rgba(0,0,0,0.25)]',
              'flex flex-col'
            )}
            style={{ top: 'max(env(safe-area-inset-top, 0px), 2rem)' }}
          >
            {/* Glassmorphic header */}
            <div className="shrink-0 z-10 border-b border-white/10 dark:border-white/[0.06] bg-back-primary dark:bg-back-secondary backdrop-blur-xl backdrop-saturate-150">
              <div className="flex items-center justify-center pt-3 pb-1">
                <div className="h-1.5 w-10 rounded-full bg-fore-subtle/30" />
              </div>
              <div className="flex items-center justify-between px-6 pb-3">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <h1 className="text-2xl font-oswald font-bold leading-tight">
                    About Stefan
                  </h1>
                  <p className="font-oswald text-sm text-fore-subtle">
                    Software Developer, Designer
                  </p>
                </motion.div>
                <button
                  onClick={onClose}
                  className="flex h-10 w-10 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-fore-subtle/10 transition-colors hover:bg-fore-subtle/20"
                  aria-label="Close about sheet"
                >
                  <X className="h-5 w-5 sm:h-4 sm:w-4 text-fore-primary" />
                </button>
              </div>
            </div>

            {/* Scrollable content */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto overscroll-contain px-6 pt-4 pb-20"
            >
              <div className="mx-auto max-w-lg">

                {/* Portrait with dither reveal */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.25, duration: 0.5 }}
                  onTouchStart={() => setShowRealImage(true)}
                  className="relative overflow-hidden rounded-xl mb-8 aspect-[3/4]"
                >
                  <DitherShader
                    src="/images/sk-portrait-min.jpg"
                    gridSize={3}
                    ditherMode="bayer"
                    colorMode="grayscale"
                    primaryColor="#000000"
                    secondaryColor="#f5f5f5"
                    threshold={0.5}
                    className="absolute inset-0 h-full w-full"
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: showRealImage ? 1 : 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={avatar}
                      alt="Portrait of Stefan Kudla, Software Developer in Las Vegas"
                      className="rounded-xl object-cover"
                      placeholder="blur"
                      priority
                      quality={90}
                      fill
                      sizes="(max-width: 768px) 100vw, 512px"
                    />
                  </motion.div>
                </motion.div>

                {/* Bio */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.4 }}
                  className="space-y-6 text-fore-primary"
                >
                  <p>
                    I&apos;m a Czech-American Software Developer and Designer
                    based in Las Vegas, Nevada, with extensive experience across
                    diverse tech domains. My journey into software development
                    was preceded by a rich background in music production, where
                    I worked as both a recording artist and audio engineer.
                  </p>
                  <p>
                    My journey in the tech world has taken me through various
                    exciting fields, including Product Development, SaaS, AI,
                    and Fintech. I&apos;ve had the privilege of working on
                    cutting-edge projects that have honed my skills in both full
                    stack development and design.
                  </p>
                </motion.div>

                {/* Socials */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.4 }}
                  className="mt-8 flex items-center"
                >
                  <SocialIcons />
                </motion.div>

                {/* Divider */}
                <motion.hr
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="my-8 border-back-subtle origin-left"
                />
              </div>

              {/* Work Timeline -- outside max-w-lg so it can breathe */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.4 }}
                className="relative w-full overflow-clip"
              >
                <Timeline
                  data={workHistory}
                  title="Work History"
                  scrollContainerRef={scrollRef}
                />
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default AboutSheet
