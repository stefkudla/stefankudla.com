import IntroSection from '@/sections/IntroSection'
import CtaSection from '@/sections/CtaSection'
import Layout from '@/components/Layout'
import { pageMetadata } from '@/lib/metadata'

export const revalidate = 180

export const metadata = pageMetadata({
  title: 'Stefan Kudla | Software Engineer in Las Vegas',
  description: 'Fullstack Software Engineer based in Las Vegas',
  url: 'https://stefankudla.com/',
})

const Index = () => (
  <Layout>
    <IntroSection />

    <CtaSection />
  </Layout>
)

export default Index
