import Date from './Date'
import CoverImage from './CoverImage'
import PostTitle from './PostTitle'
import { ExternalLinkIcon } from '@/configs/icons'
import { PostHeaderTypes } from '@/types/post'
import avatar from '../../public/images/avatar-july-2022-min.png'
import BlurImage from './BlurImage'
import Link from 'next/link'

const Separator = () => {
  return <span className="px-2 text-card-border">|</span>
}

const PostHeader: React.FC<PostHeaderTypes> = ({ post }) => {
  return (
    <div className="space-y-4 mb-6">
      <PostTitle>{post.title}</PostTitle>
      <div className="flex items-center">
        <div className="flex flex-wrap text-sm">
          <span className="font-oswald text-card-border uppercase font-semibold text-sm">
            <Date dateString={post.created_at} formatStyle="MMM dd, yyyy" />
          </span>
          <Separator />
          <span className="font-oswald text-card-border uppercase font-semibold text-sm">
            {post.metadata.category.title}
          </span>
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
  )
}
export default PostHeader
