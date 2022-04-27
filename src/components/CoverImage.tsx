import Imgix from 'react-imgix'

interface CoverImageProps {
  title: string
  url: string
}

const CoverImage: React.FC<CoverImageProps> = ({ title, url }) => {
  return (
    <Imgix
      src={url}
      alt={`Cover Image for ${title}`}
      className="lazyload shadow-small w-full
        hover:shadow-medium transition-shadow duration-200"
      sizes="100vw"
      attributeConfig={{
        src: 'data-src',
        srcSet: 'data-srcset',
        sizes: 'data-sizes',
      }}
      htmlAttributes={{
        src: `${url}?auto=format,compress&q=1&blur=500&w=auto`,
      }}
    />
  )
}
export default CoverImage
