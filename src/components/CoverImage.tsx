import Image from 'next/image'

const CoverImage: React.FC<{ title: string; url: string }> = ({
  title,
  url,
}) => {
  return (
    <div className="relative w-full pb-[80%]">
      <Image
        src={url}
        quality={60}
        alt={`Cover image for ${title}`}
        layout="fill"
        objectFit="contain"
        placeholder="blur"
        blurDataURL={`${url}?auto=format,compress&q=1&blur=500&w=300`}
      />
    </div>
  )
}
export default CoverImage
