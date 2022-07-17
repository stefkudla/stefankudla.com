import { useState } from 'react'
import { getAllPosts, getAllWorkCategories } from '@/lib/cosmic'
import { WorksTypes } from '@/types/post'
import PostList from '@/components/PostList'
import { PageMeta } from '@/components/Meta'

const Works: React.FC<WorksTypes> = ({ allPosts, allWorkCategories }) => {
  const [filterCategory, setFilterCategory] = useState('All')

  const filteredPosts: any = allPosts.filter(
    work => work.metadata.category.title === filterCategory
  )

  return (
    <>
      {/* PostMeta component already includes next/Head  */}
      <PageMeta
        title="Works | Stefan Kudla"
        description="The works of Stefan Kudla"
      />
      <h1>Works</h1>
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
        {allWorkCategories.map(category => (
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
