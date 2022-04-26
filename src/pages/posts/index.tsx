import { useState } from 'react'
import PageContainer from '@/components/PageContainer'
import { getAllPostsForHome } from '@/lib/api'
import PostList from '@/components/PostList'

const categories = [
  {
    name: 'All',
  },
  {
    name: 'Perspective',
  },
  {
    name: 'Freelance',
  },
]

const Posts: React.VFC = ({ allPosts }: { allPosts: any }) => {
  const [filter, setFilter] = useState('All')

  const filteredPosts = allPosts.filter(
    post => post.metadata.category === filter
  )

  return (
    <PageContainer>
      <span className="flex justify-between items-center mb-8 ">
        <h1 className="text-4xl font-bold text-fore-primary">Posts</h1>
        <ul className="flex gap-x-4">
          {categories.map(category => (
            <li
              className={
                category.name === filter
                  ? 'cursor-pointer font-bold filter--active transition'
                  : 'cursor-pointer hover:text-slate-500 transition'
              }
              onClick={() => setFilter(category.name)}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </span>
      <PostList
        allPosts={filter === 'All' ? allPosts : filteredPosts}
        home={false}
      />
    </PageContainer>
  )
}

export async function getStaticProps({ preview }) {
  const allPosts = (await getAllPostsForHome(preview)) || []
  return {
    props: { allPosts },
  }
}
export default Posts
