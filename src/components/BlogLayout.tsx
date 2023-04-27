import Footer from './Footer'
import Header from './Header'
import { Meta } from './Meta'
import { motion, useScroll, useSpring } from 'framer-motion'
import cn from 'classnames'
import { nunitoSans, oswald } from '@/fonts'

type LayoutProps = {
  children: React.ReactNode
  router: {
    route: string
  }
}

const BlogLayout: React.FC<LayoutProps> = ({ children }) => {
  const { scrollYProgress } = useScroll()
  const scaleX = scrollYProgress

  return (
    <>
      <Meta />
      <Header />
      <main
        className={cn(
          'font-sans flex flex-col min-h-screen m-auto w-full',
          nunitoSans.variable,
          oswald.variable
        )}
      >
        <motion.div
          className="fixed inset-0 h-[2px] custom-shadow-lg-dark bg-accent origin-top-left z-50"
          style={{ scaleX }}
        />
        {children}
      </main>
      <Footer />
    </>
  )
}
export default BlogLayout
