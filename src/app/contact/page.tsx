import Layout from '@/components/Layout'
import SectionWrapper from '@/components/SectionWrapper'
import FintechCard from '@/components/FintechCard'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({
  title: 'Contact | Stefan Kudla',
  description: 'Need a Web Developer? Contact me.',
  url: 'https://stefankudla.com/contact',
})

const Contact = () => (
  <Layout>
    <SectionWrapper fullWidth innerPadding>
      <div className="flex justify-center w-full max-w-xl mx-auto">
        <div className="w-full max-w-[420px]">
          <FintechCard />
        </div>
      </div>
    </SectionWrapper>
  </Layout>
)

export default Contact
