import GlassCard from '@/components/GlassCard'
import Layout from '@/components/Layout'
import { PageMeta } from '@/components/Meta'
import MultiForm from '@/components/MultiForm'
import SectionWrapper from '@/components/SectionWrapper'
import classNames from 'classnames'
import { NextPage } from 'next'
import React from 'react'

const Contact: NextPage = () => {
  return (
    <Layout>
      <PageMeta
        title="Contact | Stefan Kudla"
        description="Need a Web Developer? Contact me."
        url="https://stefankudla.com/contact"
      />
      <SectionWrapper
        classNames="flex flex-col gap-8 lg:flex-row lg:justify-center w-full max-w-7xl mx-auto"
        innerPadding
      >
        <div className="flex flex-1 flex-col justify-between mx-auto lg:max-w-none">
          <h1
            className={classNames(
              'text-2xl md:text-3xl xl:text-4xl max-w-xl font-bold font-oswald xl:leading-[1.2] text-left'
            )}
          >
            Need a Freelance Web Developer for your next project? Contact me
          </h1>
          <span className="text-2xl font-oswald hidden lg:block">
            stefan@stefankudla.com
          </span>
        </div>
        <div className="flex-1 flex flex-col lg:items-end w-full max-w-xl mx-auto lg:max-w-none">
          <MultiForm />
          <span className="text-2xl font-oswald lg:hidden block mt-4">
            stefan@stefankudla.com
          </span>
        </div>
      </SectionWrapper>
    </Layout>
  )
}

export default Contact
