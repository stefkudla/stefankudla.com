import useSWR from 'swr'
import fetcher from '@/lib/fetcher'
import Marquee from 'react-fast-marquee'
import { CurrentlyPlayingTrack, TopTracks } from '@/lib/types'
import BlurImage from './BlurImage'
import { useState } from 'react'

const CurrentlyPlaying: React.FC = () => {
  const { data: currentlyPlaying } = useSWR<CurrentlyPlayingTrack>(
    '/api/currently-playing',
    fetcher
  )
  const { data: topTracks } = useSWR<TopTracks>('/api/top-tracks', fetcher)

  const [playMarquee, setPlayMarquee] = useState(true)
  const handleMarquee = () => {
    setPlayMarquee(false)
    setTimeout(() => {
      setPlayMarquee(true)
    }, 5000)
  }

  if (!currentlyPlaying && !topTracks)
    return (
      <div className="py-3 px-1 rounded-lg w-full max-w-full sm:max-w-xs bg-gray-200 dark:bg-gray-700">
        <div className="flex items-center w-full">
          <div className="group flex">
            <div className="w-16 h-16 bg-gray-300 dark:bg-gray-500 shadow-md mx-2 transition-all rounded-md"></div>
            <div className="flex items-center">
              <span className="text-lg font-bold">Not playing&nbsp;</span>
              <span className="text-fore-subtle pt-[1px]">- &nbsp;Spotify</span>
            </div>
          </div>
        </div>
      </div>
    )

  if (!currentlyPlaying && topTracks?.tracks.length)
    return (
      <div className="py-3 px-1 rounded-lg w-full max-w-xs bg-gray-200 dark:bg-gray-900 border-purple-300 dark:border-purple-600 border border-transparent">
        <div className="flex items-center w-full">
          <>
            <a
              className="group flex hover:opacity-75 transition-opacity"
              href={topTracks.tracks[0].songUrl}
              aria-label={`Open${topTracks.tracks[0].title} by ${topTracks.tracks[0].artist} on Spotify`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="w-16 h-16 bg-gray-300  shadow-md mx-2 transition-all rounded-md">
                <BlurImage
                  src={topTracks.tracks[0].image}
                  alt={`Cover art for the song ${topTracks.tracks[0].title}`}
                  quality={50}
                  width={100}
                  height={100}
                  className="rounded-md"
                />
              </div>
              <Marquee
                gradient={false}
                play={playMarquee}
                className="overflow-hidden"
                delay={5}
                speed={23}
                pauseOnHover={false}
                onCycleComplete={handleMarquee}
                style={{
                  width: '235px',
                  marginLeft: '-8px',
                  paddingLeft: '8px',
                }}
              >
                <div className="flex items-center">
                  <span className="group-hover:text-[#1DB954] text-lg transition-colors font-bold">
                    {topTracks.tracks[0].title}&nbsp;
                  </span>
                  <span className="text-fore-subtle pt-[1px] pr-24">
                    - &nbsp;{topTracks.tracks[0].artist}
                  </span>
                </div>
              </Marquee>
            </a>
          </>
        </div>
      </div>
    )

  if (currentlyPlaying)
    return (
      <div className="py-3 px-1 rounded-lg w-full max-w-xs bg-gray-200 dark:bg-gray-900 border-purple-300 dark:border-purple-600 border border-transparent">
        <div className="flex items-center w-full">
          <>
            <a
              className="group flex hover:opacity-75 transition-opacity"
              href={currentlyPlaying.trackUrl}
              aria-label={`Open${currentlyPlaying.title} by ${currentlyPlaying.artist} on Spotify`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="w-16 h-16 bg-gray-300  shadow-md mx-2 transition-all rounded-md">
                <BlurImage
                  src={currentlyPlaying.albumImageUrl}
                  alt={`Cover art for the song ${currentlyPlaying.title}`}
                  quality={50}
                  width={100}
                  height={100}
                  className="rounded-md"
                />
              </div>
              <Marquee
                gradient={false}
                play={playMarquee}
                className="overflow-hidden"
                delay={5}
                speed={23}
                pauseOnHover={false}
                onCycleComplete={handleMarquee}
                style={{
                  width: '235px',
                  marginLeft: '-8px',
                  paddingLeft: '8px',
                }}
              >
                <div className="flex items-center">
                  <span className="group-hover:text-[#1DB954] text-lg transition-colors font-bold">
                    {currentlyPlaying.title}&nbsp;
                  </span>
                  <span className="text-fore-subtle pt-[1px] pr-24">
                    - &nbsp;{currentlyPlaying.artist}
                  </span>
                </div>
              </Marquee>
            </a>
          </>
        </div>
      </div>
    )
}

export default CurrentlyPlaying
