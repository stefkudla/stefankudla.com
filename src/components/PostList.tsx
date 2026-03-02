import Date from './Date'
import Link from 'next/link'
import { PostListTypes } from '@/types/post'
import { GlowingEffect } from '@/components/ui/glowing-effect'

const PostList: React.FC<PostListTypes> = ({ allPosts }) => {
  return (
    <ul className="grid grid-cols-1 w-full gap-3 md:gap-4 max-w-screen-lg overflow-hidden">
      {allPosts.map(post => (
        <li key={post.title} className="list-none w-full min-w-0">
          <Link
            href={`/posts/${post.slug}`}
            className="relative block h-full rounded-xl md:rounded-2xl border border-transparent p-1.5 md:p-2 group"
          >
            <GlowingEffect
              spread={40}
              glow
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
            />
            <div className="relative flex h-full flex-col gap-y-2 md:gap-y-6 overflow-hidden rounded-lg md:rounded-xl bg-card-background px-4 py-4 md:px-5 md:py-8">
              <div className="flex items-center justify-between">
                <span className="font-oswald text-card-border uppercase font-semibold text-xs md:text-sm">
                  {post.metadata.category.title}
                </span>
                <span className="font-oswald text-card-border uppercase font-semibold text-xs md:text-sm">
                  <Date dateString={post.created_at} formatStyle="MMM dd, yyyy" />
                </span>
              </div>
              <h2 className="text-lg md:text-2xl text-card-text font-bold group-hover:underline">
                {post.title}
              </h2>

              {post.status === 'draft' && (
                <span className="absolute right-2 top-2 bg-back-subtle px-2 py-0.5 rounded text-xs text-accent">
                  Draft
                </span>
              )}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
export default PostList
