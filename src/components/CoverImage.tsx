import BlurImage from './BlurImage'

const CoverImage: React.FC<{ title: string; url: string }> = ({
  title,
  url,
}) => {
  return (
    <div className="relative w-full -z-20 shadow-xl rounded-t-md overflow-hidden aspect-video h-auto">
      <BlurImage
        src={url}
        alt={`Cover image for ${title}`}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        quality={60}
        className="rounded-t-md"
      />
    </div>
  )
}
export default CoverImage
