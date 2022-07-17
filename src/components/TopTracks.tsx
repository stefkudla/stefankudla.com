import useSWR from 'swr'

import fetcher from '@/lib/fetcher'
import { TopTracks } from '@/lib/types'
import Link from 'next/link'

const TopTracks: React.FC = () => {
  const { data } = useSWR<TopTracks>('/api/top-tracks', fetcher)

  if (!data) {
    return null
  }

  return (
    <ol className="pl-5 grid grid-rows-4">
      {data.tracks.map((track, index) => (
        <li
          key={index}
          className="group list-decimal mb-4 border-b border-b-back-subtle hover:bg-back-subtle transition-colors shadow-md marker:hover:text-[#1DB954]"
        >
          <Link href={track.songUrl} target="_blank" rel="noopener noreferrer">
            <a className="block p-3 hover:text-[#1DB954]  transition-colors">
              {track.title}
              <span className="block text-fore-subtle text-sm font-light">
                {track.artist}
              </span>
            </a>
          </Link>
        </li>
      ))}
    </ol>
  )
}
export default TopTracks
