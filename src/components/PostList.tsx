import React from 'react'
import { Date } from './Date'
import Link from 'next/link'

const PostList = ({ allPosts }) => {
  return (
    <ul>
      {allPosts.map(post => (
        <li className="py-5" key={post.title}>
          <Link href={post.slug}>
            <a className="group flex items-center justify-between px-8 py-5 -my-5 -mx-7 hover:bg-back-subtle transition-colors border-b-2">
              <div className="max-w-lg">
                <h3 className="text-xl font-bold mb-1 group-hover:text-accent transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-fore-subtle">
                  {post.metadata.excerpt.slice(0, 100)}[...]
                </p>
              </div>
              <Date dateString={post.created_at}></Date>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default PostList
