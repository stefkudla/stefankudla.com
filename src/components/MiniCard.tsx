import { useTheme } from 'next-themes'
import Image, { StaticImageData } from 'next/image'
import { useEffect, useState } from 'react'

const MiniCard = ({
  image,
}: {
  image: {
    src: StaticImageData | string
    alt: string
    srcDark?: StaticImageData | string
  }
}) => {
  const { resolvedTheme } = useTheme()
  const [imgSrc, setImgSrc] = useState<StaticImageData | string>(image.src)

  useEffect(() => {
    if (resolvedTheme === 'dark') {
      setImgSrc(image.srcDark ?? image.src)
    } else {
      setImgSrc(image.src)
    }
  }, [image.src, image.srcDark, resolvedTheme])

  return (
    <div className="max-w-[220px] h-20 px-12 py-4 border rounded-lg border-[#CDD7E1] flex items-center justify-center">
      <Image
        src={imgSrc}
        alt={image.alt}
        quality={100}
        className="object-contain"
      />
    </div>
  )
}

export default MiniCard
