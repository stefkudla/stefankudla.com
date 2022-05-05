import { useRouter } from 'next/router'
import PageContainer from '../../components/PageContainer'
import PostBody from '../../components/PostBody'
import PostHeader from '../../components/PostHeader'
import { getAllPostsWithSlug, getPostAndMorePosts } from '@/lib/api'
import PostTitle from '../../components/PostTitle'
import Head from 'next/head'
import markdownToHtml from '@/lib/markdownToHtml'
import AlertPreview from '../../components/AlertPreview'
import PageNotFound from '../404'
import { PostTypes } from '../../types/post'

const Post: React.FC<PostTypes> = ({ post }) => {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <PageNotFound />
  }
  return (
    <PageContainer>
      {router.isFallback ? (
        <PostTitle>Loading…</PostTitle>
      ) : (
        <>
          <article className="border-b border-back-subtle py-8 mb-8">
            <Head>
              <title>{post.title}</title>
              <meta
                property="og:image"
                content={post.metadata.cover_image.imgix_url}
              />
              <meta name="description" content={post.metadata.excerpt} />
            </Head>
            {post.status === 'draft' ? (
              <AlertPreview preview={true} />
            ) : undefined}
            <PostHeader post={post} />
            <PostBody content={post.content} />
          </article>
        </>
      )}
    </PageContainer>
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
    paths: allPosts.map((post: { slug: string }) => `/posts/${post.slug}`),
    fallback: true,
  }
}
