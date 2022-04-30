import React from 'react'
import PostList from '@/components/PostList'
import { FlaskIcon } from '@/components/icons'
import Link from 'next/link'

interface ProjectsSectionProps {
  posts: any
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ posts }) => {
  return (
    <section className="mt-24">
      <span className="flex items-center mb-8">
        <div className="bg-back-subtle p-2 mr-4 rounded-full">
          <FlaskIcon />
        </div>
        <h2 className="text-xl text-accent font-semibold">Works</h2>
      </span>
      <PostList allPosts={posts} bucketType="works" home={true} />
    </section>
  )
}

export default ProjectsSection
