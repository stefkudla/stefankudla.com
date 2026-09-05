import { notFound } from 'next/navigation'
import MdxBody from '@/components/MdxBody'
import PostHeader from '@/components/PostHeader'
import { getAllPosts, getPost, type Post } from '@/lib/content'
import Author from '@/components/Author'
import TableOfContents from '@/components/TableOfContents'
import BlogLayout from '@/components/BlogLayout'
import SectionWrapper from '@/components/SectionWrapper'
import { postMetadata } from '@/lib/metadata'
import Breadcrumbs from '@/components/Breadcrumbs'
import { SITE_URL, type Crumb } from '@/lib/structured-data'
import { resolveImage } from '@/lib/images'
import { countHeadings, TOC_MIN_HEADINGS } from '@/lib/headings'

type PageProps = { params: Promise<{ slug: string }> }

/**
 * `PostHeader` still takes the Cosmic object shape. T-22 owns the remaining
 * Cosmic surfaces, so the adapter stays until the component itself moves.
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
  // Drafts render on request but are never prerendered, which is what keeps
  // them out of the sitemap on every environment. In production `getPost` also
  // refuses them, so the route 404s.
  return getAllPosts()
    .filter(post => !post.frontmatter.draft)
    .map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const local = getPost(slug)
  if (!local) return {}

  return postMetadata({
    title: local.frontmatter.title,
    description: local.frontmatter.excerpt,
    canonical:
      local.frontmatter.canonical || `https://stefankudla.com/posts/${slug}`,
    imageUrl: resolveImage(slug, local.frontmatter.cover).src,
  })
}

const Post = async ({ params }: PageProps) => {
  const { slug } = await params
  const post = getPost(slug)

  if (!post) {
    notFound()
  }

  // The table of contents is a client component that reads `h2`s out of the
  // DOM, so it cannot know whether it will be empty until after it mounts.
  // Deciding here instead keeps the empty panel out of the server HTML and out
  // of the flex row entirely, so the article closes up rather than sitting
  // beside a reserved gap.
  const showToc = countHeadings(post.body) >= TOC_MIN_HEADINGS

  const crumbs: Crumb[] = [
    { name: 'Home', href: '/' },
    { name: 'Posts', href: '/posts' },
    // Categories are a client-side filter on /posts, not a route, so the
    // post's category is deliberately not a crumb — it has no URL to link.
    { name: post.frontmatter.title },
  ]

  return (
    <BlogLayout>
      <SectionWrapper as="div" fullWidth>
        <article className="w-full">
          <div className="relative w-full flex">
            {showToc && <TableOfContents />}
            <div className="container mx-auto max-w-3xl px-4">
              <Breadcrumbs
                crumbs={crumbs}
                pageUrl={`${SITE_URL}/posts/${slug}`}
              />
              <PostHeader post={asCosmicShape(post)} />
              <MdxBody slug={post.slug} body={post.body} />
              <Author />
            </div>
          </div>
        </article>
      </SectionWrapper>
    </BlogLayout>
  )
}

export default Post
