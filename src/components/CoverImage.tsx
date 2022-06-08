import Image from 'next/image'

const CoverImage: React.FC<{ title: string; url: string }> = ({
  title,
  url,
}) => (
  <div className="relative">
    <Image
      src={url}
      width="100%"
      height="75%"
      alt={`Cover image for ${title}`}
      layout="responsive"
      objectFit="contain"
      priority
    />
  </div>
)
export default CoverImage
