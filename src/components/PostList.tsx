import React, { useEffect } from 'react'
import Date from './Date'
import Link from 'next/link'
import { ForwardArrowIcon } from './icons'
import { motion, AnimatePresence } from 'framer-motion'

interface PostsProps {
  allPosts: [
    {
      title: string
      slug: string
      created_at: string
      metadata: {
        excerpt: string
        published_date: string
      }
    }
  ]
  bucketType: string
  home?: boolean
}

const PostList: React.FC<PostsProps> = ({ allPosts, bucketType, home }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.24,
        transition: { ease: [0.17, 0.67, 0.83, 0.67] },
      },
    },
  }
  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
    exit: { opacity: 0 },
  }

  return (
    <AnimatePresence>
      <motion.ul
        variants={container}
        initial="hidden"
        animate="show"
        className={!home ? 'grid grid-cols-1 md:grid-cols-2 gap-8' : undefined}
      >
        {allPosts.map(post => (
          <motion.li
            variants={item}
            className={
              home
                ? 'py-5'
                : 'flex flex-col bg-white dark:bg-gray-800 rounded p-8 shadow-sm'
            }
            key={post.title}
          >
            <Link href={`/${bucketType}/${post.slug}`} scroll={false}>
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
                    {post.metadata.excerpt}
                  </p>
                </div>
                {home ? (
                  <Date
                    dateString={post.metadata.published_date || post.created_at}
                    formatStyle="LLLL, yyyy"
                  ></Date>
                ) : (
                  <p className="flex items-center text-fore-subtle text-sm">
                    Read more
                    <span className="group hidden group-hover:block ml-2">
                      <ForwardArrowIcon styles="text-lg text-fore-subtle group-hover:text-accent" />
                    </span>
                  </p>
                )}
              </a>
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </AnimatePresence>
  )
}
export default PostList
