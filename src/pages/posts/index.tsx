import { useState } from 'react'
import { getAllPosts, getAllPostCategories } from '@/lib/cosmic'
import { PostsTypes } from '@/types/post'
import { PageMeta } from '@/components/Meta'
import PostList from '@/components/PostList'
import CategoryFilter from '@/components/CategoryFilter'

const Posts: React.FC<PostsTypes> = ({ allPosts, allPostCategories }) => {
  const [filterCategory, setFilterCategory] = useState('All')

  const filteredPosts: any = allPosts.filter(post => {
    return post.metadata.category.title === filterCategory
  })

  return (
    <>
      <PageMeta
        title="Blog Posts | Stefan Kudla"
        description="Blog posts written by Stefan Kudla"
        url="https://stefankudla.com/posts"
      />
      <h1 className="mb-6">Blog Posts</h1>
      <h2 className="text-lg">
        Technical articles, guides and blog posts written by Stefan Kudla
      </h2>
      <CategoryFilter
        categories={allPostCategories}
        handleSelection={setFilterCategory}
        selected={filterCategory}
      />
      <PostList
        allPosts={filterCategory === 'All' ? allPosts : filteredPosts}
        postType="posts"
        home={false}
      />
    </>
  )
}

export async function getStaticProps({ preview }: { preview: boolean }) {
  const allPostCategories = (await getAllPostCategories()) || []
  const allPosts = (await getAllPosts(preview)) || []
  return {
    props: { allPosts, allPostCategories },
    revalidate: 180,
  }
}
export default Posts
