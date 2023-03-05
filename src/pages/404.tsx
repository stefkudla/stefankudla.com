import React from 'react'
import Link from 'next/link'
import { HomeIcon } from '@/configs/icons'
import Layout from '@/components/Layout'
import { useRouter } from 'next/router'

const PageNotFound: React.VFC = () => {
  const router = useRouter()
  return (
    <Layout router={{ route: router.pathname }}>
      <div className="flex flex-col justify-center items-center pt-24">
        <h1 className="text-3xl mb-6">Page Not Found </h1>
        <Link href="/" className="flex items-center text-accent">
          <span className="mr-2">
            <HomeIcon />
          </span>
          Return Home
        </Link>
      </div>
    </Layout>
  )
}

export default PageNotFound
