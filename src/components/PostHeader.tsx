import Date from './Date'
import CoverImage from './CoverImage'
import PostTitle from './PostTitle'
import { BiLinkExternal } from 'react-icons/bi'

interface PostHeaderProps {
  post: {
    title: string
    metadata: {
      cover_image: {
        imgix_url: string
      }
      live_url?: string
      repo_url?: string
      category: string
    }
    created_at: string
  }
}

const PostHeader: React.FC<PostHeaderProps> = ({ post }) => {
  return (
    <>
      <PostTitle>{post.title}</PostTitle>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage
          title={post.title}
          url={post.metadata.cover_image.imgix_url}
        />
      </div>
      <div className="flex flex-row justify-between sm:items-center pb-8 border-b">
        <div className="sm:flex items-center gap-x-2">
          <Date dateString={post.created_at} formatStyle="LLLL dd, yyyy" />
          {post.metadata.live_url ? (
            <>
              <a
                href={post.metadata.live_url}
                target="_blank"
                className="flex items-center text-accent hover:text-gray-500 text-sm md:ml-4 w-fit"
              >
                Live Site
                <span>
                  <BiLinkExternal />
                </span>
              </a>

              <a
                href={post.metadata.repo_url}
                target="_blank"
                className="flex items-center text-accent hover:text-gray-500 text-sm"
              >
                Github Repo
                <span>
                  <BiLinkExternal />
                </span>
              </a>
            </>
          ) : undefined}
        </div>
        <p className="text-sm text-fore-subtle">{post.metadata.category}</p>
      </div>
    </>
  )
}
export default PostHeader
