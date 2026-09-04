import { draftMode } from 'next/headers'
import { getAllPosts, getAllPostCategories } from '@/lib/cosmic'
import Layout from '@/components/Layout'
import { pageMetadata } from '@/lib/metadata'
import PostsIndex from './posts-index'

export const revalidate = 180

export const metadata = pageMetadata({
  title: 'Blog Posts | Stefan Kudla',
  description: 'Blog posts written by Stefan Kudla',
  url: 'https://stefankudla.com/posts',
})

const Posts = async () => {
  const { isEnabled: preview } = await draftMode()
  const allPostCategories = (await getAllPostCategories()) || []
  const allPosts = (await getAllPosts(preview)) || []

  return (
    <Layout>
      <PostsIndex allPosts={allPosts} allPostCategories={allPostCategories} />
    </Layout>
  )
}

export default Posts
