import Footer from './Footer'
import Header from './Header'
import { Meta } from './Meta'
import { motion, useScroll, useSpring } from 'framer-motion'
import cn from 'classnames'
import { nunitoSans } from '@/fonts'

type LayoutProps = {
  children: React.ReactNode
  router: {
    route: string
  }
}

const BlogLayout: React.FC<LayoutProps> = ({ children }) => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <>
      <Meta />
      <Header />
      <main
        className={cn(
          'font-sans flex flex-col min-h-screen m-auto mt-16 w-full',
          nunitoSans.variable
        )}
      >
        <motion.div
          className="fixed inset-0 h-2 dark:bg-yellow-300 bg-dark-blue-500 origin-top-left z-50"
          style={{ scaleX }}
        />
        {children}
      </main>
      <Footer />
    </>
  )
}
export default BlogLayout
