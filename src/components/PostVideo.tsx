'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * A screen recording that was a GIF until D-05. Written in markdown as a plain
 * image — `![what it shows](./thing.mp4)` — so the alt text a GIF carried
 * survives the conversion instead of being lost to an element that has no
 * `alt`. It becomes both the visible caption and the video's accessible name.
 *
 * Two of the seven captures carry a bare filename where their alt text should
 * be — `marquee-images.gif` and `scrolling-example.gif`, both weak on the live
 * site long before this conversion. That is still the video's accessible name,
 * because inventing a description is writing Stefan's copy for him, but it is
 * not printed under the video as though it were a caption. Replacing the two
 * with real descriptions is his to do.
 *
 * Autoplay is deliberately off until the client has checked
 * `prefers-reduced-motion`: seven looping captures on one page is exactly what
 * that setting is for. When motion is not wanted the video renders with
 * controls instead, so it is still watchable on purpose.
 */
const PostVideo: React.FC<{
  src: string
  caption: string
  poster?: string
  width?: number
  height?: number
}> = ({ src, caption, poster, width, height }) => {
  const ref = useRef<HTMLVideoElement>(null)
  const isFilename = /\.(gif|mp4|png|jpe?g|webp)$/i.test(caption.trim())
  const [motionAllowed, setMotionAllowed] = useState<boolean | null>(null)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setMotionAllowed(!query.matches)
    apply()
    query.addEventListener('change', apply)
    return () => query.removeEventListener('change', apply)
  }, [])

  useEffect(() => {
    const video = ref.current
    if (!video || motionAllowed === null) return

    if (!motionAllowed) {
      video.pause()
      return
    }

    // Chrome aborts `play()` on muted, video-only media that is off-screen —
    // "video-only background media was paused to save power" — so playing on
    // mount silently fails for every capture below the fold. Playing on
    // visibility is the only thing that works, and it is also what
    // `preload="metadata"` is for: seven captures on one page should not all
    // decode at once.
    //
    // `muted` is set here as well because React applies it as a property, and
    // until it lands the autoplay policy sees an unmuted video.
    video.muted = true

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { rootMargin: '100px' }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [motionAllowed])

  return (
    <figure className="my-6">
      <video
        ref={ref}
        src={src}
        poster={poster}
        width={width}
        height={height}
        loop
        muted
        playsInline
        preload="metadata"
        controls={motionAllowed === false}
        aria-label={caption}
        className="h-auto w-full rounded"
      />
      {caption && !isFilename ? (
        <figcaption className="mt-2 text-sm text-gray-500 dark:text-dark-gray-500">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  )
}

export default PostVideo
