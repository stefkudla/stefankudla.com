import Image from 'next/image'

const CoverImage: React.FC<{ title: string; url: string }> = ({
  title,
  url,
}) => (
  <div className="relative">
    <Image
      src={url}
      width="1200"
      height="630"
      alt={`Cover image for ${title}`}
      layout="responsive"
      priority
    />
  </div>
)
export default CoverImage
