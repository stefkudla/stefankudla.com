import { useState } from 'react'
import PageContainer from '@/components/PageContainer'
import { getAllPosts } from '@/lib/api'
import PostList from '@/components/PostList'
import Head from 'next/head'

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

interface PostsProps {
  allPosts: [
    {
      metadata: {
        category: string
      }
    }
  ]
}

const Posts: React.FC<PostsProps> = ({ allPosts }) => {
  const [filterCategory, setFilterCategory] = useState('All')

  const filteredPosts: any = allPosts.filter(post => {
    return post.metadata.category === filterCategory
  })

  return (
    <PageContainer>
      <Head>
        <title>Posts | Stefan Kudla</title>
      </Head>
      <span className="flex justify-between items-center mb-8 ">
        <h1 className="text-4xl font-bold text-fore-primary">Posts</h1>
        <ul className="flex gap-x-4">
          {categories.map(category => (
            <li
              className={
                category.name === filterCategory
                  ? 'cursor-pointer font-bold filter--active transition'
                  : 'cursor-pointer hover:text-slate-500 transition'
              }
              onClick={() => setFilterCategory(category.name)}
              key={category.name}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </span>
      <PostList
        allPosts={filterCategory === 'All' ? allPosts : filteredPosts}
        bucketType="posts"
        home={false}
      />
    </PageContainer>
  )
}

export async function getStaticProps({ preview }: { preview: boolean }) {
  const allPosts = (await getAllPosts(preview, 'posts')) || []
  return {
    props: { allPosts },
  }
}
export default Posts
