import Link from 'next/link'
import { HomeIcon } from '@/configs/icons'
import Layout from '@/components/Layout'
import { useRouter } from 'next/router'

const PageNotFound = () => {
  const router = useRouter()
  return (
    <Layout router={{ route: router.pathname }} classNames="min-h-[60vh]">
      <div className="flex flex-col justify-start items-center pt-20">
        <h1 className="text-3xl mb-6">Page Not Found</h1>
        <Link
          href="/"
          className="flex items-center text-off-white bg-accent px-8 py-3 rounded-lg font-bold hover:opacity-75 transition-opacity"
        >
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
