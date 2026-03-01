import ReactMarkdown from 'react-markdown'
import { ReactNode } from 'react'
import BlurImage from './BlurImage'
import CodeBlock from './CodeBlock'
import rehypeSlug from 'rehype-slug'
import HashIcon from '@/components/icons/HashIcon'
import cn from 'classnames'

const components: object = {
  img: (image: { src: string; alt: string }) => {
    return (
      <BlurImage
        src={image.src}
        alt={image.alt}
        width={1200}
        height={900}
        quality={60}
        layout="responsive"
        objectFit="contain"
        objectPosition="center"
        className="aspect-video h-auto"
      />
    )
  },

  h2: (h2: { id: string; children: string }) => {
    return (
      <h2 id={h2.id} className="group">
        {h2.children}
        <a
          className={cn(
            'ml-2 opacity-0 group-hover:opacity-50 inline-block align-middle mb-1'
          )}
          href={`#${h2.id}`}
        >
          <HashIcon />
        </a>
      </h2>
    )
  },

  a: (a: { href: string; children: string }) => {
    return a.href.charAt(0) === '#' ? (
      <a href={a.href} className="hover:opacity-75 transition-opacity">
        {a.children}
      </a>
    ) : (
      <a
        href={a.href}
        rel="noopener noreferrer"
        target="_blank"
        className="hover:opacity-75 transition-opacity"
      >
        {a.children}
      </a>
    )
  },

  code({
    className,
    children,
    ...props
  }: {
    className?: string
    children: ReactNode
    [key: string]: unknown
  }) {
    return (
      <CodeBlock className={className} {...props}>
        {children}
      </CodeBlock>
    )
  },
}

const PostBody: React.FC<{ content: string }> = ({ content }) => {
  return (
    <div className="max-w-4xl mx-auto px-px py-4 md:px-8 md:py-8 md:custom-shadow-md md:bg-card-background md:border dark:border-gray-500 rounded-lg border-card-border">
      <div className="prose md:prose-lg prose-zinc prose-pre:bg-[#0C0C0E] dark:prose-invert">
        <ReactMarkdown
          components={components}
          rehypePlugins={[rehypeSlug]}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  )
}
export default PostBody
