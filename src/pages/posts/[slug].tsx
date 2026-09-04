import { useRouter } from 'next/router'
import PostBody from '@/components/PostBody'
import PostHeader from '@/components/PostHeader'
import { getAllPostPaths, getSinglePost } from '@/lib/cosmic'
import AlertPreview from '@/components/AlertPreview'
import { PostTypes } from '@/types/post'
import { PostMeta } from '@/components/Meta'
import Author from '@/components/Author'
import TableOfContents from '@/components/TableOfContents'
import BlogLayout from '@/components/BlogLayout'
import SectionWrapper from '@/components/SectionWrapper'

const Post: React.FC<PostTypes> = ({ post }) => {
  const router = useRouter()
  return (
    <BlogLayout router={{ route: router.pathname }}>
      <SectionWrapper as="div" fullWidth>
        <PostMeta
          title={post.title}
          description={post.metadata.excerpt}
          slug={post.slug}
          page="posts"
          imageUrl={post.metadata.cover_image.imgix_url}
          canonical={
            post.metadata.canonical ||
            `https://stefankudla.com/posts/${post.slug}`
          }
        />
        <article className="w-full">
          {post.status === 'draft' && <AlertPreview />}
          <div className="relative w-full flex">
            <TableOfContents />
            <div className="container mx-auto max-w-3xl px-4">
              <PostHeader post={post} />
              <PostBody content={post.metadata.content} />
              <Author />
            </div>
          </div>
        </article>
      </SectionWrapper>
    </BlogLayout>
  )
}

export default Post

export async function getStaticPaths() {
  const allPosts = (await getAllPostPaths()) || []
  return {
    paths: allPosts.map((post: { slug: string }) => `/posts/${post.slug}`),
    fallback: 'blocking',
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

  if (!data?.slug) {
    return { notFound: true, revalidate: 180 }
  }

  return {
    props: {
      post: data,
      preview,
    },
  }
}
