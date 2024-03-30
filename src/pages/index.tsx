import { NextPage } from 'next'
import { getAllPosts } from '@/lib/cosmic'
import IntroSection from '@/sections/IntroSection'
import { PageMeta } from '@/components/Meta'
import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import ServicesSection from '@/sections/ServicesSection'
import { Services } from '@/sections/ServicesSection'
import { cosmic } from '@/lib/cosmic'
import ImageMarquee from '@/sections/ImageMarquee'
import CtaSection from '@/sections/CtaSection'

const Index: NextPage<{ allPosts: Object[]; services: Services[] }> = ({
  allPosts,
  services,
}) => {
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
      <ServicesSection
        heading="Services"
        text="I'm committed to providing my clients with high-quality services that deliver results. Here are some of the services I offer."
        services={services}
      />
      <ImageMarquee />
      <CtaSection />
    </Layout>
  )
}

export async function getStaticProps({ preview }: { preview?: boolean }) {
  const allPosts = (await getAllPosts(preview, 3)) || []

  const services = await cosmic.objects
    .find({ type: 'services' })
    .props('slug,title,metadata')
    .depth(1)
  return {
    props: { allPosts, services: services.objects },
    revalidate: 180,
  }
}
export default Index
