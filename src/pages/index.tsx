import { NextPage } from 'next'
import IntroSection from '@/sections/IntroSection'
import { PageMeta } from '@/components/Meta'
import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import CtaSection from '@/sections/CtaSection'

const Index: NextPage = () => {
  const router = useRouter()
  return (
    <Layout
      router={{
        route: router.pathname,
      }}
    >
      <PageMeta
        title="Stefan Kudla | Software Engineer in Las Vegas"
        description="Fullstack Software Engineer based in Las Vegas"
        url="https://stefankudla.com/"
      />
      <IntroSection />

      <CtaSection />
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {},
    revalidate: 180,
  }
}
export default Index
