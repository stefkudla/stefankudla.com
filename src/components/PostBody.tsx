import markdownStyles from './markdown-styles.module.css'
import ReactMarkdown from 'react-markdown'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import materialOceanic from 'react-syntax-highlighter/dist/cjs/styles/prism/material-oceanic'
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx'
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript'
import javascript from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript'
import markdown from 'react-syntax-highlighter/dist/cjs/languages/prism/markdown'
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json'
import Image from 'next/image'
import { ReactNode } from 'react'

SyntaxHighlighter.registerLanguage('tsx', tsx)
SyntaxHighlighter.registerLanguage('typescript', typescript)
SyntaxHighlighter.registerLanguage('javascript', javascript)
SyntaxHighlighter.registerLanguage('markdown', markdown)
SyntaxHighlighter.registerLanguage('json', json)

const components: object = {
  img: (image: { src: string; alt: string }) => {
    return (
      <Image
        src={image.src}
        alt={image.alt}
        width={380}
        height={300}
        quality={50}
        layout="responsive"
        objectFit="contain"
      />
    )
  },

  code({
    node,
    inline,
    className,
    children,
    ...props
  }: {
    node: object
    inline: boolean
    className: string
    children: ReactNode
  }) {
    const match = /language-(\w+)/.exec(className || '')
    return !inline && match ? (
      <SyntaxHighlighter
        style={materialOceanic}
        language={match[1]}
        showLineNumbers={true}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    )
  },
}

const PostBody: React.FC<{ content: string }> = ({ content }) => (
  <div className="max-w-2xl mx-auto">
    <ReactMarkdown
      className={markdownStyles['markdown']}
      components={components}
    >
      {content}
    </ReactMarkdown>
  </div>
)
export default PostBody
