import Image from 'next/image'
import BlurImage from './BlurImage'

const CoverImage: React.FC<{ title: string; url: string }> = ({
  title,
  url,
}) => {
  return (
    <div className="relative w-full -z-20 h-[220px] md:h-[540px] shadow-xl rounded-t-md overflow-hidden">
      <BlurImage
        src={url}
        alt={`Cover image for ${title}`}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        className="rounded-t-md"
        priority
      />
    </div>
  )
}
export default CoverImage
