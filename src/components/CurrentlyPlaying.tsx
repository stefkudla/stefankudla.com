import useSWR from 'swr'
import { SpotifyIcon } from '@/configs/icons'
import fetcher from '@/lib/fetcher'
import Image from 'next/image'
import { CurrentlyPlayingTrack } from '@/lib/types'

const CurrentlyPlaying: React.FC = () => {
  const { data } = useSWR<CurrentlyPlayingTrack>(
    '/api/currently-playing',
    fetcher
  )
  return (
    <>
      <div className="hidden md:flex items-center">
        <span className="pr-3">
          <SpotifyIcon />
        </span>
        {data?.isPlaying ? (
          <a
            className="flex hover:opacity-60 transition-opacity"
            href={data.trackUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex items-center relative">
              <Image
                src={data.albumImageUrl}
                width="36"
                height="36"
                alt={`Cover art for the song ${data.title}`}
              />
            </div>
            <div className="flex flex-col pl-2">
              <span>{data.title}</span>
              <span className="text-xs text-fore-subtle">{data.artist}</span>
            </div>
          </a>
        ) : (
          <>
            <p>Not playing </p>
            <span className="mx-2">{' - '}</span>
            <p className="text-fore-subtle">Spotify</p>
          </>
        )}
      </div>
    </>
  )
}

export default CurrentlyPlaying
