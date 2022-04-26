import Avatar from './avatar'
import Date from './Date'
import CoverImage from './CoverImage'
import Link from 'next/link'

const PostPreview = ({ title, coverImage, date, excerpt, slug }) => {
  console.log(
    typeof title,
    typeof coverImage,
    typeof date,
    typeof excerpt,
    typeof slug
  )
  return (
    <div>
      <div className="mb-5">
        <CoverImage slug={slug} title={title} url={coverImage.imgix_url} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link href={`/posts/${slug}`}>
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <Date dateString={date} />
      </div>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
    </div>
  )
}
export default PostPreview
