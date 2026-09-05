import Image from 'next/image'
import { resolveImage } from '@/lib/images'
import PostVideo from './PostVideo'

/**
 * A colocated post image. Dimensions and the blur placeholder come from the
 * prebuild manifest, so markdown images reserve their space instead of
 * shifting the page as they load.
 *
 * A `.mp4` reference renders as a video instead (D-05 converted every GIF).
 * The markdown stays `![alt](./thing.mp4)`, which is what carries the alt text
 * across to a caption — `<video>` has no `alt` of its own.
 *
 * Any GIF still passes through `unoptimized`; the optimizer would flatten it to
 * a still. None remain in the corpus, but a future post could add one.
 */
const MdxImage: React.FC<{
  slug: string
  src: string
  alt?: string
}> = ({ slug, src, alt }) => {
  const image = resolveImage(slug, src)

  if (/\.mp4$/i.test(src)) {
    return (
      <PostVideo
        src={image.src}
        caption={alt ?? ''}
        poster={image.poster}
        width={image.width}
        height={image.height}
      />
    )
  }

  if (!image.width || !image.height) {
    // No manifest entry (an SVG, or dev before prebuild has run).
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={image.src} alt={alt ?? ''} />
  }

  return (
    <Image
      src={image.src}
      alt={alt ?? ''}
      width={image.width}
      height={image.height}
      unoptimized={image.animated}
      placeholder={image.blurDataURL ? 'blur' : 'empty'}
      blurDataURL={image.blurDataURL}
      className="h-auto w-full rounded"
      sizes="(min-width: 768px) 768px, 100vw"
    />
  )
}

export default MdxImage
