import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import PostBody from '@/components/PostBody'
import PostHeader from '@/components/PostHeader'
import { getAllPostPaths, getSinglePost } from '@/lib/cosmic'
import AlertPreview from '@/components/AlertPreview'
import Author from '@/components/Author'
import TableOfContents from '@/components/TableOfContents'
import BlogLayout from '@/components/BlogLayout'
import SectionWrapper from '@/components/SectionWrapper'
import { postMetadata } from '@/lib/metadata'

type PageProps = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const allPosts = (await getAllPostPaths()) || []
  return allPosts.map((post: { slug: string }) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const { isEnabled: preview } = await draftMode()
  const post = await getSinglePost(slug, preview)

  if (!post?.slug) {
    return {}
  }

  return postMetadata({
    title: post.title,
    description: post.metadata.excerpt,
    canonical:
      post.metadata.canonical || `https://stefankudla.com/posts/${post.slug}`,
    imageUrl: post.metadata.cover_image.imgix_url,
  })
}

const Post = async ({ params }: PageProps) => {
  const { slug } = await params
  const { isEnabled: preview } = await draftMode()
  const post = await getSinglePost(slug, preview)

  if (!post?.slug) {
    notFound()
  }

  return (
    <BlogLayout>
      <SectionWrapper as="div" fullWidth>
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
