import React from 'react'
import PostList from '@/components/PostList'
import { FlaskIcon } from '@/components/icons'
import Link from 'next/link'

interface ProjectsSectionProps {
  posts: []
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ posts }) => {
  return (
    <section className="mt-24">
      <span className="flex items-center mb-8">
        <div className="bg-back-subtle p-2 mr-4 rounded-full">
          <FlaskIcon />
        </div>
        <h2 className="text-xl text-accent font-semibold">Projects</h2>
      </span>
      <ul>
        <li className="py-5">
          <Link href={'/'}>
            <a className="group flex items-center justify-between px-8 py-5 -my-5 -mx-7 hover:bg-back-subtle transition-colors border-b-2">
              <div className="max-w-lg">
                <h3 className="text-xl font-bold mb-1 group-hover:text-accent transition-colors">
                  Example
                </h3>
                <p className="text-sm text-fore-subtle">[...]</p>
              </div>
              <p>2022</p>
            </a>
          </Link>
        </li>
        <li className="py-5">
          <Link href={'/'}>
            <a className="group flex items-center justify-between px-8 py-5 -my-5 -mx-7 hover:bg-back-subtle transition-colors border-b-2">
              <div className="max-w-lg">
                <h3 className="text-xl font-bold mb-1 group-hover:text-accent transition-colors">
                  Example
                </h3>
                <p className="text-sm text-fore-subtle">[...]</p>
              </div>
              <p>2022</p>
            </a>
          </Link>
        </li>
        <li className="py-5">
          <Link href={'/'}>
            <a className="group flex items-center justify-between px-8 py-5 -my-5 -mx-7 hover:bg-back-subtle transition-colors border-b-2">
              <div className="max-w-lg">
                <h3 className="text-xl font-bold mb-1 group-hover:text-accent transition-colors">
                  Example
                </h3>
                <p className="text-sm text-fore-subtle">[...]</p>
              </div>
              <p>2022</p>
            </a>
          </Link>
        </li>
        <li className="py-5">
          <Link href={'/'}>
            <a className="group flex items-center justify-between px-8 py-5 -my-5 -mx-7 hover:bg-back-subtle transition-colors border-b-2">
              <div className="max-w-lg">
                <h3 className="text-xl font-bold mb-1 group-hover:text-accent transition-colors">
                  Example
                </h3>
                <p className="text-sm text-fore-subtle">[...]</p>
              </div>
              <p>2022</p>
            </a>
          </Link>
          {posts}
        </li>
      </ul>
    </section>
  )
}

export default ProjectsSection
