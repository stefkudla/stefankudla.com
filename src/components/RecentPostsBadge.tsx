"use client"

import { useState } from 'react'
import useSWR from 'swr'
import Link from 'next/link'
import { Folder } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { ImagesBadge } from '@/components/ui/images-badge'
import fetcher from '@/lib/fetcher'

interface RecentPost {
  title: string
  slug: string
  metadata: {
    cover_image?: { imgix_url: string }
    excerpt: string
  }
  created_at: string
}

interface RecentPostsResponse {
  posts: RecentPost[]
}

const PLACEHOLDER_IMAGE =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="48" height="32" fill="%23334155"%3E%3Crect width="48" height="32" rx="4"/%3E%3C/svg%3E'

const RecentPostsBadge: React.FC = () => {
  const [hovered, setHovered] = useState(false)
  const { data } = useSWR<RecentPostsResponse>(
    '/api/recent-posts',
    fetcher,
    { revalidateOnFocus: false, dedupingInterval: 300_000 }
  )

  if (!data?.posts?.length) return null

  const latestPost = data.posts[0]
  const images = data.posts.map(
    (p) => p.metadata.cover_image?.imgix_url ?? PLACEHOLDER_IMAGE
  )

  return (
    <div
      className="relative flex items-center justify-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="absolute bottom-full pb-3"
          >
            <Link href={`/posts/${latestPost.slug}`}>
              <ImagesBadge
                text={latestPost.title}
                images={images}
                expanded
              />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <Link
        href="/posts"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-back-subtle dark:bg-neutral-800"
      >
        <Folder className="h-5 w-5 text-fore-subtle" />
      </Link>
    </div>
  )
}

export default RecentPostsBadge
