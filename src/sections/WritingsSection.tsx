import React from 'react'
import PostList from '@/components/PostList'
import { PencilIcon } from '@/components/icons'

interface WritingsSectionProps {
  posts: []
}

const WritingsSection: React.FC<WritingsSectionProps> = ({ posts }) => {
  return (
    <section className="mt-24">
      <span className="flex items-center mb-8">
        <div className="bg-back-subtle p-2 mr-4 rounded-full">
          <PencilIcon />
        </div>
        <h2 className="text-xl text-accent font-semibold">Writings</h2>
      </span>
      <PostList allPosts={posts} />
    </section>
  )
}

export default WritingsSection
