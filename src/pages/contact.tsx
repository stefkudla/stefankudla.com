import Layout from '@/components/Layout'
import { PageMeta } from '@/components/Meta'
import SectionWrapper from '@/components/SectionWrapper'
import { NextPage } from 'next'
import FintechCard from '@/components/FintechCard'

const Contact: NextPage = () => {
  return (
    <Layout>
      <PageMeta
        title="Contact | Stefan Kudla"
        description="Need a Web Developer? Contact me."
        url="https://stefankudla.com/contact"
      />
      <SectionWrapper fullWidth innerPadding>
        <div className="flex justify-center w-full max-w-xl mx-auto">
          <div className="w-full max-w-[420px]">
            <FintechCard />
          </div>
        </div>
      </SectionWrapper>
    </Layout>
  )
}

export default Contact
