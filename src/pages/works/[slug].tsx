import { useRouter } from 'next/router'
import PostBody from '@/components/PostBody'
import PostHeader from '@/components/PostHeader'
import { getAllPostsWithSlug, getPostAndMorePosts } from '@/lib/cosmic'
import PostTitle from '@/components/PostTitle'
import Head from 'next/head'
import markdownToHtml from '@/lib/markdownToHtml'
import AlertPreview from '@/components/AlertPreview'
import PageNotFound from '../404'
import { PostTypes } from '@/types/post'
import Loader from '@/components/Loader'

const Post: React.FC<PostTypes> = ({ post }) => {
  const router = useRouter()
  console.log(router.pathname)
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
          <article className="border-b border-back-subtle py-8 mb-8">
            <Head>
              <title>{post.title}</title>
              <meta property="og:title" content={post.title} />
              <meta
                property="og:url"
                content={`https://stefankudla.com/works/${post.slug}`}
              />
              <meta property="og:type" content="article" />
              <meta
                property="og:image"
                content={post.metadata.cover_image.imgix_url}
              />
              <meta property="og:description" content={post.metadata.excerpt} />
              <meta
                property="og:image"
                content={post.metadata.cover_image.imgix_url}
              />
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:site" content="@stefankudla" />
              <meta name="twitter:title" content={post.title} />
              <meta
                name="twitter:description"
                content={post.metadata.excerpt}
              />
              <meta
                name="twitter:image"
                content={post.metadata.cover_image.imgix_url}
              />
            </Head>
            {post.status === 'draft' ? (
              <AlertPreview preview={true} />
            ) : undefined}
            <PostHeader post={post} />
            <PostBody content={post.content} />
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
  preview: boolean | null
}) {
  const data = await getPostAndMorePosts(params.slug, preview)
  const content = await markdownToHtml(data.post?.metadata?.content || '')

  return {
    props: {
      preview,
      post: {
        ...data.post,
        content,
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
