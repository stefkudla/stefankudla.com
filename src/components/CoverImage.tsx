import Image from 'next/image'

type CoverImageProps = {
  title: string
  url: string
}

const CoverImage: React.FC<CoverImageProps> = ({ title, url }) => {
  return (
    <Image
      src={url}
      width="1200"
      height="630"
      alt={`Cover image for ${title}`}
      quality={75}
      layout="raw"
      sizes="100vw"
    />
  )
}
export default CoverImage
