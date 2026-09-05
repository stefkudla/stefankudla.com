import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeSlug from 'rehype-slug'
import rehypePrettyCode from 'rehype-pretty-code'
import PostHeading from './PostHeading'
import MdxImage from './MdxImage'
import { codeTheme } from '@/lib/code-theme'
import rehypeUnwrapVideos from '@/lib/rehype-unwrap-videos'

/**
 * Renders repo-local MDX in the same prose wrapper `PostBody` gives Cosmic
 * markdown, so a local post and a Cosmic post look identical.
 *
 * Shiki runs at build time, so highlighted code is in the server HTML and
 * ships no client JS. Heading anchors come from `rehype-slug` plus the shared
 * `PostHeading` — the same markup `PostBody` produces, which is why
 * `rehype-autolink-headings` isn't needed.
 */
const MdxBody: React.FC<{ slug: string; body: string }> = ({ slug, body }) => (
  <div className="max-w-4xl mx-auto px-px py-4 md:px-8 md:py-8 md:custom-shadow-md md:bg-card-background md:border dark:border-gray-500 rounded-lg border-card-border">
    <div className="prose md:prose-lg prose-zinc prose-pre:bg-[#0C0C0E] dark:prose-invert">
      <MDXRemote
        source={body}
        components={{
          // `any` on purpose: `formik` drags in a second copy of
          // `@types/react`, so this map is typed against a different React
          // than ours and no honest prop type satisfies both.
          h2: (props: any) => (
            <PostHeading id={props.id ?? ''}>{props.children}</PostHeading>
          ),
          img: (props: any) => (
            <MdxImage slug={slug} src={props.src} alt={props.alt} />
          ),
        }}
        options={{
          mdxOptions: {
            rehypePlugins: [
              rehypeSlug,
              rehypeUnwrapVideos,
              [
                rehypePrettyCode,
                {
                  theme: codeTheme,
                  keepBackground: true,
                },
              ],
            ],
          },
        }}
      />
    </div>
  </div>
)

export default MdxBody
