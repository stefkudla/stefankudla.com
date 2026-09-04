import Image from 'next/image'
import { resolveImage } from '@/lib/images'

/**
 * A colocated post image. Dimensions and the blur placeholder come from the
 * prebuild manifest, so markdown images reserve their space instead of
 * shifting the page as they load.
 *
 * Animated GIFs are passed through `unoptimized` — the optimizer would flatten
 * them to a still. Converting them to muted autoplay video is D-05 and still
 * open.
 */
const MdxImage: React.FC<{
  slug: string
  src: string
  alt?: string
}> = ({ slug, src, alt }) => {
  const image = resolveImage(slug, src)

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
