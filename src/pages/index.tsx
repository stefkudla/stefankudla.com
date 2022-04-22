import { NextPage } from 'next'
import { getAllPostsForHome } from '@/lib/api'
import PageContainer from '@/components/PageContainer'
import IntroSection from '@/sections/IntroSection'
import AboutMeSection from '@/sections/AboutMeSection'
import WritingsSection from '@/sections/WritingsSection'
import ToolboxSection from '@/sections/ToolboxSection'
import ProjectsSection from '@/sections/ProjectsSection'
import ContactSection from '@/sections/ContactSection'
import { Params } from 'next/dist/server/router'

const Index: NextPage = ({ allPosts }: { allPosts: any }) => {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)
  return (
    <>
      <PageContainer>
        <IntroSection />
        <AboutMeSection />
        <WritingsSection posts={allPosts} />
        <ToolboxSection />
        <ProjectsSection posts={[]} />
        <ContactSection />
      </PageContainer>
    </>
  )
}

export async function getStaticProps({ preview }) {
  const allPosts = (await getAllPostsForHome(preview)) || []
  return {
    props: { allPosts },
  }
}
export default Index
