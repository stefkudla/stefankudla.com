import Layout from '@/components/Layout'
import { PageMeta } from '@/components/Meta'
import MultiForm from '@/components/MultiForm'
import SectionWrapper from '@/components/SectionWrapper'
import classNames from 'classnames'
import { NextPage } from 'next'
import React from 'react'
import { InfoForm } from '@/components/MultiForm'

const Contact: NextPage = () => {
  return (
    <Layout>
      <PageMeta
        title="Contact | Stefan Kudla"
        description="Need a Web Developer? Contact me."
        url="https://stefankudla.com/contact"
      />
      <SectionWrapper innerPadding>
        <div className="flex-1 flex flex-col lg:items-end w-full max-w-xl mx-auto lg:max-w-none">
          <div className="p-4 lg:px-12 bg-card-background rounded-lg lg:pt-6 lg:pb-10 w-full shadow min-h-[519px] lg:min-h-[547px] max-w-xl mx-auto lg:mx-0">
            <InfoForm />
          </div>
        </div>
      </SectionWrapper>
    </Layout>
  )
}

export default Contact
