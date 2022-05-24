import PostList from '@/components/PostList'
import { PencilIcon } from '@/configs/icons'

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
        <h4 className="text-xl text-accent font-semibold">Posts</h4>
      </span>
      <PostList allPosts={posts} bucketType="posts" home={true} />
    </section>
  )
}

export default WritingsSection
