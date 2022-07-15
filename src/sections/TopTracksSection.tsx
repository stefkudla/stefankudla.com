import React from 'react'
import { HeadphonesIcon } from '@/configs/icons'
import TopTracks from '@/components/TopTracks'

const TopTracksSection: React.VFC = () => {
  return (
    <section className="mt-24 pb-12">
      <span className="flex items-center mb-8">
        <div className="icon-border">
          <HeadphonesIcon />
        </div>
        <h4 className="text-xl text-accent font-semibold">Top Tracks</h4>
      </span>
      <p className="mb-12 text-fore-subtle">
        These are my top Spotify tracks over the last few months
      </p>
      <TopTracks />
    </section>
  )
}

export default TopTracksSection
