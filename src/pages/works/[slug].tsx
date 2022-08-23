import { useRouter } from 'next/router'
import PostBody from '@/components/PostBody'
import PostHeader from '@/components/PostHeader'
import { getAllPostsWithSlug, getPostAndMorePosts } from '@/lib/cosmic'
import PostTitle from '@/components/PostTitle'
import AlertPreview from '@/components/AlertPreview'
import PageNotFound from '../404'
import { PostTypes } from '@/types/post'
import Loader from '@/components/Loader'
import { PostMeta } from '@/components/Meta'

const Post: React.FC<PostTypes> = ({ post }) => {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <PageNotFound />
  }
  return (
    <>
      {router.isFallback ? (
        <PostTitle>
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        </PostTitle>
      ) : (
        <>
          <PostMeta
            title={post.title}
            description={post.metadata.excerpt}
            slug={post.slug}
            page="works"
            imageUrl={post.metadata.cover_image.imgix_url}
          />
          <article className="border-b border-back-subtle py-8">
            {post.status === 'draft' && <AlertPreview />}
            <PostHeader post={post} />
            <PostBody content={post.metadata.content} />
          </article>
        </>
      )}
    </>
  )
}
export default Post

export async function getStaticProps({
  params,
  preview = null,
}: {
  params: { slug: string }
  preview?: boolean | null
}) {
  const data = await getPostAndMorePosts(params.slug, preview)

  return {
    props: {
      preview,
      post: {
        ...data.post,
      },
      morePosts: data.morePosts || [],
    },
  }
}

export async function getStaticPaths() {
  const allPosts = (await getAllPostsWithSlug()) || []
  return {
    paths: allPosts.map((post: { slug: string }) => `/works/${post.slug}`),
    fallback: true,
  }
}
