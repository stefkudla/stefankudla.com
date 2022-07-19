import Image from 'next/image'
import BlurImage from './BlurImage'

const CoverImage: React.FC<{ title: string; url: string }> = ({
  title,
  url,
}) => {
  return (
    <div className="relative w-full pb-[80%] md:pb-[70%] -z-20 border-back-subtle border border-b-0 shadow-lg rounded-t-md overflow-hidden">
      <BlurImage
        src={url}
        alt={`Cover image for ${title}`}
        layout="fill"
        className="rounded-md"
      />
    </div>
  )
}
export default CoverImage
