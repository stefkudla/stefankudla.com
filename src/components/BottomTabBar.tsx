"use client"

import { routes } from './MenuItems'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'
import { useCallback, useEffect, useRef, useState } from 'react'

const BottomTabBar: React.FC = () => {
  const { pathname } = useRouter()
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const navRef = useRef<HTMLElement>(null)
  const isDark = mounted ? resolvedTheme === 'dark' : true

  // --- Specular highlight tracking ---
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const glowOpacity = useMotionValue(0)

  const springX = useSpring(pointerX, {
    mass: 0.15,
    stiffness: 200,
    damping: 15,
  })
  const springY = useSpring(pointerY, {
    mass: 0.15,
    stiffness: 200,
    damping: 15,
  })
  const springOpacity = useSpring(glowOpacity, {
    mass: 0.1,
    stiffness: 150,
    damping: 15,
  })

  const highlightBackground = useTransform(
    [springX, springY],
    ([x, y]: number[]) =>
      isDark
        ? `radial-gradient(circle 90px at ${x}px ${y}px, rgba(120, 160, 255, 0.18), transparent)`
        : `radial-gradient(circle 90px at ${x}px ${y}px, rgba(255, 255, 255, 0.5), transparent)`
  )

  const setPointerPosition = useCallback(
    (clientX: number, clientY: number) => {
      if (!navRef.current) return
      const rect = navRef.current.getBoundingClientRect()
      pointerX.set(clientX - rect.left)
      pointerY.set(clientY - rect.top)
      glowOpacity.set(1)
    },
    [pointerX, pointerY, glowOpacity]
  )

  const handlePointerEvent = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      setPointerPosition(e.clientX, e.clientY)
    },
    [setPointerPosition]
  )

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLElement>) => {
      const touch = e.touches[0]
      if (touch) setPointerPosition(touch.clientX, touch.clientY)
    },
    [setPointerPosition]
  )

  const hideGlow = useCallback(() => {
    glowOpacity.set(0)
  }, [glowOpacity])

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <motion.nav
        ref={navRef}
        className={cn(
          'relative mx-3 mb-3 overflow-hidden rounded-full',
          'backdrop-blur-2xl backdrop-saturate-150',
          'bg-back-primary/50 dark:bg-back-secondary/40',
          'ring-1 ring-inset ring-white/20 dark:ring-white/[0.08]',
          'shadow-[0_4px_24px_-4px_rgba(0,0,0,0.12)] dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.4)]'
        )}
        aria-label="Main Navigation"
        onPointerDown={handlePointerEvent}
        onPointerMove={handlePointerEvent}
        onPointerLeave={hideGlow}
        onPointerUp={hideGlow}
        onTouchMove={handleTouchMove}
        onTouchEnd={hideGlow}
      >
        {/* Specular highlight overlay */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 rounded-full"
          style={{
            background: highlightBackground,
            opacity: springOpacity,
          }}
        />

        {/* Inner top-edge light refraction line */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-3 top-0 z-10 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent dark:via-white/10"
        />

        <div className="relative z-20 flex h-[72px] items-center justify-around px-4">
          {routes.map((route) => {
            const isActive =
              route.path === '/'
                ? pathname === '/'
                : pathname.startsWith(route.path)

            return (
              <Link
                key={route.path}
                href={route.path}
                className="relative flex flex-1 flex-col items-center justify-center gap-0.5 py-1"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-x-2 inset-y-0.5 rounded-2xl bg-white/10 ring-1 ring-inset ring-white/15 shadow-sm dark:bg-white/[0.06] dark:ring-white/[0.05]"
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
                <route.icon
                  className={cn(
                    'relative z-10 h-6 w-6 transition-colors',
                    isActive ? 'text-accent' : 'text-fore-subtle'
                  )}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span
                  className={cn(
                    'relative z-10 text-[11px] font-medium transition-colors',
                    isActive ? 'text-accent' : 'text-fore-subtle'
                  )}
                >
                  {route.label}
                </span>
              </Link>
            )
          })}
        </div>
      </motion.nav>
    </div>
  )
}

export default BottomTabBar
