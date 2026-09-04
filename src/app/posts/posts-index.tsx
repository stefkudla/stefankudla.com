'use client'

import { useState } from 'react'
import PostList from '@/components/PostList'
import CategoryFilter from '@/components/CategoryFilter'
import SectionWrapper from '@/components/SectionWrapper'
import { PostsTypes } from '@/types/post'

const PostsIndex: React.FC<PostsTypes> = ({ allPosts, allPostCategories }) => {
  const [filterCategory, setFilterCategory] = useState('All')

  const filteredPosts: any = allPosts.filter(post => {
    return post.metadata.category.title === filterCategory
  })

  return (
    <SectionWrapper classNames="!py-0 max-w-3xl self-stretch" innerPadding>
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
  )
}

export default PostsIndex
