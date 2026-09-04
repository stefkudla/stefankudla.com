import { NextResponse } from 'next/server'
import { getCurrentlyPlaying } from '@/lib/spotify'

export const dynamic = 'force-dynamic'

export async function GET() {
  const response = await getCurrentlyPlaying()

  if (response.status === 204 || response.status > 400) {
    return NextResponse.json({ isPlaying: false })
  }

  const track = await response.json()

  if (track.item === null) {
    return NextResponse.json({ isPlaying: false })
  }

  const isPlaying = track.is_playing
  const title = track.item.name
  const artist = track.item.artists
    .map((_artist: { name: string }) => _artist.name)
    .join(', ')
  const album = track.item.album.name
  const albumImageUrl = track.item.album.images[0].url
  const trackUrl = track.item.external_urls.spotify

  return NextResponse.json(
    { isPlaying, title, artist, album, albumImageUrl, trackUrl },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
      },
    }
  )
}
