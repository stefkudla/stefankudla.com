import { MDXRemote } from 'next-mdx-remote/rsc'

/**
 * Renders repo-local MDX in the same prose wrapper `PostBody` gives Cosmic
 * markdown, so a local post and a Cosmic post look identical.
 *
 * No rehype plugins yet — syntax highlighting and heading anchors are T-13.
 */
const MdxBody: React.FC<{ body: string }> = ({ body }) => (
  <div className="max-w-4xl mx-auto px-px py-4 md:px-8 md:py-8 md:custom-shadow-md md:bg-card-background md:border dark:border-gray-500 rounded-lg border-card-border">
    <div className="prose md:prose-lg prose-zinc prose-pre:bg-[#0C0C0E] dark:prose-invert">
      <MDXRemote source={body} />
    </div>
  </div>
)

export default MdxBody
