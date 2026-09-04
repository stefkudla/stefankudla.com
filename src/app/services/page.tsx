import Layout from '@/components/Layout'
import { cosmic } from '@/lib/cosmic'
import { pageMetadata } from '@/lib/metadata'
import ServicesContent from './services-content'

export const revalidate = 180

export const metadata = pageMetadata({
  title: 'Services | Stefan Kudla',
  description:
    'I offer web development services that bring your digital vision to life. Contact me today.',
  url: 'https://stefankudla.com/services',
})

const Services = async () => {
  const services = await cosmic.objects
    .find({ type: 'services' })
    .props('slug,title,metadata')
    .depth(1)

  return (
    <Layout>
      <ServicesContent services={services.objects} />
    </Layout>
  )
}

export default Services
