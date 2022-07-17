import { useState } from 'react'
import { getAllPosts, getAllWorkCategories } from '@/lib/cosmic'
import { WorksTypes } from '@/types/post'
import PostList from '@/components/PostList'
import { PageMeta } from '@/components/Meta'
import CategoryFilter from '@/components/CategoryFilter'

const Works: React.FC<WorksTypes> = ({ allPosts, allWorkCategories }) => {
  const [filterCategory, setFilterCategory] = useState('All')

  const filteredPosts: any = allPosts.filter(
    work => work.metadata.category.title === filterCategory
  )

  return (
    <>
      <PageMeta
        title="Works | Stefan Kudla"
        description="The works of Stefan Kudla"
      />
      <h1>Works</h1>
      <CategoryFilter
        categories={allWorkCategories}
        handleSelection={setFilterCategory}
        selected={filterCategory}
      />
      <PostList
        allPosts={filterCategory === 'All' ? allPosts : filteredPosts}
        postType="works"
        home={false}
      />
    </>
  )
}

export async function getStaticProps({ preview }: { preview: boolean }) {
  const allPosts = (await getAllPosts(preview, 'works')) || []
  const allWorkCategories = (await getAllWorkCategories()) || []
  return {
    props: { allPosts, allWorkCategories },
  }
}
export default Works
