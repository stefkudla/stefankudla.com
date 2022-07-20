import useSWR from 'swr'
import { SpotifyIcon } from '@/configs/icons'
import fetcher from '@/lib/fetcher'
import Image from 'next/image'
import Marquee from 'react-fast-marquee'
import { CurrentlyPlayingTrack } from '@/lib/types'
import BlurImage from './BlurImage'
import coverArtPlacehlder from '../../public/images/cover-art-placeholder.png'
import dancingPenguin from '../../public/images/dancing-penguin.gif'
import dancingSquidward from '../../public/images/dancing-squidward.gif'

const CurrentlyPlaying: React.FC = () => {
  const { data } = useSWR<CurrentlyPlayingTrack>(
    '/api/currently-playing',
    fetcher
  )

  if (!data || !data?.isPlaying)
    return (
      <div className="flex items-center md:w-[210px] ">
        <span>
          <SpotifyIcon />
        </span>
        <div className="h-10 w-10 bg-gray-300 mx-2 shadow-md transition-all">
          <Image
            src={coverArtPlacehlder}
            alt={`Cover art placeholder`}
            quality={50}
            width={80}
            height={80}
            priority
          />
        </div>
        <div className="flex items-center whitespace-nowrap">
          <span>Not playing&nbsp;</span>
          <span className="text-xs text-fore-subtle pt-[1px]">
            - &nbsp;Spotify
          </span>
        </div>
      </div>
    )

  return (
    <>
      <div className="flex items-center w-[210px]">
        <>
          <span>
            <SpotifyIcon color={'#1DB954'} />
          </span>
          <a
            className="group flex hover:opacity-75 transition-opacity"
            href={data.trackUrl}
            aria-label={`Open${data.title} by ${data.artist} on Spotify`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="h-10 w-10 bg-gray-300  shadow-md mx-2 transition-all">
              <BlurImage
                src={data.albumImageUrl}
                alt={`Cover art for the song ${data.title}`}
                quality={50}
                width={80}
                height={80}
              />
            </div>
            <Marquee
              gradient={false}
              className="overflow-hidden"
              delay={5}
              speed={22}
              pauseOnHover={false}
              style={{
                width: '165px',
                marginLeft: '-8px',
                paddingLeft: '8px',
              }}
            >
              <div className="flex items-center">
                <span className="group-hover:text-[#1DB954] transition-colors">
                  {data.title}&nbsp;
                </span>
                <span className="text-xs text-fore-subtle pt-[1px] pr-16">
                  - &nbsp;{data.artist}
                </span>
                <span className="mr-28">
                  <Image
                    src={dancingPenguin}
                    alt="Gif of a dancing penguin"
                    width={44}
                    height={35}
                  />
                </span>
                <span className="group-hover:text-[#1DB954] transition-colors">
                  {data.title}&nbsp;
                </span>
                <span className="text-xs text-fore-subtle pt-[1px] pr-16">
                  - &nbsp;{data.artist}
                </span>
                <span className="mr-28">
                  <Image
                    src={dancingSquidward}
                    alt="Gif of a dancing Squidward"
                    width={35}
                    height={35}
                  />
                </span>
              </div>
            </Marquee>
          </a>
        </>
      </div>
    </>
  )
}

export default CurrentlyPlaying
