import Date from './Date'
import CoverImage from './CoverImage'
import PostTitle from './PostTitle'

interface PostHeaderProps {
  title: string
  coverImage: string
  date: string
  category: string
}

const PostHeader: React.FC<PostHeaderProps> = ({
  title,
  coverImage,
  date,
  category,
}) => {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} url={coverImage.imgix_url} />
      </div>
      <div className="flex justify-between pb-8 border-b border-back-subtle">
        <Date dateString={date} formatStyle="LLLL dd, yyyy" />
        <p className="text-sm text-fore-subtle">{category}</p>
      </div>
    </>
  )
}
export default PostHeader
