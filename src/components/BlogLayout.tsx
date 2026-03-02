import Footer from './Footer'
import { Meta } from './Meta'
import cn from 'classnames'
import { nunitoSans, oswald } from '@/fonts'

type LayoutProps = {
  children: React.ReactNode
  router: {
    route: string
  }
}

const BlogLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Meta />
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
