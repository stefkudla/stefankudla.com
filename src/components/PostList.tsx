import Date from './Date'
import Link from 'next/link'
import { ForwardArrowIcon } from '@/configs/icons'
import { motion, AnimatePresence } from 'framer-motion'
import { PostListTypes } from '@/types/post'

const postContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.24,
      transition: { ease: [0.17, 0.67, 0.83, 0.67] },
    },
  },
}

const postItem = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
  exit: { opacity: 0 },
}

const PostList: React.FC<PostListTypes> = ({ allPosts, bucketType, home }) => (
  <>
    <AnimatePresence>
      <motion.ul
        variants={postContainer}
        initial="hidden"
        animate="show"
        className={!home ? 'grid grid-cols-1 md:grid-cols-2 gap-8' : undefined}
      >
        {allPosts.map(post => (
          <motion.li
            variants={postItem}
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
                    ? 'group flex flex-col lg:flex-row lg:items-center lg:justify-between px-8 py-5 -my-5 -mx-7 hover:bg-back-subtle transition-colors border-b-2'
                    : 'group flex flex-col justify-center gap-y-6'
                }
              >
                <div className="max-w-lg">
                  <h3 className="text-xl font-bold mb-1 group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-fore-subtle mb-3 lg:mb-0 lg:pr-6">
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
                      <ForwardArrowIcon />
                    </span>
                  </p>
                )}
              </a>
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </AnimatePresence>
  </>
)
export default PostList
