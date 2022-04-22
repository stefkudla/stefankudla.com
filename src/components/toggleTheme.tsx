import { useDarkMode } from '@/hooks/useDarkMode'
// import { useAnalyticsEvent } from '@/hooks/useAnalytics'
import { MoonIcon, SunIcon } from '@/components/icons'

export function ToggleTheme({ className }: { className?: string }) {
  const [isDark, setIsDark] = useDarkMode()
  //   const { trackCustomEvent } = useAnalyticsEvent()

  return (
    <button
      aria-label={isDark ? 'Activate Light Mode' : 'Activate Dark Mode'}
      title={isDark ? 'Activate Light Mode' : 'Activate Dark Mode'}
      onClick={() => {
        setIsDark(!isDark)
        // trackCustomEvent({ eventName: 'toggle-theme' })
      }}
      className={className}
    >
      {isDark ? (
        <MoonIcon styles="text-2xl sm:text-xl group-hover:-translate-y-1 transition-transform group-hover:rotate-12" />
      ) : (
        <SunIcon styles="text-2xl sm:text-xl group-hover:-translate-y-1 transition-transform group-hover:rotate-12" />
      )}
    </button>
  )
}
