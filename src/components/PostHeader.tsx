import Avatar from './avatar'
import Date from './Date'
import CoverImage from './CoverImage'
import PostTitle from './PostTitle'

const PostHeader = ({ title, coverImage, date }) => {
  console.log(typeof title)
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} url={coverImage.imgix_url} />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 text-lg">
          <Date dateString={date} />
        </div>
      </div>
    </>
  )
}
export default PostHeader
