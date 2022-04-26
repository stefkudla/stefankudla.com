import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import PageContainer from '../../components/PageContainer'
import PostBody from '../../components/PostBody'
import MorePosts from '../../components/MorePosts'
import PostHeader from '../../components/PostHeader'
import { getAllPostsWithSlug, getPostAndMorePosts } from '@/lib/api'
import PostTitle from '../../components/PostTitle'
import Head from 'next/head'
import { CMS_NAME } from '@/lib/constants'
import markdownToHtml from '@/lib/markdownToHtml'

export default function Post({ post, morePosts, preview }) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
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
            </Head>
            <PostHeader
              title={post.title}
              coverImage={post.metadata.cover_image}
              date={post.created_at}
            />
            <PostBody content={post.content} />
          </article>
        </>
      )}
    </PageContainer>
  )
}

export async function getStaticProps({ params, preview = null }) {
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
    paths: allPosts.map(post => `/posts/${post.slug}`),
    fallback: true,
  }
}
