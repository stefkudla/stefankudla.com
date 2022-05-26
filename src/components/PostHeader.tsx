import Date from './Date'
import CoverImage from './CoverImage'
import PostTitle from './PostTitle'
import { ExternalLinkIcon } from '@/configs/icons'
import Image from 'next/image'

interface PostHeaderProps {
  post: {
    title: string
    metadata: {
      cover_image: {
        imgix_url: string
      }
      published_date?: string
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
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center relative">
          <Image
            src="/images/avatar_4.png"
            width={30}
            height={30}
            alt="Stefan Kudla"
            className="rounded-full"
          />
          <p className="ml-2 text-sm">
            Stefan Kudla |{' '}
            <Date
              dateString={post.metadata.published_date || post.created_at}
              formatStyle="LLLL dd, yyyy"
            />
          </p>
        </div>
        <p className="text-sm">{post.metadata.category}</p>
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage
          title={post.title}
          url={post.metadata.cover_image.imgix_url}
        />
      </div>
      <div className="flex flex-row justify-between sm:items-center pb-8 border-b">
        <div className="sm:flex items-center gap-x-2">
          {post.metadata.live_url ? (
            <>
              <a
                href={post.metadata.live_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center text-accent hover:text-gray-500 text-sm md:ml-4 w-fit"
              >
                Live Site
                <span>
                  <ExternalLinkIcon />
                </span>
              </a>

              <a
                href={post.metadata.repo_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center text-accent hover:text-gray-500 text-sm"
              >
                Github Repo
                <span>
                  <ExternalLinkIcon />
                </span>
              </a>
            </>
          ) : undefined}
        </div>
      </div>
    </>
  )
}
export default PostHeader
