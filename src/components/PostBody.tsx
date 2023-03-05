import markdownStyles from './markdown-styles.module.css'
import ReactMarkdown from 'react-markdown'
import { ReactNode } from 'react'
import BlurImage from './BlurImage'
import CodeBlock from './CodeBlock'
import remarkSlug from 'remark-slug'

const components: object = {
  img: (image: { src: string; alt: string }) => {
    return (
      <BlurImage
        src={image.src}
        alt={image.alt}
        width={400}
        height={300}
        quality={50}
        layout="responsive"
        objectFit="contain"
        objectPosition="center"
      />
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
