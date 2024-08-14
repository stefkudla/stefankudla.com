import Date from './Date'
import Link from 'next/link'
import { PostListTypes } from '@/types/post'

const PostList: React.FC<PostListTypes> = ({ allPosts }) => {
  return (
    <ul className="grid grid-cols-1 w-full gap-4  max-w-screen-lg">
      {allPosts.map(post => (
        <li key={post.title} className="w-full md:w-auto">
          <Link
            href={`/posts/${post.slug}`}
            className={`h-full group bg-card-background px-5 py-8 w-full flex flex-col gap-y-8 rounded-lg border hover:border-accent border-card-border custom-shadow-md hover:custom-shadow-md-dark`}
          >
            <span className="font-oswald text-card-border uppercase font-semibold text-sm">
              {post.metadata.category.title}
            </span>
            <h2 className="text-2xl text-card-text font-bold group-hover:underline">
              {post.title}
            </h2>

            <span className="font-oswald text-card-border uppercase font-semibold text-sm">
              <Date dateString={post.created_at} formatStyle="MMM dd, yyyy" />
            </span>

            {post.status === 'draft' && (
              <span className="absolute right-1 top-1 bg-back-subtle px-3 py-1 rounded text-accent">
                Draft
              </span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  )
}
export default PostList
