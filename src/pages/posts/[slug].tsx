import { useRouter } from 'next/router'
import PostBody from '@/components/PostBody'
import PostHeader from '@/components/PostHeader'
import { getAllPostPaths, getSinglePost } from '@/lib/cosmic'
import AlertPreview from '@/components/AlertPreview'
import PageNotFound from '../404'
import { PostTypes } from '@/types/post'
import { PostMeta } from '@/components/Meta'
import Loader from '@/components/Loader'
import Author from '@/components/Author'

const Post: React.FC<PostTypes> = ({ post }) => {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <PageNotFound />
  }
  return (
    <>
      {router.isFallback ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <>
          <PostMeta
            title={post.title}
            description={post.metadata.excerpt}
            slug={post.slug}
            page="posts"
            imageUrl={post.metadata.cover_image.imgix_url}
            canonical={post.metadata.canonical}
          />
          <article className="border-b border-back-subtle py-8">
            {post.status === 'draft' && <AlertPreview />}
            <PostHeader post={post} />
            <PostBody content={post.metadata.content} />
            <Author />
          </article>
        </>
      )}
    </>
  )
}
export default Post

export async function getStaticPaths() {
  const allPosts = (await getAllPostPaths()) || []
  return {
    paths: allPosts.map((post: { slug: string }) => `/posts/${post.slug}`),
    fallback: true,
  }
}

export async function getStaticProps({
  params,
  preview = null,
}: {
  params: { slug: string }
  preview?: boolean | null
}) {
  const data = await getSinglePost(params.slug, preview)

  return {
    props: {
      post: data,
      preview,
    },
  }
}
