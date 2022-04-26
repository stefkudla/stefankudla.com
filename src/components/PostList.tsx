import React from 'react'
import Date from './Date'
import Link from 'next/link'
import { ForwardArrowIcon } from './icons'

interface PostProps {
  allPosts: any
  home?: boolean
}

const PostList: React.FC<PostProps> = ({ allPosts, home }) => {
  return (
    <ul className={!home && 'grid grid-cols-1 md:grid-cols-2 gap-8'}>
      {allPosts.map(post => (
        <li
          className={
            home
              ? 'py-5'
              : 'flex flex-col bg-white dark:bg-gray-800 rounded p-8'
          }
          key={post.title}
        >
          <Link href={`/posts/${post.slug}`}>
            <a
              className={
                home
                  ? 'group flex items-center justify-between px-8 py-5 -my-5 -mx-7 hover:bg-back-subtle transition-colors border-b-2'
                  : 'group flex flex-col justify-center gap-y-6'
              }
            >
              <div className="max-w-lg">
                <h3 className="text-xl font-bold mb-1 group-hover:text-accent transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-fore-subtle">
                  {post.metadata.excerpt.slice(0, 100)}[...]
                </p>
              </div>
              {home ? (
                <Date dateString={post.created_at}></Date>
              ) : (
                <p className="flex items-center text-fore-subtle text-sm transition">
                  Read more
                  <span className="group hidden group-hover:block ml-2 transition">
                    <ForwardArrowIcon styles="text-lg text-fore-subtle" />
                  </span>
                </p>
              )}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default PostList
