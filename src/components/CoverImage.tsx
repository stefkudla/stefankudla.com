import Image from 'next/image'

const CoverImage: React.FC<{ title: string; url: string }> = ({
  title,
  url,
}) => {
  return (
    <div className="relative w-full pb-[80%] md:pb-[70%] -z-20 border-back-subtle border border-b-0 shadow-lg rounded-t-md">
      <Image
        src={url}
        quality={60}
        alt={`Cover image for ${title}`}
        layout="fill"
        objectFit="cover"
        placeholder="blur"
        blurDataURL={`${url}?auto=format,compress&q=1&blur=500&w=2`}
        priority
        className="rounded-t-md"
      />
    </div>
  )
}
export default CoverImage
