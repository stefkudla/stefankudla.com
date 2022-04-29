import { NextPage } from 'next'
import { getAllPosts } from '@/lib/api'
import PageContainer from '@/components/PageContainer'
import IntroSection from '@/sections/IntroSection'
import AboutMeSection from '@/sections/AboutMeSection'
import WritingsSection from '@/sections/WritingsSection'
import ToolboxSection from '@/sections/ToolboxSection'
import ProjectsSection from '@/sections/ProjectsSection'
import ContactSection from '@/sections/ContactSection'
import Head from 'next/head'

interface IndexProps {
  allPosts: [{}]
  allWorks: [{}]
}

const Index: NextPage<IndexProps> = ({ allPosts, allWorks }) => {
  return (
    <PageContainer>
      <Head>
        <title>Stefan Kudla | Software Developer</title>
      </Head>
      <IntroSection />
      <AboutMeSection />
      <WritingsSection posts={allPosts} />
      <ToolboxSection />
      <ProjectsSection posts={allWorks} />
      <ContactSection />
    </PageContainer>
  )
}

type preview = any

export async function getStaticProps({ preview }: preview) {
  const allPosts = (await getAllPosts(preview, 'posts')) || []
  const allWorks = (await getAllPosts(preview, 'works')) || []
  return {
    props: { allPosts, allWorks },
  }
}
export default Index
