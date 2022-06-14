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
          property="og:description"
          content="Stefan Kudla is a software developer from Las Vegas, Nevada."
        />
        <meta property="og:image" content="/images/stefan_kudla_ogImage.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@stefankudla" />
        <meta name="twitter:title" content="Stefan Kudla" />
        <meta
          name="twitter:description"
          content="Software Engineer from Las Vegas, Nevada"
        />
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
  const allPosts = (await getAllPosts(preview, 'posts', 3)) || []
  const allWorks = (await getAllPosts(preview, 'works', 3)) || []
  return {
    props: { allPosts, allWorks },
  }
}
export default Index
