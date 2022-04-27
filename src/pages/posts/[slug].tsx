import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import PageContainer from '../../components/PageContainer'
import PostBody from '../../components/PostBody'
import PostHeader from '../../components/PostHeader'
import { getAllPostsWithSlug, getPostAndMorePosts } from '@/lib/api'
import PostTitle from '../../components/PostTitle'
import Head from 'next/head'
import markdownToHtml from '@/lib/markdownToHtml'
import AlertPreview from '../../components/AlertPreview'

interface PostTypes {
  post: {
    slug: string
    title: string
    status: string
    metadata: {
      cover_image: {
        imgix_url: string
      }
      published_date: string
      created_at: string
      category: string
    }
    content: string
    created_at: string
  }
}

const Post: React.FC<PostTypes> = ({ post }) => {
  console.log(typeof post)
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
            {post.status === 'draft' ? (
              <AlertPreview preview={true} />
            ) : undefined}
            <PostHeader
              title={post.title}
              coverImage={post.metadata.cover_image}
              date={post.metadata.published_date || post.created_at}
              category={post.metadata.category}
            />
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
