import { useState } from 'react'
import { getAllPosts, getAllPostCategories } from '@/lib/cosmic'
import { PostsTypes } from '@/types/post'
import { PageMeta } from '@/components/Meta'
import PostList from '@/components/PostList'
import CategoryFilter from '@/components/CategoryFilter'
import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import SectionWrapper from '@/components/SectionWrapper'

const Posts: React.FC<PostsTypes> = ({ allPosts, allPostCategories }) => {
  const router = useRouter()
  const [filterCategory, setFilterCategory] = useState('All')

  const filteredPosts: any = allPosts.filter(post => {
    return post.metadata.category.title === filterCategory
  })

  return (
    <Layout router={{ route: router.pathname }}>
      <PageMeta
        title="Blog Posts | Stefan Kudla"
        description="Blog posts written by Stefan Kudla"
        url={router.basePath + router.pathname}
      />
      <SectionWrapper
        classNames="!py-0 bg-gradient-to-b from-back-primary via-back-subtle to-back-secondary"
        innerPadding
        fullWidth
      >
        <div className="max-w-screen-lg mx-auto flex flex-col items-start w-full text-start gap-y-6 py-20">
          <h1 className="font-oswald font-bold">Blog Posts</h1>
          <p className="text-lg max-w-sm text-fore-subtle font-bold">
            Technical articles, guides and blog posts written by{' '}
            <span className="text-accent">Stefan Kudla</span>
          </p>
          <div className="my-3"></div>
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
        </div>
      </SectionWrapper>
    </Layout>
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
