import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import PostBody from '@/components/PostBody'
import MdxBody from '@/components/MdxBody'
import PostHeader from '@/components/PostHeader'
import { getAllPostPaths, getSinglePost } from '@/lib/cosmic'
import { getAllPosts, getPost, type Post } from '@/lib/content'
import AlertPreview from '@/components/AlertPreview'
import Author from '@/components/Author'
import TableOfContents from '@/components/TableOfContents'
import BlogLayout from '@/components/BlogLayout'
import SectionWrapper from '@/components/SectionWrapper'
import { postMetadata } from '@/lib/metadata'
import { resolveImage } from '@/lib/images'

type PageProps = { params: Promise<{ slug: string }> }

/**
 * A repo-local post rendered through the components that still expect the
 * Cosmic object shape. This adapter is the bridge T-20 crosses: once all 11
 * posts are local, the Cosmic branch below goes away and so does this.
 */
const asCosmicShape = (post: Post) => ({
  title: post.frontmatter.title,
  created_at: post.frontmatter.date,
  metadata: {
    cover_image: {
      imgix_url: resolveImage(post.slug, post.frontmatter.cover).src,
    },
    category: { title: post.frontmatter.category },
  },
})

export async function generateStaticParams() {
  const cosmicPosts = (await getAllPostPaths()) || []
  const slugs = new Set<string>(
    cosmicPosts.map((post: { slug: string }) => post.slug)
  )

  // Drafts render on request but are never prerendered, which is what keeps
  // them out of the sitemap on every environment. In production `getPost` also
  // refuses them, so the route 404s.
  for (const post of getAllPosts()) {
    if (!post.frontmatter.draft) slugs.add(post.slug)
  }

  return [...slugs].map(slug => ({ slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params

  const local = getPost(slug)
  if (local) {
    return postMetadata({
      title: local.frontmatter.title,
      description: local.frontmatter.excerpt,
      canonical:
        local.frontmatter.canonical || `https://stefankudla.com/posts/${slug}`,
      imageUrl: resolveImage(slug, local.frontmatter.cover).src,
    })
  }

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
  const local = getPost(slug)
  const { isEnabled: preview } = await draftMode()
  const post = local ? null : await getSinglePost(slug, preview)

  if (!local && !post?.slug) {
    notFound()
  }

  return (
    <BlogLayout>
      <SectionWrapper as="div" fullWidth>
        <article className="w-full">
          {post?.status === 'draft' && <AlertPreview />}
          <div className="relative w-full flex">
            <TableOfContents />
            <div className="container mx-auto max-w-3xl px-4">
              {local ? (
                <>
                  <PostHeader post={asCosmicShape(local)} />
                  <MdxBody slug={local.slug} body={local.body} />
                </>
              ) : (
                <>
                  <PostHeader post={post} />
                  <PostBody content={post.metadata.content} />
                </>
              )}
              <Author />
            </div>
          </div>
        </article>
      </SectionWrapper>
    </BlogLayout>
  )
}

export default Post
