import PostList from '@/components/PostList'
import { PencilIcon } from '@/configs/icons'
import Link from 'next/link'

interface WritingsSectionProps {
  posts: any
}

const WritingsSection: React.FC<WritingsSectionProps> = ({ posts }) => {
  return (
    <section className="mt-24">
      <span className="flex items-center mb-8">
        <div className="bg-back-subtle p-2 mr-4 rounded-full">
          <PencilIcon />
        </div>
        <Link href="/posts" scroll={false}>
          <h4 className="text-xl text-accent font-semibold cursor-pointer hover:opacity-70 transition-opacity">
            Posts
          </h4>
        </Link>
      </span>
      <PostList allPosts={posts} bucketType="posts" home={true} />
    </section>
  )
}

export default WritingsSection
