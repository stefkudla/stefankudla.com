import PostList from '@/components/PostList'
import { PencilIcon } from '@/configs/icons'

interface WritingsSectionProps {
  posts: any
}

const WritingsSection: React.FC<WritingsSectionProps> = ({ posts }) => {
  return (
    <section className="mt-24">
      <span className="flex items-center mb-8">
        <div className="icon-border">
          <PencilIcon />
        </div>
        <h4 className="text-xl text-accent font-semibold">Posts</h4>
      </span>
      <PostList allPosts={posts} postType="posts" home={true} />
    </section>
  )
}

export default WritingsSection
