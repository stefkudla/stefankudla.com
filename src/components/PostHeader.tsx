import Date from './Date'
import CoverImage from './CoverImage'
import PostTitle from './PostTitle'
import { ExternalLinkIcon } from '@/configs/icons'
import { PostHeaderTypes } from '@/types/post'
import avatar from '../../public/images/avatar-july-2022-min.png'
import BlurImage from './BlurImage'
import Link from 'next/link'

const Separator = () => {
  return <span className="px-2">|</span>
}

const PostHeader: React.FC<PostHeaderTypes> = ({ post }) => {
  return (
    <>
      <div className="mb-2 border-b-back-subtle border-b pb-4">
        <PostTitle>{post.title}</PostTitle>
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <Link href="/about">
              <a
                className="hover:opacity-75"
                title="Stefan Kudla"
                aria-label="Go to about author page"
              >
                <BlurImage
                  src={avatar}
                  width={80}
                  height={80}
                  alt="Stefan Kudla"
                  className="rounded-full"
                />
              </a>
            </Link>
          </div>
          <div className="flex flex-wrap ml-2 text-sm">
            <span>
              <Date dateString={post.created_at} formatStyle="LLLL dd, yyyy" />
            </span>
            <Separator />
            <span className="text-accent">{post.metadata.category.title}</span>
            {post.metadata.canonical && (
              <>
                <Separator />
                <span className="text-sm">
                  Originally published at{' '}
                  <a
                    className="text-accent hover:opacity-75"
                    href={post.metadata.canonical}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {new URL(post.metadata.canonical).hostname.replace(
                      'www.',
                      ''
                    )}
                  </a>
                </span>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between sm:items-center pb-8">
        <div className="sm:flex items-start gap-x-2">
          {post.metadata.live_url ? (
            <>
              <a
                href={post.metadata.live_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center text-accent hover:text-gray-500 text-sm w-fit my-2 md:my-0"
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
          ) : null}
        </div>
      </div>
      <CoverImage
        title={post.title}
        url={post.metadata.cover_image.imgix_url}
      />
    </>
  )
}
export default PostHeader
