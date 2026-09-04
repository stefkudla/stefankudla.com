import Footer from './Footer'
import cn from 'classnames'
import { nunitoSans, oswald } from '@/fonts'

type LayoutProps = {
  children: React.ReactNode
}

const BlogLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <main
        className={cn(
          'font-sans flex flex-col min-h-screen m-auto w-full pt-6 pb-24',
          nunitoSans.variable,
          oswald.variable
        )}
      >
        {children}
      </main>
      <Footer />
    </>
  )
}
export default BlogLayout
