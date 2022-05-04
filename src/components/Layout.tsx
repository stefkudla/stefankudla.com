import React from 'react'
import Footer from './Footer'
import Meta from './Meta'
import Header from './Header'
import { motion, AnimatePresence } from 'framer-motion'
import 'lazysizes'
import 'lazysizes/plugins/parent-fit/ls.parent-fit'

interface LayoutProps {
  children: React.ReactNode
  router: {
    route: string
  }
}

const Layout = ({ children, router }: LayoutProps) => {
  const variants = {
    hidden: { opacity: 0, x: 0, y: 10 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: -0, y: 0 },
  }

  return (
    <>
      <Meta />
      <Header />
      <AnimatePresence
        exitBeforeEnter
        initial={true}
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <motion.div
          key={router.route}
          variants={variants}
          initial="hidden"
          animate="enter"
          exit="exit"
          transition={{ duration: 0.4, type: 'easeInOut' }}
        >
          <div className="flex flex-col min-h-screen">
            <div className="container flex-grow max-w-screen-lg px-5 m-auto mt-16 sm:px-12 md:px-20">
              {children}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <Footer />
    </>
  )
}
export default Layout
