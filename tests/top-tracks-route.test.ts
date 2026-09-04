import { beforeEach, describe, expect, it, vi } from 'vitest'

const getTopTracks = vi.fn()

vi.mock('@/lib/spotify', () => ({
  getTopTracks: () => getTopTracks(),
}))

const { GET } = await import('@/app/api/top-tracks/route')

const spotifyResponse = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })

describe('GET /api/top-tracks', () => {
  beforeEach(() => {
    getTopTracks.mockReset()
  })

  it('maps the ten most recent tracks when Spotify responds normally', async () => {
    getTopTracks.mockResolvedValue(
      spotifyResponse(200, {
        items: Array.from({ length: 12 }, (_, i) => ({
          name: `Track ${i}`,
          artists: [{ name: 'Artist A' }, { name: 'Artist B' }],
          external_urls: { spotify: `https://open.spotify.com/track/${i}` },
          album: { images: [{ url: `https://img/${i}.jpg` }] },
        })),
      })
    )

    const res = await GET()
    const body = await res.json()

    expect(res.status).toBe(200)
    expect(body.tracks).toHaveLength(10)
    expect(body.tracks[0]).toEqual({
      artist: 'Artist A, Artist B',
      songUrl: 'https://open.spotify.com/track/0',
      title: 'Track 0',
      image: 'https://img/0.jpg',
    })
  })

  // The live failure mode: the refresh token is revoked, so Spotify answers
  // 401 with an error object and no `items`.
  it('returns 200 with an empty list on a 401 error body', async () => {
    getTopTracks.mockResolvedValue(
      spotifyResponse(401, {
        error: { status: 401, message: 'Missing/invalid/expired access token' },
      })
    )

    const res = await GET()

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ tracks: [] })
  })

  it('returns 200 with an empty list when a 200 body has no items array', async () => {
    getTopTracks.mockResolvedValue(spotifyResponse(200, { data: {} }))

    const res = await GET()

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ tracks: [] })
  })

  it('returns 200 with an empty list when the body is not JSON', async () => {
    getTopTracks.mockResolvedValue(new Response('<html>oops</html>'))

    const res = await GET()

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ tracks: [] })
  })

  it('returns 200 with an empty list when the fetch itself rejects', async () => {
    getTopTracks.mockRejectedValue(new Error('network down'))

    const res = await GET()

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ tracks: [] })
  })

  it('skips malformed track entries rather than throwing', async () => {
    getTopTracks.mockResolvedValue(
      spotifyResponse(200, {
        items: [
          null,
          { name: 'No url' },
          {
            name: 'Good',
            external_urls: { spotify: 'https://open.spotify.com/track/x' },
          },
        ],
      })
    )

    const res = await GET()
    const body = await res.json()

    expect(body.tracks).toEqual([
      {
        artist: '',
        songUrl: 'https://open.spotify.com/track/x',
        title: 'Good',
        image: '',
      },
    ])
  })
})
