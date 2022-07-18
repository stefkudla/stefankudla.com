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
      <div className="flex items-center md:justify-end flex-nowrap md:h-10 w-full">
        {data?.isPlaying ? (
          <>
            <span className="pr-3">
              <SpotifyIcon color="#1DB954" />
            </span>
            <a
              className="flex hover:opacity-60 transition-opacity"
              href={data.trackUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="relative h-10 w-10 shadow-md">
                <Image
                  src={data.albumImageUrl}
                  alt={`Cover art for the song ${data.title}`}
                  quality={35}
                  layout="fill"
                />
              </div>
              <div className="flex flex-col pl-2">
                <span>{data.title}</span>
                <span className="text-xs text-fore-subtle">{data.artist}</span>
              </div>
            </a>
          </>
        ) : (
          <>
            <span className="pr-3">
              <SpotifyIcon />
            </span>
            <div className="flex">
              <p>Not playing </p>
              <span className="mx-2">{' - '}</span>
              <p className="text-fore-subtle">Spotify</p>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default CurrentlyPlaying
