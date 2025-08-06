export type Song = {
  songUrl: string
  artist: string
  title: string
  image: string
}

export type TopTracks = {
  tracks: Song[]
}

export type CurrentlyPlayingTrack = {
  isPlaying: boolean
  trackUrl: string
  album: string
  albumImageUrl: string
  title: string
  artist: string
}
