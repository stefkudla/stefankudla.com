import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import useSWR from 'swr'
import Image from 'next/image'
import { Music, ExternalLink } from 'lucide-react'
import fetcher from '@/lib/fetcher'
import { CurrentlyPlayingTrack, TopTracks } from '@/lib/types'

function EqualiserBars() {
  return (
    <div className="flex items-end gap-[2px] h-3.5 ml-1.5">
      <span className="block w-[3px] h-full bg-[#1DB954] rounded-sm origin-bottom animate-equalizer" />
      <span className="block w-[3px] h-full bg-[#1DB954] rounded-sm origin-bottom animate-equalizer [animation-delay:0.2s]" />
      <span className="block w-[3px] h-full bg-[#1DB954] rounded-sm origin-bottom animate-equalizer [animation-delay:0.4s]" />
    </div>
  )
}

const NowPlayingPill: React.FC = () => {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)

  const { data: currentlyPlaying } = useSWR<CurrentlyPlayingTrack>(
    '/api/currently-playing',
    fetcher,
    { revalidateOnFocus: true, refreshInterval: 30_000 }
  )
  const { data: topTracks } = useSWR<TopTracks>('/api/top-tracks', fetcher, {
    revalidateOnFocus: true,
  })

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  const isLive = currentlyPlaying?.isPlaying
  const track = isLive
    ? {
        art: currentlyPlaying.albumImageUrl,
        title: currentlyPlaying.title,
        artist: currentlyPlaying.artist,
        url: currentlyPlaying.trackUrl,
      }
    : topTracks?.tracks?.[0]
      ? {
          art: topTracks.tracks[0].image,
          title: topTracks.tracks[0].title,
          artist: topTracks.tracks[0].artist,
          url: topTracks.tracks[0].songUrl,
        }
      : null

  if (!track) {
    return (
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 dark:bg-white/5 ring-1 ring-white/20 dark:ring-white/10">
        <Music className="h-5 w-5 text-fore-subtle" />
      </span>
    )
  }

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={`${isLive ? 'Now playing' : 'Recently played'}: ${track.title} by ${track.artist}`}
        className="flex h-10 items-center gap-1.5 rounded-full bg-white/10 dark:bg-white/5 ring-1 ring-white/20 dark:ring-white/10 pl-0.5 pr-2.5 py-0.5 transition-transform hover:scale-105 active:scale-95"
      >
        <Image
          src={track.art}
          alt={`Album art for ${track.title}`}
          width={32}
          height={32}
          className="rounded-full h-8 w-8 shrink-0"
          unoptimized
        />
        {isLive ? (
          <EqualiserBars />
        ) : (
          <Music className="h-3.5 w-3.5 text-fore-subtle ml-0.5" />
        )}
      </button>

      {open &&
        createPortal(
          <div
            ref={popoverRef}
            className="fixed right-4 top-16 w-72 rounded-2xl border border-white/15 bg-back-primary/80 dark:bg-back-secondary/80 backdrop-blur-2xl backdrop-saturate-150 shadow-xl p-4 z-[9999] animate-popover-in"
          >
            <div className="absolute -top-2 right-5 h-4 w-4 rotate-45 rounded-sm border-l border-t border-white/15 bg-back-primary/80 dark:bg-back-secondary/80" />

            <div className="relative flex gap-3 items-start">
              <a
                href={track.url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 group"
              >
                <Image
                  src={track.art}
                  alt={`Album art for ${track.title}`}
                  width={56}
                  height={56}
                  className="rounded-lg shadow-md group-hover:shadow-lg transition-shadow"
                  unoptimized
                />
              </a>

              <div className="min-w-0 flex-1">
                <p className="text-2xs font-mono uppercase tracking-wider text-fore-subtle mb-1">
                  {isLive ? 'Now Playing' : 'Recently Played'}
                </p>
                <p className="text-sm font-semibold text-fore-primary truncate">
                  {track.title}
                </p>
                <p className="text-xs text-fore-subtle truncate">
                  {track.artist}
                </p>
              </div>
            </div>

            <a
              href={track.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-1.5 w-full rounded-lg bg-[#1DB954]/15 hover:bg-[#1DB954]/25 text-[#1DB954] text-xs font-semibold py-2 transition-colors"
            >
              Open in Spotify
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>,
          document.body
        )}
    </>
  )
}

export default NowPlayingPill
