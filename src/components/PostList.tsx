import Date from './Date'
import Link from 'next/link'
import { ForwardArrowIcon } from '@/configs/icons'
import { PostListTypes } from '@/types/post'

const PostList: React.FC<PostListTypes> = ({ allPosts, postType, home }) => {
  return (
    <>
      <ul className={!home ? 'grid grid-cols-1 md:grid-cols-2 gap-8' : ''}>
        {allPosts.map(post => (
          <li
            className={
              home
                ? 'py-5'
                : 'flex flex-col bg-white dark:bg-gray-800 rounded-md shadow-md hover:shadow-lg dark:shadow-accent transition-all relative'
            }
            key={post.title}
          >
            <Link href={`/${postType}/${post.slug}`}>
              <a className={home ? 'group post-card-home' : 'group post-card'}>
                <div className="max-w-2xl">
                  <h2 className="text-xl font-bold mb-1 group-hover:text-accent transition-colors">
                    {post.title}
                    {post.status === 'draft' && home && (
                      <span className="text-fore-subtle ml-2">
                        {' '}
                        &#40;Draft&#41;
                      </span>
                    )}
                  </h2>
                  <p className="text-fore-subtle mb-3 lg:mb-0">
                    {post.metadata.excerpt}
                  </p>
                </div>
                {home ? (
                  <Date
                    dateString={post.created_at}
                    formatStyle="LLLL, yyyy"
                  ></Date>
                ) : (
                  <p className="flex items-center text-fore-subtle text-sm">
                    Read more
                    <span className="group hidden group-hover:block ml-2">
                      <ForwardArrowIcon />
                    </span>
                    {post.status === 'draft' && (
                      <span className="absolute right-1 top-1 bg-back-subtle px-3 py-1 rounded text-accent">
                        Draft
                      </span>
                    )}
                  </p>
                )}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
export default PostList
