import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import EuronetLogo from '../../public/images/logos/euronet_worldwide_logo.jpeg'
import { GlowingEffect } from '@/components/ui/glowing-effect'
import { Vortex } from '@/components/ui/vortex'
import { BackgroundGradient } from '@/components/ui/background-gradient'

function ContactlessIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="opacity-50"
    >
      <path
        d="M12.5 6C14.0 7.5 15.0 9.5 15.0 12.0C15.0 14.5 14.0 16.5 12.5 18.0"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M9.0 8.5C10.0 9.5 10.5 10.7 10.5 12.0C10.5 13.3 10.0 14.5 9.0 15.5"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M5.5 11C6.0 10.2 6.5 10.5 6.5 12.0C6.5 13.5 6.0 13.8 5.5 13.0"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function SKLogo({ className }: { className?: string }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g transform="translate(0,512) scale(0.1,-0.1)" fill="white">
        <path d="M2110 2560 l0 -2030 65 0 65 0 0 2030 0 2030 -65 0 -65 0 0 -2030z" />
        <path d="M1760 4215 c-347 -49 -602 -163 -776 -348 -148 -157 -214 -326 -214 -547 0 -444 227 -718 713 -860 105 -30 323 -73 435 -86 l62 -7 0 272 0 271 -22 4 c-13 3 -75 14 -138 26 -325 62 -462 171 -462 366 1 221 210 381 525 401 l97 6 0 259 0 258 -62 -1 c-35 -1 -106 -7 -158 -14z" />
        <path d="M2868 3697 l-477 -532 -1 -561 0 -562 538 -570 537 -571 393 0 c381 -1 393 0 390 18 -2 10 -361 393 -798 851 -437 458 -796 836 -798 840 -1 4 328 363 733 799 404 435 735 798 735 806 0 13 -53 15 -387 15 l-388 -1 -477 -532z" />
        <path d="M885 1805 c-132 -69 -244 -126 -249 -128 -6 -2 13 -49 41 -104 172 -342 459 -550 871 -632 92 -19 307 -41 393 -41 l39 0 0 265 0 265 -26 0 c-15 0 -74 7 -133 15 -315 46 -554 199 -668 428 l-28 56 -240 -124z" />
      </g>
    </svg>
  )
}

function MailIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function GithubSmallIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
}

function LinkedInSmallIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function MapPinIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

