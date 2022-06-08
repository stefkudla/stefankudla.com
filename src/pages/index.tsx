import { NextPage } from 'next'
import { getAllPosts } from '@/lib/cosmic'
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
    <>
      <Head>
        <title>Stefan Kudla | Software Developer</title>
        <meta
          name="description"
          content="Stefan Kudla is a software developer from Las Vegas, Nevada."
        />
        <meta property="og:image" content="/images/stefan_kudla_ogImage.jpg" />
      </Head>
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
  const allPosts = (await getAllPosts(preview, 'posts')) || []
  const allWorks = (await getAllPosts(preview, 'works')) || []
  return {
    props: { allPosts, allWorks },
  }
}
export default Index
