import { NextResponse } from 'next/server'
import { getTopTracks } from '@/lib/spotify'

export const dynamic = 'force-dynamic'

export async function GET() {
  const response = await getTopTracks()
  const { items } = await response.json()

  const tracks = items
    .slice(0, 10)
    .map(
      (track: {
        artists: any[]
        external_urls: { spotify: any }
        name: any
        album: { images: { url: string }[] }
      }) => ({
        artist: track.artists.map(_artist => _artist.name).join(', '),
        songUrl: track.external_urls.spotify,
        title: track.name,
        image: track.album?.images?.[0]?.url,
      })
    )

  return NextResponse.json(
    { tracks },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
      },
    }
  )
}
