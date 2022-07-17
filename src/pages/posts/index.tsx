import { useState } from 'react'
import { getAllPosts, getAllPostCategories } from '@/lib/cosmic'
import { PostsTypes } from '@/types/post'
import { PageMeta } from '@/components/Meta'
import PostList from '@/components/PostList'

const Posts: React.FC<PostsTypes> = ({ allPosts, allPostCategories }) => {
  const [filterCategory, setFilterCategory] = useState('All')

  const filteredPosts: any = allPosts.filter(post => {
    return post.metadata.category.title === filterCategory
  })

  return (
    <>
      {/* PostMeta component already includes next Head  */}
      <PageMeta
        title="Posts | Stefan Kudla"
        description="The blog posts of Stefan Kudla"
      />
      <h1 className="mb-6">Posts</h1>
      <ul className="flex flex-wrap gap-y-2 sm:gap-y-0 gap-x-4 my-4">
        <li
          className={
            'All' === filterCategory
              ? 'cursor-pointer font-bold filter--active transition'
              : 'cursor-pointer text-fore-subtle transition'
          }
          onClick={() => setFilterCategory('All')}
          key={'All'}
        >
          All
        </li>
        {allPostCategories.map(category => (
          <li
            className={
              category.title === filterCategory
                ? 'cursor-pointer font-bold filter--active transition'
                : 'cursor-pointer text-fore-subtle transition hover:text-accent'
            }
            onClick={() => setFilterCategory(category.title)}
            key={category.title}
          >
            {category.title}
          </li>
        ))}
      </ul>
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
  const allPosts = (await getAllPosts(preview, 'posts')) || []
  return {
    props: { allPosts, allPostCategories },
  }
}
export default Posts
