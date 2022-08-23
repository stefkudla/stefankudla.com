import { useState } from 'react'
import { getAllPosts, getCosmicObject } from '@/lib/cosmic'
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
        title="Posts | Stefan Kudla"
        description="The blog posts of Stefan Kudla"
      />
      <h1 className="mb-6">Posts</h1>
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
  const allPostCategories =
    (await getCosmicObject('post-categories', 'title')) || []
  const allPosts = (await getAllPosts(preview, 'posts')) || []
  return {
    props: { allPosts, allPostCategories },
    revalidate: 180,
  }
}
export default Posts
