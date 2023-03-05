import { NextPage } from 'next'
import { getAllPosts } from '@/lib/cosmic'
import IntroSection from '@/sections/IntroSection'
import AboutMeSection from '@/sections/AboutMeSection'
import WritingsSection from '@/sections/WritingsSection'
import ToolboxSection from '@/sections/ToolboxSection'
import ContactSection from '@/sections/ContactSection'
import { PageMeta } from '@/components/Meta'
import Layout from '@/components/Layout'
import { useRouter } from 'next/router'

const Index: NextPage<{ allPosts: Object[] }> = ({ allPosts }) => {
  const router = useRouter()
  return (
    <Layout
      router={{
        route: router.pathname,
      }}
    >
      <PageMeta
        title="Stefan Kudla | Software Developer"
        description="Freelance Software Developer and Technical Content Writer"
        url="https://stefankudla.com/"
      />
      <IntroSection />
      <WritingsSection posts={allPosts} />
      <AboutMeSection />
      <ToolboxSection />
      <ContactSection />
    </Layout>
  )
}

export async function getStaticProps({ preview }: { preview?: boolean }) {
  const allPosts = (await getAllPosts(preview, 3)) || []
  return {
    props: { allPosts },
    revalidate: 180,
  }
}
export default Index
