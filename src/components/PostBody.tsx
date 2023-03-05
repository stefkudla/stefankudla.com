import markdownStyles from './markdown-styles.module.css'
import ReactMarkdown from 'react-markdown'
import { ReactNode } from 'react'
import BlurImage from './BlurImage'
import CodeBlock from './CodeBlock'
import remarkSlug from 'remark-slug'
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
    node,
    inline,
    className,
    children,
  }: {
    node: object
    inline: boolean
    className: string
    children: ReactNode
  }) {
    return (
      <CodeBlock node={node} inline={inline} className={className}>
        {children}
      </CodeBlock>
    )
  },
}

const PostBody: React.FC<{ content: string }> = ({ content }) => {
  return (
    <div className="max-w-4xl mx-auto px-3 md:px-8 py-8 rounded-b-md shadow-md bg-white dark:bg-back-secondary">
      <ReactMarkdown
        className={markdownStyles['markdown']}
        components={components}
        remarkPlugins={[remarkSlug]}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
export default PostBody