export default function FintechCard() {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isFlipped, setIsFlipped] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 30,
  })
  const tiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 30,
  })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const FLIP_DURATION = 0.6
  const CONTENT_FADE_DURATION = 0.25
  const CONTENT_FADE_IN_DURATION = 0.12 // faster when showing front so it keeps up with gradient
  const CONTENT_FADE_DELAY = 0.15
  const [showBack, setShowBack] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const timer = setTimeout(
      () => setShowBack(isFlipped),
      (FLIP_DURATION / 2) * 1000
    )
    return () => clearTimeout(timer)
  }, [isFlipped])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    setIsMobile(mq.matches)
    const listener = () => setIsMobile(mq.matches)
    mq.addEventListener('change', listener)
    return () => mq.removeEventListener('change', listener)
  }, [])

  return (
    <div
      style={
        { perspective: 800, WebkitPerspective: 800 } as React.CSSProperties
      }
      className="w-full max-w-[420px]"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsFlipped(prev => !prev)}
        style={
          {
            rotateX,
            rotateY: tiltY,
            transformStyle: 'preserve-3d',
            WebkitTransformStyle: 'preserve-3d',
          } as React.CSSProperties
        }
        className="relative rounded-3xl border border-transparent p-1.5 md:p-2 cursor-pointer"
      >
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: FLIP_DURATION, ease: [0.4, 0, 0.2, 1] }}
          style={
            {
              transformStyle: 'preserve-3d',
              WebkitTransformStyle: 'preserve-3d',
            } as React.CSSProperties
          }
          className="relative z-10 h-full w-full rounded-3xl"
        >
          {/* Aspect-ratio ghost: gives flip div its size */}
          <div className="w-full" style={{ paddingBottom: '63.05%' }} />
          <BackgroundGradient
            containerClassName="absolute inset-0"
            className="relative h-full w-full overflow-visible rounded-3xl bg-zinc-900 dark:bg-zinc-950 [transform-style:preserve-3d] [-webkit-transform-style:preserve-3d]"
            dimmed={isFlipped}
            delayWhenDimmed={0.12}
            delayWhenNotDimmed={0.4}
          >
            <GlowingEffect
              spread={40}
              glow
              alwaysActive={isMobile}
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
            />

          {/* ---- FRONT FACE ---- */}
          <motion.div
            className="absolute inset-0 z-20 rounded-3xl bg-card-background overflow-hidden [transform-style:preserve-3d] [-webkit-transform-style:preserve-3d]"
            style={
              {
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                visibility: showBack ? 'hidden' : 'visible',
              } as React.CSSProperties
            }
            initial={false}
            animate={{ opacity: isFlipped ? 0 : 1 }}
            transition={{
              duration: isFlipped ? CONTENT_FADE_DURATION : CONTENT_FADE_IN_DURATION,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            <Vortex
              backgroundColor="#000000"
              baseHue={200}
              rangeY={80}
              particleCount={150}
              baseSpeed={0.0}
              rangeSpeed={0.5}
              baseRadius={0.2}
              rangeRadius={0.6}
              containerClassName="absolute inset-0"
              className="absolute inset-0"
            />

            <div className="relative z-20 h-full p-6 sm:p-7 flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <ContactlessIcon />
                <Link
                  href="https://www.euronetworldwide.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 group"
                  onClick={e => e.stopPropagation()}
                >
                  <Image
                    src={EuronetLogo}
                    alt="Euronet Worldwide logo"
                    width={28}
                    height={28}
                    className="rounded"
                  />
                  <span className="text-xs font-mono tracking-wider text-white/50 group-hover:text-[#01B7B0] transition-colors hidden sm:inline">
                    EURONET
                  </span>
                </Link>
              </div>

              <div className="flex items-center gap-4 font-mono text-sm tracking-[0.25em] text-white/20 select-none">
                <span>****</span>
                <span>****</span>
                <span>****</span>
                <span className="text-white/40">2026</span>
              </div>

              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="font-oswald text-xl sm:text-2xl font-bold tracking-wide text-white">
                    Stefan Kudla
                  </p>
                  <p className="font-mono text-[10px] sm:text-xs tracking-widest uppercase text-white/40 mt-0.5">
                    Lead Full Stack Developer
                  </p>
                </div>
                <SKLogo className="opacity-40" />
              </div>
            </div>

            <p className="absolute bottom-2 left-0 right-0 text-center text-[9px] font-mono text-white/20 z-20">
              TAP TO FLIP
            </p>
          </motion.div>

          {/* ---- BACK FACE ---- */}
          <motion.div
            className="absolute inset-0 z-30 rounded-3xl bg-card-background overflow-hidden [transform-style:preserve-3d] [-webkit-transform-style:preserve-3d]"
            style={
              {
                backfaceVisibility: 'visible',
                WebkitBackfaceVisibility: 'visible',
                transform: 'rotateY(180deg)',
                WebkitTransform: 'rotateY(180deg)',
                visibility: showBack ? 'visible' : 'hidden',
              } as React.CSSProperties
            }
            initial={false}
            animate={{ opacity: isFlipped ? 1 : 0 }}
            transition={{
              duration: CONTENT_FADE_DURATION,
              delay: isFlipped ? CONTENT_FADE_DELAY : 0,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#020204] to-[#0a0a12]" />

            <div className="relative z-20 h-full p-6 sm:p-7 flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-oswald text-lg font-bold tracking-wide text-white">
                    Contact
                  </p>
                  <p className="font-mono text-[10px] tracking-widest uppercase text-white/30 mt-0.5">
                    Get in touch
                  </p>
                </div>
                <SKLogo className="opacity-20" />
              </div>

              <div className="flex flex-col gap-3">
                <a
                  href="mailto:stefankudla@gmail.com"
                  className="flex items-center gap-3 text-white/60 hover:text-[#01B7B0] transition-colors"
                  onClick={e => e.stopPropagation()}
                >
                  <MailIcon />
                  <span className="font-mono text-xs">
                    stefankudla@gmail.com
                  </span>
                </a>
                <a
                  href="https://github.com/stefkudla"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-white/60 hover:text-[#01B7B0] transition-colors"
                  onClick={e => e.stopPropagation()}
                >
                  <GithubSmallIcon />
                  <span className="font-mono text-xs">
                    github.com/stefkudla
                  </span>
                </a>
                <a
                  href="https://www.linkedin.com/in/stefankudla/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-white/60 hover:text-[#01B7B0] transition-colors"
                  onClick={e => e.stopPropagation()}
                >
                  <LinkedInSmallIcon />
                  <span className="font-mono text-xs">
                    linkedin.com/in/stefankudla
                  </span>
                </a>
                <div className="flex items-center gap-3 text-white/60">
                  <MapPinIcon />
                  <span className="font-mono text-xs">Las Vegas, NV</span>
                </div>
              </div>

              <p className="text-center text-[9px] font-mono text-white/20">
                TAP TO FLIP BACK
              </p>
            </div>
          </motion.div>
          </BackgroundGradient>
        </motion.div>
      </motion.div>
    </div>
  )
}
