import { NextResponse } from 'next/server'
import { getTopTracks } from '@/lib/spotify'
import type { Song } from '@/lib/types'

export const dynamic = 'force-dynamic'

type SpotifyTrack = {
  name?: string
  artists?: ({ name?: string } | null)[]
  external_urls?: { spotify?: string }
  album?: { images?: { url?: string }[] }
}

// Spotify does not always hand back an `items` array: a revoked refresh token
// means no access token, which means a 401 whose body is `{ error: { ... } }`.
// Mirror /api/currently-playing and degrade to an empty list instead of
// throwing, so the header pill (rendered on every page) keeps working.
const emptyTracks = () =>
  NextResponse.json(
    { tracks: [] as Song[] },
    { headers: { 'Cache-Control': 'no-store' } }
  )

export async function GET() {
  let items: unknown

  try {
    const response = await getTopTracks()

    if (!response.ok) {
      return emptyTracks()
    }

    ;({ items } = await response.json())
  } catch {
    return emptyTracks()
  }

  if (!Array.isArray(items)) {
    return emptyTracks()
  }

  const tracks: Song[] = (items as (SpotifyTrack | null)[])
    .slice(0, 10)
    .filter(
      (track): track is SpotifyTrack =>
        !!track && !!track.name && !!track.external_urls?.spotify
    )
    .map(track => ({
      artist: (track.artists ?? [])
        .map(_artist => _artist?.name)
        .filter(Boolean)
        .join(', '),
      songUrl: track.external_urls!.spotify!,
      title: track.name!,
      image: track.album?.images?.[0]?.url ?? '',
    }))

  return NextResponse.json(
    { tracks },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
      },
    }
  )
}
