import useSWR from 'swr'

import fetcher from '@/lib/fetcher'
import { TopTracks } from '@/lib/types'

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
          className="list-decimal mb-4 pl-0 pb-2 border-b border-b-back-subtle"
        >
          <a
            href={track.songUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            {track.title}
          </a>
          <span className="block text-fore-subtle text-sm font-light">
            {track.artist}
          </span>
        </li>
      ))}
    </ol>
  )
}
export default TopTracks
