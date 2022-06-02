import { useState } from 'react'
import PageContainer from '@/components/PageContainer'
import { getAllPosts, getAllCategories } from '@/lib/cosmic'
import { PostsTypes } from '@/types/post'
import PostList from '@/components/PostList'
import Head from 'next/head'

const Posts: React.FC<PostsTypes> = ({ allPosts, allCategories }) => {
  const [filterCategory, setFilterCategory] = useState('All')

  const filteredPosts: any = allPosts.filter(post => {
    return post.metadata.category.title === filterCategory
  })

  return (
    <PageContainer>
      <Head>
        <title>Posts | Stefan Kudla</title>
        <meta name="description" content="Blog posts written by Stefan Kudla" />
        <meta property="og:image" content="/images/stefan_kudla_ogImage.jpg" />
      </Head>

      <h1 className="text-2xl md:text-3xl text-fore-primary font-bold">
        Posts
      </h1>
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
        {allCategories.map(category => (
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
        bucketType="posts"
        home={false}
      />
    </PageContainer>
  )
}

export async function getStaticProps({ preview }: { preview: boolean }) {
  const allCategories = (await getAllCategories()) || []
  const allPosts = (await getAllPosts(preview, 'posts')) || []
  return {
    props: { allPosts, allCategories },
    revalidate: 60,
  }
}
export default Posts
