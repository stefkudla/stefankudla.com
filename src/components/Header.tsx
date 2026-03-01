import { User } from 'lucide-react'
import { routes } from './MenuItems'
import { FloatingDock, type DockItem } from './ui/floating-dock'
import BottomTabBar from './BottomTabBar'
import NowPlayingPill from './NowPlayingPill'
import RecentPostsBadge from './RecentPostsBadge'

interface HeaderProps {
  onAboutOpen: () => void
}

const Header: React.FC<HeaderProps> = ({ onAboutOpen }) => {
  const navItems: DockItem[] = routes.map((route) => ({
    title: route.label,
    icon: (
      <route.icon className="h-full w-full text-fore-subtle" />
    ),
    href: route.path,
  }))

  return (
    <>
      {/* Mobile glass top bar */}
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 py-3 md:hidden border-b border-white/10 bg-back-primary/60 dark:bg-back-secondary/50 backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-back-primary/40 dark:supports-[backdrop-filter]:bg-back-secondary/30">
        <button
          type="button"
          onClick={onAboutOpen}
          className="flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-white/20 dark:ring-white/10 bg-white/10 dark:bg-white/5 transition-transform hover:scale-105 active:scale-95"
          aria-label="About me"
        >
          <User className="h-5 w-5 text-fore-primary" />
        </button>

        <NowPlayingPill />
      </header>

      {/* Desktop: avatar button (no glass bar needed) */}
      <button
        type="button"
        onClick={onAboutOpen}
        className="hidden md:flex fixed top-4 left-4 z-50 h-10 w-10 items-center justify-center rounded-full bg-back-primary dark:bg-back-secondary ring-2 ring-white/20 dark:ring-white/10 shadow-lg transition-transform hover:scale-105 active:scale-95"
        aria-label="About me"
      >
        <User className="h-5 w-5 text-fore-primary" />
      </button>

      {/* Desktop: Now Playing pill top-right */}
      <div className="hidden md:block fixed top-4 right-4 z-50">
        <NowPlayingPill />
      </div>

      {/* Desktop: Floating Dock at bottom center */}
      <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 hidden md:block">
        <FloatingDock
          items={navItems}
          desktopClassName=""
          trailing={<RecentPostsBadge />}
        />
      </div>

      {/* Mobile: Native app-style bottom tab bar */}
      <BottomTabBar />
    </>
  )
}
export default Header
