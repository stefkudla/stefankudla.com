import { NextPage } from 'next'
import { getAllPosts } from '@/lib/cosmic'
import IntroSection from '@/sections/IntroSection'
import AboutMeSection from '@/sections/AboutMeSection'
import WritingsSection from '@/sections/WritingsSection'
import ToolboxSection from '@/sections/ToolboxSection'
import ProjectsSection from '@/sections/ProjectsSection'
import ContactSection from '@/sections/ContactSection'
import { PageMeta } from '@/components/Meta'

const Index: NextPage<{ allPosts: Object[]; allWorks: Object[] }> = ({
  allPosts,
  allWorks,
}) => {
  return (
    <>
      <PageMeta
        title="Stefan Kudla | Software Developer"
        description="Stefan Kudla is a software developer pushing forth web development with cutting-edge technologies"
      />
      <IntroSection />
      <AboutMeSection />
      <ToolboxSection />
      <ProjectsSection posts={allWorks} />
      <WritingsSection posts={allPosts} />
      <ContactSection />
    </>
  )
}

type preview = any

export async function getStaticProps({ preview }: preview) {
  const allPosts = (await getAllPosts(preview, 'posts', 3)) || []
  const allWorks = (await getAllPosts(preview, 'works', 3)) || []
  return {
    props: { allPosts, allWorks },
  }
}
export default Index
