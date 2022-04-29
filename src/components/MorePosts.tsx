import PostPreview from './PostPreview'

interface PostProps {
  slug: string
  title: string
  metadata: {
    excerpt: string
  }
  created_at: string
  date: string
}

const MorePosts: React.FC = ({ posts }: any) => {
  console.log(posts)
  return (
    <section>
      <h2 className="mb-8 text-xl font-bold tracking-tighter leading-tight">
        More Stories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {posts.map((post: PostProps) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            date={post.created_at}
            slug={post.slug}
            excerpt={post.metadata.excerpt}
          />
        ))}
      </div>
    </section>
  )
}
export default MorePosts
