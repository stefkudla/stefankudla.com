import { useState } from 'react'
import PageContainer from '@/components/PageContainer'
import { getAllPosts, getAllCategories } from '@/lib/cosmic'
import { PostsTypes } from '@/types/post'
import PostList from '@/components/PostList'
import Head from 'next/head'

const Works: React.FC<PostsTypes> = ({ allPosts, allCategories }) => {
  const worksCategories = allCategories.filter(
    category => category.title === 'Freelance' || category.title === 'Personal'
  )
  const [filterCategory, setFilterCategory] = useState('All')

  const filteredPosts: any = allPosts.filter(
    work => work.metadata.category.title === filterCategory
  )

  return (
    <PageContainer>
      <Head>
        <title>Works | Stefan Kudla</title>
        <meta name="description" content="The works of Stefan Kudla" />
        <meta property="og:image" content="/images/stefan_kudla_ogImage.jpg" />
      </Head>
      <h1 className="text-2xl md:text-3xl text-fore-primary font-bold">
        Works
      </h1>
      <ul className="flex gap-x-4 my-4">
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
        {worksCategories.map(category => (
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
        bucketType="works"
        home={false}
      />
    </PageContainer>
  )
}

export async function getStaticProps({ preview }: { preview: boolean }) {
  const allPosts = (await getAllPosts(preview, 'works')) || []
  const allCategories = (await getAllCategories()) || []
  return {
    props: { allPosts, allCategories },
  }
}
export default Works
